const { verify } = require('jsonwebtoken');
const Usuario = require('../models/Usuario');


const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token de autenticação não fornecido' });
        }

        const decodedToken = verify(token, process.env.SECRET_JWT);
        const usuario_id = decodedToken.sub;

        const usuario = await Usuario.findByPk(usuario_id);

        if (!usuario) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }

        req.usuario_id = usuario_id;

        req.usuario_id = usuario_id;
        next();
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Erro ao verificar token de autenticação' });
    }
};

module.exports = { auth };
