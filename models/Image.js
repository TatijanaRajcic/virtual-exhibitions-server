const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const imageSchema = new Schema({
  imgName: String,
  exhibition: {
    type: ObjectId, 
    ref: "Exhibition" // NAME OF MODEL
  },
  imgPath: String,
  imgDescription: String,
  imageX: { 
    type: Number,
    required: false
  },
  imageY: {
    type: Number,
    required: false
  }
});

const Image = mongoose.model("Image", imageSchema, "images");
// NAME OF MODEL / SCHEMA / COLLECTION

module.exports = Image;