"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.group(() => {
  Route.post("/register", "RegisterController.store").validator(["Register"]);
  Route.post("/login", "LoginController.store").validator(["Login"]);
}).prefix("api/v1");
