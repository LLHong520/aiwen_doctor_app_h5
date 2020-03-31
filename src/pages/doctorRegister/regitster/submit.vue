
<template>
  <div class="main_wrapper">
    <m-header title="注册账号"></m-header>
    <div class="content-wrapper">
      <section>
        <step :stepIndex="0"></step>
        <div class="regitster-form">
          <div class="group-wrapper">
            <div class="input-tools-wrapper">
              <input type="number" pattern="[0-9]*" v-model="form.phone" @blur="checkPhone" placeholder="请输入手机号"/>
              <i v-if="form.phone&&form.phone.length>0" class="icon-cancel del-r" @click="cancelInputPhone"></i>
            </div>
            <p v-show="error_phone!=''" class="error">{{error_phone}}</p>
          </div>
          <div class="group-wrapper">
            <div class="verification-code">
              <div class="input-tools-wrapper">
                <input type="number" pattern="[0-9]*" v-model="form.code" @blur="checkCode" maxlength="6" placeholder="请输入验证码"/>
                <i v-if="form.code.length>0" class="icon-cancel del-r" @click="cancelInputCode"></i>
              </div>
              <count-down
                :class="{'getCode':true,'disable':sending}"
                :fn="getValidCode"
                :deftext="'发送验证码'"
                ref="btn"
                :second="60"
              ></count-down>
            </div>
            <p v-show="error_code!=''" class="error">{{error_code}}</p>
          </div>
          <div class="group-wrapper">
            <div class="input-tools-wrapper">
              <input :class="{'password':!isShowPwd}" :type="isShowPwd?'text':'password'" v-model="form.password" @blur="checkPassword" maxlength="16" placeholder="请输入6-16个字母或数字的密码"/>
              <i v-if="form.password.length>0" class="icon-cancel del-l" @click="cancelInputPwd"></i>
              <i class="icon-preview view-r" @click="togglePwdView"></i>
            </div>
            <p v-show="error_pwd!=''" class="error">{{error_pwd}}</p>
          </div>
          <div class="btn-wrapper">
            <button class="next-btn" :class="{'active':enable}" @click.prevent="nextRegitster">继续</button>
          </div>
        </div>
      </section>
    </div>

  </div>
</template>

<script>
import mHeader from "@/components/header/index"
import countDown from "@/components/count_down";
import step from "../components/step";
import registerService from "@/services/registerService.js";
import { commonMixin } from "@/mixins";

export default {
  name: "consultHelp",
  mixins: [commonMixin],
  data() {
    return {
      form:{
        phone:"",
        code:"",
        password:""
      },
      error_phone:"",
      error_code:"",
      error_pwd:"",
      sending:false,
      loading:false,
      isShowPwd:false,
      register:{
        status:"success",
      },
      sources: "",
    };
  },
  components: {
    mHeader,
    countDown,
    step
  },
  computed:{
    enable(){
      return !utils.isEmpty(this.form.phone) && utils.isMobile(this.form.phone) && !utils.isEmpty(this.form.code) && !utils.isEmpty(this.form.password);
    }
  },
  mounted() {
  },
  created(){
    sessionStorage.setItem("channel", this.$route.query.channel);
    this.form.phone = this.$route.query.phone;
    this.sources = this.$route.query.sources || "";
    this.init();
  },
  methods:{
    init(){
      if(!utils.isEmpty(this.form.phone) && utils.isMobile(this.form.phone)){
        this.getValidCode();
      }
    },
    async nextRegitster(){
      if(!this.enable) return;
      if(this.loading) return;
      if(!this.checkPhone()) return;
      if(!await this.checkPhoneExit()) return;
      if(!this.checkCode()) return;
      if(!this.checkPassword()) return;

      this.loading = true;
      registerService.register(
        {
          ...this.form,
          cmid: this.$route.query.cmid||""
        }
      )
      .then(res => {
        this.loading = false;
        if (res.status == 200) {
          this.$router.push({
            name:"doctor.infoEdit",
            params:{"id":res.data.id}
          })
        } else {
          if(res.message){
            toast.tip(res.message);
          }
        }
      }).catch(()=>{
        this.loading = false;
      });
    },
    checkPhone(){
      let isPass = false;
      if(this.form.phone==""){
        this.error_phone = "请输入手机号";
        isPass = false;
      }else if(!utils.isMobile(this.form.phone)){
        this.error_phone = "请输入正确的手机号";
        isPass = false;
      }else{
        this.error_phone = "";
        isPass = true;
        // isPass = await this.checkPhoneExit();
        // if(isPass){
        //   this.error_phone = "";
        // }
      }
      return isPass;
    },
    checkPhoneExit(){//判断手机号是否已注册
      return new Promise((resolve, reject) => {
        registerService.phoneverify({phone:this.form.phone}).then((res) => {
          if(res.status == 200) {
            //未注册
            resolve(true);
          }else {
            //已注册
            this.$router.push({
              name:"doctor.tips",
              query:{'type':"registered"}
            });
            resolve(false);
          };
        }).catch(() => {
          // toast.tip("网络走丢了~");
        });
      });
    },
    async getValidCode() {//获取手机验证码
      if(!this.checkPhone()) return;
      if(!await this.checkPhoneExit()) return;
      if (this.sending) return;
      this.sending = true;
      let This = this;
      registerService.registercode({
        phone: utils.trim(this.form.phone),
        sources: this.sources
      })
      .then(res => {
        if (res.status == 200) {
          This.$refs.btn.run();
          setTimeout(function() {
            This.sending = false;
          }, 60000);
          if(this.sources == "bns") {
            this.form.code = res.data.messageCode;
          }else {
            this.form.code = "";
          };
        } else {
          This.sending = false;
          if(res.message){
            toast.tip(res.message);
          }
        }
      });
    },
    checkCode(){
      let isPass = false;
      if(this.form.code==""){
        this.error_code = "请输入验证码";
        isPass = false;
      }else{
        this.error_code = "";
        isPass = true;
      }
      return isPass;
    },
    checkPassword(){
      let isPass = false;
      if(this.form.password==""){
        this.error_pwd = "请输入密码";
        isPass = false;
      }else if(!utils.isPassword(this.form.password)){
        this.error_pwd = "密码格式为6-16位字母或数字";
        isPass = false;
      }else{
        this.error_pwd = "";
        isPass = true;
      }
      return isPass;
    },
    cancelInputPhone(){
      this.error_phone = "";
      this.form.phone="";
    },
    cancelInputCode(){
      this.error_code = "";
      this.form.code="";
    },
    cancelInputPwd(){
      this.error_pwd = "";
      this.form.password="";
    },
    togglePwdView(){
      this.isShowPwd = !this.isShowPwd;
    }
  }
};
</script>

<style scoped lang="less"  rel="stylesheet/less">
@r: 75rem;
// 提交注册表单
.regitster-form{
  padding: 0 30px;
  .group-wrapper{
    margin-bottom: 60/@r;
    position: relative;
    .error{
      position: absolute;
      left:0;
      bottom:-30px;
      color:#E51C23;
      font-size: 24/@r;
      line-height: 18px;
      padding-left: 34/@r;
      padding-bottom: 12/@r;
      background:url("~@/assets/images/common_icon_tips@2x.png") no-repeat 0 4/@r;
      background-size:28/@r 28/@r;
    }
    input{
      width:80%;
      height:100%;
      font-size: 36/@r;
      color:#2D2D2D;
      font-weight:600;
      &::-webkit-input-placeholder{
        font-size: 30/@r;
        font-weight:400;
      }
      &.password{
        letter-spacing:6/@r;
        &::-webkit-input-placeholder{
          letter-spacing:normal;
        }
      }
    }
    .input-tools-wrapper{
      height:80/@r;
      line-height:80/@r;
      border-bottom: 1px solid #EFEFEF;
      .del-r{
        right: 10/@r;
        bottom: 24/@r!important;
      }
    }
    .verification-code{
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #EFEFEF;
      /deep/ .getCode{
        color:#2D2D2D;
        font-size:12px;
        border:1px solid #EFEFEF;
        border-radius:12px;
        padding: 0 8px;
      }
      .input-tools-wrapper{
        width:70%;
        border: none;
      }
      .getCode{
        color:#2D2D2D;
        font-size: 24/@r;
        display: inline-block;
        height:24px;
        line-height:24px;
        margin-top: 14/@r;
      }
    }
  }
}

.input-tools-wrapper{
  position: relative;
  .del-r{
    position:absolute;
  }
  .del-l{
    position:absolute;
    right: 65/@r;
    bottom: 22/@r;
  }
  .view-r{
    position:absolute;
    right: 0;
    bottom: 20/@r;
  }
  .icon-cancel{
    display: inline-block;
    background:url("~@/assets/images/common_btn_close_normal@2x.png") no-repeat;
    background-size:32/@r auto;
    width: 32/@r;
    height: 32/@r;
  }
  .icon-preview{
    display: inline-block;
    background:url('~@/assets/images/login_btn_view_off.png') no-repeat;
    background-size:40/@r auto;
    width: 40/@r;
    height: 40/@r;
  }
}

.btn-wrapper{
  margin-bottom: 60/@r;
  .next-btn{
    margin-top: 20/@r;
  }
}
.next-btn{
  display: inline-block;
  width:100%;
  height:80/@r;
  line-height:80/@r;
  border-radius: 40/@r;
  text-align: center;
  background: #E51C23;
  opacity:0.3;
  color:#FFF;
  font-size: 30/@r;
  &.active{
    background:#E51C23;
    box-shadow:0px 3px 8px 0px rgba(198,8,15,0.18);
    opacity:1;
  }
}
</style>
