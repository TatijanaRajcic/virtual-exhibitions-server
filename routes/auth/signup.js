const express = require("express");
const router = express.Router();
const User = require("../../models/User");
// BCrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
var createError = require('http-errors')

/* SIGN UP PROCESS */

router.post("/", (req, res, next) => {
// debugger
  // STEP 3 OF SIGN-UP: PROCESS THE DATA SENT BY THE FRONT-END
  const {username, password, email} = req.body
  const salt     = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

// TO MODIFY: now we are passing the password into bcrypt before create the user. and bcrypt returns something even if the password is empty

  User.create({
    username: username,
    email: email,
    password: hashPass
  })
    .then((user)=> {
      req.session.user = user;
      res.status(200).json(user);
      // debugger
    })
    .catch((error)=> {
      // debugger
      if(error.name === "ValidationError") {
        next(createError(400, error.message))
      }
      else next(createError(500));
    })

})

module.exports = router;