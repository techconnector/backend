"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/auth/src/Schemes/Jwt')} Jwt */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use("App/Models/User");

class LoginController {
  /**
   * log in the user
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Jwt} ctx.auth
   */
  async store({ request, auth }) {
    const { email, password } = request.only(["email", "password"]);

    const { token, refreshToken } = await auth
      .withRefreshToken()
      .attempt(email, password);

    const user = await User.findBy("email", email);

    return { token, refreshToken, user };
  }
}

module.exports = LoginController;
