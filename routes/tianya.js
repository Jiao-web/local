var express = require('express');
var Tianya = require('../model/tianya');
var router = express.Router();
var fs = require('fs');

router.get('/page', function(req, res, next) {
  const filter = req.query;
  
  Tianya.page(filter, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

router.get('/profile', function(req, res, next) {
  const tianya_user_id = req.query.tianya_user_id;
  Tianya.profile(tianya_user_id, (error, results) => {
    if (error) throw error;
    // get community of tianya user
    if (results.length === 0) {
      res.send({msg: 'cannot find special tianya user!'});
    } else {
      const curUser = results[0];
      const _mock_profile = {
        id: curUser['user_id'],
        name: curUser['user'],
        follow_cnt: curUser['follow'],
        friend_cnt: curUser['fans'],
        article_cnt: curUser['article_cnt'],
        tianya_score: 2653,
        register_time: '2015-06-12 12:24:42',      
      }
      res.send({msg: 'ok', data: _mock_profile});
    }
  });
});

router.get('/community', function(req, res, next) {
  const tianya_user_id = req.query.tianya_user_id;
  Tianya.find(tianya_user_id, (error, results) => {
    if (error) throw error;
    if (results.length === 0) {
      res.send({msg: 'cannot find special community!'});
    } else {
      const community_file = './public/assets/graph/mock_graph.json'; //results[0];
      fs.readFile(community_file, (err, data) => {
        if (err) {
          return next(err);
        }
        res.send(JSON.parse(data));
      });
    }
  });
});

router.get('/recommend', function(req, res, next) {
  const tianya_user_id = req.query.tianya_user_id;
  Tianya.find(tianya_user_id, (error, results) => {
    if (error) throw error;
    // get recommend of tianya user
    _mock_recommend = [
      {
        name: '婆媳关系',
        value: 5 
      },
      {
        name: '国际关系',
        value: 3 
      },
      {
        name: '台海风云',
        value: 2 
      },
    ]
    res.send({msg: 'ok', data: _mock_recommend});
  });
});

module.exports = router;
