"use strict";

const BaseValidator = use("App/Validators/BaseValidator");

class Profile extends BaseValidator {
  get rules() {
    return {
      status: "required",
      skills: "required",
      github_username: "max:30",
    };
  }
}

module.exports = Profile;
