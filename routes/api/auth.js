const express = require("express");
const router = express.Router();
const middleWare = require("../../middleware/auth");
const userModel = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { body, validationResult } = require("express-validator");

/*******************************************************
   Route :          "api/auth"
   Description :    "Authentication"
   Access :         "Private"
*******************************************************/

router.get("/", middleWare, (req, res) => {
  userModel.findById(req.user.id, (err, data) => {
    if (!err) {
      //let displayData = data.select("-password");
      res.json(data);
    }
  });
});



module.exports = router;
