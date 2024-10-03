const Usuario = require("../models/Usuario");
const { sign } = require("jsonwebtoken");

class LoginController {
    async login(req, res) {
        try {
            const { email, senha } = req.body;

            const usuario = await Usuario.findOne({ where: { email, senha } });
            if (!usuario) {
                return res.status(401).json({ message: "Credenciais inválidas" });
            }

            const token = sign({ sub: usuario.id, email: usuario.email, nome: usuario.nome, usuario_id: usuario.id }, process.env.SECRET_JWT);

            // Enviando o token e os dados do usuário em uma única resposta
            res.json({
                user: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email
                },
                token: token
            });


        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Não foi possível fazer login' });
        }
    }
}

module.exports = new LoginController();
