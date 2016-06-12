/*global GLOBAL, define */
define('Common/lazyload', function() {
	window.requestAnimFrame = (function() {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
				function( callback ) {
					window.setTimeout(callback, 1000 / 60);
				};
	})();

	var lazyLoad = (function() {
		var queue = [],
			t,
			ele;
		var loadPic = GLOBAL.resUrl+'images/loadingbg.png';
		function onscroll(isInit) {
			var list = ele.querySelectorAll('[data-src]');
			if(list.length === 0) {
				document.removeEventListener('scroll', scrollHander);
			}

			for(var i = 0, newnode;i<list.length;i++) {
				if(isInit) {
					if(list[i].tagName.toLowerCase()=='img') {
						list[i].style.visibility = 'hidden';
					}
					newnode = document.createElement("div");
					newnode.style.background = 'url('+loadPic+') center no-repeat';
					var display = getComputedStyle(list[i]).getPropertyValue("display");

					newnode.style.width = getComputedStyle(list[i]).getPropertyValue("width");
					newnode.style.height = getComputedStyle(list[i]).getPropertyValue("height");
					newnode.style.display = display=='inline'?'inline-block':display;
					list[i].parentNode.replaceChild(newnode, list[i]);
					newnode.appendChild(list[i]);
				}


				var dataSrc = list[i].getAttribute('data-src');
				if(queue.indexOf(dataSrc)==-1&&list[i].getBoundingClientRect().bottom>=0&&list[i].getBoundingClientRect().top-document.body.offsetHeight<0) {
					var img = new Image();
					img.onload = (function(dom, dataSrc) {
						return function() {
							if(dom.tagName.toLowerCase()=='img') {
								dom.setAttribute('src', dataSrc);
								dom.style.visibility = null;
							}else{
								dom.style.backgroundImage = 'url('+dataSrc+')';
							}

							dom.classList.add('fadeIn');
							dom.parentNode.parentNode.replaceChild(dom, dom.parentNode);
							dom.removeAttribute('data-src');
							queue.splice(queue.indexOf(dataSrc), 1);
						};
					})(list[i], dataSrc);

					img.src = dataSrc;
					queue.push(dataSrc);
				}
			}
		}

		function scrollHander() {
			if(t)clearTimeout(t);
			t = setTimeout(function() {
				onscroll();
			}, 250);
		}

		return function(_ele) {
			ele = _ele;
			onscroll(true);
			document.removeEventListener('scroll', scrollHander);
			document.addEventListener('scroll', scrollHander);
		};
	})();

	return lazyLoad;
});
