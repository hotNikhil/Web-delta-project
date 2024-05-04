const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor }= require("../middleware.js");


// Review Route
// Post Review
router.post("/", isLoggedIn, validateReview, wrapAsync(async(req,res) =>{
    console.log(req.params.id);
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success" , "New Review created!")
    res.redirect(`/listings/${listing._id}`);
 }));
 
 // Delete Reveiw Route
 router.delete("/:reviewId", isLoggedIn,
 isReviewAuthor,
 wrapAsync(async(req,res) => {
     let{id,reviewId} = req.params;
     await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
     await Review.findByIdAndDelete(reviewId);
     req.flash("success" , "Review deleted!")
     res.redirect(`/listings/${id}`);
 
 }));

 module.exports = router;