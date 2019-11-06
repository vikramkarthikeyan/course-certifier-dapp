var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id/eligible', function(req, res, next) {
  var responseBody = {
    "pre-requisites" : true,
    "required": true,
    "gpa": true,
    "capstone": false,
    "domain": false
  }
  res.send(responseBody);
});

module.exports = router;
