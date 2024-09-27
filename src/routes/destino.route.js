const { Router } = require('express');
const DestinoController = require('../controllers/DestinoController');
const { auth } = require('../middleware/auth');

const destinoRoutes = new Router();

destinoRoutes.post('/', auth, DestinoController.cadastrar
        /*  
        #swagger.tags = ['Destino']
        #swagger.parameters['body'] = {
            in: 'body',
            type: 'object',
            description: 'Cadastra um novo destino',
            schema: {
                    $cep: 'cepdolocal',
                    $endereco: 'enderecodolocal',
                    $descricao: 'descricaodolocal'
                    }
                }
    */
);

destinoRoutes.get('/', auth, DestinoController.listar
    /*  
    #swagger.tags = ['Destino']
    #swagger.parameters['auth'] = {
        in: 'header',
        type: 'string',
        description: 'Lista os destinos'
    }
    */
);

destinoRoutes.get('/:id', auth, DestinoController.listarUm
    /*  
    #swagger.tags = ['Destino']
    #swagger.parameters['auth'] = {
        in: 'header',
        type: 'string',
        description: 'Lista destino por ID'
    }
    #swagger.parameters['id'] = {
        in: 'path',
        type: 'string',
        description: 'Lista destino por ID'
    }
    */
);

destinoRoutes.put('/:id', auth, DestinoController.atualizar
    /*  
    #swagger.tags = ['Destino']
    #swagger.parameters['auth'] = {
        in: 'header',
        type: 'string',
        description: 'Atualiza destino'
    }
    #swagger.parameters['id'] = {
        in: 'path',
        type: 'string',
        description: 'Atualiza destino'
    }
    */
);

destinoRoutes.delete('/:id', auth, DestinoController.excluir
    /*  
    #swagger.tags = ['Destino']
    #swagger.parameters['auth'] = {
        in: 'header',
        type: 'string',
        description: 'Exclui destino'
    }
    #swagger.parameters['id'] = {
        in: 'path',
        type: 'string',
        description: 'Exclui destino'
    }
    */
);

destinoRoutes.get('/:destino_id', auth, DestinoController.listarDestinoEspecifico
    /*  
    #swagger.tags = ['Destino']
    #swagger.parameters['auth'] = {
        in: 'header',
        type: 'string',
        description: 'Lista destino específico'
    }
    #swagger.parameters['destino_id'] = {
        in: 'path',
        type: 'string',
        description: 'Lista destino específico'
    }
    */
);

destinoRoutes.get('/maps/:destino_id', auth, DestinoController.obterLinkGoogleMaps
    /*  
    #swagger.tags = ['Destino']
    #swagger.parameters['auth'] = {
        in: 'header',
        type: 'string',
        description: 'Obtem link do Google maps pelo CEP'
    }
    #swagger.parameters['destino_id'] = {
        in: 'path',
        type: 'string',
        description: 'Obtem link do Google maps pelo CEP'
    }
    */
);

module.exports = destinoRoutes;
