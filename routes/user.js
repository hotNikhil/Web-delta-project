const express = require("express");
const router = express.Router();
const user = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

router.get("/signup", (req,res)=>{
    res.render("users/signup.ejs");
})

router.post("/signup", wrapAsync(async(req,res) => {
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
}));

router.get("/login" ,(req,res)=>{
    res.render("users/login.ejs");
})

router.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local",{
     failureRedirect: "/login" , 
     failureFlash: true
    }),
     async(req,res)=>{
        req.flash("success","Welcome back to WanderLust!");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
   
})

router.get("/logout", (req,res) =>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "you are logged out now!");
        res.redirect("/listings");
    })
})

module.exports = router;