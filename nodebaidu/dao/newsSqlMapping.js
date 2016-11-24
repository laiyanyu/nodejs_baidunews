// dao/userSqlMapping.js
// CRUD SQL语句
console.log('======');
var news = {
    insert:'INSERT INTO newsdata(newstitle, newstype, newsimg, addtime, newssrc) VALUES(?,?,?,?,?)',
    update:'update newsdata set newstitle=?, newstype=?, newsimg=?, addtime=?, newssrc=? where id=?',
    delete: 'delete from newsdata where id=?',
    queryById: 'select * from newsdata where id=?',
    queryBytype: 'select * from newsdata where newstype=? order by addtime desc',
    queryRepeatTitle: 'select * from newsdata where newstitle=?',
    queryAll: 'select * from newsdata order by addtime desc'
};

module.exports = news;