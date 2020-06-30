var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/test");

var posibles_valores = ["M","F"];

var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Ingresa mail correcto"];

var user_schema = new Schema({
    name: String,
    username:String,
    password:String,
    age:{type:Number,min:[5,"La edad no puede ser menor que 5"],max:[100,"La edad no puede ser mayor que 5"]},
    email:{type:String,required: "El correo es obligatorio",match:email_match},
    date_of_bitrh:Date,
    sexo:{type:String,enum:{values:posibles_valores,message:"Opcion no valida"}}
});

var User = mongoose.model("User",user_schema);

user_schema.virtual("password_confirmation").get(function(){
    return pc;
}).set(function(password){
    this.pc = password;
})

module.exports.User = User;