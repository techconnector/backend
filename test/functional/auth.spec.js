"use strict";

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

const { test, trait } = use("Test/Suite")("Auth");

trait("DatabaseTransactions");
trait("Test/ApiClient");
trait("Auth/Client");

test("it should be able to get a user by a given JWT token", async ({
  assert,
  client,
}) => {
  const user = await Factory.model("App/Models/User").create();
  const response = await client
    .get("/api/v1/auth")
    .header("accept", "application/json")
    .loginVia(user)
    .end();

  response.assertStatus(200);
  assert.equal(response.body.id, user.id);
  assert.equal(response.body.email, user.email);
});

test("it should fail to get a user if no JWT token is provided", async ({
  client,
}) => {
  const response = await client
    .get("/api/v1/auth")
    .header("accept", "application/json")
    .end();

  response.assertStatus(401);
});
