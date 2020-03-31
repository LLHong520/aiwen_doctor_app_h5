<template>
  <div class="choose-wrapper">
    <div class="chose_layer chose_room" v-show="this.showChoose">
			<div class="chose_top room_top">
        <span class="fl cancel" @click="toogleChoose">取消</span>
        <!-- <span class="fl back" @click="toogleChoose"></span> -->
        <span class="flex1">选择职称</span>
        <!-- <span class="fr close" @click="toogleChoose"></span> -->
      </div>
			<section class="room_list room_rank1 active">
				<dl>
					<dd v-for="(item,index) in list" @click="chooseTitle(index)" :key="item.key">{{item.name}}</dd>
				</dl>
			</section>
		</div>
  </div>
</template>

<script>
export default {
  name: "selectTitle",
  props: {
    showChoose: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      list:[
        {
          name:"主任医师",
          value:"0"
        },
        {
          name:"副主任医师",
          value:"1"
        },
        {
          name:"主治医师",
          value:"2"
        },
        {
          name:"住院医师",
          value:"3"
        },
        {
          name:"助理医师",
          value:"4"
        },
      ]
    };
  },
  components: {},
  computed: {},
  created(){
  },
  methods: {
    chooseTitle(index){
      this.$emit("update:showChoose",!this.showChoose);
      this.$emit("getData",this.list[index]);
    },
    toogleChoose(){
      this.$emit("update:showChoose",!this.showChoose);
      // this.$emit("getData",{name:"",value:""});
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
