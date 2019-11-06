var express = require('express');
var router = express.Router();

/* POST cs course listing. */
router.post('/cs', function (req, res, next) {
    res.sendStatus(200);
});

/* POST other course listing. */
router.post('/other', function (req, res, next) {
    res.sendStatus(200);
});

module.exports = router;
