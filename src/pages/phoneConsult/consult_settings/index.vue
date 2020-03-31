
<template>
  <div class="consult_settings_wrapper">
    <div class="consult_service_wrapper">
      <div class="service_box">
        <p>电话咨询服务</p>
        <a href="javascript:;" :class="['btn_set', {'btn_on': isServiced}]" @click="toggleSet">
          <em class="circle"></em>
        </a>
      </div>

      <template>
        <!-- s---未开通电话咨询---s -->
        <div v-if="!isServiced" class="agreement_box">
          开通电话咨询，实现收费服务，自主定价，开通即表示你同意
          <router-link class="text" :to="{name: 'consultAgreement'}">《电话咨询服务协议》</router-link>
        </div>
        <!-- e---未开通电话咨询---e -->

        <!-- s---开通电话咨询---s -->
        <div v-else-if="isServiced" class="settings_detail_box">
          <div class="settings_item border_top">
            <p>咨询条数设置</p>
            <div class="right_num" @click="openPicker('inquiryNumber')">
              <input readonly type="number" pattern="[0-9]*" v-model="telephoneSetting.inquiryNumber">
              <span>条/天</span>
              <i class="icon-enter"></i>
            </div>
          </div>
          <div class="explain_text">
            设置您每天可以接收的电话咨询条数（最多可设置接收20条咨询）
          </div>
          <div class="settings_item">
            <p>收费设置</p>
            <div class="right_num" @click="openPicker('charge')">
              <input readonly type="number" pattern="[0-9]*" v-model="telephoneSetting.charge">
              <span>元/次</span>
              <i class="icon-enter"></i>
            </div>
          </div>
          <div class="settings_item border_top">
            <p>服务时间设置</p>
            <div class="right_num" @click="openPicker('serviceTime')">
              <input readonly type="number" pattern="[0-9]*" v-model="telephoneSetting.serviceTime">
              <span>分钟/次</span>
              <i class="icon-enter"></i>
            </div>
          </div>
          <div class="explain_text">
            设置每次向您咨询的费用，咨询费用将以金币的形式发放至您的钱包账户
            <span class="money">（1元 = 1金币）</span>
          </div>
          <div @click="toUseGuaid" class="settings_item">
            <p>电话咨询操作流程</p>
            <div class="right_num">
              <i class="icon-enter"></i>
            </div>
          </div>
          <div class="contrl-wrapper">
            <van-button type="danger" @click="confirmSettings">保存</van-button>
          </div>
        </div>
        <!-- e---开通电话咨询---e -->
      </template>
    </div>

    <!-- picker -->
    <picker-custom :show.sync="show_picker" :data="picker" @confirm="handlePickerConfirm"></picker-custom>
    <!-- /picker -->

  </div>
</template>

<script>
import { commonMixin } from "@/mixins";
import mHeader from "@/components/header/index";
import pickerCustom from "./components/picker_custom";
import phoneService from "@/services/phoneService.js";

export default {
  name: "consultSettings",
  mixins: [commonMixin],
  data() {
    return {
      isServiced: false,
      telephoneSetting: {
        inquiryNumber: 5,  //咨询条数
        charge: 99,   //收费
        serviceTime: 30,   //服务时间
        isAvailable: "10001",   //该科室该医生是否允许开通/使用电话咨询服务(是:10001,否:20001)
        isSwitch: "20001",   //该医生是否开通了电话咨询服务(是:10001,否:20001)
      },
      show_picker:false,
      loading:false,
      picker:{
        data:[],
        default:0,
        textTitle:"",
        custom:{
          show:false,
          title:"",
          placeholder:"",
          minNum: 0,
          maxNum: 0
        }
      },

    };
  },
  components: {
    mHeader,
    pickerCustom
  },
  mounted(){
  },
  created(){
    this.renderService();
  },
  methods:{
    openPicker(type){
      let minNum = 0, maxNum = 0, defaultNum = 0, defaultIndex = 0, optionNum=[],
       textTitle="", hasCustom, titleCustom="", tipCustom="", toastMsg="";

      if(type === "inquiryNumber") {
        //咨询条数：1-20
        textTitle = "咨询条数设置";
        hasCustom = false;
        minNum = 1;
        maxNum = 20;
        defaultNum = 5;
        defaultIndex= 4;
        for(var i = minNum; i <= maxNum; i++){
          optionNum.push(i);
        }
      }
      if(type === "charge") {
        //收费：0-5000
        textTitle = "收费设置(元)";
        hasCustom = true;
        titleCustom = "自定义收费";
        tipCustom = "输入0~5000元收费数字";
        toastMsg = "请输入0~5000元正整数";
        minNum = 0;
        maxNum = 5000;
        defaultNum = 99;
        defaultIndex= 2;
        optionNum = [59,79,99,159,199,399];
      }else if(type === "serviceTime") {
        //服务时间：1-120
        textTitle = "服务时间设置(分钟)";
        hasCustom = true;
        titleCustom = "自定义服务时间";
        tipCustom = "输入1~120分钟服务时间";
        toastMsg = "请输入1~120分钟正整数";
        minNum = 1;
        maxNum = 120;
        defaultNum = 30;
        defaultIndex= 3;
        optionNum = [10,15,20,30,50];
      };

      this.picker = {
        data: optionNum,
        default: defaultIndex,
        textTitle: textTitle,
        custom: {
          show:hasCustom,
          title:titleCustom,
          placeholder:tipCustom,
          toastMsg:toastMsg,
          minNum: minNum,
          maxNum: maxNum
        }
      };
      this.show_picker = true;
    },
    handlePickerConfirm(result){
      if(this.picker.textTitle=="咨询条数设置"){
        this.telephoneSetting.inquiryNumber = result;
      }else if(this.picker.textTitle=="收费设置(元)"){
        this.telephoneSetting.charge = result;
      }else if(this.picker.textTitle=="服务时间设置(分钟)"){
        this.telephoneSetting.serviceTime = result;
      }
    },

    //取消
    cancelSettings() {
      this.$router.back(-1);
    },
    //保存
    confirmSettings() {
      this.telephoneSetting.inquiryNumber = this.checkInputValue("inquiryNumber", this.telephoneSetting.inquiryNumber);
      this.telephoneSetting.charge = this.checkInputValue("charge", this.telephoneSetting.charge);
      this.telephoneSetting.serviceTime = this.checkInputValue("serviceTime", this.telephoneSetting.serviceTime);
      this.saveSettings();
    },
    saveSettings() {
      if(this.loading) return;
      this.loading = true;
      let data = {
        // ...this.telephoneSetting
        "inquiryNumber": this.telephoneSetting.inquiryNumber,
        "serviceTime": this.telephoneSetting.serviceTime,
        "charge": this.telephoneSetting.charge,
      };
      phoneService.settingsEdit(data).then((res) => {
        this.loading = false;
        if(res.status == 200) {
          toast.tip("咨询服务设置成功~");
          this.cancelSettings();
        }else {
          // toast.tip("咨询服务设置失败，请重试~");
          toast.tip(res.message);
        };
      }).catch(() => {
        this.loading = false;
      });
    },
    checkInputValue(type, value) {
      let minNum = 0, maxNum = 0, defaultNum = 0;
      let intNum = parseInt(value);

      if(type === "inquiryNumber") {
        //咨询条数：1-20
        minNum = 1;
        maxNum = 20;
        defaultNum = 5;
      }
      if(type === "charge") {
        //收费：0-5000
        minNum = 0;
        maxNum = 5000;
        defaultNum = 99;
      }else if(type === "serviceTime") {
        //服务时间：1-120
        minNum = 1;
        maxNum = 120;
        defaultNum = 30;
      };

      if(isNaN(intNum)) {
        return defaultNum;
      }else if(value == "" || value == 0) {
        return minNum;
      }else {
        if(value < 0) {
          let absVlaue = Math.abs(value);
          //-0.2 绝对值0.2 向下取整为0
          let newValue = Math.floor(absVlaue) == 0 ? minNum : Math.floor(absVlaue);
          return newValue;
        }else {
          let newValue = Math.floor(value);
          newValue = newValue > maxNum ? maxNum : newValue;
          return newValue;
        };
      };
    },
    toggleSet() {
      //正常情况不会执行这个if，不支持的科室在app上不会有此入口
      if(this.telephoneSetting.isAvailable === "20001") {
        toast.tip("抱歉，您当前的科室不支持开通电话咨询服务~");
        return;
      };
      //正常情况不会执行这个if，不支持的科室在app上不会有此入口

      //如果医生已经开通过电话咨询，切换关闭电话咨询
      if(this.telephoneSetting.isSwitch === "10001") {
        if(!this.isServiced) {
          this.isServiced = true;
        }else {
          this.closeService();
        };
      }else {
        //如果医生没有开通过电话咨询，切换只切换按钮状态，不操作关闭接口
        this.isServiced = !this.isServiced;
      };
    },
    closeService() {
      phoneService.settingsClose({}).then((res) => {
        if(res.status == 200) {
          this.isServiced = false;
          toast.tip("咨询服务已关闭~");
        }else {
          this.isServiced = true;

          toast.tip("咨询服务关闭失败，请稍后重试~");
        };
      }).catch(() => {});
    },
    renderService() {
      phoneService.settingsGet({}).then((res) => {
        if(res.status == 200) {

          //isSwitch该医生是否开通了电话咨询服务(是:10001,否:20001)
          //isAvailable该医生是否允许开通/使用电话咨询服务(是:10001,否:20001)

          this.telephoneSetting.isSwitch = res.data.isSwitch;
          this.telephoneSetting.isAvailable = res.data.isAvailable;

          if(this.telephoneSetting.isSwitch === "10001") { //开
            this.isServiced = true;
            this.telephoneSetting = res.data;
          }else { //关
            this.isServiced = false;
          };
        }else {
          this.isServiced = true;
        };
      }).catch(() => {});
    },
    toUseGuaid(){
      this.$router.push({
        name:"phone.useGuaid"
      });
    }
  }
};
</script>

<style scoped lang="less"  rel="stylesheet/less">
@import "./css.less";
</style>
