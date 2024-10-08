const Destino = require("../models/Destino");
const mapService = require("../service/map.service");
const axios = require('axios');

class DestinoController {

    async cadastrar(req, res) {
        try {
            const { cep, endereco, descricao } = req.body;
            const usuario_id = req.usuario_id;

            if (!usuario_id) {
                return res.status(401).json({ message: 'ID do usuário não fornecido' });
            }

            if (!cep || !endereco || !descricao) {
                return res.status(400).json({ message: 'CEP, endereço e descrição são obrigatórios' });
            }

            const { latitude, longitude } = await mapService.getCepCoordinates(cep);
            const mapsUrl = mapService.generateGoogleMapsLink(latitude, longitude);

            const novoDestino = await Destino.create({
                cep,
                endereco,
                descricao,
                latitude,
                longitude,
                usuario_id,
                maps_url: mapsUrl
            });

            res.status(201).json(novoDestino);

        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Não foi possível cadastrar o destino' });
        }
    }

    async listar(req, res) {
        try {
            const destinos = await Destino.findAll();
            res.json(destinos);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Não foi possível listar os destinos' });
        }
    }

    async listarUm(req, res) {
        try {
            const { id } = req.params;
            const destino = await Destino.findByPk(id);
            if (!destino) {
                return res.status(404).json({ message: "Destino não encontrado" });
            }
            res.json(destino);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Não foi possível listar o destino específico' });
        }
    }

    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nomelocal, cep, endereco, numero, cidade, descricao, maps_url } = req.body;

            const destino = await Destino.findByPk(id);
            if (!destino) {
                return res.status(404).json({ message: "Destino não encontrado" });
            }

            const { latitude, longitude } = await mapService.getCepCoordinates(cep);

            destino.nomelocal = nomelocal;
            destino.cep = cep;
            destino.endereco = endereco;
            destino.numero = numero;
            destino.cidade = cidade;
            destino.latitude = latitude;
            destino.longitude = longitude;
            destino.descricao = descricao;
            destino.maps_url = maps_url;
            
            await destino.save();

            res.status(200).json({ message: 'Destino atualizado com sucesso' });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Não foi possível atualizar o destino' });
        }
    }

    async excluir(req, res) {
        try {
            const { id } = req.params;

            const destino = await Destino.findByPk(id);
            if (!destino) {
                return res.status(404).json({ message: "Destino não encontrado" });
            }

            await destino.destroy();

            res.status(200).json({ message: 'Destino excluído com sucesso' });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Não foi possível excluir o destino' });
        }
    }

    async listarDestinoEspecifico(req, res) {
            try {
            const { destino_id } = req.params;
            const usuario_id = req.usuario_id
            const destino = await Destino.findOne({
                where: { usuario_id, destino_id }
            });
    
            if (!destino) {
                return res.status(404).json({ message: "Destino não encontrado" });
            }
    
            res.json(destino);
            //res.json( {link: destino.maps_url });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Erro ao listar destino específico do usuário' });
        }
    } 

    async obterLinkGoogleMaps(req, res) {
        try {
            const { destino_id } = req.params;
            const usuario_id = req.usuario_id; 
            
            const destino = await Destino.findOne({
                where: { usuario_id, destino_id: destino_id }
            });
    
            if (!destino) {
                return res.status(404).json({ message: "Destino não encontrado" });
            }
    
            const linkGoogleMaps = `https://www.google.com/maps?q=${destino.latitude},${destino.longitude}`;
    
            res.json({ link: linkGoogleMaps });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Erro ao obter link do Google Maps para o destino' });
        }
    }
    
    async listarDestinoUsuario(req, res) {
        try {
          const { id } = req.params;
    
          const local = await Destino.findAll({ where: { usuario_id: id } });
    
          if (!local) {
            return res.status(404).json({ message: "Local não encontrado -- Paula" });
       }
    
         res.json(local);
       } catch (error) {
        console.log(error.message);
        res.status(500).json({
           error: "Não é possível listar os locais do usuário -- Paula",
          error: error,
        });
       }
       }
}

module.exports = new DestinoController();
