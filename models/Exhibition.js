const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const exhibitionSchema = new Schema({
  images: [{ 
    type : ObjectId, 
    ref: 'Image' 
  }],
  creator: {
    type: ObjectId, 
    ref: "User"
  },
  background_image: String,
  description: String,
  name: String
});

const Exhibition = mongoose.model("Exhibition", exhibitionSchema, "exhibitions");
// NAME OF MODEL / SCHEMA / COLLECTION

module.exports = Exhibition;