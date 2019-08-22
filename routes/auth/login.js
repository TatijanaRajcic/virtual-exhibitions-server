const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");
var createError = require('http-errors')

/* LOGGING IN A USER */

router.post("/", (req, res, next) => {
  // debugger
  // STEP 3 OF LOGIN: PROCESS THE DATA SENT BY THE FRONT-END
  User.findOne({username: req.body.username})
  .then((user)=> {
    if(!user) next(createError(401), "Invalid credentials.");
    else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        // compareSync is a bcrypt function thats returns true if the "un-crypted" version 
        // of an existing password is the same as the one the user typed in the form
        // log the user in
        delete user.password;
        req.session.user = user;
        // debugger
        // with this line, we tell to req.session to create a property called "currentUser" that is equal to the user given by our query
        res.status(200).json(user);
      } else {
        next(createError(401, "Invalid credentials."));
      }
    }
  })
  .catch((error)=> {
    // debugger
    next(createError(500));
  })
});

module.exports = router;

