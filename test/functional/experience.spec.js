"use strict";

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Experience = use("App/Models/Experience");

const { test, trait } = use("Test/Suite")("FUNCTIONAL: Experience");

trait("DatabaseTransactions");
trait("Test/ApiClient");
trait("Auth/Client");

test("it should be able to add experience to a profile", async ({
  assert,
  client
}) => {
  const user = await Factory.model("App/Models/User").create();
  const profile = await Factory.model("App/Models/Profile").create({
    user_id: user.id
  });
  const experience = await Factory.model("App/Models/Experience").make();

  const response = await client
    .post("/api/v1/profiles/experience")
    .header("accept", "application/json")
    .loginVia(user)
    .send(experience.toJSON())
    .end();

  response.assertStatus(200);
  assert.equal(response.body.profile_id, profile.id);
  assert.equal(response.body.title, experience.title);
  assert.equal(response.body.company, experience.company);
});

test("it should be able to update experience of a given profile", async ({
  assert,
  client
}) => {
  const user = await Factory.model("App/Models/User").create();
  const profile = await Factory.model("App/Models/Profile").create({
    user_id: user.id
  });
  const experience = await Factory.model("App/Models/Experience").create({
    profile_id: profile.id,
    title: "Old Title",
    company: "Old Company"
  });

  const response = await client
    .post("/api/v1/profiles/experience")
    .header("accept", "application/json")
    .loginVia(user)
    .send({
      title: "New Title",
      company: "New Company"
    })
    .end();

  response.assertStatus(200);
  assert.equal(response.body.id, experience.id);
  assert.equal(response.body.profile_id, profile.id);
  assert.equal(response.body.title, "New Title");
  assert.equal(response.body.company, "New Company");
});

test("it should be able to delete experience from current logged in user's profile", async ({
  assert,
  client
}) => {
  const user = await Factory.model("App/Models/User").create();
  const profile = await Factory.model("App/Models/Profile").create({
    user_id: user.id
  });
  const experience = await Factory.model("App/Models/Experience").create({
    profile_id: profile.id
  });

  const response = await client
    .delete("/api/v1/profiles/experience")
    .header("accept", "application/json")
    .loginVia(user)
    .end();

  const checkExperience = await Experience.find(experience.id);

  response.assertStatus(204);
  assert.isNull(checkExperience);
});
