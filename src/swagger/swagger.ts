import * as dotenv from "dotenv";

const swaggerAutogen = require('swagger-autogen');

dotenv.config();

const PORT = process.env.PORT || 5000

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/index.ts'];


const doc = {
    info: {
        title: 'API - TecSUS',
        description: 'API criada para o projeto da API referente às estações metereológicas',
        version: '1.0.0',
    },
    host: `localhost:${PORT}`,
    basePath: '/api',
    schemes: ['http'],
};

swaggerAutogen()(outputFile, endpointsFiles, doc);