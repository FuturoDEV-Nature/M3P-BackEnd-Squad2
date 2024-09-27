const axios = require('axios');

class MapService {
    async getCepCoordinates(cep) {
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&postalcode=${cep}&country=Brazil&limit=1`);

            console.log("Resposta da solicitação HTTP:", response.data);

            if (response.data && response.data.length > 0) {
                const { lat, lon } = response.data[0];
                console.log("Latitude:", lat);
                console.log("Longitude:", lon);
                return { latitude: lat, longitude: lon };
            } else {
                throw new Error('CEP não encontrado');
            }
        } catch (error) {
            console.error('Erro ao consultar o CEP:', error);
            throw new Error('Erro ao processar a solicitação');
        }
    }

    generateGoogleMapsLink(latitude, longitude) {
        return `https://www.google.com/maps?q=${latitude},${longitude}`;
    }
}

module.exports = new MapService();
