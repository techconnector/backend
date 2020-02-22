"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Jwt')} Jwt */

/** @type {import('@adonisjs/lucid/src/Lucid/Model')} */
const Profile = use("App/Models/Profile");

/** @type {import('@adonisjs/lucid/src/Lucid/Model')} */
const Education = use("App/Models/Education");

class EducationController {
  /**
   * Create or update current logged in user's education,
   * but the education is infact atteched to a profile
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async store({ auth, request }) {
    const data = request.only([
      "school",
      "degree",
      "field_of_study",
      "description",
      "from",
      "to",
      "current"
    ]);

    const user = await auth.getUser();
    const profile = await Profile.findByOrFail("user_id", user.id);
    let education = await Education.findBy("profile_id", user.id);

    if (education) {
      education.merge(data);
      await education.save();
    } else {
      education = await Education.create({
        ...data,
        profile_id: profile.id
      });
    }

    return education;
  }

  /**
   * Delete current logged in profile's education
   *
   * @param {object} ctx
   * @param {Jwt} ctx.auth
   */
  async destroy({ auth }) {
    const user = await auth.getUser();
    const profile = await Profile.findByOrFail("user_id", user.id);
    const education = await Education.findByOrFail("profile_id", profile.id);
    await education.delete();
  }
}

module.exports = EducationController;
