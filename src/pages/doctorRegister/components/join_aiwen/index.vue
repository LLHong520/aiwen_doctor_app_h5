
<template>
  <div class="main_wrapper">
    <div class="content-wrapper join-page-wrapper">
      <div class="image-wrapper"><img src="./images/illustration@2x.png" alt="" /></div>
      <div class="join-wrapper">
        <div class="join-card">
          <span class="head-logo"></span>
          <p class="title">欢迎加入爱问医生</p>
          <div class="join-form">
            <join-form></join-form>
          </div>
        </div>
      </div>
      <div class="image-wrapper"><img src="./images/info@2x.png" alt="" /></div>
      <div class="image-wrapper"><img src="./images/image1@2x.png" alt="" /></div>
      <div class="image-bg-wrapper">
        <div class="join-form join-bottom-form">
          <join-form></join-form>
        </div>
      </div>
      <div class="image-center-wrapper"><img src="./images/share_logo_doctor@2x.png" alt="" /></div>
      <div class="download-wrapper fixed-wrapper">
        <span class="download-app" @click="openDownApp" >下载App</span>
      </div>
    </div>

    <!-- 微博ios环境下下载App引导  -->
    <guide-wb-ios :show.sync="isShowAppGuide"></guide-wb-ios>
  </div>
</template>

<script>
import { commonMixin } from "@/mixins";
import guideWbIos from "../guide_wb_ios";
import joinForm from "../join_form";
// import registerService from "@/services/registerService.js";
export default {
  name: "doctorJoin",
  mixins: [commonMixin],
  data() {
    return {
      phone:"",
      error_phone:"",
      isShowAppGuide:false
    };
  },
  components: {
    joinForm,
    guideWbIos
  },
  computed:{},
  mounted() {
  },
  created(){
  },
  methods:{
    openDownApp(){
      if(!this.openApp()){
        this.isShowAppGuide = true;
      }
    }
  }
};
</script>

<style scoped lang="less"  rel="stylesheet/less">
@import "./css.less";
</style>
