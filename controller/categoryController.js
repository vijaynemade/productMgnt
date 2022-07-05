const categorySchema = require("../model/categorySchema");

exports.addCategory = async(req,res,next)=>{
    try{
        let data = await categorySchema.findOne({categoryName:req.body.categoryName})
        if(data){
			return res.status(200).json({status:0, message:"This category already associated", data:{}})
        }
        let cData = await categorySchema.create({
            categoryName: req.body.categoryName
        })
			return res.redirect("/getAddProduct")
    }catch(error){
        console.log(error)
    }
}

exports.getCategory = async (req,res,next)=>{
try{
    res.render("category", {title:"Add Category", layout:false,isAuth: req.session.isLoggedIn})
}catch(error){
    console.log(error)
    res.render("category")
}
}