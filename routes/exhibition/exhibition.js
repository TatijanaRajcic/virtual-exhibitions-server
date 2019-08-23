const express = require("express")
const router = express.Router()
const Exhibitions = require("../../models/Exhibition")
const Images = require("../../models/Image")
const Users = require("../../models/User")
var uploader = require("../../config/cloudinary-setup")


// 1) CREATE EXHIBITION WITH BACKGROUND IMAGE

router.post('/create', function(req,res,next){

  let background_image = req.body.background_image // We are retrieving the first data on the exhibition: its background (with req.body) and the user that created it (with req.session)
  let creator = req.session.user._id

  // STEP 2 : WITH THE DATA SENT FROM THE FRONT-END, WE CREATE AN INSTANCE OF EXHIBITION ON THE BACKEND
  Exhibitions.create({creator, background_image})
    .then((exhibition)=>{
      req.session.current_exhibition = exhibition._id; // We store the ID of the exhibition we just created in req.session so that we can work on it after
      res.send("Exhibition created") // I need to send something to the front-end even if I don't need any information and just want to redirect 
    })
    .catch((err)=>{
      res.send(err)
    })
}) 

// 2) UPDATE EXHIBITION WITH MUSEUM IMAGES

router.put('/museum-images', function(req,res,next){

  let museumImages = req.body.museum_images

  let completeMuseumImages = function(museumImages){
    museumImages.map((museumImage) => {
      return (
        museumImage.exhibition = req.session.current_exhibition
      )
    })
    return museumImages
  }

  let completedMuseumImages = completeMuseumImages(museumImages)
  
  Images.insertMany(completedMuseumImages)
    .then((images)=>{
      Exhibitions.findByIdAndUpdate(req.session.current_exhibition, {$push: { images: images }}, {new: true})
        .then(()=>{
          res.send("Museum images added") // I need to send something to the front-end even if I don't need any information and just want to redirect 
        })
        .catch((err)=>{
          res.send(err)
        })
    })

}) 

// 3) UPDATE EXHIBITION WITH PERSONAL IMAGES

router.put('/user-images', uploader.array("file"), function(req,res,next){

  let userImages = []

  if (req.files.length === 1) {
    userImages.push({
      imgName: req.body.filename, 
      imgDescription: req.body.filedescription, 
      imgPath: req.files[0].secure_url,
      exhibition: req.session.current_exhibition
    })
  } else {
    for(var x = 0; x<req.files.length; x++) {
      userImages.push({
        imgName: req.body.filename[x], 
        imgDescription: req.body.filedescription[x], 
        imgPath: req.files[x].secure_url,
        exhibition: req.session.current_exhibition
      })
    }
  }

  Images.insertMany(userImages)
    .then((images)=>{
      Exhibitions.findByIdAndUpdate(req.session.current_exhibition, {$push: { images: images }}, {new: true})
        .then((exhibition)=>{
          res.status(200).json(exhibition)// I need to send something to the front-end even if I don't need any information and just want to redirect 
        })
        .catch((err)=>{
          res.send(err)
        })
    })
  
}) 

// 4) SHOW UPDATE PAGE FOR UPDATING DESCRIPTION, NAME AND POSITION

router.get('/finalize/:id', function(req,res,next){
  Exhibitions.findById(req.params.id)
    .populate("images")
    .then((exhibition)=>{
      res.status(200).json(exhibition)
    })
    .catch((err)=>{
      res.send(err)
    })
}) 

// 5) DELETE IMAGES ON FINALIZE PAGE

router.get("/delete-image/:id", function(req,res) {
  debugger
  let exhibitionId = req.session.current_exhibition;
  let imageId = req.params.id;
  debugger
  Exhibitions.findById(exhibitionId)
    .then((exhibition)=>{
      debugger
      exhibition.images.remove(imageId);
      exhibition.save();
    })
    .then((result)=>{
      Images.findByIdAndRemove(imageId)
      .then(()=>{
        debugger
        res.send("Image deleted")
      })
    })
})


// 6) UPDATING DESCRIPTION AND NAME

router.put('/finalize', function(req,res,next){
  let description = req.body.description
  let name = req.body.name
  Exhibitions.findByIdAndUpdate(req.session.current_exhibition, {description, name})
    .then((exhibition)=>{
      res.status(200).json(exhibition)
      delete req.session.current_exhibition
    })
    .catch((err)=>{
      res.send(err)
    })
}) 


// 7) SHOW PAGE OF EXHIBITION

router.get('/show/:id', function(req,res,next){

  Exhibitions.findById(req.params.id)
    .populate("images")
    .then((exhibition)=>{
      res.status(200).json(exhibition)
    })
    .catch((err)=>{
      res.send(err)
    })
}) 


// 8) DELETE EXHIBITION ON PROFILE PAGE

router.get("/delete-exhibition/:id", function(req,res) {
  debugger
  let exhibitionId = req.params.id;
  Exhibitions.findByIdAndRemove(exhibitionId)
    .then(()=>{
      debugger
      res.send("Exhibition deleted")
    })
    .catch((err)=>{
      res.send(err)
    })
})


// 8) ADD TO FAVORITE

router.put('/add-favorite', function(req,res,next){
  let newFavorite = req.body.id
  Exhibitions.findById(newFavorite)
    .then((exhibition)=>{
      Users.findByIdAndUpdate(req.session.user._id, {$push: { favorites: exhibition }}, {new: true})
        .then(()=>{
          res.send("Favorite added")
        })
        .catch((err)=>{
          res.send(err)
        })
    })

}) 

// STIL IN PROGRESS!!!!!!!!!!!!!!!!!

// Faire en sorte que la profile page d'un user soit accessible pr les autres personnes
// Route for user's profile page (with his one exhibitions)

router.get('/own-exhibitions', function(req,res,next){
  Exhibitions.find({creator:req.session.user._id})
    .populate("images")
    .populate("creator")
    .then((exhibitions)=>{
      res.status(200).json(exhibitions)
    })
    .catch((err)=>{
      res.send(err)
    })
}) 

// Route for user's favorites

router.get('/own-favorites', function(req,res,next){
  Users.findById(req.session.user._id)
    .populate("favorites")
    .then((user)=>{
      debugger
      let favorites = user.favorites
      debugger
      Exhibitions.find({'_id': { $in: favorites }})
        .populate("creator")
        .populate("images")
        .then((favorites)=>{
          debugger
          res.status(200).json(favorites)
        })
        .catch((err)=>{
          res.send(err)
        })
    })
    .catch((err)=>{
      res.send(err)
    })
}) 


// REORDER SOMEWHERE ELSE THAN IN EXHIBITION.JS: IMAGE.JS

// UPDATING IMAGES POSITIONS

router.put('/position', function(req,res,next){
  Images.findByIdAndUpdate(req.body.imageId, {imageX: req.body.position.x, imageY: req.body.position.y})
    .then((image)=>{
      res.status(200).json(image)
    })
    .catch((err)=>{
      res.send(err)
    })
}) 

// GETTING IMAGES POSITIONS

router.get('/position/:id', function(req,res,next){
  Images.findById(req.params.id)
    .then((image)=>{
      res.status(200).json(image)
    })
    .catch((err)=>{
      res.send(err)
    })
}) 


module.exports = router