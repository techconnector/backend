"use strict";

const { LogicalException } = require("@adonisjs/generic-exceptions");

class ResourceNotFoundException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle(error, { response }) {
    response.status(404).json({ message: "Resource not found!" });
  }
}

module.exports = ResourceNotFoundException;
