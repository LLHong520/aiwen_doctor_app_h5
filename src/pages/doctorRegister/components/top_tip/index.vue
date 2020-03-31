<template>
  <div class="pc-tips">
    <span class="icon-tip"></span>
    <p class="tip-text">{{text}}</p>
  </div>
</template>

<script>
export default {
  name: "topTip",
  props: {
    text: {
      type: String,
      default: ""
    },
  },
  data () {
    return {};
  },
  components: {},
  computed: {},
  methods: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
@r: 75rem;
.pc-tips {
  background: #FFF4D2;
  padding: 10px 15px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  .tip-text {
    flex:1;
    color: #263238;
    font-size: 24/@r;
  }
  .icon-tip {
    display: inline-block;
    width: 20px;
    height: 20px;
    // position: relative;
    // top: 7px;
    margin-right: 10px;
    background: url(~@/assets/images/msg_icon_tips@2x.png) no-repeat;
    background-size: 20px auto;
  }
}
</style>
