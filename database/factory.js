"use strict";

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const moment = require("moment");

Factory.blueprint("App/Models/User", (faker, i, data = {}) => {
  return {
    name: faker.name(),
    email: faker.email(),
    password: faker.password(),
    avatar: faker.avatar(),
    ...data
  };
});

Factory.blueprint("App/Models/Profile", (faker, i, data = {}) => {
  const username = faker.name().replace(" ", "");

  return {
    company: faker.company(),
    location: faker.address(),
    status: faker.profession(),
    bio: faker.sentence({ words: 8 }),
    github_username: username,
    website: faker.url(),
    youtube: `https://youtube.com/${username}`,
    twitter: `https://twitter.com/${username}`,
    facebook: `https://facebook.com/${username}`,
    linkedin: `https://linkedin.com/${username}`,
    instagram: `https://instagram.com/${username}`,
    ...data
  };
});

Factory.blueprint("App/Models/Experience", (faker, i, data = {}) => {
  const from = moment()
    .subtract(1, "year")
    .format("YYYY-MM-DD HH:mm:00");
  const to = moment().format("YYYY-MM-DD HH:mm:00");

  return {
    title: faker.sentence({ words: 5 }),
    company: faker.company(),
    location: faker.address(),
    description: faker.sentence({ words: 8 }),
    from,
    to,
    current: false,
    ...data
  };
});

Factory.blueprint("App/Models/Education", (faker, i, data = {}) => {
  const from = moment()
    .subtract(4, "year")
    .format("YYYY-MM-DD HH:mm:00");
  const to = moment().format("YYYY-MM-DD HH:mm:00");
  const schools = ["ULBRA", "Unisinos", "Feevale", "PUC", "Harvard", "CalTech"];
  const degrees = ["High School", "Bachelor", "Masters", "PHD"];
  const fields = ["Art", "Computer Science", "Fisics", "Medicine"];

  return {
    school: schools[Math.floor(Math.random() * schools.length)],
    degree: degrees[Math.floor(Math.random() * degrees.length)],
    field_of_study: fields[Math.floor(Math.random() * fields.length)],
    description: faker.sentence({ words: 8 }),
    from,
    to,
    current: false,
    ...data
  };
});
