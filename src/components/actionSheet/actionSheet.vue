<template>
<div>
<transition name="fade">
  <div class="action_mask" v-show="show" @click="hideAction"></div>
</transition>
<transition name="bounce">
  <div class="action" v-show="show">
      <div class="action_title" v-if="title!=''">{{title}}</div>
      <ul class="action_content">
          <li class="item" @click="confirmAction(key+1)" v-for="(elem,key) in items" :key="key">
            <i v-if="elem.iconCtrl" :class="elem.iconCtrl"></i>
            <span :class="elem.textCtrl?elem.textCtrl:''">{{elem.text}}</span>
          </li>
      </ul>
      <div class="action_btn" @click="hideAction">取消</div>
  </div>
</transition>
</div>

</template>
<script>
/**
说明：底部弹出菜单组件
组件属性：
@title
 组件菜单标题
 父组件可以定制此属性用于在菜单列表上方显示一个提示标题
@cancel
 组件被关闭时调用的函数，
 父组件可以定制此属性用于监听关闭【无参数】
@confirm
  组件的菜单列表被点击时调用，
  父组件可以定制此属性用于监听菜单项被点击【参数为当前被点击菜单项的索引】
@items
 组件的菜单列表，
 父组件可以定制此属性用于定制菜单项
@show
 用于控制此组件是否显示，
 父组件可以定制此属性用于显示或隐藏菜单项

@使用示例
<action-sheet
:show.sync="action_show"
@cancel="cancel"
@confirm="confirm"
:items="actionItems"
></action-sheet>

**/
export default {
  props:{
    title:{
      type:String,
      default:"",
    },
    cancel:{
      type:Function,
      default:()=>{},
    },
    confirm:{
      type:Function,
      default:()=>{},
    },
    show:{
      type:Boolean,
      default:false,
    },
    items:{
      type:Array,
      default:()=>[],
    },
  },
  data(){
    return {};
  },
  methods: {
    hideAction(){
      this.$emit("cancel");
      this.$emit("update:show",false);
    },
    confirmAction(index){
      this.$emit("confirm",index);
      this.$emit("update:show",false);
    }
  }
};
</script>
<style scoped lang="less">
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
.action{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    // height: 300px;
    background-color: #efefef;
    z-index: 999;
    border-radius: 12/@r 12/@r 0 0;
    .action_title{
        padding: 0 20px;
        height: 76/@r;
        background-color: #F9FAFD;
        line-height: 76/@r;
        text-align: center;
        color:#AEB1B6;
        border-radius: 12/@r 12/@r 0 0;
    }
    .action_content{
        color: #2d2d2d;
        .item{
            padding: 25/@r 20px;
            border-bottom: 1px solid #EFEFEF;
            line-height: 50/@r;
            background-color: #fff;
            text-align: center;
            font-size: 30/@r;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            &:last-child{border:0;}
            .c_gray{
              color: #2d2d2d;
            }
            .text-css{
              color: #2688FC;
            }
        }
    }
    .action_btn{
      height: 98/@r;
      margin-top: 10/@r;
      background-color: #fff;
      line-height: 98/@r;
      text-align: center;
      color: #AEB1B6;
      font-size: 30/@r;
    }
}

.action_mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.5;
    z-index: 995;
}
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-out .5s;
}
@keyframes bounce-in {
  0% {
    transform: translateY(500px);
  }

  100% {
    transform: translateY(0px);
  }
}
@keyframes bounce-out {
   0% {
    transform: translateY(0px);
  }

  100% {
    transform: translateY(500px);
  }
}

.fade-enter-active {
  animation: fade-in .5s;
}
.fade-leave-active {
  animation: fade-out .5s;
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 0.5;
  }
}
@keyframes fade-out {
   0% {
    opacity: 0.5;
  }

  100% {
    opacity: 0;
  }
}
</style>
