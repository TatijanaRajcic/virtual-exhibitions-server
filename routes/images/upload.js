const express = require("express");
const router = express.Router();
const Images = require("../../models/Image");
var uploader = require("../../config/cloudinary-setup")

router.post("/", uploader.single("imgContent"), (req,res, next)=> {
  // always look at what "req" (the request from the client) contains, and how we should use this information to create elements in our DB
  // in this case, the name of the image is coming from the form (req.body) and the link of the image from req.file as Multer/Cloudinary store the source path inside req.file
  Images.create({imgName: req.body.imgName, imgPath: req.file.secure_url})
    .then((image)=> {
      debugger
      res.status(200).json(image) // This "image" is the data I'm sending as a response on the "UploadImage.js" page, after my axios request
    })
    .catch((error)=> {
      next(createError(400, error.message))
    })
  })

module.exports = router;