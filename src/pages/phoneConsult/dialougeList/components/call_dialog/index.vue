<template>
  <div class="dialog-wrapper">
    <van-dialog
      v-model="show"
      title="电话拨打说明"
      :showConfirmButton="false"
    >
      <a href="javascript:;" class="close" @click="close"></a>
      <div class="custom-wrapper">
        <div class="title">当前你的接听手机电话为：</div>
        <div class="input-wrapper">
          <input v-model="data.phone" type="tel" maxlength="13" @keyup="inputMobile" @paste="inputMobile" @blur="checkPhone" />
        </div>
        <ul class="discript">
          <li>· 号码隐藏双方不可见</li>
          <li>· 请注意接听来自0571的电话</li>
        </ul>
        <div class="contrl-wrapper">
          <van-button type="danger" @click="confrim">立刻拨打</van-button>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
export default {
  name:"callDialog",
  props: {
    show:{
      type:Boolean,
      default:false,
    },
    data:{
      type:Object,
      default:()=>{},
    }
  },
  data() {
    return {
    };
  },
  computed:{
  },
  watch: {
    "data.phone"(phone){
      if(this.show && !utils.isEmpty(phone) && utils.isMobile(phone)){
        this.inputMobile();
      }
    }
  },
  created() {},
  methods: {
    close(){
      this.$emit("update:show", false);
    },
    confrim(){
      if (!this.checkPhone()) return;
      this.$emit("update:show", false);
      this.$emit("confrim",this.data);
    },
    checkPhone(){
      this.data.phone = utils.removeAllSpace(this.data.phone);
      if (this.data.phone == "") {
        toast.tip("请输入手机号");
        return false;
      } else if (!utils.isMobile(this.data.phone)) {
        toast.tip("手机号输入错误，请重新输入");
        return false;
      } else {
        return true;
      }
    },
    inputMobile() {
      let value = this.data.phone.replace(/\D/g, '').substr(0, 11) // 不允许输入非数字字符，超过11位数字截取前11位
      let len = value.length;
      if (len > 3 && len < 8) {
        value = value.replace(/^(\d{3})/g, '$1 ')
      } else if (len >= 8) {
        value = value.replace(/^(\d{3})(\d{4})/g, '$1 $2 ')
      }
      this.data.phone = value;
    },
  }
};
</script>
<style scoped lang="less">
  @r: 75rem;
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
      .title{
        font-size:28/@r;
        color:rgba(153,153,153,1);
        line-height:48/@r;
        text-align: center;
        margin-bottom: 12/@r;
      }
      .discript{
        margin-bottom: 40/@r;
        li{
          font-size:28/@r;
          color:#999999;
          line-height:48/@r;
          text-align: left;
        }
      }
    }
    .input-wrapper{
      margin-bottom: 30/@r;
      padding: 12/@r 0;
      background: #EFEFEF;
      input{
        z-index: 80/@r;
        width:100%;
        text-align: center;
        line-height: 84/@r;
        font-size: 60/@r;
        color:#2D2D2D;
        font-weight: 600;
        background: #EFEFEF;
      }
    }
    .contrl-wrapper{
      .van-button{
        width:100%;
      }
    }
  } 
</style>
