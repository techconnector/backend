"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/auth/src/Schemes/Jwt')} Jwt */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use("App/Models/User");

class LoginController {
  /**
   * @api {post} /login log in the user
   * @apiVersion 1.0.0
   * @apiGroup Authentication
   * @apiName login
   * @apiDescription give back a JWT token when sucessfully log in
   * @apiParam {String} email the user's email address
   * @apiParam {String} password the user's password
   * @apiSuccess (200 OK) {String} token The JWT (Json Web Token) authentication
   * @apiSuccess (200 OK) {String} refreshToken token to re-authenticate user when JWT token expires
   * @apiSuccess (200 OK) {Object} user The authenticated user
   * @apiSuccess (200 OK) {Integer} user.id id of the user
   * @apiSuccess (200 OK) {String} user.email email address of the user
   * @apiSuccess (200 OK) {String} user.avatar user's gravatar
   * @apiSuccess (200 OK) {Timestamp} user.created_at date when the user was created
   * @apiSuccess (200 OK) {Timestamp} user.upated_at last time the user was updated
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
