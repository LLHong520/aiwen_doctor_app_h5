<template>
  <div class="choose-wrapper">
    <div class="chose_layer chose_room" v-show="this.showChoose">
			<div class="chose_top room_top">
        <span class="fl cancel" @click="toogleChoose">取消</span>
        <span class="flex1">选择科室</span>
      </div>
			<section class="room_list room_rank1 active">
				<dl>
					<dd class="flex-space-between" v-for="(item,index) in dapartmet_list" @click="chooseDepart(index)" :key="item.key">
            <span>{{item.deptName}}</span>
            <i class="arrow-right"></i>
          </dd>
				</dl>
			</section>
		</div>
    <!--选择二级-->
    <div class="chose_layer chose_room" v-show="showChooseSubDepart">
			<div class="chose_top room_top">
       <span class="fl cancel" @click="toogleChoose">取消</span>
        <span class="flex1">{{chooseDepartInfo.depart.deptName+"-"}}选择二级科室</span>
      </div>
			<section class="room_list room_rank1 active">
				<dl>
					<dd v-for="(item,index) in childDeparts" @click="chooseSubDepart(index)" :key="item.key">{{item.deptName}}</dd>
				</dl>
			</section>
		</div>
  </div>
</template>

<script>
import registerService from "@/services/registerService.js";
export default {
  name: "chooseDepart",
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
      showChooseSubDepart:false,
      showChooseThirdDepart:false,
      dapartmet_list:[],
      childDeparts:[],
      chooseDepartInfo:{
        depart:{
          deptId:"",
          deptName:""
        },
        childDepart:{
          deptId:"",
          deptName:""
        }
      },
    };
  },
  components: {},
  computed: {},
  created(){
    this.dapartments();
  },
  methods: {
    dapartments() {
      registerService.department({}).then(res=>{
        if(res.status==200&&res.data){
          this.dapartmet_list=res.data;
        }
      });
    },
    toogleChoose(){
      this.$emit("update:showChoose",!this.showChoose);
      if(this.showChooseSubDepart){
        this.showChooseSubDepart=false;
      }
    },
    chooseDepart(index) {
      this.chooseDepartInfo.depart=this.dapartmet_list[index];
      let children=this.dapartmet_list[index].children;
      if(children.length==0){
        this.basicInfo.departments=this.chooseDepartInfo.depart.deptName;
        this.basicInfo.departId=this.chooseDepartInfo.depart.deptId;
        this.toogleChoose();
      }else{
        this.childDeparts=children;
        this.$emit("update:showChoose",!this.showChoose);
        this.showChooseSubDepart=true;
      }
    },
    chooseSubDepart(index) {
      this.basicInfo.departments=this.childDeparts[index].deptName;
      this.basicInfo.departId=this.childDeparts[index].deptId;
      this.$emit("update:showChoose",false);
      this.showChooseSubDepart=false;
    },
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
</style>
