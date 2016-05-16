/*global define, wx, GLOBAL, jsMvc, _czc*/
define('Common/wx', function(require) {
	var util = require('Common/util'),
		getScript = util.getScript,
		GetQueryString = util.GetQueryString;

	//异步获取weixin脚步
	getScript('http://res.wx.qq.com/open/js/jweixin-1.0.0.js', function() {
		wx.config({
			debug: false,
			appId: GLOBAL.shareConfig.appid,
			timestamp: GLOBAL.shareConfig.times,
			nonceStr: GLOBAL.shareConfig.ranStr, 
			signature: GLOBAL.shareConfig.sha,
			jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseWXPay'] 
		});

		wxShareFn();
	}, false);


	var wxShareFn = () => {
		if(window.navigator.userAgent.indexOf("MicroMessenger") == -1 || !wx)return;
		if(jsMvc.routeState.route =='review' && jsMvc.routeState.arg[0] == 'shareZft') {
			wx.hideOptionMenu();
		}

		var shareList = (function(route) {
			var list = {
				shareZft:{
					title: '我的一体化家装方案，朋友们快来给点意见！点个赞吧',
					desc: '360装房网，互联网一站式家装定制企业，装修从此变简单',
					link: GLOBAL.baseUrl+'shareZft/?scheme_id=' + GetQueryString('scheme_id')
				},
				zft:{
					title: '我的一体化家装方案，朋友们快来给点意见！点个赞',
					desc: '360装房网，互联网一站式家装定制企业，装修从此变简单', 
					link: GLOBAL.baseUrl+'shareZft/?scheme_id=' + GetQueryString('scheme_id')
				},
				togetherCity:{
					title: '加入360装房网城市合伙人计划，携手共拓万亿家装市场',
					desc: '【360装房网城市合伙人全国招募中】我们有大流量客户订单、成熟运营团队、专业化管理体系，全国版图扩张计划只等你加入！', 
					link: GLOBAL.baseUrl+jsMvc.routeState.route,
					imgUrl: GLOBAL.resUrl + 'images/wx_city.jpg'
				},
				springAct:{
					title: '749套餐最后召集令！', 
					desc: '749硬装套餐最后召集令！3月19-20日相约360装房网，家电豪礼疯狂送不停！'
				},
				luolaiOrder:{
					title: '罗莱生活 品质首选', 
					desc: '360装房网携手罗莱生活隆重推出罗莱全屋软装套餐，预约有礼！', 
					imgUrl: GLOBAL.resUrl + 'images/luolailogo.jpg'
				},
				luolaiIndex:{
					title: '360装房网携手罗莱生活 打造软硬装一体化服务', 
					desc: '全屋软装限时8.5折优惠，现在预约还有机会获得罗莱家纺四件套！快来享受软硬装一体化服务的极致体验吧!', 
					imgUrl: GLOBAL.resUrl + 'images/luolailogo.jpg'
				},
				luolaiChoice:{
					title: '360装房网携手罗莱生活 打造软硬装一体化服务', 
					desc: '全屋软装限时8.5折优惠，现在预约还有机会获得罗莱家纺四件套！快来享受软硬装一体化服务的极致体验吧!', 
					link: GLOBAL.baseUrl+'luolaiIndex',
					imgUrl: GLOBAL.resUrl + 'images/luolailogo.jpg'
				},
				luolaiGarden:{
					title: '360装房网携手罗莱生活 打造软硬装一体化服务', 
					desc: '全屋软装限时8.5折优惠，现在预约还有机会获得罗莱家纺四件套！快来享受软硬装一体化服务的极致体验吧!', 
					link: GLOBAL.baseUrl+'luolaiIndex',
					imgUrl: GLOBAL.resUrl + 'images/luolailogo.jpg'
				},
				luolaiSimple:{
					title: '360装房网携手罗莱生活 打造软硬装一体化服务', 
					desc: '全屋软装限时8.5折优惠，现在预约还有机会获得罗莱家纺四件套！快来享受软硬装一体化服务的极致体验吧!', 
					link: GLOBAL.baseUrl+'luolaiIndex',
					imgUrl: GLOBAL.resUrl + 'images/luolailogo.jpg'
				},
				cardInfo:{
					title: '360装房网服务评价表', 
					desc: '恭喜恭喜！您的房子已经装修完毕，可以入住啦！您对装房君的服务满意吗？期待您的评价呦...', 
					link: GLOBAL.baseUrl+'cardReview?cid=' + util.GetQueryString('cid')
				}
			};

			if(list[route]) {
				if(!list[route].link)list[route].link = GLOBAL.baseUrl+'/'+jsMvc.routeState.route;
				if(!list[route].imgUrl)list[route].imgUrl = GLOBAL.resUrl + 'images/wx2.jpg';

				return list[route];
			}else{
				return {
					title: '要装修？首选360装房网', 
					desc: '华南首家O2O互联网家装企业，一站式装修服务，让你享受拎包入住的快感！', 
					link: GLOBAL.baseUrl+'/'+jsMvc.routeState.route,
					imgUrl: GLOBAL.resUrl + 'images/wx2.jpg'
				};
			}
		})(jsMvc.routeState.route);

		wx.ready(function() {
			wx.onMenuShareTimeline({
				title: shareList.title, 
				link: shareList.link,
				imgUrl: shareList.imgUrl,
				success: function () { 
					if(_czc) {
						_czc.push(["_trackEvent", "weixin", "totimeline", location.pathname + location.search]);
					}
				}
			});

			wx.onMenuShareAppMessage({
				title: shareList.title, 
				link: shareList.link,
				imgUrl: shareList.imgUrl,
				desc: shareList.desc,
				success:function () { 
					if(_czc) {
						_czc.push(["_trackEvent", "weixin", "tofriend", location.pathname + location.search]);
					}
				}
			});
		});

	};

	return wxShareFn;
});
