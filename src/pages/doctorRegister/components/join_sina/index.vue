
<template>
  <div class="main_wrapper">
    <div class="content-wrapper join-page-wrapper">
      <div class="image-wrapper"><img src="./images/illustration@2x.png" alt=""></div>
      <div class="join-wrapper">
        <div class="join-card">
          <span class="head-logo"></span>
          <p class="title">
            欢迎加入爱问医生
          </p>
          <p class="subtitle"><em></em><span class="text">由新浪健康官方出品</span><em></em></p>
          <div class="join-form">
            <join-form></join-form>
          </div>
        </div>
      </div>
      <div class="image-wrapper"><img src="./images/image1@2x.png" alt=""></div>
      <div class="join-form join-bottom-form">
        <join-form></join-form>
      </div>
      <div class="image-center-wrapper"><img src="./images/share_logo_doctor@2x.png" alt=""></div>
    </div>

  </div>
</template>

<script>
import { commonMixin } from "@/mixins";
import joinForm from "../join_form";
export default {
  name: "doctorJoin",
  mixins: [commonMixin],
  data() {
    return {};
  },
  components: {
    joinForm
  },
  computed:{},
  mounted() {
  },
  created(){},
  methods:{}
};
</script>

<style scoped lang="less"  rel="stylesheet/less">
@import "./css.less";
</style>
