//var timeTool = require('../../timeTool/timeTool');

$(document).ready(function(){
	getLists(0);
	$('nav a').click(function(e){
		e.preventDefault();
		var type=$(this).attr("data-type");
		getLists(type);
	})
})


getLists=function(type){
	var lists=$('article ul');
	lists.empty();
	$.ajax({
		url:'/news',//路径肯定要进行更改的
		type:'get',
		datatype:'json',
		data:{newstype:type},
		success:function(data){
			console.log(data);
			data.forEach(function(item,index,array){
				var times=makeDate(filterXSS(item.addtime));
				var list=$('<li></li>').addClass('news-list').prependTo(lists);
				var newsimg=$('<div></div>').addClass('newsimg').appendTo(list);
				var img=$('<img>').attr('src',filterXSS(item.newsimg)).appendTo(newsimg);
				var newscontent=$('<div></div>').addClass('newscontent').appendTo(list);
				var h1=$('<h1></h1>').html(filterXSS(item.newstitle)).appendTo(newscontent);
				var p=$('<p></p>').appendTo(newscontent);
				var newstime=$('<span></span>').addClass('newstime').html(times).appendTo(p);
				var newssrc=$('<span></span>').addClass('newsscr').html(filterXSS(item.newssrc)).appendTo(p);
			})
		}
	});
}

