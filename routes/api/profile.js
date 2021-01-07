const express = require("express");
const router = express.Router();

// Route :          "api/profile"
// Description :    "Get request for profile endpoints"
// Access :         "Private"

router.get("/",(req,res)=>{
    res.send("Profile Route");
});

module.exports=router;