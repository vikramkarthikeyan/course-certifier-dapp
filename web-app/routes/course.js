var express = require('express');
var blockchain = require('../controllers/blockchain-wrapper');
var router = express.Router();

/* POST cs course listing. */
router.post('/cs', function (req, res, next) {
    blockchain.getAddCSCourseABI(req.body.personNumber, req.body.programCode, req.body.courseGPA, function(abi){
        blockchain.signTransaction(abi, function(status){
          res.sendStatus(status);
        });
    });
});

/* POST other course listing. */
router.post('/other', function (req, res, next) {
    blockchain.getAddNonCSCourseABI(req.body.personNumber, req.body.programCode, req.body.courseGPA, function(abi){
        blockchain.signTransaction(abi, function(status){
          res.sendStatus(status);
        });
    });
});

module.exports = router;
