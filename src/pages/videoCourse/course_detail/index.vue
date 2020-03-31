
<template>
  <div class="consult_help_wrapper">
    <div class="main-content-wrapper">
      <div class="video-wrpper">
        <video :src="detailData.videoUrl" class="video-play c-h5" controls preload="auto"><!-- autoplay="autoplay" # -->
          您的浏览器不支持 video 标签。
        </video>
      </div>
      <div class="course-info">
        <p class="title">{{detailData.title}}</p>
        <div class="info">
          <span class="author">
            <img :src="detailData.image">
            <span class="name">{{detailData.author}}</span>
          </span>
          <span class="publicTime">{{detailData.time}}</span>
        </div>
      </div>
      <div class="course-desc">
        <ul class="tabList">
          <li v-for="(item,index) in tabList" :key="index" @click="toggleMenu(index)" :class="{'active':currentIndex==index}">
            <span>{{item}}</span>
          </li>
        </ul>
        <div class="tab-content">
          <div v-show="currentIndex==0" v-html="detailData.courseDesc"></div>
          <div v-show="currentIndex==1">
            <ul class="catalogList">
              <li v-for="(catalogItem,catalogIndex) in detailData.catalog" :key="catalogIndex">
                <span class="mark">·</span>
                {{catalogItem}}
              </li>
            </ul>
          </div>
          <div class="comment_list_wrapper" v-show="currentIndex==2">
            <ul>
              <li class="comment_list" v-for="(item,index) in comment.list" :key="index">
                <div class="faceImg">
                  <img :src="item.headPhoto" alt="爱问医生">
                </div>
                <div class="content-text">
                  <p class="public-info clearfix">
                    <span class="name">{{item.nickName}}</span>
                    <b v-if="item.toNickName">&nbsp;回复&nbsp;<span class="toNickName">@{{item.toNickName}}</span></b>
                  </p>
                  <p class="time">2019-10-10 11:25</p>
                  <p class="text">{{item.content}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-tools">
      <ul class="toolsList actions" :class="{'two':currentIndex==0}">
        <li>收藏</li>
        <li>学习</li>
        <li v-show="currentIndex!=0">评论</li>
      </ul>
    </div>
  </div>
</template>

<script>
import courseData from "../courseData.js";
import { commonMixin } from "@/mixins";

export default {
  name: "consultHelp",
  mixins: [commonMixin],
  data() {
    return {
      courseList:[],
      detailData:{},
      tabList:["课程介绍","课程目录","评论"],
      currentIndex:0,
      comment:{//评论
        list:[
          {"commentNum":2,"content":"回复测试1","id":"5aaa110c84aed0c817978a6f","pspId":"5aa1fb88e4b09e4e0726887e","bType":1,"sourceForm":"M","toUserId":"5aa2507884aedcecc3e3d7f3","nickName":"幸福彩虹","headPhoto":"face.jpg","toNickName":"闲云-不成雨","fromUserId":"59e071d884aeca351b98d26c","userType":"USER"},
          {"commentNum":2,"content":"DDDDD","id":"5aa2507884aedcecc3e3d7f3","pspId":"5aa1fb88e4b09e4e0726887e","bType":1,"sourceForm":"M","toUserId":null,"nickName":"闲云-不成雨","headPhoto":"1.jpg","toNickName":null,"fromUserId":"5a4d9ca484ae96755224ef94","userType":"USER"}
        ]
      }
    };
  },
  components: {},
  mounted() {
    //解决video标签层级问题
    //获取当前窗口的宽度(不包含滚动条)
    // var windowWidth = $(window).innerWidth();
    // var windowHeight = $(window).innerHeight();
    //获取当前窗口的宽度(包含滚动条)
    // var windowWidth = window.innerWidth;
    // var windowHeight = window.innerHeight;
    // $(".c-h5").css({
    //   width: windowWidth,
    //   height: windowHeight
    // });
  },
  created(){
    this.initData();
  },
  methods:{
    initData(){
      this.courseList = JSON.parse(JSON.stringify(courseData));
      for(var i = 0; i < this.courseList.length; i++){
        this.courseList[i].cover = require("../images/" + this.courseList[i].cover);
        this.courseList[i].image = require("../images/" + this.courseList[i].image);
      }
      this.detailData = this.courseList[this.$route.params.id];
      //评论加载图片
      for(var i = 0; i < this.comment.list.length; i++){
        this.comment.list[i].headPhoto = require("@/assets/images/" + this.comment.list[i].headPhoto);
      }
    },
    toggleMenu(index){
      this.currentIndex = index;
    }
  }
};
</script>

<style scoped lang="less"  rel="stylesheet/less">
@r: 75rem;

.consult_help_wrapper {
  .help_text {
    padding-bottom: 130/@r;
    li {
      padding: 0 45/@r;
      margin-top: 50/@r;
      &:first-child {
        margin-top: 40/@r;
      }
    }
    p {
      font-size: 28/@r;
      color: #333333;
      line-height: 44/@r;
      &:first-child {
        margin-bottom: 10/@r;
      }
    }
  }
}

/*视频播放*/
.video-wrpper {
  height: 200px;
  background: #000;
  margin-bottom: 10px;
  z-index: 2;
  video{
    width:100%;
    height:100%;
    z-index: 2
  }
}

.course-info{
  padding: 0 10px;
  border-bottom:8px #f5f5f5 solid;
  .title{
    font-size: 36/@r;
    font-weight: 600;
    margin-bottom: 2px;
  }
  .info{
    line-height:72/@r;
    padding: 10px 0 0;
    display: flex;
    justify-content: space-between;
    span{
      display:inline-block;
    }
    .name{
      position: relative;
      top:-10px;
      font-size:30/@r;
      padding-left: 3px;
    }
    img{
      width:72/@r;
      height:72/@r;
      border-radius: 50%;
      display: inline-block;
    }
  }
}

.tabList{
  height:40px;
  line-height: 40px;
  display: flex;
  justify-content: space-around;
  li{
    span{
      display:inline-block;
      border-bottom:2px solid #fff;
      font-size: 32/@r;
      color:#555;
      font-weight: 600;
    }
    &.active span{
      border-bottom:2px solid #2688fc!important;
    }
  }
}
.tab-content{
  padding: 15px 15px 15px 25px;
  .catalogList li{
    height: 40/@r;
    line-height: 40/@r;
    vertical-align: middle;
    margin-bottom: 5px;
    font-size:32/@r;
  }
  .mark{
    display: inline-block;
    font-size: 56/@r;
    margin-right: 2px;
    position: relative;
    top:10/@r;
  }
}

.comment_list {
  border-bottom: 1px solid #efefef;
  padding: 10px 15px;
  display: flex;
  .faceImg {
    width: 72/@r;
    height: 72/@r;
    img {
      width: 100%;
      height: 100%;
      border-radius:50%;
    }
  }
  .content-text {
    flex:1;
    padding: 0 0 0 20/@r;
  }
  .public-info {
    font-size:24/@r;
    margin-bottom: 10/@r;
  }
  .name {
    color: #666;
    float: left;
  }
  .time {
    color: #a9a9a9;
    margin-top: -3px;
  }
  .toNickName{
    color:#2688fc;
  }
  .text {
    word-break: break-all;
    font-size:28/@r;
    color: #222;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
  }
}

.footer-tools{
  height: 40px;
  line-height: 40px;
  background-color: #f6f7fa;
  z-index: 99;
  .toolsList{
    height: 40px;
    line-height: 40px;
    background-color: #F6F7FA;
    z-index: 99;
    display:flex;
    padding: 0px 10px;
    position: relative;
    z-index: 998;
    background-color: #fff;
    border-top: 1px solid #dddada;
    width:100%;
    li{
      width:33%;
      border-right: 1px solid #dddada;
      text-align: center;
    }
    &.two li{
      width:50%;
    }
  }
  .actions {
    position: fixed!important;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999!important;
  }
}

</style>
