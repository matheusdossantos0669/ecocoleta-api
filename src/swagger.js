
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EcoColeta API',
      version: '1.0.0',
      description: 'API para gerenciamento de reciclagem e coleta seletiva - ODS 11'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local'
      }
    ]
  },
  apis: []
};

module.exports = swaggerJsDoc(options);
