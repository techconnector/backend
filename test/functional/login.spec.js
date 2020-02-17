"use strict";

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

const { test, trait } = use("Test/Suite")("FUNCTIONAL: Login");

trait("DatabaseTransactions");
trait("Test/ApiClient");

test("it should return a JWT Token when successfully authenticate", async ({
  assert,
  client
}) => {
  const password = "123456";
  const newUser = await Factory.model("App/Models/User").create({ password });
  const { id, email } = newUser;

  const response = await client
    .post("/api/v1/login")
    .send({ email, password })
    .end();
  const { token, refreshToken, user } = response.body;

  response.assertStatus(200);
  assert.equal(user.id, id);
  assert.isString(token);
  assert.isString(refreshToken);
});

test("it should fail authentication when wrong credentials informed", async ({
  assert,
  client
}) => {
  const password = "wrong-password";
  const newUser = await Factory.model("App/Models/User").create();
  const { email } = newUser;

  const response = await client
    .post("/api/v1/login")
    .send({ email, password })
    .end();
  const { token, refreshToken, user } = response.body;

  response.assertStatus(401);
  assert.isUndefined(user);
  assert.isUndefined(token);
  assert.isUndefined(refreshToken);
});

test("it should fail authentication if no email is informed", async ({
  assert,
  client
}) => {
  const password = "123456";
  await Factory.model("App/Models/User").create({ password });

  const response = await client
    .post("/api/v1/login")
    .header("accept", "application/json")
    .send({ password })
    .end();

  const { validation } = response.body.pop();

  response.assertStatus(400);
  assert.equal(validation, "required");
});

test("it should fail authentication if invalid email format is informed", async ({
  assert,
  client
}) => {
  const password = "123456";
  await Factory.model("App/Models/User").create({ password });

  const response = await client
    .post("/api/v1/login")
    .header("accept", "application/json")
    .send({ email: "johndoe", password })
    .end();

  const { validation } = response.body.pop();

  response.assertStatus(400);
  assert.equal(validation, "email");
});

test("it should fail authentication if no password is informed", async ({
  assert,
  client
}) => {
  const { email } = await Factory.model("App/Models/User").create();

  const response = await client
    .post("/api/v1/login")
    .header("accept", "application/json")
    .send({ email })
    .end();

  const { validation } = response.body.pop();

  response.assertStatus(400);
  assert.equal(validation, "required");
});
