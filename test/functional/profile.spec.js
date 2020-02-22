"use strict";

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use("App/Models/User");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Profile = use("App/Models/Profile");

const { test, trait } = use("Test/Suite")("FUNCTIONAL: Profile");

trait("DatabaseTransactions");
trait("Test/ApiClient");
trait("Auth/Client");

test("it should be able to create a profile", async ({ assert, client }) => {
  const user = await Factory.model("App/Models/User").create();
  const profile = await Factory.model("App/Models/Profile").make();

  const response = await client
    .post("/api/v1/profiles")
    .header("accept", "application/json")
    .loginVia(user)
    .send(profile.toJSON())
    .end();

  response.assertStatus(200);
  assert.equal(response.body.company, profile.company);
  assert.equal(response.body.location, profile.location);
  assert.equal(response.body.user.id, user.id);
  assert.equal(response.body.user.email, user.email);
});

test("it should be able to update a profile", async ({ assert, client }) => {
  const user = await Factory.model("App/Models/User").create();
  const profile = await Factory.model("App/Models/Profile").create({
    company: "Some Random Company",
    location: "Some Random Location",
    user_id: user.id
  });

  const response = await client
    .post("/api/v1/profiles")
    .header("accept", "application/json")
    .loginVia(user)
    .send({
      company: "New Company",
      location: "New Location"
    })
    .end();

  response.assertStatus(200);
  assert.equal(response.body.id, profile.id);
  assert.equal(response.body.user.id, user.id);
  assert.equal(response.body.company, "New Company");
  assert.equal(response.body.location, "New Location");
});

test("it should not be able to create/edit a profile without user id", async ({
  client
}) => {
  const profile = await Factory.model("App/Models/Profile").make();

  const response = await client
    .post("/api/v1/profiles")
    .header("accept", "application/json")
    .send(profile.toJSON())
    .end();

  response.assertStatus(401);
});

test("it should be able to get current user's profile", async ({
  assert,
  client
}) => {
  const user = await Factory.model("App/Models/User").create();
  const profile = await Factory.model("App/Models/Profile").create({
    user_id: user.id
  });
  const response = await client
    .get("/api/v1/profiles/me")
    .header("accept", "application/json")
    .loginVia(user)
    .end();

  response.assertStatus(200);
  assert.equal(response.body.id, profile.id);
  assert.equal(response.body.user.id, user.id);
});

test("it should be able to get a single profile by its ID", async ({
  assert,
  client
}) => {
  const user1 = await Factory.model("App/Models/User").create();
  await Factory.model("App/Models/Profile").create({ user_id: user1.id });

  const user2 = await Factory.model("App/Models/User").create();
  const profile2 = await Factory.model("App/Models/Profile").create({
    user_id: user2.id
  });

  const response = await client
    .get(`/api/v1/profiles/${user2.id}`)
    .header("accept", "application/json")
    .loginVia(user1)
    .end();

  response.assertStatus(200);
  assert.equal(response.body.id, profile2.id);
  assert.equal(response.body.user.id, user2.id);
});

test("it should be able to delete current logged in user's profile and user itself", async ({
  assert,
  client
}) => {
  const user = await Factory.model("App/Models/User").create();
  const profile = await Factory.model("App/Models/Profile").create({
    user_id: user.id
  });

  const response = await client
    .delete("/api/v1/profiles")
    .header("accept", "application/json")
    .loginVia(user)
    .end();

  const checkUser = await User.find(user.id);
  const checkProfile = await Profile.find(profile.id);

  response.assertStatus(204);
  assert.isNull(checkUser);
  assert.isNull(checkProfile);
});

test("it should not be able to delete current logged in user's profile and user itself without being logged in", async ({
  assert,
  client
}) => {
  const user = await Factory.model("App/Models/User").create();
  const profile = await Factory.model("App/Models/Profile").create({
    user_id: user.id
  });

  const response = await client
    .delete("/api/v1/profiles")
    .header("accept", "application/json")
    .end();

  const checkUser = await User.find(user.id);
  const checkProfile = await Profile.find(profile.id);

  response.assertStatus(401);
  assert.equal(checkUser.id, user.id);
  assert.equal(checkProfile.id, profile.id);
});
