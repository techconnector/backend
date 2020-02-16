"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use("App/Models/User");

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

const { test, trait } = use("Test/Suite")("FUNCTIONAL: Register");

trait("DatabaseTransactions");
trait("Test/ApiClient");

test("it should be able to register a user", async ({ assert, client }) => {
  const response = await client
    .post("/api/v1/register")
    .send({
      name: "John Doe",
      email: "johndoe@techconnector.com",
      password: "123456"
    })
    .end();

  const { name, email } = response.body;
  const user = await User.first();

  response.assertStatus(201);
  assert.equal(name, "John Doe");
  assert.equal(email, "johndoe@techconnector.com");
  assert.equal(user.name, name);
  assert.equal(user.email, email);
});

test("it should not be able to register a user without name", async ({
  assert,
  client
}) => {
  const response = await client
    .post("/api/v1/register")
    .header("accept", "application/json")
    .send({
      email: "johndoe@techconnector.com",
      password: "123456"
    })
    .end();

  const { validation } = response.body.pop();
  const user = await User.first();

  response.assertStatus(400);
  assert.isNull(user);
  assert.equal(validation, "required");
});

test("it should not be able to register a user without email", async ({
  assert,
  client
}) => {
  const response = await client
    .post("/api/v1/register")
    .header("accept", "application/json")
    .send({
      name: "John Doe",
      password: "123456"
    })
    .end();

  const { validation } = response.body.pop();
  const user = await User.first();

  response.assertStatus(400);
  assert.isNull(user);
  assert.equal(validation, "required");
});

test("it should not be able to register a user with invalid email", async ({
  assert,
  client
}) => {
  const response = await client
    .post("/api/v1/register")
    .header("accept", "application/json")
    .send({
      name: "John Doe",
      email: "johndoe",
      password: "123456"
    })
    .end();

  const { validation } = response.body.pop();
  const user = await User.first();

  response.assertStatus(400);
  assert.isNull(user);
  assert.equal(validation, "email");
});

test("it should not be able to register the same email more then one time", async ({
  assert,
  client
}) => {
  const password = "123456";
  const user = await Factory.model("App/Models/User").create({ password });
  const response = await client
    .post("/api/v1/register")
    .header("accept", "application/json")
    .send({
      name: user.name,
      email: user.email,
      password
    })
    .end();

  const { validation } = response.body.pop();
  const count = await User.getCount();

  response.assertStatus(400);
  assert.equal(count, 1);
  assert.equal(validation, "unique");
});

test("it should not be able to register a user without a password", async ({
  assert,
  client
}) => {
  const response = await client
    .post("/api/v1/register")
    .header("accept", "application/json")
    .send({
      name: "John Doe",
      email: "johndoe@techconnector.com"
    })
    .end();

  const { validation } = response.body.pop();
  const user = await User.first();

  response.assertStatus(400);
  assert.isNull(user);
  assert.equal(validation, "required");
});
