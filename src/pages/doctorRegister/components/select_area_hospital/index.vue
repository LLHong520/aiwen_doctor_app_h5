<template>
  <div class="choose-wrapper">
    <!--选择四级-医院-->
    <div class="chose_layer chose_room" v-show="showChoose">
			<div class="chose_top room_top">
        <span class="fl cancel" @click="toogleChoose">取消</span>
        <span class="flex1">医院</span>
      </div>
			<section class="room_list room_rank1 active">
				<dl>
          <dd class="add-hospital" @click="showAddHospital=true"><span class="icon-add"></span>添加医院</dd>
					<dd v-for="(item,index) in hospitalList" @click="chooseFour(index)" :key="item.key">{{item.name}}</dd>
				</dl>
			</section>
		</div>

    <!-- 添加医院 -->
    <addHospital :show.sync="showAddHospital" @confirm="addHospital"></addHospital>
    <!-- /添加医院 -->

  </div>
</template>

<script>
import commonService from "@/services/commonService.js";
import addHospital from "../add_hospital";
export default {
  name: "selectAreaHospital",
  props: {
    basicInfo: {
      type: Object,
      default: () => {
      }
    },
    showChoose: {
      type: Boolean,
      default: false
    },
    currentChoose: {
      type: Object,
      default: () => {
      }
    },
  },
  data() {
    return {
      showAddHospital:false,
      hospitalList:[],
    };
  },
  components: {
    addHospital
  },
  computed: {},
  watch: {
    "currentChoose"(val, oldVal) {
      if(val.areaId != oldVal.areaId) {
        this.getHospital();
        this.basicInfo.medicalInstitutions = "";
      }
    }
  },
  created(){},
  methods: {
    toogleChoose(){
      this.$emit("update:showChoose",!this.showChoose);
    },
    chooseFour(index){//选择四级-医院
      this.basicInfo.medicalInstitutions = this.hospitalList[index].name;
      this.$emit("update:showChoose",false);

      // this.basicInfo.cityId = this.hospitalList[index].cityId;
      // this.basicInfo.provinceId = this.hospitalList[index].provinceId;
      // this.hospitalList=[];//清空医院列表
    },
    getHospital(){
      this.hospitalList = [];
      commonService.getAreaHospitalList(this.currentChoose).then(res=>{
        if(res.status==200 && res.data){
          this.hospitalList = res.data;
        }
      });
    },
    addHospital(name){
      console.log("确定医院");
      console.log(name);
      this.basicInfo.medicalInstitutions = name;
      this.$emit("update:showChoose",false);
      this.showAddHospital=false;
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
  background: #fff;
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
  .chose_top span.back {
    width: 36px;
    height: 44px;
    display: inline-block;
    background: url(~@/assets/images/icon-back2@2x.png) center center no-repeat;
    background-size: 10px auto;
    cursor: pointer;
  }
  .chose_top span.close {
    width: 36px;
    height: 44px;
    display: inline-block;
    background: url(~@/assets/images/common_btn_close_normal@2x.png) center center no-repeat;
    background-size: 16px auto;
    cursor: pointer;
  }
  .room_list {
    margin-top: 44px;
    .add-hospital{
      text-align: center;
      font-size:30/@r;
      color:#607D8B;
      padding: 26/@r 0;
    }
    .icon-add{
      display: inline-block;
      width:40/@r;
      height:40/@r;
      background: url("~@/assets/images/common_icon_add.png") no-repeat;
      background-size: 100% auto;
      margin-right: 10/@r;
      position: relative;
      top:10/@r;
    }
  }
  .room_list dt {
    background: #e5e5e5;
    padding: 0 10px;
    border-bottom: 1px solid #ececec;
  }
  .room_list dd {
    font-size: 30/@r;
    padding: 12/@r 30/@r;
    color:#2D2D2D;
    border-bottom: 1px solid #EFEFEF;
    background: #fff;
    cursor: pointer;
    &.flex-space-between{
      display: flex;
      justify-content: space-between;
    }
    .arrow-right{
      display: inline-block;
      width:40/@r;
      height:40/@r;
      background: url("~@/assets/images/btn_enter.png") no-repeat;
      background-size: 100% 100%;
      margin-left: 4px;
      position: relative;
      top:22/@r;
    }
  }
  .room_list dd:active,
  .room_list dd:hover,
  .room_list dd.current {
    background: #f5f5f5;
  }
    @media screen and(min-device-width:760px) {
    .chose_layer,.chose_top{
      left: 50%;
      margin-left: -380px;
      width: 760px;
    }
  }

  .city-wrapper{
    background: #F3F4F5;
    .title{
      padding: 0 15px;
      font-size: 24/@r;
      color:#999;
      height: 40px;
      line-height: 40px;
    }
  }
  .hot{
    background: #F3F4F5;
    ul{
      margin-right: -16/@r;
      padding: 0 15px;
    }
    li{
      float: left;
      width:31%;
      height: 28px;
      line-height: 28px;
      background: #fff;
      color:#2D2D2D;
      font-size: 26/@r;
      margin: 0 16/@r 16/@r 0;
      text-align: center;
    }
  }
</style>
