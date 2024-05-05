const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js")

const lisitngController = require("../controllers/listings.js");




// Index Route
router.get("/", wrapAsync(lisitngController.index));


 // New route
 router.get("/new", isLoggedIn, lisitngController.renderNewFrom);


 
 // Show Route
 router.get("/:id" , wrapAsync(lisitngController.showListings));



 // Create route
 router.post("/", isLoggedIn, validateListing,
wrapAsync(lisitngController.createListings));




// Edit Route
router.get("/:id/edit", isLoggedIn,isOwner, wrapAsync(lisitngController.renderEditForm));



// Update Route
router.put("/:id",
validateListing,
isLoggedIn,
isOwner,
wrapAsync(lisitngController.updateListing));



// Delete Route
router.delete("/:id",
isLoggedIn,
isOwner,
wrapAsync(lisitngController.destroyListing));

module.exports = router;