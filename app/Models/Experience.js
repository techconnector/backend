"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Experience extends Model {
  profile() {
    return this.belongsTo("App/Models/Profile");
  }
}

module.exports = Experience;
