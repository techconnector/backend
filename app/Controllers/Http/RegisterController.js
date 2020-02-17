"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Jwt')} Jwt */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use("App/Models/User");
const gravatar = require("gravatar");

class RegisterController {
  /**
   * @api {post} /register register a new user
   * @apiVersion 1.0.0
   * @apiGroup Authentication
   * @apiName register
   * @apiDescription saves a new user into the database
   * @apiParam {String} name the user's name to be displayed
   * @apiParam {String} email the user's email address
   * @apiParam {String} password the user's password
   * @apiSuccess (201 Created) {String} token The JWT (Json Web Token) authentication
   * @apiSuccess (201 Created) {String} refreshToken token to re-authenticate user when JWT token expires
   * @apiSuccess (201 Created) {Object} user The new created user
   * @apiSuccess (201 Created) {Integer} user.id id of the user
   * @apiSuccess (201 Created) {String} user.email email address of the user
   * @apiSuccess (201 Created) {String} user.avatar user's gravatar
   * @apiSuccess (201 Created) {Timestamp} user.created_at date when the user was created
   * @apiSuccess (201 Created) {Timestamp} user.upated_at last time the user was updated
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
