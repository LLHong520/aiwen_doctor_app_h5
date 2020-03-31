
<template>
  <div class="main_wrapper">
    <register-tip :type="this.$route.query.type"></register-tip>
  </div>
</template>

<script>
import registerTip from "../components/register_tip";
// import registerService from "@/services/registerService.js";
export default {
  name: "doctorTips",
  data() {
    return {
    };
  },
  components: {
    registerTip
  },
  computed:{},
  mounted() {
  },
  created(){
  },
  methods:{
  }
};
</script>

<style scoped lang="less"  rel="stylesheet/less">
</style>
