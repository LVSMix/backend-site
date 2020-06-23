var express = require("express"),
    service = require("./services/service.js"),
    exphbs  = require('express-handlebars');

var app = express();

// Set Path for views
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get("/api",function(req,res){
    res.send(service.saludo());
})

app.get("/",function(req,res){
    res.render('home');
});

app.listen(3030);

