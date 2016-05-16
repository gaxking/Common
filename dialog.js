/*global define */
define('Common/dialog', function() {
	function dialog(obj) {
		if(typeof obj === "string") {
			obj = {
				content:obj
			};
		}
		obj.type = obj.type||1;
		var content='', newdialog;
		if(obj.type==3) {
			content='<div id="toast" style="display:block;"><div style="position:fixed;z-index:1;width:100%;height:'+window.innerHeight+'px;top:0;left:0"></div><div style="position:fixed;z-index:3;width:121.6px;min-height:121.6px;top:'+window.innerHeight/2+'px;left:50%;transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);background:rgba(40, 40, 40, .75);text-align:center;border-radius:5px;font-size:16px;color:#FFF"><span style="margin:22px auto 0;display:block;width:55px;height:55px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAABuCAYAAADGWyb7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY2QzFDODg4RUE4RDExRTU4NDFCRkU4REQ2RjA3MEFCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY2QzFDODg5RUE4RDExRTU4NDFCRkU4REQ2RjA3MEFCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjZDMUM4ODZFQThEMTFFNTg0MUJGRThERDZGMDcwQUIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjZDMUM4ODdFQThEMTFFNTg0MUJGRThERDZGMDcwQUIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz68ef0KAAAO1UlEQVR42uydeXBV1R3H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) no-repeat center;background-size: 55px 55px;"></span><p style="margin:0 0 15px">'+obj.content+'</p></div></div>';
			newdialog = document.createElement('div');
			newdialog.id="dialog";
			newdialog.innerHTML = content;
			document.body.appendChild(newdialog);
			setTimeout(function() {
				newdialog.parentNode.removeChild(newdialog);
			}, 1000);

		}else{
			content +='<div class="big-bg"></div><div class="dialog-content">';
			if(obj.head) {
				content +='<div class="dialog-head">'+obj.head+'</div>';
			}
			content +='<div class="content">'+obj.content+'</div><div class="ui-dialog-ft">';
			if(obj.type == 1) {
				content +='<div class="cancel cancel1">确认</div></div></div>';
			}else{
				content +='<div class="cancel">取消</div><div class="confirm">确认</div></div></div>';
			}

			newdialog = document.createElement('div');
			newdialog.id="dialog";
			newdialog.innerHTML = content;
			document.body.appendChild(newdialog);
			addStyle();
			var	dialogcancel = document.querySelector("#dialog .cancel"),
				dialogconfirm = document.querySelector("#dialog .confirm");
			document.addEventListener("touchmove", stopDefault, false);
			dialogcancel.addEventListener("click", removedialog, false);
		}
		function removedialog() {
			destroy();
			if(obj.cancel)obj.cancel();
		}
		if(obj.type==2) {
			dialogconfirm.addEventListener("click", removedialogConfirm, false);
		}
		function removedialogConfirm() {
			destroy();
			if(obj.confirm)obj.confirm();
		}
		function stopDefault(e) {
			e.preventDefault();
		}

		function addStyle() {
			var style = document.createElement("style");
			style.id='dialogcss';
			style.innerHTML ='#dialog .big-bg{position:fixed;top:0;left:0;width:100%;height:'+window.innerHeight+'px;z-index:9999;background:rgba(0,0,0,.4);}#dialog .dialog-content{background:#fff;min-width:70%;top:'+window.innerHeight/2+'px;position:fixed;z-index:10000;border-radius:10px;text-align:center;font-size:18px;left:50%;-webkit-transform:translate(-50%,-50%);}#dialog .dialog-head{line-height:45px;border-bottom:1px solid #C7C2C2}#dialog .cancel{width:49.7%;line-height:45px;height:45px;float:left;border-right:1px solid #C7C2C2;border-bottom-left-radius: 10px;}#dialog .confirm{width:49.8%;line-height:45px;height:45px;float:left;border-bottom-right-radius: 10px;}#dialog .cancel1{width: 100%;line-height:45px;height:45px;border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;}#dialog .content{margin:0 auto;padding:15px 10px;font-size:16px;line-height:23px}#dialog .ui-dialog-ft{border-top: 1px solid #C7C2C2;color: #42C4F3;}#dialog .cancel:active{background-color:#E0DFDF;}#dialog .confirm:active{background-color:#E0DFDF;}';
			document.head.appendChild(style);
		}

		function destroy() {
			if(obj.type==2) {
				dialogconfirm.removeEventListener("click", removedialogConfirm, false);
			}
			dialogcancel.removeEventListener("click", removedialog, false);
			document.removeEventListener("touchmove", stopDefault, false);
			newdialog.parentNode.removeChild(newdialog);
			document.head.removeChild(document.getElementById('dialogcss'));
		}
	}
	return dialog;
});
