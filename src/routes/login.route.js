const { Router } = require('express');
const LoginController = require('../controllers/LoginController');
const { auth } = require('../middleware/auth');

const loginRoutes = new Router();

loginRoutes.post('/', LoginController.login
            /*  
        #swagger.tags = ['Login']
        #swagger.parameters['body'] = {
            in: 'body',
            type: 'object',
            description: 'Realiza login do usuário',
            schema: {
                    $email: 'seuemail',
                    $senha: 'suasenha'
                    }
                }
    */
);

module.exports = loginRoutes;
