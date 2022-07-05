var productSchema = require("../model/productSchema")
const categorySchema = require("../model/categorySchema");
const mongoose = require("mongoose")


exports.getAddProduct = async (req, res, next) => {
	try{
		const data = await categorySchema.find()
		res.render("home", {data:data,title:"Add Product",layout: false,isAuth: req.session.isLoggedIn})
	}catch(error){
		console.log(error,"<=====error")
		res.render("home")
	}
}

exports.addProduct = async (req,res,next) => {
	try{
		const data = await productSchema.findOne({productName: req.body.productName})
		if(data){
			return res.status(200).json({status:0, message:"product alredy listed", data:{}})
		}
		if(req.files == ""){
			return res.status(200).json({status : 0, message : "images must not be empty"})
		}
		var images = req.files;
		const pData = await productSchema.create({
			productName : req.body.productName,
			description : req.body.description,
			productCategory : req.body.productCategory,
			productImage : images
		})
	if(pData){
			return res.redirect('/')
		}
	}catch(error){
		console.log(error)
		return res.redirect("/addProduct")
	}
}

exports.productList = async (req,res,next) => {
	try{
		let data = await productSchema.aggregate([
			{
				"$lookup": {
					"localField" : "productCategory",
					"foreignField" : "_id",
					"from" : "categories",
					"as" : "cData"
				}
			},
			{
				"$unwind": {
					"path": "$cData",
					"preserveNullAndEmptyArrays": false
				}
			},
			{
				"$project":{
					"_id": "$_id",
					"productName": "$productName",
					"description":"$description",
					"productCategory":"$cData.categoryName",
					"productImage": "$productImage"
				}
			}

		
		
		])

		if(data){
			if(req.session.isLoggedIn == true){
		return res.render("productList", {title:"Product List",data:data, isAuth: req.session.isLoggedIn})

			}
		return res.render("productList", {title:"Product List",data:data})

		}
			return res.status(200).json({status:0, message:"please try again.....", data:{}})
	}
	catch(error){
		console.log(error)
	}
}

exports.getProductById = async (req,res,next) => {
	try{
		let data = await productSchema.aggregate([
			
			{
				"$match": {_id: mongoose.Types.ObjectId(req.params.id)}
			},
			{
				"$lookup": {
					"localField" : "productCategory",
					"foreignField" : "_id",
					"from" : "categories",
					"as" : "cData"
				}
			},
			{
				"$unwind": {
					"path": "$cData",
					"preserveNullAndEmptyArrays": false
				}
			},
			{
				"$project":{
					"_id": "$_id",
					"productName": "$productName",
					"description":"$description",
					"productCategory":"$cData.categoryName",
					"categoryId": "$cData._id",
					"productImage": "$productImage"
				}
			}
		])
		const cData = await categorySchema.find()
		if(data != ""){
			return res.render("updateProduct",{title:"Update Product",data:data,cData:cData, isAuth: req.session.isLoggedIn})
		}else{
			return res.status(200).json({status:0, message:"please try again", data:{}})
		}
	} catch(error) {
		console.log(error)
	}
}



exports.updateProduct = async (req,res,next) => {
	try{
		console.log(req.body,"<=========")
		if(req.files){
			images = req.files;
		}
		if(images != ""){
			let data = await productSchema.findOneAndUpdate({_id: req.body.productId, is_deleted:0},{
				productName : req.body.productName,
				description : req.body.description,
				productCategory : req.body.productCategory,
				productImage: images
			});
			if(data){
				return res.redirect('/')
			}
				return res.status(200).json({status:0, message:"please try again", data:{}})
		} 
					
		let data = await productSchema.findOneAndUpdate({_id:req.body.productId, is_deleted:0},{
			productName : req.body.productName,
			description : req.body.description,
			productCategory : req.body.productCategory,
		});
		
		if(data){
			return res.redirect('/')
		}
			return res.status(200).json({status:0, message:"please try again", data:{}})
		
	} catch(error){
		console.log(error)
	}
}

exports.deleteProduct = async (req,res,next) => {
	try{
		let data = await productSchema.findOneAndUpdate({_id: req.body.productId, is_deleted:0},{is_deleted:1})
		console.log(data)
		if(data != ""){
			return res.redirect("/")
		}else{
			return res.status(200).json({status:0, message:"please try again", data:{}})
		}
	} catch(error) {
		console.log(error)
	}
}