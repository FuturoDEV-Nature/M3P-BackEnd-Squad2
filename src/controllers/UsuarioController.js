const Usuario = require("../models/Usuario");

class UsuarioController {
    async cadastrar(req, res) {
        try {
            const { email, senha, nome, sexo, cpf } = req.body;

            // Validar campos obrigatórios
            if (!nome || !cpf) {
                return res.status(400).json({ message: 'Nome e CPF são obrigatórios' });
            }

            const novoUsuario = await Usuario.create({
                email,
                senha,
                nome,
                sexo,
                cpf,
            });

            res.status(201).json(novoUsuario);

        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Não foi possível cadastrar o usuário' });
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
                where: { cpf }
            });
    
            // Retorna a resposta apropriada
            if (usuario) {
                return res.status(409).json({ message: "Já existe um usuário cadastrado com este CPF." });
            } else {
                return res.status(200).json({ message: "CPF disponível." });
            }
        } catch (error) {
            console.error("Erro ao verificar o CPF:", error);
            return res.status(500).json({ message: "Erro ao consultar o banco de dados." });
        }
    }
    
    async listar(req, res) {
        try {
            const usuarios = await Usuario.findAll();
            res.json(usuarios);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Não foi possível listar os usuários' });
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
            res.status(500).json({ error: 'Não foi possível listar o usuário específico' });
        }
    }

    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { id: usuario_id } = req.usuario;

            if (parseInt(id) !== usuario_id) {
                return res.status(403).json({ message: 'Você não tem permissão para editar este usuário' });
            }

            const { nome, sexo, cpf } = req.body;

            if (!nome || !sexo || !cpf) {
                return res.status(400).json({ message: 'Nome, sexo e CPF são obrigatórios' });
            }

            const usuario = await Usuario.findByPk(id);
    
            if (!usuario) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }

            usuario.nome = nome;
            usuario.sexo = sexo;
            usuario.cpf = cpf;
    
            await usuario.save();

        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Não foi possível editar o usuário' });
        }
    }

    async excluir(req, res) {
        try {
            const { id } = req.params;
            const { id: usuario_id } = req.usuario;
            
            if (parseInt(id) !== usuario_id) {
                return res.status(403).json({ message: 'Você não tem permissão para excluir este usuário' });
            }

            const usuario = await Usuario.findByPk(id);
            if (!usuario) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }

            await usuario.destroy();

            res.status(200).json({ message: 'Usuário excluído com sucesso' });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Não foi possível excluir o usuário' });
        }
    } 
}

module.exports = new UsuarioController();
