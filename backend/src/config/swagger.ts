import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    servers: [{ url: '/api', description: 'Base API path' }],
    openapi: '3.0.0',
    info: { title: 'Movie API', version: '1.0.0', description: 'Movie API documentation' },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token. Example: **Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...**'
        }
      },
  security: [ { bearerAuth: [] } ],
      schemas: {
        Movie: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '652f9b2b4a1f3e1c1a2b3c4d' },
            title: { type: 'string', example: 'Columbus' },
            poster: { type: 'string', example: 'https://example.com/poster.jpg' },
            description: { type: 'string', example: 'A heartfelt drama.' },
            year: { type: 'integer', example: 2017 },
            rating: { type: 'number', example: 7.8 },
            ratingCount: { type: 'integer', example: 1234 },
            isFav: { type: 'boolean', example: false },
            categories: { type: 'array', items: { type: 'string', enum: ['upcoming','rated','watchlist','added'] }, example: ['rated'] },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.ts'],
};

export const setupSwagger = (app: Express) => {
  const specs = swaggerJsdoc(options);
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
};
