<!--
  loading ==>加载中
  loadFn ==>点击或滚动加载时执行的函数
  title ==>未加载时的按钮文字
  scroll_load ==>是否开启滚动加载 开启则滚动到页面底部就会加载，否则点击才会加载
-->

<template>
  <div @click="clickFn" class="load_more_wrapper load-btn">
    <div>
      <img v-if="loading" class="load_img" src="../../assets/images/loading.gif" alt="">
    </div>
    <div class="load_text" v-if="!loading">{{title}}</div>
  </div>
</template>
<script>
export default {
  name:"loadingMore",
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    title:{
      type: String,
      default: "加载更多"
    },
    scroll_load:{
      type: Boolean,
      default: false
    }
  },
  created (){
    let This=this;
    if(This.scroll_load){
      This.$nextTick(function(){
        let wrapper_inner = $(This.getScrollEle());
        wrapper_inner.scroll(This.scrollHandler);
      });
    }
  },
  methods: {
    scrollHandler() {
      let This=this;
      let wrapper_inner = $(This.getScrollEle());
      if($(".load-btn").size() > 0){
        let btn_top = $(".load-btn").eq(0).offset().top;
        let scrollTop = wrapper_inner.scrollTop();
        if(btn_top<(platformInfo.deviceInfo.height+scrollTop)&&!This.loading){
          This.$emit("loadFn");
        }
        // if(btn_top < (window.screen.height + scrollTop) && !This.loading) {
        //   This.$emit("loadFn");
        // }
      }
    },
    unbindScrollFn() {
      let wrapper_inner = $(this.getScrollEle());
      wrapper_inner.off("scroll",this.scrollHandler);
    },
    clickFn() {
      this.$emit("loadFn","click");
    },
    //获取添加滚动事件的元素
    getScrollEle() {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      var scrollEle=null;

      if(isiOS && platformInfo.isWeibo){
        scrollEle="#app";
      }else{
        scrollEle=window;
      };

      return scrollEle;
    }
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
@r: 75rem;
.load_more_wrapper {
  text-align: center;
  .load_img {
    display: block;
    margin: 20/@r auto;
  }
  .load_text {
    font-size: 26/@r;
    color: #CCCCCC;
    padding: 20/@r 0;
  }
}
</style>
