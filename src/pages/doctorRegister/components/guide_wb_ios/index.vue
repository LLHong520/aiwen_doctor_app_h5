<template>
	<div class="guide-img-wrapper" v-show="show" @click="hideWarrp">
		<img src="./images/guide-img@2x.png" alt="爱问医联" />
	</div>
</template>
<script>
export default {
  name: "guideWbIos",
  props:{
    show:{
      type:Boolean,
      default:false
    }
  },
  methods:{
    hideWarrp(){
      this.$emit("update:show",false);
    }
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
@r: 75rem;
.guide-img-wrapper{
  position:fixed;
  left:0;
  top:0;
  right:0;
  bottom: 0;
  z-index: 9998;
  background-color:rgba(0,0,0,.4);
  img{
    width:432/@r;
    position: absolute;
    right: 4px;
    top:10px;
  }
}
</style>