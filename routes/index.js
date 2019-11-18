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
  const clusternum = req.query.clusternum;
  const tree_url = `http://10.10.10.60:8080/AITextRecommand/NodeCluster?clusternum=${clusternum}`
  res.render('../views/tree/tree.html', { 'tree_url': tree_url });
});

module.exports = router;
