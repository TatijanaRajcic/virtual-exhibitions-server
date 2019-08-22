const express = require("express");
const router = express.Router();
var createError = require('http-errors')


/* LOG OUT */

router.get("/", (req, res, next) => {
  // debugger
  req.session.destroy();
  res.status(205).end();
  // debugger
});

module.exports = router;