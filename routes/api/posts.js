const express = require("express");
const router = express.Router();

// Route :          "api/posts"
// Description :    "Get request for posts endpoints"
// Access :         "Public"

router.get("/",(req,res)=>{
    res.send("Posts Route");
});

module.exports=router;