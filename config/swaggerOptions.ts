import swaggerJsDoc from "swagger-jsdoc";
const serverUrl =
  process.env.SWAGGER_SERVER_URL || "http://localhost:3000/api/v1";

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
        url: serverUrl,
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
    security: [
      {
        bearerAuth: [],
      },
    ],
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
