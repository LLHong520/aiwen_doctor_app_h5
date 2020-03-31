
<template>
  <div class="consult_agreement_wrapper">
    <ul class="articleList">
        <li v-for="(item,index) in courseList" :key="index">
          <router-link :to="{name:'courseDetail',params:{id:item.id}}">
            <div class="img_box">
              <img :src="item.cover" alt="">
            </div>
            <div class="info">
              <dl>
                <dt class="title">{{item.title}}</dt>
                <dd class="content">{{item.desc}}</dd>
                <dd class="foot">
                  <span>{{item.number}}人学习</span>
                </dd>
              </dl>
            </div>
          </router-link>
        </li>
      </ul>
  </div>
</template>

<script>
import courseData from "../courseData.js";
import { commonMixin } from "@/mixins";

export default {
  name: "consultAgreementWrapper",
  mixins: [commonMixin],
  data() {
    return {
      courseList:[]
    };
  },
  components: {},
  mounted() {
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
        // this.courseList[i].videoUrl = require("../images/" + this.courseList[i].videoUrl);
      }
    }
  }
};
</script>

<style scoped lang="less"  rel="stylesheet/less">
@r: 75rem;

.consult_agreement_wrapper {
  .agreement_text {
    padding: 40/@r 45/@r 130/@r;
  }
  p,
  h2,
  h3 {
    font-size: 28/@r;
    color: #333333;
    line-height: 44/@r;
  }
  h2 {
    margin: 30/@r 0 20/@r;
  }
  h3 {
    margin: 40/@r 0;
    text-align: center;
    font-weight: normal;
  }
  .text_indent {
    text-indent: 2em;
  }
}

.articleList li {
  border-bottom: 1px solid #EFEFEF;
  padding: 0 15px;
}

.articleList li:last-child {
  border-bottom: 0;
}

.articleList li a{
  display:flex;
  padding: 15px 0;
}

.articleList li .info_wrap{
  width: 100%;
}

.articleList li .img_box{
  width: 242/@r;
  height: 152/@r;
  overflow: hidden;
  text-align: center;
  margin-right: 40/@r;
  border-radius: 8/@r;
  background: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;
}
.articleList li .img_box img{
  display: block;
  max-width: 100%;
  height: auto;
  border-radius: 8/@r;
  background-color: #f2f2f2;
}
.articleList li .info{
  flex: 1;
  box-flex: 1;
  overflow: hidden;
}
.articleList li .info dt{
  font-size: 30/@r;
  line-height: 42/@r;
  height: 84/@r;
  overflow: hidden;
  color: #282828;
  &.title{
    margin: 3px 0;
    font-size: 32/@r;
    height: 32/@r;
    line-height: 32/@r;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.articleList li .info dd{
  &.content{
    height: 72/@r;
    line-height: 36/@r;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
  }
  &.foot{
    height: 40/@r;
    line-height: 45/@r;
    font-size: 24/@r;
    color: #AEB7C6;
  }
}

.articleList li .tit{
  line-height: 40/@r;
  height: 40/@r;
  font-size: 30/@r;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #282828;
}
.articleList li .img_list{
  margin: 0 -3px;
  padding-top: 15px;
  display: flex;
  justify-content: space-between;
}

.articleList li .img_list .img_item{
  float:left;
  width: 222/@r;
  height:140/@r;
  overflow: hidden;
  box-sizing: border-box;
}

.articleList li .img_list .img_item span{
  position: relative;
  width: 222/@r;
  height:140/@r;
  width: 100%;
  display:block;
  border-radius: 8/@r;
}

.articleList li .img_list .img_item img{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  border-radius: 8/@r;
  background-color: #f2f2f2;
}
.articleList li .author_bar {
  height: 44/@r;
  line-height: 44/@r;
  font-size: 24/@r;
  color: #AEB7C6;
  margin-top: 32/@r;
}

.articleList li .face{
  display: block;
  float: left;
  width: 44/@r;
  height: 44/@r;
  margin-right: 16/@r;
}
.articleList li .face img{
  display: block;
  width: 44/@r;
  height: 44/@r;
  border-radius: 44/@r;
  background-color: #f2f2f2;
}
.articleList li .author_name{
  float: left;
}
.articleList li .helpNum {
  float: right;
}
</style>
