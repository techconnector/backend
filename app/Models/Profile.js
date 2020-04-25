"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Skill = use("App/Models/Skill");

class Profile extends Model {
  static boot() {
    super.boot();

    this.addHook("beforeSave", (profileInstance) => {
      Profile.skills = profileInstance.$attributes.skills;
      delete profileInstance.$attributes.skills;
    });

    this.addHook("afterSave", Profile.addSkills);
  }

  static async addSkills(profileInstance) {
    if (Profile.skills || profileInstance.dirty.skills) {
      const skills = (Profile.skills || profileInstance.$attributes.skills)
        .split(",")
        .map((item) =>
          Skill.findOrCreate({ name: item.trim() }, { name: item.trim() })
        );

      const skillsIds = (await Promise.all(skills)).map((skill) => skill.id);

      await profileInstance.skills().attach(skillsIds);
    }
  }

  user() {
    return this.belongsTo("App/Models/User");
  }

  experiences() {
    return this.hasMany("App/Models/Experience");
  }

  educations() {
    return this.hasMany("App/Models/Education");
  }

  skills() {
    return this.belongsToMany("App/Models/Skill");
  }
}

module.exports = Profile;
