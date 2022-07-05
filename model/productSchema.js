var mongoose = require("mongoose");
var productSchema = new mongoose.Schema({	
productName : {type: String, required : true},
description : {type : String},
productCategory : {type: mongoose.Types.ObjectId},
productImage : {type : Array},
is_deleted : { type : Number, default : 0}
},{
	timestamps : true
})

module.exports = mongoose.model("Product", productSchema)
