"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.group(() => {
  Route.post("/register", "RegisterController.store").validator(["Register"]);
}).prefix("api/v1");
