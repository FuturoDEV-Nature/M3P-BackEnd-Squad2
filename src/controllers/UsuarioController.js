const Usuario = require("../models/Usuario");
const jwt = require('jsonwebtoken');

class UsuarioController {
  async cadastrar(req, res) {
    try {
      const {
        email,
        senha,
        nome,
        sobrenome,
        sexo,
        cpf,
        dataNascimento,
        endereco,
        numero,
        cep,
      } = req.body;

      if (!nome || !sobrenome || !cpf || !endereco || !numero || !cep) {
        return res.status(400).json({
          message:
            "Nome, Sobrenome, CPF, Endereço, Número e CEP são obrigatórios",
        });
      }

      const novoUsuario = await Usuario.create({
        email,
        senha,
        nome,
        sobrenome,
        sexo,
        cpf,
        dataNascimento,
        endereco,
        numero,
        cep,
      });

      res.status(201).json(novoUsuario);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Não foi possível cadastrar o usuário" });
    }
  }

  async verificarCPF(req, res) {
    try {
      const { cpf } = req.params;

      // Verifica se o CPF foi fornecido
      if (!cpf) {
        return res.status(400).json({ message: "CPF é obrigatório." });
      }

      const usuario = await Usuario.findOne({
        where: { cpf },
      });

      // Retorna a resposta apropriada
      if (usuario) {
        return res
          .status(409)
          .json({ message: "Já existe um usuário cadastrado com este CPF." });
      } else {
        return res.status(200).json({ message: "CPF disponível." });
      }
    } catch (error) {
      console.error("Erro ao verificar o CPF:", error);
      return res
        .status(500)
        .json({ message: "Erro ao consultar o banco de dados." });
    }
  }

  async listar(req, res) {
    try {
      const usuarios = await Usuario.findAll();
      res.json(usuarios);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Não foi possível listar os usuários" });
    }
  }

  async listarUm(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      res.json(usuario);
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ error: "Não foi possível listar o usuário específico" });
    }
  }

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { id: usuario_id } = req.usuario;

      if (parseInt(id) !== usuario_id) {
        return res
          .status(403)
          .json({ message: "Você não tem permissão para editar este usuário" });
      }

      const { nome, sexo, cpf, dataNascimento, rua, bairro, cidade, uf } =
        req.body;

      if (!nome || !sexo || !cpf || !bairro || !cidade || !uf) {
        return res.status(400).json({
          message: "Nome, sexo, CPF, Bairro, Cidade e UF são obrigatórios",
        });
      }

      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      usuario.nome = nome;
      usuario.sexo = sexo;
      usuario.cpf = cpf;
      usuario.dataNascimento = dataNascimento;
      usuario.rua = rua;
      usuario.bairro = bairro;
      usuario.cidade = cidade;
      usuario.uf = uf;

      await usuario.save();

      res.status(200).json(usuario); // Retorna o usuário atualizado
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Não foi possível editar o usuário" });
    }
  }

  async excluir(req, res) {
    try {
      const { id } = req.params;
      const { id: usuario_id } = req.usuario;

      if (parseInt(id) !== usuario_id) {
        return res.status(403).json({
          message: "Você não tem permissão para excluir este usuário",
        });
      }

      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      await usuario.destroy();

      res.status(200).json({ message: "Usuário excluído com sucesso" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Não foi possível excluir o usuário" });
    }
  }

  async isLogado(req, res) {
    try {
        const { email, senha } = req.body;
        const usuario = await Usuario.findOne({ where: { email: email } });

        if (!usuario) {
            return res.status(404).send("Usuário não encontrado");
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha); // Exemplo com bcrypt
        if (!senhaCorreta) {
            return res.status(401).send("Senha incorreta");
        }

        await Usuario.update(
            { isLogado: true },
            { where: { id: usuario.id } }
        );

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_SECRET
        );

        res.json({
            user: { id: usuario.id, nome: usuario.nome, email: usuario.email },
            token: token,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro no servidor");
    }
}

async isLogOut(req, res) {
  try {
      let token = req.headers['authorization'];

      if (token) {
          //token = token.slice(7, token.length);

          const secret = process.env.SECRET_JWT;
          const tokenDecode = await jwt.verify(token, secret);
          const usuario = await Usuario.findOne({ where: { id: tokenDecode.usuario_id } });
          
          if (usuario) {
              await Usuario.update(
                  { isLogado: false },
                  { where: { id: tokenDecode.usuario_id } }
              );
              return res.status(200).json("Sucesso no logout");
          }
      }
      res.status(401).send("Token inválido");
  } catch (err) {
      console.error(err);
      res.status(500).send("Erro no servidor");
  }
}


async getCountLogados(req, res) {
  try {
      const total = await Usuario.count({ where: { isLogado: true } });
      res.json(total);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro no servidor');
  }
}





  // async isLogado(req, res) {
  //   try {
  //     const { email, senha, isLogado } = req.body;
  //     const usuario = await Usuario.findOne({ where: { email: email } });
  //     if (!usuario) {
  //       return res.status(404).send("Usuário não encontrado");
  //     }
  //     await Usuario.update(
  //       { ...usuario, isLogado: true },
  //       { where: { id: usuario.id } }
  //     );
  //     if (!senhaCorreta) {
  //       return res.status(401).send("Senha incorreta");
  //     }
  //     const token = jwt.sign(
  //       { id: usuario.id, email: usuario.email },
  //       process.env.JWT_SECRET
  //     );
  //     res.json({
  //       user: { id: usuario.id, nome: usuario.nome, email: usuario.email },
  //       token: token,
  //     });
  //   } catch {
  //     err;
  //   }
  //   console.error(err);
  //   res.status(500).send("Erro no servidor");
  // }

  // async isLogOut(req, res) {
  //   let token = req.headers['authorization'];
  //   if (token.startsWith("Bearer")) {
  //     token = token.slice(7, token.length);
  //   }
  //   let tokenDecode = await jwt.verify(token, process.env.JWT_SECRET);
  //   const usuario = await User.findOne({ where: { id: tokenDecode.id } });
  //   if (!!usuario) {
  //     await User.update(
  //       { ...usuario, isLogado: false },
  //       { where: { id: tokenDecode.id } }
  //     );
  //     res.status(200).json("Sucesso no logout");
  //   }
  // }

  // async getCountLogados(req, res) {
  //   try {
  //       const total = await Usuario.count({where: {isLogado: true}})
  //       res.json(total);
  //   }
  //   catch (err) {
  //       console.log(err.message)
  //       res.status(500).send('Erro no servidor')
  //   }
  // }
}


module.exports = new UsuarioController();
