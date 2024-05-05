const user = require("../models/user");

module.exports.renderSignUpForm =  (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signUp = async(req,res) => {
    try{
        let{username,email,password} = req.body;
        const newuser = new user({email,username});
        const registereduser = await user.register(newuser,password);
        console.log(registereduser);
        req.login(registereduser,(err) =>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to WanderLust");
            res.redirect("/listings");
        })
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login =  async(req,res)=>{
    req.flash("success","Welcome back to WanderLust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout = (req,res) =>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "you are logged out now!");
        res.redirect("/listings");
    })
};