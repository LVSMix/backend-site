var express = require("express"),
    service = require("./services/service"),
    exphbs  = require('express-handlebars'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    session_middleware = require('./middleware/session');
    router = require('./route'),

    User = require('./models/user').User;


var app = express();

//middleware

//Add static content
app.use("public",express.static('public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

//session
app.use(session({
    secret: "123erdsdfty2ub",
    resave: false,
    saveUninitialized: false
}));

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
    console.log(req.session.user_id);
    res.render('index');
});

app.get("/login",function(req,res){
    res.render("login");
});

app.post("/login",function(req,res){
   User.findOne({email:req.body.email,password:req.body.password},function(err,user){
    if (err || !user) res.send("Not Authorized");
    else {
        console.log(user);
        req.session.user_id = user._id;
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
    user.save().then(function(user){
        res.send("Guardamos el usuario exitosamente");
    },function(err){
        if (err){
            console.log(String(err));
        }
    });
})

app.use(session_middleware);
//router
app.use("/app",router);

app.listen(3030);

