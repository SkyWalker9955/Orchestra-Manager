// Test Require
//console.log('hello world from users.model');
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var mongooseUniqueValidator = require('mongoose-unique-validator');

var userSchema = new Schema({
    userType:    {type: String, required: true},                 //Admin, Orchestra Manager, Librarian, Member
    fName:       {type: String, required: true},
    lName:       {type: String, required: true},
    password:    {type: String, required: true},                 //Needs to be hashed later
    email:       {type: String, required: true, unique: true},
    userName:    {type: String, required: true, unique: true},

})

//Schema.plugin(mongooseUniqueValidator);

//bcrypt Methods

userSchema.static('generateHash', function(password){
    return bcrypt.hashSync(password, 9);
});

//userSchema.methods.validatePassword = function(password) {
//    bcrypt.compareSync(password, this.password);
//};
module.exports = mongoose.model('userSchema', userSchema);