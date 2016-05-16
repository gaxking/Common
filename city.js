/*global define,  GLOBAL */
define('Common/city', function(require) {
	var util = require('Common/util'),
		ajaxRequest = util.ajaxRequest;

	function CityClass() {
		var cities = {}; 
		cities['台湾']=new Array('台北', '台南', '其他'); 
		cities['北京']=new Array('北京'); 
		cities['上海']=new Array('上海'); 
		cities['天津']=new Array('天津'); 
		cities['重庆']=new Array('重庆'); 
		cities['河北']=new Array('石家庄', '张家口', '承德', '秦皇岛', '唐山', '廊坊', '保定', '沧州', '衡水', '邢台', '邯郸'); 
		cities['山西']=new Array('太原', '大同', '朔州', '阳泉', '长治', '晋城', '忻州', '吕梁', '晋中', '临汾', '运城');
		cities['辽宁']=new Array('沈阳', '朝阳', '阜新', '铁岭', '抚顺', '本溪', '辽阳', '鞍山', '丹东', '大连', '营口', '盘锦', '锦州', '葫芦岛'); 
		cities['吉林']=new Array('长春', '白城', '松原', '吉林', '四平', '辽源', '通化', '白山', '延边'); 
		cities['黑龙江']=new Array('哈尔滨', '齐齐哈尔', '黑河', '大庆', '伊春', '鹤岗', '佳木斯', '双鸭山', '七台河', '鸡西', '牡丹江', '绥化', '大兴安'); 
		cities['江苏']=new Array('南京', '徐州', '连云港', '宿迁', '淮阴', '盐城', '扬州', '泰州', '南通', '镇江', '常州', '无锡', '苏州'); 
		cities['浙江']=new Array('杭州', '湖州', '嘉兴', '舟山', '宁波', '绍兴', '金华', '台州', '温州', '丽水'); 
		cities['安徽']=new Array('合肥', '宿州', '淮北', '阜阳', '蚌埠', '淮南', '滁州', '马鞍山', '芜湖', '铜陵', '安庆', '黄山', '六安', '巢湖', '池州', '宣城'); 
		cities['福建']=new Array('福州', '南平', '三明', '莆田', '泉州', '厦门', '漳州', '龙岩', '宁德'); 
		cities['江西']=new Array('南昌', '九江', '景德镇', '鹰潭', '新余', '萍乡', '赣州', '上饶', '抚州', '宜春', '吉安'); 
		cities['山东']=new Array('济南', '聊城', '德州', '东营', '淄博', '潍坊', '烟台', '威海', '青岛', '日照', '临沂', '枣庄', '济宁', '泰安', '莱芜', '滨州', '菏泽'); 
		cities['河南']=new Array('郑州', '三门峡', '洛阳', '焦作', '新乡', '鹤壁', '安阳', '濮阳', '开封', '商丘', '许昌', '漯河', '平顶山', '南阳', '信阳', '周口', '驻马店'); 
		cities['湖北']=new Array('武汉', '十堰', '襄攀', '荆门', '孝感', '黄冈', '鄂州', '黄石', '咸宁', '荆州', '宜昌', '恩施', '襄樊'); 
		cities['湖南']=new Array('长沙', '张家界', '常德', '益阳', '岳阳', '株洲', '湘潭', '衡阳', '郴州', '永州', '邵阳', '怀化', '娄底', '湘西'); 
		cities['广东']=new Array('广州', '清远', '韶关', '河源', '梅州', '潮州', '汕头', '揭阳', '汕尾', '惠州', '东莞', '深圳', '珠海', '江门', '佛山', '肇庆', '云浮', '阳江', '茂名', '湛江'); 
		cities['海南']=new Array('海口', '三亚'); 
		cities['四川']=new Array('成都', '广元', '绵阳', '德阳', '南充', '广安', '遂宁', '内江', '乐山', '自贡', '泸州', '宜宾', '攀枝花', '巴中', '达川', '资阳', '眉山', '雅安', '阿坝', '甘孜', '凉山'); 
		cities['贵州']=new Array('贵阳', '六盘水', '遵义', '毕节', '铜仁', '安顺', '黔东南', '黔南', '黔西南'); 
		cities['云南']=new Array('昆明', '曲靖', '玉溪', '丽江', '昭通', '思茅', '临沧', '保山', '德宏', '怒江', '迪庆', '大理', '楚雄', '红河', '文山', '西双版纳'); 
		cities['陕西']=new Array('西安', '延安', '铜川', '渭南', '咸阳', '宝鸡', '汉中', '榆林', '商洛', '安康'); 
		cities['甘肃']=new Array('兰州', '嘉峪关', '金昌', '白银', '天水', '酒泉', '张掖', '武威', '庆阳', '平凉', '定西', '陇南', '临夏', '甘南'); 
		cities['青海']=new Array('西宁', '海东', '西宁', '海北', '海南', '黄南', '果洛', '玉树', '海西'); 
		cities['内蒙古']=new Array('呼和浩特', '包头', '乌海', '赤峰', '呼伦贝尔盟', '兴安盟', '哲里木盟', '锡林郭勒盟', '乌兰察布盟', '鄂尔多斯', '巴彦淖尔盟', '阿拉善盟'); 
		cities['广西']=new Array('南宁', '桂林', '柳州', '梧州', '贵港', '玉林', '钦州', '北海', '防城港', '南宁', '百色', '河池', '柳州', '贺州'); 
		cities['西藏']=new Array('拉萨', '那曲', '昌都', '林芝', '山南', '日喀则', '阿里'); 
		cities['宁夏']=new Array('银川', '石嘴山', '吴忠', '固原'); 
		cities['新疆']=new Array('乌鲁木齐', '克拉玛依', '喀什', '阿克苏', '和田', '吐鲁番', '哈密', '博尔塔拉', '昌吉', '巴音郭楞', '伊犁', '塔城', '阿勒泰'); 
		cities['香港']=new Array('香港'); 
		cities['澳门']=new Array('澳门'); 

		function callBackFn(province, city) {
			var pv, cv, i, iii = 0; 
			var defaultProvince = GLOBAL.address.province;
			var defaultCity = GLOBAL.address.city;

			if(province.options.length===0) {
				for(var x in cities) {
					province.options[iii] = new Option(); 
					province.options[iii].text = x; 
					if(x===defaultProvince)province.options[iii].selected = 'selected';
					province.options[iii].value = x;
					iii++;
				}
			}

			pv = province.value; 
			cv = city.value; 
			city.length=1; 

			if(pv=='0') return; 
			if(typeof(cities[pv])=='undefined') return; 
			for(i=0; i<cities[pv].length; i++) 
			{ 
				city.options[i] = new Option(); 
				if(cities[pv][i]==defaultCity) {
					city.options[i].selected = 'selected';
				}
				city.options[i].text = cities[pv][i]; 
				city.options[i].value = cities[pv][i]; 
			}
		}

		return function (province, city) 
		{ 
			if(GLOBAL.address.default) {
				//根据ip获取用户地址，会有延迟，加上异步获取，提高首屏速度
				ajaxRequest('POST', GLOBAL.apiUrl+'ip/iplookup', function(data) {
					if(data.errorCode===0) {
						GLOBAL.address.province = data.obj.province;
						GLOBAL.address.city = data.obj.city;
						GLOBAL.address.default = 0;
						callBackFn(province, city);
					}
				});
			}else{
				callBackFn(province, city);
			}
		}; 

	}

	return CityClass;
});
