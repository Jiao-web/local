var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/community', (req, res, next) => {
  res.render('../views/graph/graph.html');
});

router.get('/tree', (req, res, next) => {
  res.render('../views/tree/tree.html');
});

module.exports = router;
