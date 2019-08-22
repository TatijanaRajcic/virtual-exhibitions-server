const express = require("express")
const router = express.Router()
const Exhibitions = require("../../models/Exhibition")
const Images = require("../../models/Image")

// SHOW ALL EXHIBITIONS

router.get('/', function(req,res,next){
  Exhibitions.find({})
    .populate("images")
    .populate("creator")
    .then((exhibitions)=>{
      res.status(200).json(exhibitions)
    })
    .catch((err)=>{
      res.send(err)
    })
}) 

module.exports = router