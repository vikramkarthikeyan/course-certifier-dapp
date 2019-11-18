var express = require('express');
var blockchain = require('../controllers/blockchain-wrapper');
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
  blockchain.waitForEvents();
  blockchain.getCheckEligibility(req.params.id, function(abi){
    blockchain.signTransaction(abi, function(status){
      res.sendStatus(status);
    });
  });
});

module.exports = router;
