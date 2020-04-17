"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Jwt')} Jwt */

class AuthController {
  /**
   * Get logged in user's information.
   *
   * @param {object} ctx
   * @param {Jwt} ctx.auth
   */
  async show({ auth }) {
    const user = await auth.getUser();

    return user;
  }
}

module.exports = AuthController;
