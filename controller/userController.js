const userSchema = require("../model/userSchema");
var bcrypt = require('bcryptjs');

exports.getSignUp = async (req, res) => {
    try{
        res.render("signUp",{title:"SignUp"})
    }catch(error){
        console.log(error)
        return res.render("signUp")
    }
}

exports.getLogin = async (req, res) => {
    try{
        res.render("login",{title:"Login"})
    }catch(error){
        console.log(error)
        return res.render("login")
    }
}

exports.signUp = async (req,res,next)=>{
    try {
    let data = await userSchema.findOne({email:req.body.email})
    if(data){
		return res.status(200).json({status:0, message:"This email is already associated", data:{}})
    } else{
        let pass = await bcrypt.hashSync(req.body.password, 10);
        let uData = await userSchema.create({
            name : req.body.name,
            contactNumber : req.body.contactNumber,
            email  : req.body.email,
            password : pass
        })
    if(uData){
            return res.redirect("/users/getLogin")
        } else{
            return res.status(200).json({status:0, message:"please try again", data:{}})
        }
    }
    } catch(error){
        console.log(error)
    }
}

exports.login = async(req,res,next) => {
    try {
        let data = await userSchema.findOne({email : req.body.email});
        if(data){
         bcrypt.compare(req.body.password, data.password, async function(err, result){
            if(result == true){
                req.session.isLoggedIn = true;
                req.session.user = data;
                return req.session.save(err =>{
                    console.log(req.session, "session")
                    return res.redirect("/")
                })
                
            } else{
                return res.redirect("/users/getLogin")
            }
         })
      } else{
        return res.redirect("/users/getSignUp")
      }
    }catch(error){
        console.log(error)
    }
}

exports.logOut = async (req, res) => {
    req.session.destroy();
    res.redirect('/');
}