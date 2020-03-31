<template>
  <section class="wrapper">
    <div class="tj_bar">
      <a href="javascript:;">
        <dl>
          <dt>{{summary.weiboFansCount}}</dt>
          <dd>微博粉丝数</dd>
        </dl>
      </a>
      <a href="javascript:;">
        <dl>
          <dt>{{summary.patientCount}}</dt>
          <dd>患者</dd>
        </dl>
      </a>
      <a href="javascript:;">
        <dl>
          <dt>{{summary.friendCount}}</dt>
          <dd>医生好友</dd>
        </dl>
      </a>
    </div>
    <div class="tj_box">
      <div class="tj_hd">
        <h3>
          <em class="pain"></em>你的付出
        </h3>
        <div class="tab">
          <a href="javascript:;" :class="{'current':painActive===0}" @click="getPain(7,0)">最近7天</a>
          <em>|</em>
          <a href="javascript:;" :class="{'current':painActive===1}" @click="getPain(30,1)">最近30天</a>
        </div>
      </div>
      <div class="tj_items">
        <ul>
          <li>
            <span class="item_tit">新增文章</span>
            <span class="item_val">{{pain.articleCount}}</span>
          </li>
          <li>
            <span class="item_tit">新增视频</span>
            <span class="item_val">{{pain.videoCount}}</span>
          </li>
          <li>
            <span class="item_tit">发起在线直播</span>
            <span class="item_val">{{pain.liveCount}}</span>
          </li>
          <li>
            <span class="item_tit">参加推广活动</span>
            <span class="item_val">{{pain.taskCount}}</span>
          </li>
          <li>
            <span class="item_tit">转发好友微博</span>
            <span class="item_val">{{pain.shareWeiboCount}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="tj_box">
      <div class="tj_hd">
        <h3>
          <em class="gain"></em>你的回报
        </h3>
        <div class="tab">
          <a href="javascript:;" :class="{'current':gainActive===0}" @click="getGain(7,0)">最近7天</a>
          <em>|</em>
          <a href="javascript:;" :class="{'current':gainActive===1}" @click="getGain(30,1)">最近30天</a>
        </div>
      </div>
      <div class="tj_items">
        <ul :class="{'limit':!isSpread}" class="gain_items">
          <li>
            <span class="item_tit">新增微博粉丝</span>
            <span class="item_val">{{gain.addedWeiboFansCount}}</span>
          </li>
          <li>
            <span class="item_tit">新增金币</span>
            <span class="item_val">{{gain.addedGoldCount}}</span>
          </li>
          <!-- <li>
            <span class="item_tit">新增零钱</span>
            <span class="item_val">{{gain.addedMoneyCount}}</span>
          </li> -->
          <li>
            <span class="item_tit">新增图文咨询</span>
            <span class="item_val">{{gain.addedQuestionCount}}</span>
          </li>
          <li>
            <span class="item_tit">新增门诊预约</span>
            <span class="item_val">{{gain.addedOutpatientCount}}</span>
          </li>
          <li>
            <span class="item_tit">新增患者</span>
            <span class="item_val">{{gain.addedPatientCount}}</span>
          </li>
          <li>
            <span class="item_tit">新增订阅</span>
            <span class="item_val">{{gain.addedSubscribeCount}}</span>
          </li>
        </ul>
        <div class="btn_spread" :class="{'sq':isSpread}" @click="toggleSpread">
          {{isSpread?"收起":"展开"}}
          <em></em>
        </div>
      </div>
    </div>
    <div v-if="suggestInfo" class="suggest_hd">
      <span>推广建议</span>
    </div>
    <div v-if="suggestInfo" class="suggest_box">
      <img src="./images/reports_bg_advise@2x.png" width="100%" alt>
      <a href="javascript:;" @click="callAppIntent">
        <!--新增科普文章页-->
        <dl>
          <dt>“{{suggestInfo.keyWord}}”</dt>
          <dd v-html="suggestInfo.copyWriting"></dd>
        </dl>
      </a>
    </div>
  </section>
</template>
<script>
import doctorService from "@/services/doctorService.js";
export default {
  components: {},
  data() {
    return {
      isSpread: false,
      gainActive: 0,
      painActive: 0,
      token: "",
      summary: {
        code: 0,
        isBindWeibo: true,
        weiboFansCount: 0,
        patientCount: 0,
        friendCount: 0
      },
      pain: {
        code: 0,
        articleCount: 0,
        videoCount: 0,
        liveCount: 0,
        taskCount: 0,
        shareWeiboCount: 0
      },
      gain: {
        code: 0,
        addedWeiboFansCount: 0,
        addedGoldCount: 0,
        addedMoneyCount: 0,
        addedQuestionCount: 0,
        addedOutpatientCount: 0,
        addedPatientCount: 0,
        addedSubscribeCount: 0
      },
      suggestInfo: null
    };
  },
  created() {
    this.token = this.$route.query.docId;
    this.getsummary();
    this.getPain(7, 0);
    this.getGain(7, 0);
    this.getSuggestion();
  },
  methods: {
    toggleSpread() {
      this.isSpread = !this.isSpread;
    },
    getsummary() {
      let _this = this;
      let queryParams = {
        token: _this.token
      };
      doctorService.summary(queryParams).then(res => {
        if (res.code == 0) {
          _this.summary = res;
        }
      });
    },
    getPain(time, index) {
      let _this = this;
      _this.painActive = index;
      let queryParams = {
        token: _this.token,
        timeline: time
      };
      doctorService.pain(queryParams).then(res => {
        if (res.code == 0) {
          _this.pain = res;
        }
      });
    },
    getGain(time, index) {
      let _this = this;
      _this.gainActive = index;
      let queryParams = {
        token: _this.token,
        timeline: time
      };
      doctorService.gain(queryParams).then(res => {
        if (res.code == 0) {
          _this.gain = res;
        }
      });
    },
    getSuggestion() {
      let _this = this;
      let queryParams = {
        token: _this.token
      };
      doctorService.suggestion(queryParams).then(res => {
        if (res.code == 0) {
          _this.suggestInfo = res;
        }
      });
    },
    callNativeAPP(params) {
      let source = this.$route.query.source;
      if (source && source == "ios") {
        window.webkit.messageHandlers.jsCallNative.postMessage(JSON.stringify(params));
      } else if(source && source == "android") {
        window.jsCallNative.jsCallNative(JSON.stringify(params));
      }
    },
    callAppIntent() {
      let suggestInfo = this.suggestInfo;
      let intentJson = {
        0: {
          fnc: "actionArticleAdd",
          summary: "新增科普文章页",
          params: { act: "actionArticleAdd", articleType: "1" }
        },
        1: {
          fnc: "actionVideoAdd",
          summary: "新增视频页",
          params: { act: "actionVideoAdd" }
        },
        2: {
          fnc: "actionLiveAdd",
          summary: "新增直播页",
          params: { act: "actionLiveAdd" }
        },
        3: {
          fnc: "actionFriendIndex",
          summary: "好友互推页",
          params: { act: "actionFriendIndex" }
        },
        4: {
          fnc: "actionSceneList",
          summary: "专题活动列表页",
          params: { act: "actionSceneList" }
        },
        5: {
          fnc: "actionFreeActivity",
          summary: "公益咨询列表页",
          params: { act: "actionFreeActivity" }
        },
        6: {
          fnc: "actionFlowSelet",
          summary: "流量市场中选择内容列表页",
          params: { act: "actionFlowSelet" }
        },
        7: {
          fnc: "actionArticleAdd",
          summary: "撰写病例页",
          params: {act:"actionArticleAdd",articleType:"5",isWriteCase:true}
        },
        8: {
          fnc: "actionArticleAdd",
          summary: "新增诊间日记页",
          params: {act:"actionArticleAdd",articleType:"2"}
        }
      };
      let targetParam = intentJson[suggestInfo.linkUrl];
      let params = targetParam.params;
      try {
        this.callNativeAPP(params);
      } catch (error) {
        console.log("目前不在App内");
      }
    }
  }
};
</script>
<style lang="less" scoped>
.wrapper {
  padding: 15px;
  background-color: #f3f4f5;
}
.tj_bar {
  display: flex;
  padding: 20px 0;
  background: linear-gradient(
    47deg,
    rgba(56, 91, 108, 1) 0%,
    rgba(35, 64, 78, 1) 100%
  );
  box-shadow: 0px 3px 8px 0px rgba(0, 24, 36, 0.2);
  border-radius: 4px;
  a {
    flex: 1;
    width: 0;
    overflow: hidden;
    text-align: center;
    border-right: 1px solid rgba(239, 239, 239, 0.1);
    font-size: 10px;
    color: #fff;
    &:last-child {
      border: 0;
    }
  }
  dt {
    font-size: 22px;
    line-height: 1.2;
  }
  dd {
    padding-top: 5px;
    line-height: 1;
  }
}

.tj_box {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 8px 2px rgba(11, 42, 57, 0.03);
  border-radius: 4px;
  margin-top: 15px;
  padding: 0 12px 2px;
  .tj_hd {
    height: 25px;
    line-height: 25px;
    padding: 18px 0;
    h3 {
      float: left;
    }
    em.pain,
    em.gain {
      display: inline-block;
      width: 18px;
      height: 18px;
      background: url(images/reports_icon_give@2x.png) no-repeat;
      background-size: cover;
      position: relative;
      top: -1px;
      vertical-align: middle;
      margin-right: 8px;
    }
    em.gain {
      background-image: url(images/reports_icon_reward@2x.png);
    }
    .tab {
      float: right;
      font-size: 12px;
      color: #999;
      em {
        font-style: normal;
        margin: 0 10px;
        color: #efefef;
        font-size: 10px;
      }
      a {
        display: inline-block;
        &:last-child {
          border: 0;
        }
        &.current {
          color: #2d2d2d;
          background: url(images/line.gif) no-repeat center bottom;
        }
      }
    }
  }
}

.tj_items {
  ul {
    padding-bottom: 1px;
  }
  li {
    height: 34px;
    line-height: 34px;
    display: flex;
    background-color: #f5fafd;
    padding: 0 10px;
    margin-bottom: 10px;
    font-size: 13px;
    color: #2d2d2d;
    .item_val {
      flex: 1;
      width: 0;
      overflow: hidden;
      text-align: right;
    }
  }
  .gain_items li {
    background-color: #fdfcf5;
  }
  .limit {
    height: 87px;
    overflow: hidden;
  }
  .btn_spread {
    text-align: center;
    color: #999;
    font-size: 13px;
    line-height: 20px;
    margin: 11px 0 20px 0;
    em {
      display: inline-block;
      width: 20px;
      height: 20px;
      background: url(images/btn_down@2x.png) no-repeat;
      background-size: cover;
      vertical-align: middle;
      position: relative;
      top: -2px;
      transition: all 0.6s;
    }
  }
  .btn_spread.sq {
    em {
      transform: rotate(180deg);
    }
  }
}
.suggest_hd {
  margin-top: 10px;
  background: url(images/line_gray.gif) repeat-x left center;
  text-align: center;
  line-height: 35px;
  span {
    display: inline-block;
    background-color: #f3f4f5;
    padding: 0 10px;
    vertical-align: middle;
    position: relative;
    top: -1px;
    color: #999;
  }
}
.suggest_box {
  text-align: center;
  position: relative;
  img {
    display: block;
  }
  dl {
    position: absolute;
    width: 100%;
    left: 0;
    top: 50%;
    margin-top: -50px;
    color: #fff;
    line-height: 21px;
  }
  dt {
    font-weight: bold;
    font-size: 36px;
    line-height: 50px;
    padding-bottom: 5px;
  }
  dd {
    display: inline-block;
    text-align: left;
    color: #fff;
    font-size: 13px;
  }
}
</style>
