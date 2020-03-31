Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
};

//===================开发环境
// 梦瑶的
// var phone = "15013762150";
// var originPassword = "123456";

// 朱志鹏的

var phone = "15112308250";
var originPassword = "123456";

//周浩
// var phone = "15651666920";
// var originPassword = "ls520...";

//赵倩慧
// var phone = "13691990112";
// var originPassword = "000000";

//===================测试环境

//赵倩慧
// var phone = "13691990112";
// var originPassword = "123456";


//赵倩慧
// var phone = "18679610587";
// var originPassword = "123456";

var necessaryParameter = {
  versionNo: "410",
  source: "iphone",
  OS: "12.2.0",
  UUID: "0D1CC431-AE97-4B77-9746-F3AFA612BB65",
  deviceType: "iPhone 5s",
  networkType: "WIFI",
  sid: "",
  phone: phone,
  originPassword: originPassword,
  password: "",
  aid: "101",
};

var CryptoJS = require("crypto-js");

necessaryParameter.password = CryptoJS.MD5("weiwen.com" + necessaryParameter.originPassword).toString();


//加上时间
var currentDate = new Date();
necessaryParameter.times = currentDate.format("yyyyMMddhhmmss");
// console.log(necessaryParameter)

//获取所有参数key值并排序
var parameterNameArray = Object.getOwnPropertyNames(necessaryParameter);
parameterNameArray.sort();
// console.log(parameterNameArray)
var parameterString = "weiwen.com";
for (i = 0; i < parameterNameArray.length; i++) {
  var parName = parameterNameArray[i];
  parameterString = parameterString + parName + necessaryParameter[parName];
}

var sign = CryptoJS.MD5(parameterString).toString();
// console.log("参数字符串：" + parameterString +  "  " + "签名：" + sign)
necessaryParameter.sign = sign;

var http = require("http");
var querystring = require("querystring");

var contents = querystring.stringify(necessaryParameter);


var options = {
  host: "appdr.wenwo.com",
  path: "/action/doAction",
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Content-Length": contents.length
  }
};

var req = http.request(options, function (res) {
  res.setEncoding("utf8");
  res.on("data", function (data) {
    var obj = JSON.parse(data);
    console.log("token: ", obj.data.sid);
  });
});


req.write(contents);
req.end();
