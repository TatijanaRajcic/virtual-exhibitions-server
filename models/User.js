const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
var ValidationError = mongoose.Error.ValidationError;
const ObjectId = mongoose.Schema.Types.ObjectId;


const userSchema = new Schema({
  username: {
    type: String, 
    required: [true, "Please provide a username"],
    validate: {
      validator: function(username) {
        return this.model("User").findOne({username: username})
          .then((user)=> {
            if (user) throw new Error("An user with this name already exists.");
            else return;
          })
      },
      message: "An user with this name already exists."
    }
  },
  email: {
    type: String,
    required: [true, "Please provide an email address."],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill in a valid email address.'],
    validate: {
      validator: function(email) {
        return this.model("User").findOne({email: email})
          .then((user)=> {
            if (user) throw new Error("An user with this email address already exists.");
            else return;
          })
      },
      message: "An user with this email address already exists."
    }
  },
  password: {
    type: String,
    required: [true, "Please provide an password."]
  },
  favorites: [{ 
    type : ObjectId, 
    ref: 'Exhibition' 
  }],
})

const User = mongoose.model("User", userSchema, "users");
// NAME OF MODEL / SCHEMA / COLLECTION

module.exports = User;

