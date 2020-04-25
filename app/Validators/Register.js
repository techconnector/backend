"use strict";

const BaseValidator = use("App/Validators/BaseValidator");

class Register extends BaseValidator {
  get rules() {
    return {
      name: "required",
      email: "required|email|unique:users,email",
      password: "required",
    };
  }
}

module.exports = Register;
