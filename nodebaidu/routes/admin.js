var express = require('express');
var router = express.Router();
var newsDao = require('../dao/newsDao');


router.get('/', function(req, res, next) {

  res.render('admin.ejs', { title: '百度新闻后台管理系统' });
});


//获取新闻列表
router.get('/getnews', function(req, res, next) {
    newsDao.queryAll(req, res, next);
});


//点击编辑按钮确认提交
router.post('/update', function(req, res, next) {
	newsDao.update(req, res, next); 	
});


//编辑操作
router.get('/edit', function(req, res, next) {   
    newsDao.queryById(req, res, next);
});


//删除操作
router.post('/delete', function(req, res, next) {
	newsDao.delete(req, res, next);
});


//提交按钮
router.post('/insert', function(req, res, next) {	
	newsDao.add(req, res, next);
});

module.exports = router;
