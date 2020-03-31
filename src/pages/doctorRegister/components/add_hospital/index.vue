<template>
  <div class="choose-wrapper">
    <div class="chose_layer chose_room" v-show="this.show">
			<div class="chose_top room_top">
        <span class="fl cancel" @click="cancelChoose">取消</span>
        <span class="flex1">添加医院</span>
        <span class="fr confirm" :class="{'active':hospitalName.length>0}" @click="confirmChoose">保存</span>
      </div>
			<section class="textarea-wrapper">
        <textarea placeholder="请填写医院名称" v-model="hospitalName"></textarea>
        <span class="count" :class="{'error':hospitalName.length>50}">{{50-hospitalName.length}}</span>
			</section>
		</div>
  </div>
</template>

<script>
export default {
  name: "addHospital",
  props: {
    show: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      hospitalName:""
    };
  },
  components: {},
  computed: {},
  created(){
  },
  methods: {
    confirmChoose(){
      if(this.hospitalName.length==0){
        return;
      }else if(this.hospitalName.length>50){
        toast.tip("医院名称不超过50个字");
        return;
      }
      this.$emit("confirm",this.hospitalName.replace(/\s/g, ""));
      this.$emit("update:show",!this.show);
      this.hospitalName = "";
    },
    cancelChoose(){
      this.$emit("update:show",!this.show);
      this.hospitalName = "";
    }
  },
  mounted() {
  },
  destroyed() {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
@r: 75rem;
.chose_layer {
  font-size: 16px;
  line-height: 40px;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  z-index: 9999;
  background: #F3F4F5;
}

.chose_top {
  background: #fff;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  right: 0;
  z-index: 9;
  line-height: 44px;
  border-bottom: 1px solid #ececec;
  display: flex;
  z-index: 9999;
}

.chose_top span.flex1 {
  flex: 1;
  text-align: center;
  color:#2D2D2D;
  font-size: 34/@r;
  font-weight:600;
}
.chose_top span.cancel {
  display: inline-block;
  position: absolute;
  left:20px;
  top:2px;
  color:#2D2D2D;
  font-size: 30/@r;
}
.chose_top span.confirm {
  display: inline-block;
  position: absolute;
  right:20px;
  top:2px;
  color:#CFD8DC;
  font-size: 30/@r;
  &.active{
    color:#607D8B;
  }
}
.textarea-wrapper{
  margin-top: 55px;
  padding: 12px 15px;
  background: #fff;
  position: relative;
  textarea{
    width:100%;
    height:80px;
    background: #fff;
    line-height: 20px;
    font-size:28/@r;
    color:#2D2D2D;
  }
  .count{
    position: absolute;
    right: 12px;
    bottom: 0px;
    color:#999;
    font-size:24/@r;
    &.error{
      color:#E51C23;
    }
  }
}


    @media screen and(min-device-width:760px) {
    .chose_layer,.chose_top{
      left: 50%;
      margin-left: -380px;
      width: 760px;
    }
  }
</style>
