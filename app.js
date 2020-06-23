var express = require("express"),
    service = require("./services/service"),
    exphbs  = require('express-handlebars'),
    bodyParser = require('body-parser'),
    User = require('./models/user').User;


var app = express();

//middleware

//Add static content
app.use("public",express.static('public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

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
    res.render('login');
});

app.get("/login",function(req,res){
   User.find({email:req.body.email},function(err, doc){
       if (err) res.send("Not Authorized");
       else {
           console.log(doc);
           res.send("Login Successfull");
       }
   });
});

app.get("/registro",function(req,res){
    res.render('registro');
});

app.post("/registro",function(req,res){
    console.log(req.body.email);
    console.log(req.body.password);
    var user = new User({email:req.body.email, password: req.body.password});
    user.save(function(){
        res.send("Envio Recibido");
    });
})

app.listen(3030);

