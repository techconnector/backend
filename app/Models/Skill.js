"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Skill extends Model {
  static get Serializer() {
    return "App/Serializers/GenericSerializer";
  }

  static get hidden() {
    return ["created_at", "updated_at"];
  }

  profiles() {
    return this.belongsToMany("App/Models/Profile");
  }
}

module.exports = Skill;
