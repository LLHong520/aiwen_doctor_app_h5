<template>
  <div class="choose-wrapper">
    <div class="chose_layer chose_room" v-show="this.showChoose">
			<div class="chose_top room_top">
        <span class="fl cancel" @click="toogleChoose">取消</span>
        <span class="flex1">选择城市</span>
      </div>
			<section class="room_list room_rank1 active">
        <div class="city-wrapper hot">
          <p class="title">热门城市</p>
          <ul class="clearfix">
            <li v-for="(item,index) in cityHotList" :key="index" @click="chooseHotCity(index)">{{item.fullName}}</li>
          </ul>
        </div>
        <div class="city-wrapper all">
          <p class="title">所有城市</p>
          <dl>
            <dd class="flex-space-between" v-for="(item,index) in firstList" @click="chooseFirst(index)" :key="item.key">
              <span>{{item.fullName}}</span>
              <i class="arrow-right"></i>
            </dd>
          </dl>
        </div>
			</section>
		</div>
    <!--选择二级-->
    <div class="chose_layer chose_room" v-show="showChooseSecond">
			<div class="chose_top room_top">
        <span class="fl cancel" @click="toogleChoose">取消</span>
        <span class="flex1">市</span>
      </div>
			<section class="room_list room_rank1 active">
				<dl>
					<dd class="flex-space-between" v-for="(item,index) in secondChildren" @click="chooseSubSecond(index)" :key="item.key">
            <span>{{item.fullName}}</span>
            <i class="arrow-right"></i>
          </dd>
				</dl>
			</section>
		</div>
    <!--选择三级-->
    <div class="chose_layer chose_room" v-show="showChooseThird">
			<div class="chose_top room_top">
        <span class="fl cancel" @click="toogleChoose">取消</span>
        <span class="flex1">区</span>
      </div>
			<section class="room_list room_rank1 active">
				<dl>
					<dd class="flex-space-between" v-for="(item,index) in thirdChildren" @click="chooseThird(index)" :key="item.key">
            <span>{{item.fullName}}</span>
            <i class="arrow-right"></i>
          </dd>
				</dl>
			</section>
		</div>

    <!--选择四级-医院-->
    <div class="chose_layer chose_room" v-show="showChooseFour">
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
import registerService from "@/services/registerService.js";
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
    }
  },
  data() {
    return {
      showChooseSecond:false,
      showChooseThird:false,
      showChooseFour:false,
      showAddHospital:false,

      firstList:[],
      secondChildren:[],
      thirdChildren:[],

      cityHotList:[
        {
          fullName:"北京",
          id: "110000"
        },
        {
          fullName:"上海",
          id: "310000"
        },
        {
          fullName:"广州",
          id: "440100"
        },
        {
          fullName:"深圳",
          id: "440300"
        },
        {
          fullName:"杭州",
          id: "330100"
        },
        {
          fullName:"长沙",
          id: "430100"
        },
      ],
      hospitalList:[],
      currentChoose:{
        province:"",
        city:"",
        area:""
      }
    };
  },
  components: {
    addHospital
  },
  computed: {},
  created(){
    this.dapartments();
  },
  methods: {
    dapartments() {
      registerService.getCitys({}).then(res=>{
        if(res.status==200&&res.data){
          this.firstList=res.data;
        }
      });
    },
    toogleChoose(){
      this.$emit("update:showChoose",!this.showChoose);
      if(this.showChooseSecond){
        this.showChooseSecond=false;
      }
      if(this.showChooseThird){
        this.showChooseThird=false;
      }
      if(this.showChooseFour){
        this.showChooseFour=false;
      }
    },
    chooseHotCity(index){//选择热门城市
      let hotCityItem = this.cityHotList[index];
      this.firstList.map((fItem,fIndex)=>{
        if(hotCityItem.id==fItem.id){//一级热门城市
          this.chooseFirst(fIndex);
        }else{
          fItem.children.map((sItem,sIndex)=>{
            if(hotCityItem.id==sItem.id){//二级热门城市
              this.secondChildren=fItem.children;
              this.chooseSubSecond(sIndex);
            }
          });
        }
      });
    },
    chooseFirst(index) {//选择一级
      this.secondChildren=this.firstList[index].children;

      this.basicInfo.provinceName = this.firstList[index].fullName;
      this.basicInfo.provinceId = this.firstList[index].id;

      this.currentChoose.province = this.basicInfo.provinceName;
        
      if(this.secondChildren.length==0){
        this.toogleChoose();
      }else{
        this.$emit("update:showChoose",!this.showChoose);
        this.showChooseSecond=true;
      }
    },
    chooseSubSecond(index) {//选择二级
      this.basicInfo.cityName = this.secondChildren[index].fullName;
      this.basicInfo.cityId = this.secondChildren[index].id;
      this.thirdChildren = this.secondChildren[index].children;
        
      this.currentChoose.city = this.secondChildren[index].fullName;
      this.$emit("update:showChoose",false);
      this.showChooseSecond=false;
      this.showChooseThird=true;
    },
    chooseThird(index){//选择三级
      this.currentChoose.area = this.thirdChildren[index].fullName;
      this.showChooseThird=false;
      this.showChooseFour=true;
      this.getHospital();
    },
    chooseFour(index){//选择四级-医院
      this.basicInfo.medicalInstitutions = this.hospitalList[index].name;
      this.$emit("update:showChoose",false);
      this.showChooseSecond=false;
      this.showChooseThird=false;
      this.showChooseFour=false;
      this.hospitalList=[];//清空医院列表
    },
    getHospital(){
      this.hospitalList = [];
      registerService.getHospital(this.currentChoose).then(res=>{
        if(res.status==200&&res.data){
          this.hospitalList=res.data;
        }
      });
    },
    addHospital(name){
      console.log("确定医院");
      console.log(name);
      this.basicInfo.medicalInstitutions = name;
      this.$emit("update:showChoose",false);
      this.showChooseSecond=false;
      this.showChooseThird=false;
      this.showChooseFour=false;
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
