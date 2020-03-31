<template>
  <div>
    <!-- <m-header title="电话咨询操作流程"></m-header> -->
    <div class="guaid-images">
      <img src="./images/1@2x.png"/>
      <img src="./images/2@2x.png"/>
      <img src="./images/3@2x.png"/>
      <img src="./images/4@2x.png"/>
      <img src="./images/5@2x.png"/>
    </div>
  </div>
</template>
<script>
import mHeader from "@/components/header/index";
export default {
  name: "use_guaid",
  components: {
    mHeader
  },
  data(){
    return {};
  }
};
</script>
<style lang="less" scoped>
.guaid-images{
  img{
    width: 100%;
  }
}
</style>
