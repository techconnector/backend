"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ExperienceSchema extends Schema {
  up() {
    this.create("experiences", table => {
      table.increments();
      table
        .integer("profile_id")
        .unsigned()
        .unique()
        .references("id")
        .inTable("profiles")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.string("title", 40);
      table.string("company", 80);
      table.string("location", 200);
      table.string("description", 255);
      table.timestamp("from");
      table.timestamp("to");
      table.boolean("current").defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop("experiences");
  }
}

module.exports = ExperienceSchema;
