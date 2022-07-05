const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
name : {type: String},
email : {type: String},
password : {type: String},
contactNumber : {type: Number},
is_deleted :   {type: Number, default: 0 }
},{
    timestamps : true
})

module.exports = mongoose.model("User", userSchema)