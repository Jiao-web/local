var express = require('express');
var Tianya = require('../model/tianya');
var router = express.Router();

router.get('/page', function(req, res, next) {
  const filter = req.query;
  
  Tianya.page(filter, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

router.get('/profile', function(req, res, next) {
  const tianya_user_id = req.query.tianya_user_id;
  Tianya.find(tianya_user_id, (error, results) => {
    if (error) throw error;
    // get community of tianya user
    _mock_profile = {
      id: tianya_user_id,
      name: '可爱的小星星',
      follow_cnt: 145,
      friend_cnt: 15,
      article_cnt: 85,
      tianya_score: 2653,
      register_time: '2015-06-12 12:24:42',      
    }
    res.send({msg: 'ok', data: _mock_profile});
  });
});

router.get('/community', function(req, res, next) {
  const tianya_user_id = req.query.tianya_user_id;
  Tianya.find(tianya_user_id, (error, results) => {
    if (error) throw error;
    // get community of tianya user
    _mock_community = {
      node: [
        {
          id: 1,
          name: '大眼萌',
          article_cnt: 13
        },
        {
          id: 2,
          name: '小星星',
          article_cnt: 5
        },
        {
          id: 3,
          name: '哈拉拉',
          article_cnt: 26
        },
        {
          id: 4,
          name: '沃尔沃',
          article_cnt: 18
        },
        {
          id: 5,
          name: '威尔士',
          article_cnt: 2
        },
      ],
      link: [
        {
          start: 1,
          end: 3
        },
        {
          start: 1,
          end: 2
        },
        {
          start: 2,
          end: 4
        },
        {
          start: 2,
          end: 5
        },
        {
          start: 3,
          end: 5
        },
        {
          start: 4,
          end: 1
        },
        {
          start: 4,
          end: 2
        },
      ]
    };
    res.send({msg: 'ok', data: _mock_community});
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
