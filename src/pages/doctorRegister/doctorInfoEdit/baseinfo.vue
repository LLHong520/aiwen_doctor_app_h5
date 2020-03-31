
<template>
  <div class="main_wrapper">
    <m-header title="注册账号">
      <span slot="left"><i class="icon_back" @click="goback(stepType)"></i></span>
    </m-header>
    <div class="content-wrapper">
    
      <!-- 医生基本信息 -->
      <section v-show="stepType==0">
        <step :stepIndex="1"></step>
        <div class="doctorinfo-edit-wrapper">
          <ul class="doctorinfo-edit">
            <li>
              <label>真实姓名</label>
              <div class="edit-area">
                <input v-model="doctorInfo.realName" placeholder="通过审核后不可修改" />
              </div>
            </li>
            <li>
              <label>性別</label>
              <div class="edit-area">
                <span @click="selectGender('M')" class="sex">男<i class="radio" :class="{'active':doctorInfo.gender=='M'}"></i></span>
                <span @click="selectGender('F')" class="sex">女<i class="radio" :class="{'active':doctorInfo.gender=='F'}"></i></span>
              </div>
            </li>
            <li>
              <label>职业类型</label>
              <div class="edit-area">
                <span @click="selectCareerType">执业医师<i class="arrow-right"></i></span>
              </div>
            </li>
            <li>
              <label>所在地区</label>
              <div class="edit-area edit-area1" @click="showChooseArea = true;">
                <span :class="selectAreaText == '请选择' ? 'color_999' : ''">{{selectAreaText}}</span>
                <i class="arrow-right"></i>
              </div>
            </li>
            <li>
              <label>执业医院/工作单位</label>
              <div v-if="isOthersArea" class="edit-area">
                <span>
                  <input class="ipt_workunit" v-model="doctorInfo.medicalInstitutions" placeholder="请输入" />
                </span>
              </div>
              <div v-else class="edit-area">
                <span>
                  <input v-model="doctorInfo.medicalInstitutions" @click="selectHospital" readonly unselectable="on" placeholder="请选择" /><i class="arrow-right"></i>
                </span>
              </div>
            </li>
            <li>
              <label>科室</label>
              <div class="edit-area">
                <input v-model="doctorInfo.departments" placeholder="请选择" readonly unselectable="on" @click="showChooseDepart=true;" /><i class="arrow-right"></i>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <!-- 身份证上传 -->
      <upload-idcard v-show="stepType==1" :basicInfo="doctorInfo"></upload-idcard>

      <!-- 职业认证上传 -->
      <upload-career v-show="stepType==2" :basicInfo="doctorInfo"></upload-career>

      <!-- 职称认证上传 -->
      <upload-title v-show="stepType==3" :basicInfo="doctorInfo"></upload-title>

      <div class="fixed-bottom">
        <div class="btn-wrapper" :class="{'bg':stepType!=0}">
          <button class="next-btn" :class="{'active':enable}" @click.prevent="nextRegitster(stepType)">继续</button>
        </div>
      </div>
    </div>

    <!-- 选择职业类型提示 -->
    <confirmCareer ref="career_tip" @confirm="openDownApp"></confirmCareer>

    <!--选择科室-->
    <select-depart :showChoose.sync="showChooseDepart" :basicInfo="doctorInfo"></select-depart>

    <!--选择区域-->
    <!-- <select-area :showChoose.sync="showChooseArea" :info="area" @confirm="selectArea"></select-area> -->
    <van-popup
      v-model="showChooseArea"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-area 
        :loading="areaLoading"
        :area-list="allAreaList" 
        :columns-num="3" 
        confirm-button-text="完成" 
        title="所在地区"
        @confirm="areaConfirm" 
        @cancel="areaCancel" />
    </van-popup>

    <!--选择地区医院-->
    <select-area-hospital :showChoose.sync="showChooseAreaHospital" :basicInfo="doctorInfo" :currentChoose="currentChoose"></select-area-hospital>

    <!-- 微博ios环境下下载App引导  -->
    <guide-wb-ios :show.sync="isShowAppGuide"></guide-wb-ios>
  </div>
</template>

<script>
import { commonMixin } from "@/mixins";
import registerService from "@/services/registerService.js";
import commonService from "@/services/commonService.js";
import mHeader from "@/components/header";
import step from "../components/step";
import confirmCareer from "../components/confirmCareer";
import selectDepart from "../components/select_depart";
// import selectArea from "../components/select_area";
import selectAreaHospital from "../components/select_area_hospital";
import uploadIdcard from "../components/upload_idcard";
import uploadCareer from "../components/upload_career";
import uploadTitle from "../components/upload_title";
import guideWbIos from "../components/guide_wb_ios";
import Vue from 'vue';
import { Popup } from 'vant';
Vue.use(Popup);
import { Area } from 'vant';
Vue.use(Area);
// import AwesomePicker from 'vue-awesome-picker';
// Vue.use(AwesomePicker);

export default {
  name: "doctorInfoEdit",
  mixins: [commonMixin],
  data() {
    return {
      stepType:0,
      doctorInfo:{
        id:"",//医生id
        realName:"",//真实姓名
        gender:"M",//男：M  女：F
        profession:"1",//执业类型
        provinceId:"",//省份ID
        provinceName:"",//省份名称
        cityId:"",//城市ID
        cityName:"",//城市名称
        medicalInstitutions:"",//医院名称
        departId:"",//科室Id
        departments:"",//科室名称
        identityPics:"",//身份证图片
        qualificationsPics:"",//执业资格证图片
        professionPic:"",//职称认证图片
        titles:"",//职称
      },
      area:{
        type:"中国大陆"//地区类型
      },
      showChooseDepart:false,
      showChooseArea:false,
      showChooseAreaHospital:false,
      isShowAppGuide:false,
      selectAreaText: "请选择",
      currentChoose: {
        provinceId: "",
        cityId: "",
        areaId: ""
      },
      areaLoading: false,
      allAreaList: {
        province_list: {
          110000: '北京市',
        },
        city_list: {
          110100: '北京市',
        },
        county_list: {
          110101: '东城区',
        }
      },
      provinceList: [],
      cityList: [],
      areaList: [],
    };
  },
  components: {
    mHeader,
    step,
    confirmCareer,
    selectDepart,
    // selectArea,
    selectAreaHospital,
    uploadIdcard,
    uploadCareer,
    uploadTitle,
    guideWbIos
  },
  watch:{},
  computed:{
    enable(){
      if(this.stepType==0){
        return this.doctorInfo.realName!="" && this.doctorInfo.provinceName && this.doctorInfo.medicalInstitutions!="" && this.doctorInfo.departments!="";
      }else if(this.stepType==1){
        let arr = this.doctorInfo.identityPics.split(",");
        return arr[0]!="" && arr[1]!="" && arr[2]!="";
      }else if(this.stepType==2){
        let arr = this.doctorInfo.qualificationsPics.split(",");
        return arr[0]!="" && arr[1]!="";
      }
      // else if(this.stepType==3){
      //   return this.doctorInfo.professionPic!="";
      // }
      else{
        return true;
      }
    },
    //是港澳台和海外
    isOthersArea() {
      return [32, 33, 34, 36].includes(this.doctorInfo.provinceId*1); //地区省级id为36时，表示海外
    }
  },
  mounted() {
  },
  created(){
    this.doctorInfo.id = this.$route.params.id;
    this.getAreaList();
  },
  methods:{
    areaConfirm(data) {
      this.showChooseArea = false;
      let areaNameArr = [], areaCodeArr = [];
      data.map((item) => {
        if(item) {
          areaNameArr.push(item.name);
          areaCodeArr.push(item.code);
        };
      });
      this.selectAreaText = areaNameArr.join("/");
      //选中省市区的code码
      let [provinceCode, cityCode, areaCode] = [areaCodeArr[0], areaCodeArr[1], areaCodeArr[2]];
      //通过code码获取对应的id等参数
      let provinceArr = this.provinceList.filter((item) => {
        return item.dictCode == provinceCode;
      });
      let cityArr = this.cityList.filter((item) => {
        return item.dictCode == cityCode;
      });
      let areaArr = this.areaList.filter((item) => {
        return item.dictCode == areaCode;
      });
      //选中地区的id和名字，用于保存信息
      this.doctorInfo.provinceName = provinceArr.length > 0 ? provinceArr[0].dictValue : "",
      this.doctorInfo.provinceId = provinceArr.length > 0 ? provinceArr[0].dictId : "",
      this.doctorInfo.provinceCode = provinceArr.length > 0 ? provinceArr[0].dictCode : "",
      this.doctorInfo.cityName = cityArr.length > 0 ? cityArr[0].dictValue : "",
      this.doctorInfo.cityId = cityArr.length > 0 ? cityArr[0].dictId : "",
      this.doctorInfo.cityCode = cityArr.length > 0 ? cityArr[0].dictCode : "",
      this.doctorInfo.areaName = areaArr.length > 0 ? areaArr[0].dictValue : "",
      this.doctorInfo.areaId = areaArr.length > 0 ? areaArr[0].dictId : "",
      this.doctorInfo.areaCode = areaArr.length > 0 ? areaArr[0].dictCode : "",

      //选中的省市区的code，用来查询医院
      this.currentChoose = {
        provinceId: provinceCode,
        cityId: cityCode,
        areaId: areaCode,
      };
    },
    areaCancel() {
      this.showChooseArea = false;
    },
    getAreaList() {
      if(this.areaLoading) return;
      this.areaLoading = true;
      commonService.getAllArea().then((res) => {
        this.areaLoading = false;

        if(res.status == 200 && res.data) {
          let allCityArr = [], allAreaArr = [];
          this.provinceList = [];
          this.cityList = [];
          this.areaList = [];
          //获取所有省份
          (res.data || []).map((item) => {
            this.provinceList.push({
              "dictValue": item.dictValue,
              "dictDesc": item.dictDesc,
              "dictCode": item.dictCode,
              "dictId": item.dictId,
            });
            this.allAreaList.province_list[item.dictCode] = item.dictValue;
            allCityArr = allCityArr.concat(item.list);
          });
          //获取所有城市
          allCityArr.map((item) => {
            this.cityList.push({
              "dictValue": item.dictValue,
              "dictDesc": item.dictDesc,
              "dictCode": item.dictCode,
              "dictId": item.dictId,
            });
            this.allAreaList.city_list[item.dictCode] = item.dictValue;
            allAreaArr = allAreaArr.concat(item.list);
          });
          //获取所有区县
          allAreaArr.map((item) => {
            this.areaList.push({
              "dictValue": item.dictValue,
              "dictDesc": item.dictDesc,
              "dictCode": item.dictCode,
              "dictId": item.dictId,
            });
            this.allAreaList.county_list[item.dictCode] = item.dictValue;
          });
        };
      }).catch();
    },
    selectHospital() {
      if(this.currentChoose.provinceId == "") {
        toast.tip("请先选择所在地区");
      }else {
        this.showChooseAreaHospital = true;
      };
    },
    // selectArea(name){
    //   this.doctorInfo.medicalInstitutions = "";
    //   if(name=="港澳台/海外地区"){
    //     this.doctorInfo.provinceName = name;
    //     this.doctorInfo.provinceId = "1";
    //     this.doctorInfo.cityId = "";
    //     this.doctorInfo.cityName = "";
    //   }else{
    //     this.doctorInfo.provinceName = "";
    //     this.doctorInfo.provinceId = "";
    //     this.doctorInfo.cityId = "";
    //     this.doctorInfo.cityName = "";
    //   }
    // },
    selectGender(type){
      this.doctorInfo.gender = type;
    },
    selectCareerType(){
      this.$refs.career_tip.show();
    },
    goback(step){
      let stepType = Number(step),newType;
      if(stepType>0 && stepType<=3){
        newType = stepType-1;
        this.stepType = newType;
      }else{
        this.$router.back(-1);
      }
    },
    nextRegitster(stepType){
      if(!this.enable) return;
      const reg = /^[a-zA-Z\u4e00-\u9fa5]{1,50}$/;
      const checkRealName = reg.test(this.doctorInfo.realName);
      if(!checkRealName) {
        toast.tip("真实姓名仅支持输入中英文");
        return;
      };
      if(Number(stepType)<3){
        let newType = Number(stepType)+1;
        // this.$router.push({
        //   path:this.$route.path,
        //   query:{"stepType":newType}
        // });
        this.stepType = newType;
      }else{
        registerService.doctorinfor(this.doctorInfo)
          .then(res => {
            if (res.status == 200) {//提交成功
              this.$router.push({
                name:"doctor.tips",
                query:{"type":"success"}
              });
            } else {
              if(res.message){
                toast.tip(res.message);
              }
            }
          });
      }
    },
    openDownApp(){
      if(!this.openApp()){
        this.isShowAppGuide = true;
      }
    },
  }
};
</script>

<style scoped lang="less"  rel="stylesheet/less">
@r: 75rem;
@import "./css.less";
</style>
