<template>
  <div>
    <div class="group-wrapper">
      <div class="input-tools-wrapper">
        <input 
          v-model="phone"
          @blur="checkPhone"
          placeholder="输入手机号" 
          maxlength="11"
        />
        <i v-if="phone&&phone.length>0" class="icon-cancel del-r" @click="cancelInputPhone"></i>
      </div>
      <p v-show="error_phone!=''" class="error">{{error_phone}}</p>
    </div>
    <div class="next-btn-wrapper">
      <button class="next-btn active" @click.prevent="nextRegitster">立即注册</button>
      <div class="agreement-wrapper">
        <span class="icon-agree" :class="{'active':isAgree}" @click="isAgree=!isAgree"></span>
        <span class="text">
          点击立即注册，则默认阅读并同意
          <router-link :to="{name:'doctor.agreement'}">《爱问医生注册协议》</router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import registerService from "@/services/registerService.js";
export default {
  name: "joinForm",
  props: {},
  data() {
    return {
      isAgree: false,
      phone: "",
      error_phone: "",
      sources: ""
    };
  },
  created() {
    this.sources = this.$route.query ? this.$route.query.sources : "";
  },
  components: {},
  computed: {
    // enable(){
    //   return !utils.isEmpty(this.phone) && utils.isMobile(this.phone);
    // }
  },
  methods: {
    async nextRegitster() {
      // if(!this.enable) return;
      if (!this.checkPhone()) return;
      if (!this.isAgree) {
        toast.tip("请先勾选同意《爱问医生注册协议》");
        return;
      }
      if (!(await this.checkPhoneExit())) return;
      this.$router.push({
        name: "doctor.register",
        query: {
          phone: this.phone,
          cmid: this.$route.query.cmid || "",
          sources: this.sources,
        }
      });
    },
    checkPhone() {
      //校验手机号
      let isPass = false;
      if (this.phone == "") {
        this.error_phone = "请输入手机号";
        isPass = false;
      } else if (!utils.isMobile(this.phone)) {
        this.error_phone = "请输入正确的手机号";
        isPass = false;
      } else {
        this.error_phone = "";
        isPass = true;
        // isPass = await this.checkPhoneExit();
        // if(isPass){
        //   this.error_phone = "";
        // }
      }
      return isPass;
    },
    checkPhoneExit() {
      //判断手机号是否已注册
      return new Promise((resolve, reject) => {
        registerService
          .phoneverify({ phone: this.phone })
          .then(res => {
            console.log("1111111111111111111");
            if (res.status == 200) {
              //未注册
              resolve(true);
            } else {
              //已注册
              this.$router.push({
                name: "doctor.tips",
                query: { type: "registered" }
              });
              resolve(false);
            }
          })
          .catch(() => {
            // toast.tip("网络走丢了~");
          });
      });
    },
    cancelInputPhone() {
      this.error_phone = "";
      this.phone = "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
@r: 75rem;
.group-wrapper {
  margin-bottom: 40 / @r;
  position: relative;
  .error {
    position: absolute;
    left: 10 / @r;
    top: -52 / @r;
    color: #e51c23;
    font-size: 24 / @r;
    line-height: 20px;
    text-align: center;
    padding-left: 34 / @r;
    background: url("~@/assets/images/common_icon_tips@2x.png") no-repeat 0 6 /
      @r;
    background-size: 28 / @r 28 / @r;
  }
  input {
    width: 70%;
    height: 100%;
    font-size: 36 / @r;
    color: #2d2d2d;
    text-align: center;
    font-weight: 600;
    &::-webkit-input-placeholder {
      font-size: 30 / @r;
      font-weight: 400;
    }
  }
  .input-tools-wrapper {
    position: relative;
    width: 100%;
    height: 80 / @r;
    line-height: 80 / @r;
    border: 1px solid rgba(179, 179, 179, 0.3);
    border-radius: 40 / @r;
    text-align: center;
    .del-r {
      position: absolute;
      right: 30 / @r;
      bottom: 24 / @r;
    }
    .icon-cancel {
      display: inline-block;
      background: url("~@/assets/images/common_btn_close_normal@2x.png")
        no-repeat;
      background-size: 32 / @r auto;
      width: 32 / @r;
      height: 32 / @r;
    }
  }
}

.next-btn {
  display: inline-block;
  width: 100%;
  height: 80 / @r;
  line-height: 80 / @r;
  border-radius: 40 / @r;
  text-align: center;
  background: #e51c23;
  opacity: 0.3;
  color: #fff;
  font-size: 30 / @r;
  &.active {
    background: #e51c23;
    box-shadow: 0px 3px 8px 0px rgba(198, 8, 15, 0.18);
    opacity: 1;
  }
}

.agreement-wrapper {
  margin-top: 48 / @r;
  color: #cfcfcf;
  font-size: 22 / @r;
  line-height: 32 / @r;
  .text {
    vertical-align: top;
  }
  a {
    color: #6fb0fd;
    vertical-align: top;
  }
  .icon-agree {
    display: inline-block;
    width: 24 / @r;
    height: 24 / @r;
    margin-right: 4 / @r;
    border: 1px solid #cfcfcf;
    &.active {
      background: url("~@/assets/images/icon_select@2x.png") no-repeat center;
      background-size: 20 / @r 20 / @r;
    }
  }
}
</style>