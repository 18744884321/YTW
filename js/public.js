//每个页面共用

//index首页
$(".subnav ul li").click(function() {
	setSubnavLeft($(this).index());
});

function setSubnavLeft(index) {
	var width = $(".subnav ul").width();
	var thisWidth = $(".subnav ul li").eq(index).width();
	var left = Math.abs($(".subnav ul li").offset().left);
	var thisLeft = $(".subnav ul li").eq(index).offset().left;
	var scrollLeft = left + thisLeft + thisWidth / 2 - width / 2;
	$(".subnav ul").animate({
		scrollLeft: scrollLeft
	}, 300);
}

//获取当前位置经纬度
var geolocation = new BMap.Geolocation();
geolocation.getCurrentPosition(function(r) {
	if(this.getStatus() == BMAP_STATUS_SUCCESS) {
		//					alert('您的位置：' + r.point.lng + ',' + r.point.lat);
		jingdu = r.point.lng;
		weidu = r.point.lat;
		//					getAjax(r.point.lng, r.point.lat);
	} else {
		alert('failed' + this.getStatus());
	}
}, {
	enableHighAccuracy: true
})
//md5/sha1加密
var md5 = md5("jingdu");
var sha1 = hex_sha1(md5 + "YTW" + "jingdu");

new Vue({
	el: "#app",
	data: {
		cat_list: [],
		top_ad_img_list: [],
		top_ad_img_list1: [],
		top_ad_img_list2: [],
		news_list: [],
		head_img: '',
		uri: '',
		shop_list: [],
		seckill_list: [],
		list: []
	},
	created: function() {
		var _self = this;
		$.post("http://www.yingtongwang.net/index.php/ytwapi/index/index", {
			"longitude": "jingdu",
			"latitude": "weidu",
			"area_id": "15",
			"key": sha1
		}, function(data) {
			var data1 = JSON.parse(data);
			console.log(data1);
			_self.cat_list = data1.data.cat_list;
			_self.top_ad_img_list = data1.data.top_ad_img_list[0].head_img;
			_self.top_ad_img_list1 = data1.data.top_ad_img_list[1].head_img;
			_self.top_ad_img_list2 = data1.data.top_ad_img_list[2].head_img;
			_self.news_list = data1.data.news_list;
			_self.head_img = data1.data.rob_ad_img.head_img;
			_self.uri = data1.data.rob_ad_img.uri;
			_self.seckill_list = data1.data.seckill_list;
			_self.shop_list = data1.data.shop_list;

			$.post("http://www.yingtongwang.net/index.php/ytwapi/index/getLikeProducts", {
				"longitude": "jingdu",
				"latitude": "weidu",
				"area_id": "15",
				"page": 1,
				"count": 6,
				"key": sha1
			}, function(res) {
				var data2 = JSON.parse(res);
				//						console.log(data2);
				_self.list = data2.data.list;
			});
		});

	}
})

//定位/百度地图API功能
var map = new BMap.Map("allmap");
var point = new BMap.Point(116.331398, 39.897445);
map.centerAndZoom(point, 12);

function myFun(result) {
	var cityName = result.name;
	map.setCenter(cityName);
//	alert("当前定位城市:" + cityName);
	$("#dingwei").text(cityName);
}
var myCity = new BMap.LocalCity();
myCity.get(myFun);

//		<!-- banner轮播 js开始-->
var active = 0,
	as = document.getElementById('pagenavi').getElementsByTagName('a');
for(var i = 0; i < as.length; i++) {
	(function() {
		var j = i;
		as[i].onclick = function() {
			t2.slide(j);
			return false;
		}
	})();
}

var t1 = new TouchScroll({
	id: 'wrapper',
	'width': 5,
	'opacity': 0.7,
	color: '#555',
	minLength: 20
});

var t2 = new TouchSlider({
	id: 'slider',
	speed: 600,
	timeout: 6000,
	before: function(index) {
		as[active].className = '';
		active = index;
		as[active].className = 'active';
	}
});