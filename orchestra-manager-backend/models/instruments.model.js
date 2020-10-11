var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var mongooseUniqueValidator = require('mongoose-unique-validator');

var instrumentSchema = new Schema({
    name:    {type: String},        
    value:   {type: String},
})

//Schema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('instrumentSchema', instrumentSchema);
