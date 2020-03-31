<template>
  <div class="step-wrapper">
    <ul class="clearfix"> 
      <li v-for="(item,index) in list" :key="index" :class="{'active':stepIndex==index}">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "step",
  props: {
    stepIndex: {
      type: Number,
      default: 0
    },
  },
  data () {
    return {
      list:["1.注册信息","2.基本信息","3.资料认证"]
    };
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
.step-wrapper{
  padding: 0 35px;
  margin: 20px 0;
  ul{
    width:100%;
    text-align: center;
    padding: 10px 0;
    border:1px solid #EFEFEF;
    border-radius: 40/@r;
    li{
      display: inline-block;
      padding: 0 10px;
      font-size: 30/@r;
      color: #CFCFCF;
      &.active{
        color:#4B9BC5;
      }
    }
  }
}
</style>
