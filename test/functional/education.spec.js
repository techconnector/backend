"use strict";

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Education = use("App/Models/Education");

const { test, trait } = use("Test/Suite")("FUNCTIONAL: Education");

trait("DatabaseTransactions");
trait("Test/ApiClient");
trait("Auth/Client");

test("it should be able to add education to a profile", async ({
  assert,
  client
}) => {
  const user = await Factory.model("App/Models/User").create();
  const profile = await Factory.model("App/Models/Profile").create({
    user_id: user.id
  });
  const education = await Factory.model("App/Models/Education").make();

  const response = await client
    .post("/api/v1/profiles/education")
    .header("accept", "application/json")
    .loginVia(user)
    .send(education.toJSON())
    .end();

  response.assertStatus(200);
  assert.equal(response.body.profile_id, profile.id);
  assert.equal(response.body.school, education.school);
  assert.equal(response.body.degree, education.degree);
});

test("it should be able to update education of a given profile", async ({
  assert,
  client
}) => {
  const user = await Factory.model("App/Models/User").create();
  const profile = await Factory.model("App/Models/Profile").create({
    user_id: user.id
  });
  const education = await Factory.model("App/Models/Education").create({
    profile_id: profile.id,
    school: "Old School",
    degree: "Old Degree"
  });

  const response = await client
    .post("/api/v1/profiles/education")
    .header("accept", "application/json")
    .loginVia(user)
    .send({
      school: "New School",
      degree: "New Degree"
    })
    .end();

  response.assertStatus(200);
  assert.equal(response.body.id, education.id);
  assert.equal(response.body.profile_id, profile.id);
  assert.equal(response.body.school, "New School");
  assert.equal(response.body.degree, "New Degree");
});

test("it should be able to delete education from a profile", async ({
  assert,
  client
}) => {
  const user = await Factory.model("App/Models/User").create();
  const profile = await Factory.model("App/Models/Profile").create({
    user_id: user.id
  });
  const education = await Factory.model("App/Models/Education").create({
    profile_id: profile.id
  });

  const response = await client
    .delete("/api/v1/profiles/education")
    .header("accept", "application/json")
    .loginVia(user)
    .end();

  const checkExperience = await Education.find(education.id);

  response.assertStatus(204);
  assert.isNull(checkExperience);
});
