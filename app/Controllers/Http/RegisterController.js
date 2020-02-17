"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

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
   * @apiSuccess (201 Created) {Integer} id id of the user
   * @apiSuccess (201 Created) {String} email email address of the user
   * @apiSuccess (201 Created) {String} avatar user's gravatar
   * @apiSuccess (201 Created) {Timestamp} created_at date when the user was created
   * @apiSuccess (201 Created) {Timestamp} upated_at last time the user was updated
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only(["name", "email", "password"]);
    const avatar = gravatar.url(data.email, { s: "200", r: "pg", d: "mm" });
    const user = await User.create({ ...data, avatar });
    return response.status(201).json(user);
  }
}

module.exports = RegisterController;
