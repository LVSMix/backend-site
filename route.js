var express = require("express");

var router = express.Router();

router.get("/",function(req,res){
   res.render("dashboard/dashboard");
});

module.exports = router;