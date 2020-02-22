"use strict";

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Swagger Information
  | Please use Swagger 2 Spesification Docs
  | https://swagger.io/docs/specification/2-0/basic-structure/
  |--------------------------------------------------------------------------
  */

  enable: true,
  specUrl: "/swagger.json",

  options: {
    swaggerDefinition: {
      info: {
        title: "TechConnector Backend API",
        version: "1.0.0",
        description:
          "Restful API to access the Backend of the TechConnector Social Network",
        contact: "jonatafloress@gmail.com",
        license: {
          name: "MIT LICENSE",
          url: "https://github.com/techconnector/server/LICENSE"
        }
      },

      basePath: "/api/v1",

      // Example security definitions.
      securityDefinitions: {
        ApiKey: {
          description: "JWT Token to access private resources",
          name: "Authorization",
          type: "apiKey",
          in: "header",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },

    // Path to the API docs
    apis: ["docs/**/*.yml"]
  }
};
