import article_default from "@/assets/images/bg_article_img@2x.png";
import {PIC_URL,SUB_FIX,APP_URL} from "@/config";
import platformInfo from "@/common/platformInfo";
const commonMixin = {
  data() {
    return {
      APP_URL,
      PIC_URL,
      SUB_FIX,
      platformInfo,
      // 爱问医生诊室下载地址
      APP_CONF: {
        downloadUrl: {
          ios: "https://apps.apple.com/cn/app/id885379038?mt=8",
          android: "http://dl.wenwo.com/android/IAskDoctor.apk"
        },
      }
    };
  },
  computed: {},
  // mounted(){
  //   // 解决input获取焦点键盘遮挡
  //   $("input,textarea").focus(function() {
  //     var Height =  document.body.clientHeight;
  //     $(".popup-box").css({"position":"absolute","height":Height});
  //     $(window).scrollTop(Height / 3);
  //   }).blur(function(){
  //     $(".popup-box").css({"position":"fixed","height":"auto"});
  //   });
  // },
  methods:{
    inputBlur(){
      setTimeout(function(){
        window.scrollTo(0, 0);
      },100);
    },
    openApp(paramsString,isToDownload){
      if(this.platformInfo.isiOS && this.platformInfo.isWeibo){
        return false;
      }else{
        let This = this;
        paramsString = paramsString || "";
        isToDownload = isToDownload || true;
        var paramsString ="";
        var openUrl = "iaskdoctor://?" + paramsString;
  
        try {
          window.location.href = openUrl;
          // console.log("打开app");
          // console.log(paramsString);
          // console.log(openUrl);
          if (isToDownload) {
            setTimeout(function(){
              console.log("下载app");
              This.toDownloadApp();
            }, 500);        
          }
        } catch (error) {
          console.log("打开app参数", paramsString);
          window.location.href = openUrl;
        }
        return true;
      }
    },
    toDownloadApp(){
      _hmt.push(["_trackEvent", "爱问医生诊室App下载页", "下载", "渠道["+ (this.$route.query.openFrom||"无") +"]"]);
      let urlKey = "android";
      if(this.platformInfo.isAndroid){
        urlKey = "android";
      }else if(this.platformInfo.isiOS){
        urlKey = "ios";
      }
      let downloadUrl = this.APP_CONF.downloadUrl[urlKey];
      window.location.href = downloadUrl;
    },
    GET_IMG_URL(picID, type) {
      let url = picID;
      if (picID == "" || picID == null || picID == undefined) {
        if (type == "article") {
          url = article_default;
        }
      } else {
        if (/http/.test(picID)) {
          //网络图片
        } else {
          //图片服务器图片
          url = PIC_URL + picID + SUB_FIX;
        }
      }
      return url;
    },
    router_back() {
      if (window.history.length <= 1) {
        this.$router.push({
          name: "Index"
        });
      } else {
        this.$router.back(-1);
      }
    },
    //限制文字显示字数
    limit: function (val, param, subfix) {
      let result = val;
      if (result && result.length > param) {
        result = result.substring(0, param);
        if (subfix != undefined) {
          result += subfix;
        } else {
          result += "...";
        }
      }
      return result;
    },
    removeHtmlTag:function(val){
      return val.replace(/<[^>]+>/g, "");
    }
  },
  filters:{
    //时间戳转换为时间(毫秒)
    dataFormat(val) {
      if (val == "" || val == 0) return "";
      let timeMinSeconds = parseInt(val);

      function fix(num) {
        return num >= 10 ? num : "0" + num;
      }
      var date = new Date(timeMinSeconds);
      var year = date.getFullYear();
      var month = fix(date.getMonth() + 1);
      var day = fix(date.getDate());
      var hour = fix(date.getHours());
      var minute = fix(date.getMinutes());
      return year + "-" + month + "-" + day + " " + hour + ":" + minute;
    },
    //时间戳转换为时间(秒) yy-mm-dd ss
    dateFormat(val) {
      if (val == "" || val == 0 || val == null || val == undefined)
        return "";
      let timeMinSeconds = parseInt(val) * 1000;

      function fix(num) {
        return num >= 10 ?
          num :
          "0" + num;
      }

      var date = new Date(timeMinSeconds);
      var year = date.getFullYear();
      var month = fix(date.getMonth() + 1);
      var day = fix(date.getDate());
      var hour = fix(date.getHours());
      var minute = fix(date.getMinutes());
      return year + "-" + month + "-" + day + " " + hour + ":" + minute;
    },
    dateFormatDot(val) {
      if (val == "" || val == 0 || val == null || val == undefined)
        return "";
      let timeMinSeconds = parseInt(val);

      function fix(num) {
        return num >= 10 ?
          num :
          "0" + num;
      }

      var date = new Date(timeMinSeconds);
      var year = date.getFullYear();
      var month = fix(date.getMonth() + 1);
      var day = fix(date.getDate());
      var hour = fix(date.getHours());
      var minute = fix(date.getMinutes());
      return year + "." + month + "." + day + " " + hour + ":" + minute;
    },
    hourFormat(val) {
      if (val == "" || val == 0 || val == null || val == undefined)
        return "";
      let timeMinSeconds = parseInt(val);

      function fix(num) {
        return num >= 10 ?
          num :
          "0" + num;
      }

      var date = new Date(timeMinSeconds);
      var hour = fix(date.getHours() == 0 ? 24 : date.getHours());
      var minute = fix(date.getMinutes());
      return hour + ":" + minute;
    },
    //移除文本中的html
    removeHtmlTag(val) {
      // let result = utils.replaceHtmlTag(val);
      // return result;
      return val.replace(/<[^>]+>/g, "");
    },
  }
};

export default commonMixin;
