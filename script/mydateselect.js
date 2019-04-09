
$(function(){
	// 初始化
	initialize_fun();
})

var nowselect = 1;

function initialize_fun() {
	var day2 = new Date();
	day2.setTime(day2.getTime());
	var s2 = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
	var thisyear = day2.getFullYear();
	var thismonth = day2.getMonth()+1;
	// 填充页面上的年月日
	$('.year_sel').text(thisyear);
	if (thismonth < 10) {
		$('.month_sel').text('0'+thismonth);
	} else {
		$('.month_sel').text(thismonth);
	}
	$("input[name='day_sel']").val(day2.getDate());
	// 一个月有多少天
	var monthday = getDaysInMonth(thisyear,thismonth);
	// 获取某一天是星期几
	var oneday = thisyear+'-'+thismonth+'-'+'01';
	var thisweek = getWeekByDay(oneday);
	// 填充空白部分
	bankday(thisweek);
	// 填充本月的天数
	dayview(monthday);
}

function getDaysInMonth(year, month) {
	var date = new Date(year, month, 1);
	return new Date(date.getTime() - 864e5).getDate();
}

function getWeekByDay(dayValue){ //dayValue=“2014-01-01”
	var day = new Date(Date.parse(dayValue.replace(/-/g, '/'))); //将日期值格式化
	return day.getDay();  //返回星期几，数字
	// var today = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六"); //创建星期数组
	//return today[day.getDay()];  //返一个星期中的某一天，其中0为星期日
}

function bankday(num) {
	$('.cal_main').html('');
	for(var i=0; i<num; i++) {
		$('.cal_main').append('<li>&nbsp;</li>')
	}
}

function dayview(num) {
	for(var i=1; i<=num; i++) {
		$('.cal_main').append('<li>'+i+'</li>');
	}
}

$('body').on('click', '.cal_main li', function(event) {
	if ($(this).html() != '&nbsp;') {
		$('.cal_main li').css('background-color','#fff');
		$('.cal_main li').css('color','#000');
		$(this).css('background-color','#FFB61C');
		$(this).css('color','#fff');
		// 保存选择的数据
		if ($(this).text() < 10) {
			$("input[name='day_sel']").val('0'+$(this).text());
		} else {
			$("input[name='day_sel']").val($(this).text());
		}
	}
});

$('body').on('click', '.right_linetext', function(event) {
	// 获取当前选择的年月日
	var year_sel = $('.year_sel').text();
	var month_sel = $('.month_sel').text();
	var day_sel = $("input[name='day_sel']").val();
	// 验证是开始时间还是结束时间
	if (nowselect == 1) {
		$('.left_text').html(day_sel+'-'+month_sel+'-'+year_sel);
	} else {
		$('.right_text').html(day_sel+'-'+month_sel+'-'+year_sel);
		$('.shade_box').toggle('isshow');
		$('.date_maxbox').toggle('isshow');
	}
});

function next_month() {
	// 获取当前月份
	var month_sel = $('.month_sel').text();
	var year_sel = $('.year_sel').text();
	var new_month = parseInt(month_sel)+1;
	if (new_month > 12) {
		$('.month_sel').text('01');
		newsel_month = 01;
	} else {
		if (new_month < 10) {
			$('.month_sel').text('0'+new_month);
		} else {
			$('.month_sel').text(new_month);
		}
		newsel_month = new_month;
	}
	// 重新计算天数
	// 一个月有多少天
	var monthday = getDaysInMonth(year_sel, newsel_month);
	// 获取某一天是星期几
	var oneday = year_sel+'-'+newsel_month+'-'+'01';
	var thisweek = getWeekByDay(oneday);
	// 填充空白部分
	bankday(thisweek);
	// 填充本月的天数
	dayview(monthday);
	$('.cal_main').addClass('aui-border-b');
}

function prev_month() {
	// 获取当前月份
	var month_sel = $('.month_sel').text();
	var year_sel = $('.year_sel').text();
	var new_month = parseInt(month_sel)-1;
	if (new_month < 1) {
		$('.month_sel').text(12);
		newsel_month = 12;
	} else {
		if (new_month < 10) {
			$('.month_sel').text('0'+new_month);
		} else {
			$('.month_sel').text(new_month);
		}
		newsel_month = new_month;
	}
	// 重新计算天数
	// 一个月有多少天
	var monthday = getDaysInMonth(year_sel, newsel_month);
	// 获取某一天是星期几
	var oneday = year_sel+'-'+newsel_month+'-'+'01';
	var thisweek = getWeekByDay(oneday);
	// 填充空白部分
	bankday(thisweek);
	// 填充本月的天数
	dayview(monthday);
	$('.cal_main').addClass('aui-border-b');
}

function prev_year() {
	// 获取当前月份
	var year_sel = $('.year_sel').text();
	var month_sel = $('.month_sel').text();
	var new_year = parseInt(year_sel)-1;
	$('.year_sel').text(new_year);
	// 重新计算天数
	// 一个月有多少天
	var monthday = getDaysInMonth(new_year, month_sel);
	// 获取某一天是星期几
	var oneday = new_year+'-'+month_sel+'-'+'01';
	var thisweek = getWeekByDay(oneday);
	// 填充空白部分
	bankday(thisweek);
	// 填充本月的天数
	dayview(monthday);
	$('.cal_main').addClass('aui-border-b');
}

function next_year() {
	// 获取当前月份
	var year_sel = $('.year_sel').text();
	var month_sel = $('.month_sel').text();
	var new_year = parseInt(year_sel)+1;
	$('.year_sel').text(new_year);
	// 重新计算天数
	// 一个月有多少天
	var monthday = getDaysInMonth(new_year, month_sel);
	// 获取某一天是星期几
	var oneday = new_year+'-'+month_sel+'-'+'01';
	var thisweek = getWeekByDay(oneday);
	// 填充空白部分
	bankday(thisweek);
	// 填充本月的天数
	dayview(monthday);
	$('.cal_main').addClass('aui-border-b');
}

$('body').on('click', '.date_topbtn span', function(event) {
	$('.date_topbtn span').css('background-color','#fff');
	$('.date_topbtn span').css('color','#ffc107');
	$(this).css('background-color','#ffc107');
	$(this).css('color','#fff');
	if ($(this).hasClass('right_btn')) {
		$('.left_linetext').html('Please Set Finish Time');
		nowselect = 2;
	} else {
		$('.left_linetext').html('Please Set Start Time');
		nowselect = 1;
	}
});