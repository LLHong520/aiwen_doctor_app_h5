(function () {
  function init() {
    var sTipHtml = (function () {
      var html = "<!--提示 start-->";
      html += "<div class=\"tips_mod\" style=\"display:none; z-index:10000;\">";
      html += "<div class=\"tips_txt tips_sty1\">";
      html += "<b></b><p></p><span></span>";
      html += "</div>";
      html += "</div>";
      html += "<!--提示 end-->";
      return html;
    })();

    var oTipDom = $(".tips_mod");
    if (oTipDom.size() == 0) {
      $("body").eq(0).append(sTipHtml);
    }
  }
  window.toast = {
    delay: 1000,
    tip: function (tit, msg) {
      init();
      var oTipDom = $(".tips_mod").eq(0);
      oTipDom.focus();
      if (this.timer) clearTimeout(this.timer);
      oTipDom.blur(function () {
        clearTimeout(this.timer);
        oTipDom.hide();
      });
      oTipDom.find("b").text(tit);
      oTipDom.find("p").text(msg);

      oTipDom.show();
      this.timer = setTimeout(function () {
        oTipDom.hide();
      }, this.delay);
    }
  };
})();
//校验
(function () {
  var utils = {};
  utils.trim = function (str) {
    if (!str) str = "";
    return str.replace(/(^\s*)|(\s*$)/g, "");
  };
  utils.removeAllSpace = function (str) {
    return str.replace(/\s+/g, "");
  };
  utils.cardSpace = function (str) {
    return str.replace(/\s/g, "").replace(/(.{4})/g, "$1 ");
    // return value.replace(/\s/g,"").replace(/[^\d]/g,"").replace(/(\d{4})(?=\d)/g,"$1 ");
  };
  utils.isEmpty = function (str) {
    var str = this.trim(str);
    if (str == "") {
      return true;
    } else {
      return false;
    }
  };
  utils.isTel = function (str) {
    var str = this.trim(str);
    var exp = /^[\d-]*$/;
    if (exp.test(str)) {
      return true;
    } else {
      return false;
    }
  };
  utils.isNumber = function (str) {
    // var str=this.trim(str);
    // var exp=/^[0-9]*[1-9][0-9]*$/;
    var exp = /^(-?\d+)(\.\d+)?$/;
    if (exp.test(str)) {
      return true;
    } else {
      return false;
    }
  };
  //自然数 0，1，2....
  utils.isNumberPositive = function (str) {
    var str = this.trim(str);
    var exp = /^([1-9]\d*|[0]{1,1})$/;
    if (exp.test(str)) {
      return true;
    } else {
      return false;
    }
  };
  //正整数 1，2....
  utils.isNumberPosition=function(str){
    var exp=/^[1-9]\d*$/;
    if(exp.test(str)){
      return true;
    }else{
      return false;
    }
  };
  utils.isMobile = function (mobile) {
    var mobile = this.trim(mobile);
    var exp = /^1([0-9])\d{9}$/;
    if (exp.test(mobile)) {
      return true;
    } else {
      return false;
    }
  };
  utils.isPassword = function (val) {
    var val = this.trim(val);
    var exp = /^[a-zA-Z\d]{6,16}$/;
    if (exp.test(val)) {
      return true;
    } else {
      return false;
    }
  };
  utils.isEmail = function (email) {
    var email = this.trim(email);
    var exp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (exp.test(email)) {
      return true;
    } else {
      return false;
    }
  };
  utils.isUrl = function (value) {
    var value = this.trim(value);
    var exp = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?$/;
    if (exp.test(value)) {
      return true;
    } else {
      return false;
    }
  };
  utils.isIdCard = function (idCard) {
    var idCard = this.trim(idCard);
    var exp18 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    var exp15 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/;
    if (exp18.test(idCard) || exp15.test(idCard)) {
      return true;
    } else {
      return false;
    }
  };
  utils.addEvent = function (obj, ev, fn) {
    if (obj.attachEvent) {
      //针对IE浏览器
      obj.attachEvent("on" + ev, fn);
    } else {
      //针对FF与chrome
      obj.addEventListener(ev, fn, false);
    }
  };
  utils.removeEvent = function (obj, ev, fn) {
    if (obj.attachEvent) {
      //针对IE浏览器
      obj.detachEvent("on" + ev, fn);
    } else {
      //针对FF与chrome
      obj.removeEventListener(ev, fn, false);
    }
  };
  //将用户输入的信息转换为伪标签存入数据库
  utils.getFormatFakeHtml = function (strContent) {
    strContent = strContent.replace(/\r\n/g, "[br]"); //IE9、FF、chrome
    strContent = strContent.replace(/\n/g, "[br]"); //IE7-8
    strContent = strContent.replace(/\s/g, " "); //空格处理
    return strContent;
  };
  utils.replaceBrTag = function (strContent) {
    strContent = strContent.replace(/\r\n/g, "<br/>");
    strContent = strContent.replace(/\n/g, "<br/>");
    return strContent;
  };
  //将数据库中提取的字符串中伪标签转换为可以识别的标签
  utils.getFormatHtml = function (strContent) {
    strContent = strContent.replace(/\[br\]/g, "<br/>"); //IE9、FF、chrome
    return strContent;
  };
  //将数据库中提取的字符串中伪标签转换为textarea可以识别的字符
  utils.getFormatStr = function (strContent) {
    strContent = strContent.replace(/\[br\]/g, "\r\n"); //IE9、FF、chrome
    strContent = strContent.replace(/\[br\]/g, "\n"); //IE7-8
    // strContent = strContent.replace(/ /g, '\s'); //空格处理
    return strContent;
  };
  utils.getFormatStrNone = function (strContent) {
    strContent = strContent.replace(/\[br\]/g, "\r\n"); //IE9、FF、chrome
    strContent = strContent.replace(/\[br\]/g, "\n"); //IE7-8
    strContent = strContent.replace(/\s/g, " "); //空格处理
    return strContent;
  };
  utils.replaceHtmlTag = function (strContent) {
    strContent = strContent.replace(/\[br\]/g, "");
    return strContent;
  };
  utils.replaceDivTag = function (strContent) {
    // strContent = strContent.replace(/<div>/g, "\r\n"); //IE9、FF、chrome
    // strContent = strContent.replace(/<div>/g, "\n"); //IE7-8//<br/>
    // strContent = strContent.replace(/<\/div>/g, "");
    strContent = strContent.replace(/<br>/g, "\r\n");
    strContent = strContent.replace(/<br>/g, "\n");
    strContent = strContent.replace(/<br[^>]*>/g, "\r\n");
    strContent = strContent.replace(/<br[^>]*>/g, "\n");
    // strContent = strContent.replace(/<(?!br).*?>/g, "\r\n");//除br标签替换
    // strContent = strContent.replace(/<(?!br).*?>/g, "\n");
    return strContent;
  };
  utils.replaceBrTag = function (strContent) {
    strContent = strContent.replace(/\r\n/g, "<br/>");
    strContent = strContent.replace(/\n/g, "<br/>");
    return strContent;
  };
  utils.replaceSpaceTag = function (strContent) {
    strContent = strContent.replace(/ /g, "\u00a0");
    return strContent;
  };
  utils.delHtmlTag = function (str) {
    str = str.replace(/<\/?[^>]*>/g, ""); //去除HTML tag
    str = str.replace(/[ | ]*\n/g, "\n"); //去除行尾空白
    str = str.replace(/\n[\s| | ]*\r/g, "\n"); //去除多余空行
    str = str.replace(/&nbsp;/ig, ""); //去掉&nbsp;

    // str = str.replace(/(\n)/g, '');
    // str = str.replace(/(\t)/g, '');
    // str = str.replace(/(\r)/g, '');
    // str = str.replace(/<\/?[^>]*>/g, '');
    // str = str.replace(/\s*/g, '');
    return str;
  };

  //压缩图片
  utils.compressIMG = function (file, quality, callback) {
    if (!window.FileReader || !window.Blob) {
      return errorHandler("您的浏览器不支持图片压缩")();
    }

    var reader = new FileReader();
    var mimeType = file.type || "image/jpeg";

    reader.onload = createImage;
    reader.onerror = errorHandler("图片读取失败！");
    reader.readAsDataURL(file);

    function createImage() {
      var dataURL = this.result;
      var image = new Image();
      image.onload = compressImage;
      image.onerror = errorHandler("图片加载失败");
      image.src = dataURL;
    }

    function compressImage() {
      var canvas = document.createElement("canvas");
      var ctx;
      var dataURI;
      var result;

      canvas.width = this.naturalWidth;
      canvas.height = this.naturalHeight;
      ctx = canvas.getContext("2d");
      ctx.drawImage(this, 0, 0);
      dataURI = canvas.toDataURL(mimeType, quality);
      result = dataURIToBlob(dataURI);

      callback(null, result);
    }

    function dataURIToBlob(dataURI) {
      var type = dataURI.match(/data:([^;]+)/)[1];
      var base64 = dataURI.replace(/^[^,]+,/, "");
      var byteString = atob(base64);

      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ia], { type: type });
    }

    function errorHandler(message) {
      return function () {
        var error = new Error("Compression Error:", message);
        callback(error, null);
      };
    }
  };
  //切分数组
  utils.sliceArray = function (array, size) {
    var result = [];
    if (array.length % size == 0) {
      // console.log("求余取整");
      for (var x = 0; x < Math.ceil(array.length / size); x++) {
        var start = x * size;
        var end = start + size;
        result.push(array.slice(start, end));
      }
      return result;
    } else {
      if (array.length < size) {
        // console.log("不足5条");
        result.push(array);
        return result;
      } else {
        // console.log("多于5条,求余不取整");
        for (var x = 0; x < Math.ceil(array.length / size); x++) {
          var start = x * size;
          var end = start + size;
          result.push(array.slice(start, end));
        }
        // result.push(array.slice(end*5,array.length));
        return result;
      }
    }
  };
  window.utils = utils;
})();
//设备信息
(function (window) {
  var u = navigator.userAgent,
    appVersion = navigator.appVersion;
  var platformInfo = {};
  platformInfo.userAgent = u;
  platformInfo.appVersion = appVersion;
  platformInfo.isiOS = (function () {
    return u.toLowerCase().indexOf("iphone") > 0 ? true : false;
  })();
  platformInfo.isAndroid = (function () {
    return u.toLowerCase().indexOf("android") > 0 ? true : false;
  })();
  platformInfo.isWx = (function () {
    return u.toLowerCase().match(/MicroMessenger/i) == "micromessenger" ? true : false;
  })();
  platformInfo.isWeibo = (function () {
    return u.toLowerCase().match(/WeiBo/i) == "weibo" ? true : false;
  })();
  platformInfo.isInIframe = (function () {
    return top.location == location ? false : true;
  })();
  platformInfo.isApp = (function () {
    return platformInfo.isAndroid || platformInfo.isiOS;
  })();
  platformInfo.deviceInfo = (function () {
    return {
      width: window.screen.width,
      height: window.screen.height
    };
  })();
  window.platformInfo = platformInfo;
})(window);

(function () {
  var u = navigator.userAgent; //, app = navigator.appVersion
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //判断是否是ios,函数只在ios下执行
  if(isiOS){
    $(".iosEdit").on("focusin",function(){
      window.scrollTo(0, 50);
    });
    $(".iosEdit").on("focusout",function(){
      window.scrollTo(0, 0);
    });
  }
})();
