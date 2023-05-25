import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API Documentation",
      version: "1.0.0",
    },
  },
  apis: ["./routes/index.ts"], // Update the path to your route files or use a glob pattern
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default function setupSwagger(app:any) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
