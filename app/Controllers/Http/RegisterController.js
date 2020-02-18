"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Jwt')} Jwt */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use("App/Models/User");
const gravatar = require("gravatar");

class RegisterController {
  /**
   * Register a new user
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Jwt} ctx.auth
   */
  async store({ request, response, auth }) {
    const data = request.only(["name", "email", "password"]);
    const avatar = gravatar.url(data.email, { s: "200", r: "pg", d: "mm" });
    const user = await User.create({ ...data, avatar });
    const { token, refreshToken } = await auth
      .withRefreshToken()
      .generate(user);
    return response.status(201).json({ token, refreshToken, user });
  }
}

module.exports = RegisterController;
