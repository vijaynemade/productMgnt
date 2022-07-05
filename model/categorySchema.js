const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
categoryName : {type: String, default : ""},
is_deleted :   {type: Number, default: 0 }
},{
    timestamps : true
})

module.exports = mongoose.model("Category", categorySchema)