const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { body, validationResult } = require("express-validator");
const axios = require("axios").default;

/*******************************************************
   Route :          "api/profile/me"
   Description :    "Get request for profile endpoints for the current user"
   Access :         "Private"
*******************************************************/

//Including mongoose model
const userModel = require("../../models/User");
const profileModel = require("../../models/Profile");
const Profile = require("../../models/Profile");

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await profileModel
      .findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"]);
    // populate() takes the 1st argument the field of our model in which we have to populate & 2nd argument are the fields that we choose to populate in our model

    if (!profile) {
      res.status(404).send("Profile of this user doesn't exists");
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
        education: "",
        experience: "",
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

/*******************************************************
   Route :          "api/profile"
   Description :    "GET all user profiles"
   Access :         "Public"
*******************************************************/

router.get("/", async (req, res) => {
  try {
    const profiles = await profileModel
      .find()
      .populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

/*******************************************************
   Route :          "api/profile/user/:user_id"
   Description :    "GET all user profiles"
   Access :         "Public"
*******************************************************/

router.get("/user/:userId", async (req, res) => {
  try {
    const profile = await profileModel
      .findOne({ user: req.params.userId })
      .populate("user", ["name", "avatar"]);
    if (!profile) {
      res.status(404).send("The profile doesn't exists");
    }
    res.json(profile);
  } catch (err) {
    if (err.kind == "ObjectId") {
      res.status(404).send("The profile doesn't exists");
    } else {
      res.status(500).send("Server Error");
    }
  }
});

/*******************************************************
   Route :          "api/profile/del/:user_id"
   Description :    "Delete your user profile"
   Access :         "Private"
*******************************************************/

router.delete("/del/:userId", auth, async (req, res) => {
  try {
    const target = await profileModel.findOne({ user: req.params.userId });
    if (!target) {
      res.status(404).send("The profile doesn't exists");
    } else {
      // Removing the profile of the user
      await profileModel.findOneAndDelete({ user: req.params.userId });
      // Removing the user
      await userModel.findByIdAndDelete(req.params.userId);

      res.send("The User along with its data is deleted");
    }
  } catch (err) {
    if (err.kind == "ObjectId") {
      res.status(404).send("The profile doesn't exists");
    } else {
      res.status(500).send("Server Error");
    }
  }
});

/*******************************************************
   Route :          "api/profile/experience"
   Description :    "Adds the profile experience "
   Access :         "Private"
*******************************************************/

router.put(
  "/experience",
  [
    auth,
    body("title", "Title is required").not().isEmpty(),
    body("company", "Company Name is required").not().isEmpty(),
    body("from", "Starting date is required").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      let profile = await profileModel.findOne({ user: req.user.id });
      await profile.experience.push(req.body);
      await profile.save();
      res.send("Experience Added");
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

/*******************************************************
   Route :          "api/profile/experience/del/experienceId"
   Description :    "Delets the profile experience "
   Access :         "Private"
*******************************************************/

router.delete("/experience/del/:experienceId", auth, async (req, res) => {
  try {
    let profile = await profileModel.findOne({ user: req.user.id });
    let removeIndex = profile.experience
      .map((ele) => ele.id)
      .indexOf(req.params.experienceId); // Sends the index that matches with the given experience id
    profile.experience.splice(removeIndex, 1); // Deletes an element from an array
    await profile.save();
    res.send("Experience deleted");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

/*******************************************************
   Route :          "api/profile/edu"
   Description :    "Adds the educational details "
   Access :         "Private"
*******************************************************/

router.put(
  "/edu",
  [
    auth,
    body("school", "School name is required").not().isEmpty(),
    body("degree", "Degree is required").not().isEmpty(),
    body("from", "Starting date is required").not().isEmpty(),
    body("fieldOfStudy", "Enter the field of study").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      let profile = await profileModel.findOne({ user: req.user.id });
      await profile.education.push(req.body);
      await profile.save();
      res.send("Education details Added");
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

/*******************************************************
   Route :          "api/profile/edu/del/eduId"
   Description :    "Delets the educational details "
   Access :         "Private"
*******************************************************/

router.delete("/edu/del/:eduId", auth, async (req, res) => {
  try {
    let profile = await profileModel.findOne({ user: req.user.id });
    let removeIndex = profile.education
      .map((ele) => ele.id)
      .indexOf(req.params.eduId); // Sends the index that matches with the given education id
    profile.education.splice(removeIndex, 1); // Deletes an element from an array
    await profile.save();
    res.send("Education details deleted");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

/*******************************************************
   Route :          "api/profile/gitRepo/:userName"
   Description :    "Gets all the repositories of a user"
   Access :         "Public"
*******************************************************/

router.get("/gitRepo/:userName", function (req, res) {
  const url = "https://api.github.com/users/" + req.params.userName + "/repos";

  axios
    .get(url)
    .then(function (response) {
      if (response.status == 200) {
        let Data = response.data.map((ele) => ({
          name: ele.name,
          description: ele.description,
          language: ele.language,
          forks: ele.forks,
        }));
        res.send(Data);
        //res.json(JSON.parse(response.data));
      } else {
        res.status(404).send("Data not found");
      }
    })

    .catch(function (error) {
      console.log(error.message);
      res.send(error.message);
    });
});

module.exports = router;
