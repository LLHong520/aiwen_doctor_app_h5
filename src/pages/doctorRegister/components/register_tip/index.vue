<template>
  <div class="tip-wrapper">
    <div class="content">
      <div class="icon-wrapper">
        <span class="icon" :class="{'icon-succss':type=='success','icon-registered':type=='registered'}"></span>
        <p v-if="type=='success'" class="text">提交成功</p>
        <p v-if="type=='registered'" class="text">该账号已注册</p>
      </div>
      <p v-if="type=='success'" class="descrip">尊敬的医生，你提交的资料我们已经收到，审核结果将在3个工作日内通过短信通知你，可添加微信<span class='color-em'>aiwenyisheng-1</span>咨询。</p>
      <p v-if="type=='registered'" class="descrip">尊敬的医生，你输入的账号已注册，可直接登录使用爱问医生诊室。如有疑问，可添加微信<span class='color-em'>aiwenyisheng-1</span>咨询。</p>
    </div>
    <div class="contrl-wrapper">
      <button class="download-app" @click="openDownApp">立即下载App</button>
      <button class="open-app" @click="openDownApp">打开App</button>
    </div>

    <!-- 微博ios环境下下载App引导  -->
    <guide-wb-ios :show.sync="isShowAppGuide"></guide-wb-ios>
  </div>
</template>
<script>
import { commonMixin } from "@/mixins";
import guideWbIos from "../guide_wb_ios";
export default {
  name:"registerTip",
  mixins: [commonMixin],
  props: {
    type:{
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isShowAppGuide:false
    };
  },
  components: {
    guideWbIos
  },
  created (){
    document.body.parentNode.style.backgroundColor = "#F3F4F5";
  },
  methods: {
    openDownApp(){
      if(!this.openApp()){
        this.isShowAppGuide = true;
      }
    }
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
@r: 75rem;
.tip-wrapper{
  .content{
    padding: 30px 32px 5px;
    background: #fff;
  }
}
.icon-wrapper{
  text-align: center;
  .icon{
    display:inline-block;
    width:78px;
    height:78px;
    margin: 26px 0;
    &.icon-succss{
      background: url("./images/result_icon_succeed@2x.png") no-repeat;
      background-size: 100% 100%;
    }
    &.icon-registered{
      background: url("./images/toast_icon_wait@2x.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .text{
    color:#2D2D2D;
    font-size: 20px;
    font-weight: 600;
  }
}
.descrip{
  padding: 15px;
  line-height: 20px;
  color:#999999;
  font-size: 14px;
  .color-em{
    color:#4B9BC5;
  }
}
.contrl-wrapper{
  padding: 20px 35px;
  background: #F3F4F5;
  button{
    width:100%;
    height:40px;
    line-height:40px;
    border-radius:20px;
    text-align: center;
    color:#fff;
    font-size: 15px;
    margin-bottom: 15px;
  }
  .download-app{
    background: #E51C23;
  }
  .open-app{
    background: #fff;
    color:#2D2D2D;
  }
}
</style>
