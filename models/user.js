var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/test");

var user_schema = new Schema({
    name: String,
    username:String,
    password:String,
    age:Number,
    email:String,
    date_of_bitrh:Date
});

var User = mongoose.model("User",user_schema);

user_schema.virtual("password_confirmation").get(function(){
    return pc;
}).set(function(password){
    this.pc = password;
})

module.exports.User = User;