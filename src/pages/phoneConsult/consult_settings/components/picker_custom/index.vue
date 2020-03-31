<template>
  <div class="picker-custom-wrapper">
    <transition name="fade">
      <div class="action_mask" v-show="show" @click="hideAction"></div>
    </transition>

    <transition name="bounce">
      <div class="picker-wrapper" :class="{'custom':data.custom.show}" v-show="show">
        <van-picker
        :columns="data.data"
        :default-index="data.default"
        show-toolbar
        :title="data.textTitle"
        confirm-button-text="确定"
        @cancel="onCancel"
        @confirm="onConfirm" />
        <div v-if="data.custom.show" class="custom_btn" @click="showCustomDialog">自定义</div>
      </div>
    </transition>

    <div class="dialog-wrapper">
      <van-dialog
        v-model="show_dialog"
        :title="data.custom.title"
        :showConfirmButton="false"
      >
        <a href="javascript:;" class="close" @click="closeCustom"></a>
        <div class="custom-wrapper">
          <div class="input-wrapper">
            <input type="text" :placeholder="data.custom.toastMsg" v-model="customValue" />
          </div>
          <div class="contrl-wrapper">
            <van-button type="danger" @click="saveCustom">保存</van-button>
          </div>
        </div>
      </van-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name:"pickerCustom",
  props: {
    show:{
      type:Boolean,
      default:false,
    },
    data: {
      type: Object,
      default: ()=>{}
    }
  },
  data(){
    return{
      show_dialog:false,
      customValue:""
    };
  },
  created (){},
  methods: {
    hideAction(){
      this.$emit("cancel");
      this.$emit("update:show",false);
    },
    onConfirm(value, index) {
      this.$emit("confirm",value);
      this.$emit("update:show",false);
    },
    onCancel() {
      this.$emit("update:show",false);
    },
    showCustomDialog(){
      this.show_dialog = true;
      this.customValue = "";
    },
    closeCustom(){
      this.show_dialog=false;
    },
    saveCustom(){
      if(!this.checkCustom()) return;
      this.$emit("confirm",this.customValue);
      this.show_dialog = false;
      this.$emit("update:show",false);
    },
    checkCustom(){
      this.customValue = utils.trim(this.customValue);
      if(!utils.isNumberPositive(this.customValue)){
        this.$toast(this.data.custom.toastMsg);
        return false;
      }else if(this.customValue<this.data.custom.minNum || this.customValue>this.data.custom.maxNum){
        this.$toast(this.data.custom.toastMsg);
        // this.$toast("请输入" + this.data.custom.minNum + "-" + this.data.custom.maxNum + "正整数");
        // this.$toast("请"+ this.data.custom.placeholder);
        return false;
      }else{
        return true;
      }
    }
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
@r: 75rem;
.picker-wrapper{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  // height: 300px;
  background-color: #fff;
  z-index: 999;
  border-radius: 12/@r 12/@r 0 0;
  &.custom/deep/ .van-picker__columns{
    margin-bottom: 46px;
  }
}


.picker-wrapper{
  // span{
  //   font-size: 26/@r!important;
  //   height: 38px;
  //   line-height: 38px;
  // }
  /deep/ .van-picker{
    border-radius: 12/@r 12/@r 0 0;
  }
  /deep/ .van-picker__toolbar{
    border-radius: 12/@r 12/@r 0 0;
    background: #F9FAFD;
    height: 38px;
    line-height: 38px;
  }
  /deep/ .van-picker__title{
    font-size: 24/@r;
    color: #AEB1B6!important;
    height: 38px;
    line-height: 38px;
  }
  /deep/ .van-picker__cancel{
    height: 38px;
    line-height: 38px;
    color: #2D2D2D!important;
    font-size: 26/@r!important;
  }
  /deep/ .van-picker__confirm{
    height: 38px;
    line-height: 38px;
    color: #4B9BC5!important;
    font-size: 26/@r!important;
  }
  /deep/ .van-hairline--top-bottom:after, .van-hairline-unset--top-bottom:after {
    border-width: 0;
  }
}

.picker-wrapper{
  .custom_btn{
    position: fixed;
    left: 0;
    bottom: 0;
    width:100%;
    height: 46px;
    line-height: 46px;
    text-align: center;
    color: #4B9BC5;
    z-index: 9999999;
  }
}
.picker-wrapper /deep/ .picker{
  // height: 222px;
  border-radius:6px 6px 0px 0px;
}
// .picker-wrapper /deep/ .picker-panel{
//   padding: 0 12px;
// }
// .picker-wrapper /deep/ .picker-panel .picker-mask-top {
//   top: 0px;
// }
.picker-wrapper /deep/ .picker-wheel-wrapper .wheel-scroll .wheel-item{
  height: 30px;
  line-height: 30px;
  font-size: 40/@r;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #2D2D2D;
}

.dialog-wrapper {
  position: relative;
  .close{
    display: inline-block;
    width: 72/@r;
    height: 72/@r;
    background: url("~@/assets/images/btn_icon_cancel@2x.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 10px;
    top: 10px;
  }
  .van-dialog {
    border-radius: 5px;
  }
  /deep/ .van-dialog__header{
    height:72/@r;
    line-height: 72/@r;
    margin: 10px 0;
    padding-top: 0;
    font-size:34/@r;
    font-weight:600;
    color:rgba(45,45,45,1);
  }
  .custom-wrapper{
    padding: 15px;
  }
  .input-wrapper{
    background: #F3F4F5;
    margin-bottom: 15px;
    padding: 12px 15px;
    input{
      background: #F3F4F5;
      width:100%;
      font-size: 36/@r;
      color:#2D2D2D;
      font-weight: 600;
      line-height:50/@r;
      &::-webkit-input-placeholder{
        font-weight:400;
      }
    }
  }
  .contrl-wrapper{
    .van-button{
      width:100%;
    }
  }
}


.action_mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.5;
    z-index: 995;
}
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-out .5s;
}
@keyframes bounce-in {
  0% {
    transform: translateY(500px);
  }

  100% {
    transform: translateY(0px);
  }
}
@keyframes bounce-out {
   0% {
    transform: translateY(0px);
  }

  100% {
    transform: translateY(500px);
  }
}

.fade-enter-active {
  animation: fade-in .5s;
}
.fade-leave-active {
  animation: fade-out .5s;
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 0.5;
  }
}
@keyframes fade-out {
   0% {
    opacity: 0.5;
  }

  100% {
    opacity: 0;
  }
}
</style>
