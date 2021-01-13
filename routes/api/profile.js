const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { body, validationResult } = require("express-validator");

/*******************************************************
   Route :          "api/profile/me"
   Description :    "Get request for profile endpoints for the current user"
   Access :         "Private"
*******************************************************/

//Including mongoose model
const userModel = require("../../models/User");
const profileModel = require("../../models/Profile");

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await profileModel
      .findOne({ user: req.user.id })
      .populate("User", ["name", "avatar"]);
    if (!profile) {
      res.status(400).send("Profile of this user doesn't exists");
    }
    res.send(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

/*******************************************************
   Route :          "api/profile"
   Description :    "Post request for creating the profile for the user"
   Access :         "Private"
*******************************************************/

router.post(
  "/",
  [
    auth,
    [
      body("status", "Enter your current status").not().isEmpty(),
      body("skills", "Enter your skills").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      let {
        company,
        website,
        location,
        bio,
        githubUsername,
        skills,
        status,
        experience,
        education,
        socialMedia,
      } = req.body;

      // Buding the Profile object
      let newProfile = {
        user: req.user.id,
        company: company,
        website: website,
        location: location,
        bio: bio,
        githubUsername: githubUsername,
        status: status,
      };

      //Updating skills
      let skillArry = skills.split(",").map((ele) => ele.trim());
      newProfile.skills = skillArry;

      // Updating social media info
      newProfile.socialMedia = {};
      if (socialMedia.twitter)
        newProfile.socialMedia.twitter = socialMedia.twitter;
      if (socialMedia.youtube)
        newProfile.socialMedia.youtube = socialMedia.youtube;
      if (socialMedia.linkedin)
        newProfile.socialMedia.linkedin = socialMedia.linkedin;
      if (socialMedia.instagram)
        newProfile.socialMedia.instagram = socialMedia.instagram;
      if (socialMedia.facebook)
        newProfile.socialMedia.facebook = socialMedia.facebook;

      //Updating Educational details
      newProfile.education = education;

      //Updating Work experience
      newProfile.experience = experience;

      try {
        let profile = await profileModel.findOne({ user: req.user.id });
        if (profile) {
          profile = await profileModel.findOneAndUpdate(
            { user: req.user.id },
            { $set: newProfile },
            { new: true }
          );
        } else {
          let NewProfile = new profileModel(newProfile);
          await NewProfile.save();
        }
        res.json(profile);
      } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
      }
    }
  }
);

module.exports = router;
