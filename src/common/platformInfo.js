var u = navigator.userAgent, appVersion = navigator.appVersion;
var platformInfo={};
platformInfo.userAgent=u;
platformInfo.appVersion=appVersion;
platformInfo.isiOS=(function(){
  return u.toLowerCase().indexOf("iphone") > 0 ? true:false;
})();
platformInfo.isAndroid=(function(){
  return u.toLowerCase().indexOf("android") > 0 ? true:false;
})();
platformInfo.isWx=(function(){
  return u.toLowerCase().match(/MicroMessenger/i) == "micromessenger" ? true:false;
})();
platformInfo.isWeibo=(function(){
  return u.toLowerCase().match(/WeiBo/i) == "weibo" ? true:false;
})();
platformInfo.isInIframe=(function(){
  return top.location==location? false:true;
})();
platformInfo.isApp=(function(){
  return platformInfo.isAndroid||platformInfo.isiOS;
})();
platformInfo.deviceInfo=(function(){
  return {
    width:window.screen.width,
    height:window.screen.height
  };
})();

module.exports = platformInfo;
