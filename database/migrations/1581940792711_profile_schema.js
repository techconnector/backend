"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProfileSchema extends Schema {
  up() {
    this.create("profiles", table => {
      table.increments();
      table
        .integer("user_id")
        .unique()
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.string("company", 80);
      table.string("location", 200);
      table.string("status", 40);
      table.string("bio", 255);
      table.string("github_username", 30);
      table.string("website", 100);
      table.string("youtube", 100);
      table.string("twitter", 100);
      table.string("facebook", 100);
      table.string("linkedin", 100);
      table.string("instagram", 100);
      table.timestamps();
    });
  }

  down() {
    this.drop("profiles");
  }
}

module.exports = ProfileSchema;
