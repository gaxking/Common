# Common
封装的一些常用组件，Wap专用
  
1.这些插件是在m.360zfw.com下拆分出来的,暂时有些全局变量，如GLOBAL,jsMvc。  
2.被CMD加载模式define起来了，如不需要可以删掉

#包含以下组件  
  city.js 省市选择插件  
  dialog.js 弹框  
  lazyload.js 图片懒加载插件  
  util.js 一些比较简单的工具  
  wx.js 微信js封装  
  
其中util.js包含  
选择器：selector  
脚步下载：getScript  
ajax：ajaxRequest  
cookies操作：setCookie, getCookie  
url参数读取：GetQueryString  
手机验证码倒计时：veriCodeCount  
