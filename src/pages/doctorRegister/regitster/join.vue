
<template>
  <component :is="joinComponent"></component>
</template>

<script>
import { commonMixin } from "@/mixins";
import joinAiwen from "../components/join_aiwen";
import joinSina from "../components/join_sina";
export default {
  name: "doctorJoin",
  mixins: [commonMixin],
  data() {
    return {
      joinComponent:"joinAiwen",//默认组件
    };
  },
  components: {
    joinAiwen,
    joinSina
  },
  computed:{},
  mounted() {
  },
  created(){
    if(this.$route.path.indexOf("sina")>-1){//是否是新浪入口
      this.joinComponent = "joinSina";
    }
  },
  methods:{}
};
</script>

<style scoped lang="less"  rel="stylesheet/less"></style>
