
<template>
  <div class="null_data">
    <img src="./images/bg_null_normal@2x.png" alt="" />
    <p>{{nullText}}</p>
  </div>
</template>

<script>
import { commonMixin } from "@/mixins";

export default {
  name: "nullData",
  mixins: [commonMixin],
  props: {
    nullText: {
      type: String,
      default: "这里空空如也~"
    }
  },
  data() {
    return {
    };
  },
  components: {
  },
  created(){
  },
  methods:{}
};
</script>

<style scoped lang="less"  rel="stylesheet/less">
@r: 75rem;

.null_data {
  background-color: #fff;
  img {
    width: 390/@r;
    height: 400/@r;
    margin: 0 auto;
  }
  p {
    color: #CCCCCC;
    font-size: 28/@r;
    text-align: center;
    margin-top: 34/@r;
    padding-bottom: 260/@r;
  }
}
</style>
