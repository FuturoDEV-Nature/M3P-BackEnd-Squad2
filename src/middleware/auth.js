const { verify } = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Obtém o token após "Bearer"
        if (!token) {
            return res.status(401).json({ message: 'Token de autenticação não fornecido' });
        }

        const decodedToken = verify(token, process.env.SECRET_JWT);
        const usuario_id = decodedToken.sub; // A propriedade 'sub' deve ser a que contém o ID do usuário

        const usuario = await Usuario.findByPk(usuario_id);

        if (!usuario) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }

        req.usuario = usuario; // Armazena o usuário na requisição
        next();
    } catch (error) {
        console.error('Erro ao verificar o token:', error.message);
        res.status(401).json({ message: 'Token inválido' });
    }
};

module.exports = { auth };
