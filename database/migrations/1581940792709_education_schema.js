"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EducationSchema extends Schema {
  up() {
    this.create("educations", table => {
      table.increments();
      table
        .integer("profile_id")
        .unsigned()
        .unique()
        .references("id")
        .inTable("profiles")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.string("school", 80);
      table.string("degree", 20);
      table.string("field_of_study", 40);
      table.string("description", 255);
      table.timestamp("from");
      table.timestamp("to");
      table.boolean("current").defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop("educations");
  }
}

module.exports = EducationSchema;
