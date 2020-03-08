"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

// Public Routes
Route.group(() => {
  // Authentication & Registration
  Route.post("/register", "RegisterController.store").validator(["Register"]);
  Route.post("/login", "LoginController.store").validator(["Login"]);

  // Profile
  Route.get("/profiles", "ProfileController.index");
  Route.get("/profiles/:id([0-9]+)", "ProfileController.show");
}).prefix("api/v1");

// Private Routes
Route.group(() => {
  // Profile
  Route.get("/profiles/me", "ProfileController.me");
  Route.post("/profiles", "ProfileController.store");
  Route.delete("/profiles", "ProfileController.destroy");

  // Profile's Education
  Route.post("/profiles/education", "EducationController.store");
  Route.delete("/profiles/education", "EducationController.destroy");

  // Profile's Experience
  Route.post("/profiles/experience", "ExperienceController.store");
  Route.delete("/profiles/experience", "ExperienceController.destroy");
})
  .middleware("auth")
  .prefix("api/v1");
