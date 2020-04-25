"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Jwt')} Jwt */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Profile = use("App/Models/Profile");
const ResourceNotFound = use("App/Exceptions/ResourceNotFoundException");

/**
 * Resourceful controller for interacting with profiles
 */
class ProfileController {
  /**
   * Show a list of all profiles.
   * GET profiles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ request, response }) {
    const page = request.input("page") || 1;
    const profiles = await Profile.query()
      .with("user")
      .with("experiences")
      .with("educations")
      .paginate(page);

    return profiles;
  }

  /**
   * Create a new user's profile or update an existing one.
   * POST profiles
   *
   * @param {object} ctx
   * @param {Jwt} ctx.auth
   * @param {Request} ctx.request
   */
  async store({ auth, request }) {
    const data = request.only([
      "skills",
      "company",
      "location",
      "status",
      "bio",
      "github_username",
      "website",
      "youtube",
      "twitter",
      "facebook",
      "linkedin",
      "instagram",
    ]);

    const user = await auth.getUser();
    let profile = await Profile.findBy("user_id", user.id);

    if (profile) {
      profile.merge(data);
      await profile.save();
    } else {
      profile = await Profile.create({
        ...data,
        user_id: user.id,
      });
    }

    await profile.load("user");
    await profile.load("skills");

    return profile;
  }

  /**
   * Display a single profile.
   * GET profiles/:id
   *
   * @param {object} ctx
   */
  async show({ params }) {
    const { id } = params;
    const profile = await Profile.find(id);

    if (!profile) {
      throw new ResourceNotFound();
    }

    await profile.load("user");
    await profile.load("experiences");
    await profile.load("educations");

    return profile;
  }

  /**
   * Display a single profile, for the current logged in user.
   *
   * @param {object} ctx
   * @param {Jwt} ctx.auth
   */
  async me({ auth }) {
    const user = await auth.getUser();
    const profile = await Profile.findBy("user_id", user.id);

    if (!profile) {
      throw new ResourceNotFound();
    }

    await profile.load("user");
    await profile.load("experiences");
    await profile.load("educations");

    return profile;
  }

  /**
   * Delete a profile with id.
   * DELETE profiles/:id
   *
   * @param {object} ctx
   * @param {Jwt} ctx.auth
   */
  async destroy({ auth }) {
    const user = await auth.getUser();
    const profile = await Profile.findBy("user_id", user.id);

    if (profile) {
      await profile.delete();
    }

    await user.delete();
  }
}

module.exports = ProfileController;
