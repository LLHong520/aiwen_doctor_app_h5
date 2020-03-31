<template>
  <div class="end-consultation">
    <span class="split"></span>
    <span class="text">{{text}}</span>
    <span class="split"></span>
  </div>
</template>
<script>
  export default {
    name: "orderFootStatus",
    props: {
      text: {
        type: String,
        default: "",
      }
    },
    data() {
      return {};
    },
    computed: {},
    created() {},
    methods: {},
  };

</script>
<style scoped lang="less" rel="stylesheet/less">
  @r: 75rem;
  .end-consultation{
    margin: 30px 15px;
    display: flex;
    span{
      display: inline-block;
    }
    .text{
      font-size: 26/@r;
      color:rgba(174,177,182,1);
      line-height:18px;
      padding: 0 22/@r;
    }
    .split{
      flex: 1;
      width:100%;
      height: 1;
      border-top: #D9D9D9 solid 2/@r;
      position: relative;
      top:15/@r;
    }
  }
</style>
