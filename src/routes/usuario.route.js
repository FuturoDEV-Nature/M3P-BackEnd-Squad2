const { Router } = require('express');
const UsuarioController = require('../controllers/UsuarioController');
const { auth } = require('../middleware/auth');

const usuarioRoutes = new Router();

usuarioRoutes.post('/', UsuarioController.cadastrar
    /*  
        #swagger.tags = ['Usuario']
        #swagger.parameters['body'] = {
            in: 'body',
            type: 'object',
            description: 'Cadastra um novo usuario',
            schema: {
                    $email: 'seu@email.com',
                    $senha: '123456',
                    $nome: 'seunomeaqui',
                    $sexo: 'seusexo',
                    $cpf: 'seucpfaqui!'
                    }
                }
    */
);

usuarioRoutes.post('/islogado', UsuarioController.isLogado);

usuarioRoutes.post('/islogout', UsuarioController.isLogOut);

usuarioRoutes.get('/countlogados', auth, UsuarioController.getCountLogados);



usuarioRoutes.get('/:cpf', UsuarioController.verificarCPF);


usuarioRoutes.get('/', auth, UsuarioController.listar
    /*  
        #swagger.tags = ['Usuario']
        #swagger.parameters['auth'] = {
            in: 'header',
            type: 'string',
            description: 'Lista todos usuários'
        }
    */
);

usuarioRoutes.get('/:id', auth, UsuarioController.listarUm
    /*  
        #swagger.tags = ['Usuario']
        #swagger.parameters['auth'] = {
            in: 'header',
            type: 'string',
            description: 'Lista usuário pelo ID'
        }
        #swagger.parameters['id'] = {
            in: 'path',
            type: 'string',
            description: 'ID do usuário'
        }
    */
);

usuarioRoutes.put('/:id', auth, UsuarioController.atualizar
    /*  
        #swagger.tags = ['Usuario']
        #swagger.parameters['auth'] = {
            in: 'header',
            type: 'string',
            description: 'Atualiza dados do usuário'
        }
        #swagger.parameters['id'] = {
            in: 'path',
            type: 'string',
            description: 'Atualiza dados do usuário'
        }
    */
);

usuarioRoutes.delete('/:id', auth, UsuarioController.excluir
    /*  
        #swagger.tags = ['Usuario']
        #swagger.parameters['auth'] = {
            in: 'header',
            type: 'string',
            description: 'Exclui usuário'
        }
        #swagger.parameters['id'] = {
            in: 'path',
            type: 'string',
            description: 'Exclui usuário'
        }
    */
);



module.exports = usuarioRoutes;
