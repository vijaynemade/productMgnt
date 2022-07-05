const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
	destination: function(req,file,cb){
		cb(null, path.resolve(__dirname, ".." , "public"))
	},
	filename : function(req,file,cb){
		let fileName = Date.now() + file.originalname
		req.body[file.fieldname] = fileName
		cb(null,fileName)
	}
})
const fileFilter = (req,file,cb) => {
	if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' ) {
		cb(null, true)
	} else if (file.mimetype === 'application/pdf') {
        cb(null, 'files')
    } else{
		cb(null,false)
	}
}

let panUpload = multer({
	storage : storage,
	fileFilter : fileFilter
})

module.exports = (name)=> {
	return (req,res,next) => {

	let multi = panUpload.array('productImage',10)
		multi(req,res,(err)=> {
			if(err){
				res.json({
					err
				})
			}else{
				next()
			}
		})
	}
}