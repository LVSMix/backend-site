var express = require("express"),
    service = require("./services/service.js");

var app = express();

app.get("/",function(req,res){
    res.send(service.saludo());
});

app.listen(3030);

