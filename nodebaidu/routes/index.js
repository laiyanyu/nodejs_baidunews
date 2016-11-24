var express = require('express');
var router = express.Router();
var newsDao = require('../dao/newsDao');


/* 前台获取数据的处理逻辑*/
router.get('/', function(req, res, next) {
  	res.render('index.ejs', { title: '百度新闻' });
});

router.get('/news', function(req, res, next) {
  	newsDao.queryByType(req, res, next);
});

module.exports = router;
