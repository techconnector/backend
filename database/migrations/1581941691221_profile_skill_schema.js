"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProfileSkillSchema extends Schema {
  up() {
    this.create("profile_skills", table => {
      table
        .integer("profile_id")
        .unsigned()
        .references("id")
        .inTable("profiles")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .integer("skill_id")
        .unsigned()
        .references("id")
        .inTable("skills")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
  }

  down() {
    this.drop("profile_skills");
  }
}

module.exports = ProfileSkillSchema;
