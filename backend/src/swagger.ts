// src/swagger.ts
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: '1.0.0',
    title: 'LexBridge API',
    description: 'Seamless platform connecting clients with verified legal experts.',
  },
  host: 'localhost:5000', // change as per deployment
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
   components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{
    bearerAuth: [] as unknown[]
  }],
};

const outputFile = './src/swagger-output.json';
const endpointsFiles = [
  './src/server.ts'
];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
