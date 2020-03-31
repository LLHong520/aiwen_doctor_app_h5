<template>
  <section class="wrapper shareCard">
    <section class="wrapper_inner">
      <template v-for="dataitem in dataList">
        <template v-if="dataitem.module_type == 1">
          <!-- 文章模块 -->
          <a :key="dataitem.key" :href="dataitem.content_link==''? 'javascript:;':dataitem.content_link"
            class="box article flex">
            <div v-if="dataitem.paper_pic" class="img">
              <img v-if="dataitem.paper_pic" :src="dataitem.paper_pic" />
              <!--<img src="https://pic.wenwo.com/fimg/62956905.jpg" />-->
            </div>

            <div class="content">
              <h3>{{ dataitem.title }}</h3>
              <p v-if="dataitem.article_type">
                <label :class="getLabelClass(dataitem.article_type)">{{ dataitem.article_type }}</label>
              </p>
            </div>
          </a>
          <!-- 文章模块 -->
        </template>

        <template v-else-if="dataitem.module_type == 2">
          <!-- 视频模块 -->
          <a :key="dataitem.key" :href="dataitem.content_link==''? 'javascript:;':dataitem.content_link"
            class="box video flex">
            <div v-if="dataitem.paper_pic" class="img">
              <img :src="dataitem.paper_pic" />
            </div>
            <div class="content">
              <h3>{{ dataitem.title }}</h3>
            </div>
          </a>
          <!-- 视频模块 -->
        </template>


        <template v-else-if="dataitem.module_type == 3">
          <!-- 分享标题 -->
          <div :key="dataitem.key" class="box info">
            <h3>{{ dataitem.title }}</h3>
            <section class="rich_text" v-html="dataitem.content"></section>
          </div>
          <!-- /分享标题 -->
        </template>


        <!-- 医生信息模块 -->
        <template v-else-if="dataitem.module_type == 4">
          <div :key="dataitem.key" class="box doc">

            <!-- 医生个人介绍 -->
            <section v-if="isShowDocInstro(dataitem)">
              <div class="flex details">
                <div v-if="dataitem.image" class="img">
                  <img :src="dataitem.image" />
                </div>

                <div class="content">
                  <h2>{{ dataitem.real_name }} <span>{{ dataitem.professional }}</span></h2>
                  <p>
                    <label>{{ dataitem.medical_institutions }}</label>
                    <label>{{ dataitem.department_name }}</label>
                  </p>
                </div>
              </div>

              <div class="introduce">
                {{ dataitem.areas_of_expertise }}
              </div>
            </section>
            <!-- 医生个人介绍 -->

            <!-- <ul>
                <li v-if="dataitem.advice_url">
                  <a :href="dataitem.advice_url==''? 'javascript:;':dataitem.advice_url">
                    图文咨询
                    <i class="icon"></i></a>
                  </li>
                <li v-if="dataitem.outpatient_url">
                  <a :href="dataitem.outpatient_url==''? 'javascript:;':dataitem.outpatient_url">
                    门诊预约 <i class="icon"></i>
                  </a>
                </li>
                <li v-if="dataitem.consultant_url">
                  <a :href="dataitem.consultant_url==''? 'javascript:;':dataitem.consultant_url">
                    进入医生诊室 <i class="icon"></i>
                  </a>
                </li>
              </ul> -->
            <ul>
              <li v-for="(linkItem,index) in getLinkList(dataitem.link_list)" :key="index">
                <a :href="linkItem.link_address==''? 'javascript:;':linkItem.link_address">
                  {{linkItem.link_name}}
                  <i class="icon"></i></a>
              </li>
            </ul>

          </div>
        </template>
        <!-- 医生信息模块 -->


        <template v-else-if="dataitem.module_type == 5">
          <section class="activity-item" v-if="dataitem.activity.length == 1">
            <div class="banner_img">
              <span class="state" v-if="dataitem.activity[0].activity_status=='1'">报名中</span>
              <span class="state" v-if="dataitem.activity[0].activity_status=='2'">火热进行中</span>
              <span class="state" v-if="dataitem.activity[0].activity_status=='3'">已结束</span>
              <a :href="dataitem.activity[0].activity_url">
                <img :src="GET_IMG_URL(dataitem.activity[0].activity_cover)" :alt="dataitem.activity[0].activity_title">
              </a>
              <p class="activity-time">
                活动时间：{{dataitem.activity[0].activity_begin_time | dataFormat}}-{{dataitem.activity[0].activity_end_time | dataFormat}}
              </p>
            </div>
            <div>
              <h2><span
                  class="type">{{getTypeText(dataitem.activity[0].activity_type)}}</span>：{{dataitem.activity[0].activity_title}}
              </h2>
            </div>
          </section>
          <!-- 活动信息模块 -->
          <swiper v-else :options="bannerSwiperBigOption" ref="bannerSwiperBig" class="banner_swiper">
            <swiper-slide v-for="(activity,index) in dataitem.activity" :key="index">
              <section class="activity-item">
                <div class="banner_img">
                  <span class="state" v-if="activity.activity_status=='1'">报名中</span>
                  <span class="state" v-if="activity.activity_status=='2'">火热进行中</span>
                  <span class="state" v-if="activity.activity_status=='3'">已结束</span>
                  <a :href="activity.activity_url">
                    <img :src="GET_IMG_URL(activity.activity_cover)" :alt="activity.activity_title">
                  </a>
                  <p class="activity-time">
                    活动时间：{{activity.activity_begin_time | dataFormat}}-{{activity.activity_end_time | dataFormat}}</p>
                </div>
                <div>
                  <h2><span class="type">{{getTypeText(activity.activity_type)}}</span>：{{activity.activity_title}}</h2>
                </div>
              </section>
            </swiper-slide>
            <!-- Add Pagination -->
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
          <!-- 活动信息模块 -->
        </template>
      </template>
    </section>
    <!-- footer -->
    <footer class="footer">
      <section class="footer_wrapper">
        <img src="./imgs/logo_doctor_base.png" />
      </section>
    </footer>
    <!-- footer -->
  </section>
</template>

<script>
import "swiper/dist/css/swiper.css";
import {
  commonMixin
} from "@/mixins";
import {
  swiper,
  swiperSlide
} from "vue-awesome-swiper";
import shareService from "@/services/shareService.js";
import iask_doctor_logo from "./imgs/iask_doctor_logo@2x.png";
import wxShareFns from "@/common/share";
import {
  APP_URL,
  CW_ACT,
  OUTER_LINKS
} from "@/config";
export default {
  mixins: [commonMixin],
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      dataList: [],
      APP_URL,
      CW_ACT,
      OUTER_LINKS,
      shareId: "",
      bannerSwiperBigOption: {
        observer: true,
        observeParents: true,
        loop: true,
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: true
        },
        initialSlide: 0,
        pagination: {
          el: ".swiper-pagination"
        }
      }
    };
  },
  computed: {
    docInfo() {
      let data = this.dataList.filter((item) => {
        return item.module_type == 4;
      });
      console.log(data);
      console.log(data.length > 0 ? data[0] : null);
      return data.length > 0 ? data[0] : null;
    },
    shareCardShareInfo() {
      let module0 = this.dataList[0];
      return {
        sharing_title: module0.sharing_title,
        cover_url: module0.cover_url,
        sharing_summary: module0.sharing_summary,
      };
    }
  },
  created() {
    this.getData();
  },
  mounted() {
    document.getElementsByTagName("html")[0].style.backgroundColor = "#f3f4f5";
  },
  destroyed() {
    document.getElementsByTagName("html")[0].style.backgroundColor = "#fff";
  },
  methods: {
    isShowDocInstro(data) {
      return data.link_list.some((item) => {
        return item.link_type == 1;
      });
    },
    getLinkList(link_list) {
      return link_list.filter((item) => {
        return item.link_type != 1;
      });
    },
    getLabelClass(typeName) {
      if (!typeName || typeName == "") {
        return "";
      }
      let className = "";
      switch (typeName) {
      case "健康科普":
        className = "type1";
        break;
      case "诊间日记":
        className = "type2";
        break;
      case "病例分析":
        className = "type3";
        break;

      default:
        className = "";
        break;
      }

      return className;
    },
    getTypeText(type) {
      let typeText = {
        1: "公益活动",
        2: "在线课堂",
        3: "微访谈",
      };
      return typeText[type];
    },
    getData() {
      let id = this.$route.query.id || "5c90bbc8502ed600087c8928";
      this.shareId = id;
      shareService.sharing({
        sharing_promotion_id: id
      }).then(res => {
        if (res.data && res.data.shaing_modules_array && res.data.shaing_modules_array.length > 0) {
          this.dataList = res.data.shaing_modules_array;
          this.filterActivity();
        }
        this.setShareInfo(res.data);
      });
    },
    filterActivity() {
      this.dataList.forEach((item, index) => {
        let newActivityList = [];
        if (item.module_type == 5) {
          item.activity.map((activity) => {
            if (activity.activity_id != "") {
              newActivityList.push(activity);
            }
          });
          item.activity = newActivityList;
        }
      });
    },
    setShareInfo() {
      let This = this;
      var lineLink = location.href.split("#")[0];
      let queryString = {
        shareURL: lineLink
      };
      let routeUrl = this.$router.resolve({
        name: "Share",
        query: {
          id: this.shareId
        }
      }).href;
      console.log(routeUrl);
      console.log(This.APP_URL);
      let imgUrl = "";
      let shareTitle = "推荐新浪爱问医生_";
      let descContent = "推荐新浪爱问医生_";
      if (this.shareCardShareInfo) {
        imgUrl = this.shareCardShareInfo.cover_url;
        shareTitle = this.shareCardShareInfo.sharing_title;
        descContent = this.shareCardShareInfo.sharing_summary;
      } else if (this.docInfo) {
        imgUrl = this.docInfo.image;
        shareTitle += this.docInfo.real_name;
        descContent += this.docInfo.real_name + this.docInfo.areas_of_expertise;
      } else {
        imgUrl = This.APP_URL + iask_doctor_logo;
        shareTitle = "新浪爱问医生";
        descContent = "医生互联网诊室的服务者";
      }
      if (imgUrl == "") {
        imgUrl = This.APP_URL + iask_doctor_logo;
      }
      if (shareTitle == "") {
        shareTitle = "新浪爱问医生";
      }
      if (descContent == "") {
        descContent = "医生互联网诊室的服务者";
      }
      console.log("imgUrl", imgUrl);
      console.log(shareTitle);
      console.log(descContent);
      console.log(queryString);
      $.get("https://www.991kang.com/weixin/v1/getJsApiTick?shareURL=" + encodeURIComponent(lineLink), (res) => {
        res = JSON.parse(res);
        if (res.appId) {
          wxShareFns.setConfig(res);
          let url = This.APP_URL + routeUrl;
          let momentUrl = This.APP_URL + routeUrl;
          wxShareFns.setShareInfo({
            lineLink: This.APP_URL + url,
            momentLineLink: This.APP_URL + momentUrl,
            imgUrl: imgUrl,
            shareTitle,
            descContent
          });
        }
      });
    }
  }
};

</script>

<style lang="less" scoped>
  @mt: 5px;
  @bg: #F3F4F5;
  @cardBg: #fff;
  @br: 4px;
  @br3: 3px;
  @color3: #2D2D2D;
  @color6: #666;
  @color9: #999;
  @fs-m: 12px;
  @fs: 14px;
  @fs-l: 16px;
  @img-W-article: 66px;
  @img-W-user: 46px;
  @img-br: 3px;
  @img-br-circle: 50%;
  @box-p: 12px;
  @wrapper-p: 15px;

  html {
    height: 100%;
    background-color: #f3f4f5;
  }

  .wrapper_inner {
    min-height: 530px;
  }

  .activity-item {
    padding: 15px;
    background-color: @cardBg;

    .activity-time {
      color: #fff;
      font-size: 12px;
      background-color: rgba(0, 0, 0, .4);
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 10px;
    }

    h2 {
      margin: 15px 0;
      font-weight: normal;
      font-size: 15px;
      .text-overFlow(1);
    }

    .type {
      color: #2688FC;
    }

    //轮播图
    .banner_img {
      position: relative;
      background-color: #E9EBED;
      min-height: 257/75rem;

      .state {
        position: inline-block;
        right: 10px;
        top: 10px;
        position: absolute;
        height: 34/75rem;
        font-size: 20/75rem;
        padding: 0 5px;
        line-height: 34/75rem;
        color: #fff;
        border-radius: 4px;
        background: rgba(38, 136, 252, .85);
      }

      a {
        min-height: 257/75rem;
        display: block;
        overflow: hidden;
      }

      img {
        max-height: 257/75rem;
        width: 642/75rem;
      }
    }
  }

  .swiper-pagination {
    text-align: center;
    bottom: 7px;

    /deep/.swiper-pagination-bullet {
      width: 4px;
      height: 4px;
      background-color: #7f90a1;
      border-radius: 4px;
      margin: 0 0 0 4px;
    }

    /deep/.swiper-pagination-bullet-active {
      background-color: #7f90a1;
    }
  }

  .footer {
    padding: 25px 0;

    .footer_wrapper {
      padding: 25px 0;
      // position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
    }

    .footer {
      height: 75px;
    }

    img {
      margin: 0 auto;
      display: block;
      width: 108px;
      height: 25px;
    }
  }

  .text-overFlow(@n: 2) {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: @n;
    -webkit-box-orient: vertical;
  }

  .shareCard {
    padding: @wrapper-p;
    color: @color3;
    background-color: @bg;

    .box {
      display: block;
      margin-bottom: @wrapper-p;
      padding: @box-p;
      background: @cardBg;
      border-radius: @br;

      &:last-child {
        margin-bottom: 0;
      }

      h2 {
        font-size: @fs-l;
      }

      h3 {
        .text-overFlow;
        font-size: @fs;
      }

      span,
      label {
        font-size: @fs-m;
      }

      p,
      .introduce {
        margin-top: @mt;
        color: @color9;
      }

      img,
      .img {
        width: @img-W-article;
        height: @img-W-article;
        border-radius: @img-br;
      }

      &.info {
        h3 {
          margin-bottom: @mt;
          .text-overFlow(1);
        }

        section {
          margin-top: 0;

          span:first-child {
            word-break: keep-all;
          }
        }
      }

      &.article {
        label {
          padding: 0px 3px;
          margin-right: 5px;
          color: #42AADB;
          border: 1px solid #42AADB;
          border-radius: 2px;

          &.type1 {
            color: #35C57E;
            border: 1px solid #35C57E;
          }

          &.type3 {
            color: #EF5E63;
            border: 1px solid #EF5E63;
          }
        }
      }

      &.video {
        .img {
          position: relative;

          &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url(../../assets/images/list_btn_video.png) no-repeat center rgba(0, 0, 0, .3);
            border-radius: @img-br;
          }
        }
      }

      &.doc {
        .details {
          h2 {
            span {
              margin-left: 5px;
              font-weight: normal;
            }
          }

          img,
          .img {
            width: @img-W-user;
            height: @img-W-user;
            border-radius: @img-br-circle;
            border: 2px solid #fff;
          }

          p {
            color: @color6;

            label+label {
              margin-left: 5px;
            }
          }
        }

        .introduce {
          .text-overFlow;
          margin-top: @wrapper-p;
        }

        ul {
          a {
            display: block;
            margin-top: @box-p;
            padding: @box-p;
            background: url(../../assets/images/btn_enter.png) no-repeat right #F8FAFD;
            background-position-x: calc(100% - @box-p);
            border-radius: @br3;
            font-size: @fs;
          }
        }
      }
    }

    .flex {
      display: flex;
      align-items: center;

      .content {
        flex: 1;
      }

      .img+div {
        margin-left: @box-p;
      }
    }
  }

  .rich_text {

    /deep/ strong,
    /deep/ b,
    /deep/ h1,
    /deep/ h2,
    /deep/ h3,
    /deep/ h4,
    /deep/ h5,
    /deep/ h6 {
      font-weight: bold;
    }

    /deep/ h1 {
      display: block;
      color: #2D2D2D;
      font-size: 16px;
      line-height: 22px;
    }

    /deep/ h2 {
      display: block;
      color: #999;
      font-size: 12px;
      line-height: 18px;
    }

    /deep/ h3 {
      display: block;
      color: #999;
      font-size: 10px;
      line-height: 16px;
    }

    /deep/ h4 {
      margin: 10px 0;
      display: block;
      font-size: 0.83em;
      line-height: 0.83em;
    }

    /deep/ h5 {
      margin: 10px 0;
      display: block;
      font-size: 0.83em;
      line-height: 0.83em;
    }

    /deep/ h6 {
      margin: 10px 0;
      display: block;
      font-size: 0.67em;
      line-height: 0.67em;
    }

    /deep/ img {
      display: initial;
    }

    /deep/ a {
      text-decoration: underline;
    }

    /deep/ i,
    /deep/ em {
      font-style: italic;
    }

    /deep/ i,
    /deep/ b,
    /deep/ strong {
      font-style: inherit;
    }
  }

</style>
