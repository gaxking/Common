/*global define, jsMvc,  GLOBAL */
define('Common/util', function() {
	//自己写的css选择器
	const selector = (t) => {
		if (typeof t == 'string') {
			var result;

			if(t.indexOf('#') === 0 && !/\s/.test(t)) {
				t = t.substr(1);
				result = document.getElementById(t);
				return result;
			}else{
				result = document.querySelectorAll(t);
				if (result.length > 1) {
					return result;
				}else{
					return result[0];       
				}
			}
		}
	};

	//异步下载脚步
	var getScript = (function() {
		var scriptlist = [];
		return function(script, callback, isRes = true) {
			if(scriptlist.indexOf(script) == -1) {
				var scriptdom = document.createElement('script');
				scriptdom.type = 'text/javascript';
				scriptdom.src = script;
				document.body.appendChild(scriptdom);
				scriptdom.onload = function() {
					if(callback)callback();
					scriptlist.push(script);
				};
			}else{
				if(callback)callback();
			}
		};
	})();

	//取代jquery的ajax
	var ajaxRequest = (function() {
		let preLoadUrl;
		return function(type, url, opts, callback, callbackerror) {
			if(url==preLoadUrl)return;
			var xhr = new XMLHttpRequest ();
			if (typeof opts === 'function') {
				callback = opts;
				opts = null;
			}
			xhr.open (type, url);
			var fd = new FormData ();
			if (type === 'POST' && opts) {
				for (var key in opts) {
					fd.append(key, opts[key]);
				}
			}
			xhr.onload = function () {
				callback (JSON.parse (xhr.response));
				preLoadUrl = null;
			};

			xhr.onerror = function () {
				alert('网络发生错误');
				preLoadUrl = null;
				if(callbackerror)callbackerror ();
			};

			xhr.send (opts ? fd : null);
			preLoadUrl = url;
		};
	})();

	function setCookie(c_name, value, expiredays)
	{
		var exdate=new Date();
		exdate.setDate(exdate.getDate()+expiredays);
		document.cookie=c_name+ "=" +escape(value)+
			((expiredays===null) ? "" : ";expires="+exdate.toGMTString());
	}

	function getCookie(c_name) {
		if (document.cookie.length>0) {
			var c_start=document.cookie.indexOf(c_name + "=");
			if (c_start!=-1) { 
				c_start=c_start + c_name.length+1;
				var c_end=document.cookie.indexOf(";", c_start);
				if (c_end==-1) c_end=document.cookie.length;
				return unescape(document.cookie.substring(c_start, c_end));
			} 
		}
		return "";
	}

	//获取url参数
	function GetQueryString(name) {
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r!=null)return unescape(r[2]); return null;
	}

	//验证码倒计时
	var veriCodeCount = (function() {
		var timers = {};
		return function(vericode) {
			var count = 60;
			vericode.innerHTML = '重新发送' + count + 's';
			vericode.classList.add('disabled');
			timers[vericode] = window.setInterval(addsec, 1000);
			function addsec() {
				if (count > 0) {
					vericode.innerHTML = '重新发送' + --count + 's';
				} else {
					window.clearInterval(timers[vericode]);
					vericode.innerHTML = '获取验证码';
					vericode.classList.remove('disabled');
				}
			}
		};
	})();

	return{
		selector: selector,
		getScript: getScript,
		setCookie: setCookie,
		getCookie: getCookie,
		GetQueryString: GetQueryString,
		ajaxRequest: ajaxRequest,
		veriCodeCount: veriCodeCount
	};
});
