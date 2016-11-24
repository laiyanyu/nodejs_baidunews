// dao/newsDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./newsSqlMapping');

// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code:'1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

module.exports = {
    add: function (req, res, next) {
        var param = req.body;
        var newstime=getTime();
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryRepeatTitle, param.newtitle, function(err,rows, result) {
                if(rows.length>=1)
                {
                    res.json({msg:'已存在此新闻标题'});
                }
                else{
                    connection.query($sql.insert, [htmlEncode(param.newtitle), htmlEncode(param.newstype), htmlEncode(param.newsimg),newstime,htmlEncode(param.newssrc)], function(err,rows,result) {
                        if(!err)
                        {
                            res.json(rows.changedRows); 
                            //res.json(result.insertId);
                        }                       
                    });
                }
                connection.release();
            });
        });
    },
    delete: function (req, res, next) {
        // delete by Id
        pool.getConnection(function(err, connection) {
            var nwesid=req.body.nwesid;
            connection.query($sql.delete, nwesid, function(err, result) {
                if(result.affectedRows > 0) {
                    result = {
                        code: 200,
                        msg:'删除成功'
                    };
                } else {
                    result = void 0;
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    update: function (req, res, next) {        
        var param = req.body;
        var newstime=getTime();
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryRepeatTitle, param.newtitle, function(err,rows, result) {
                if(rows.length>=1)
                {
                    res.json({msg:'已存在此新闻标题'});
                }
                else{
                    connection.query($sql.update, [htmlEncode(param.newtitle),htmlEncode(param.newstype),htmlEncode(param.newsimg),newstime,htmlEncode(param.newssrc), +param.newid], function(err,rows, result) {
                        res.json(rows.changedRows);                        
                    });
                }
                connection.release();
            });
        });
    },
    queryById: function (req, res, next) {
        var id = +req.query.nwesid; 
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryById, id, function(err, result) {
                jsonWrite(res, result);
                connection.release();

            });
        });
    },
    queryByType: function (req, res, next) {       
        var type=req.query.newstype;
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryBytype, type, function(err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    queryAll: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryAll, function(err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    }
};

function p(s) {
    return s < 10 ? '0' + s: s;
}

function getTime(){
    var myDate = new Date();
    //获取当前年
    var year=myDate.getFullYear();
    //获取当前月
    var month=myDate.getMonth()+1;
    //获取当前日
    var date=myDate.getDate(); 
    var h=myDate.getHours();       //获取当前小时数(0-23)
    var m=myDate.getMinutes();     //获取当前分钟数(0-59)
    var s=myDate.getSeconds();
    var currentTime=year+'-'+p(month)+"-"+p(date)+" "+p(h)+':'+p(m)+":"+p(s);
    return currentTime;
}


//html字符转义过滤函数
function htmlEncode(str) {  
    return str.replace(/&/g,"&amp;").replace(/\"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/ /g,"&nbsp;");  
} 