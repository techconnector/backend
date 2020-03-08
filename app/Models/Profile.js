"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Profile extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }

  experiences() {
    return this.hasMany("App/Models/Experience");
  }

  educations() {
    return this.hasMany("App/Models/Education");
  }
}

module.exports = Profile;
