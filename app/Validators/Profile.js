"use strict";

const BaseValidator = use("App/Validators/BaseValidator");

class Profile extends BaseValidator {
  get rules() {
    return {
      status: "required",
      skills: "required",
    };
  }
}

module.exports = Profile;
