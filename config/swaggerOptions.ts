import swaggerJsDoc from "swagger-jsdoc";

// define swagger options
const swaggerOptions: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description:
        "API Documentation for Backend Assignment. A branch and employee information management application",
    },
    server: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Local server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  // path to annotated files
  apis: [
    "./src/api/v1/routes/*.ts",
    "./src/api/v1/models/*.ts",
    "./src/app.ts",
  ],
};

// Initialize Swagger JSDoc object
export const generateSwaggerDocs = (): object => {
  return swaggerJsDoc(swaggerOptions);
};
