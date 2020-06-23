var express = require("express"),
    service = require("./services/service.js"),
    exphbs  = require('express-handlebars'),
    bodyParser = require('body-parser');

var app = express();

//middleware
app.use("public",express.static('public'));

//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Set Path for views
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get("/api",function(req,res){
    res.send(service.saludo());
})

app.get("/",function(req,res){
    res.render('home');
});

app.post("/contacto",function(req,res){
    res.send("Envio Completado");
})

app.listen(3030);

