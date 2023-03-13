import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
    openapi: '3.0.3',
    info: {
        title: 'Documentación social media app API',
        version: '1.0.0',
    },
    servers: [
        { url: 'http://localhost:3000/api/v1', },
    ],
    components: {
        schemas: {
            login: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                    email: { type: 'string' },
                    password: { type: 'string' },
                }
            }
        },
        securitySchemes: {
            cookieAuth: {
                type: 'apiKey',
                in: 'cookie',
                name: 'token'
            }
        }
    }
};

const swaggerOptions: OAS3Options = {
    swaggerDefinition,
    apis: ["./src/routes/*.ts"]
}

export default swaggerJSDoc(swaggerOptions);