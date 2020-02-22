"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Jwt')} Jwt */

/** @type {import('@adonisjs/lucid/src/Lucid/Model')} */
const Profile = use("App/Models/Profile");

/** @type {import('@adonisjs/lucid/src/Lucid/Model')} */
const Experience = use("App/Models/Experience");

class ExperienceController {
  /**
   * Create or update current logged in user's experience,
   * but the experience is infact atteched to a profile
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async store({ auth, request }) {
    const data = request.only([
      "title",
      "company",
      "location",
      "description",
      "from",
      "to",
      "current"
    ]);

    const user = await auth.getUser();
    const profile = await Profile.findByOrFail("user_id", user.id);
    let experience = await Experience.findBy("profile_id", user.id);

    if (experience) {
      experience.merge(data);
      await experience.save();
    } else {
      experience = await Experience.create({
        ...data,
        profile_id: profile.id
      });
    }

    return experience;
  }

  /**
   * Delete current logged in profile's experience
   *
   * @param {object} ctx
   * @param {Jwt} ctx.auth
   */
  async destroy({ auth }) {
    const user = await auth.getUser();
    const profile = await Profile.findByOrFail("user_id", user.id);
    const experience = await Experience.findByOrFail("profile_id", profile.id);
    await experience.delete();
  }
}

module.exports = ExperienceController;
