<template>
  <div>
    <top-tip text="上传的证件仅用于认证，不会向患者或第三方公开"></top-tip>
    <step :stepIndex="2"></step>
    <div class="upload-images-wrapper">
      <div class="descript-wrapper">
        <label class="title">职称认证</label>
        <div class="edit-area" @click="showChooseTitle=true">
          <input type="text" v-model="title.name" readonly placeholder="请选择职称" />
          <i class="arrow-right"></i>
        </div>
      </div>
      <ul class="upload-list">
        <li>
          <div class="image-box upload">
            <upload-img :size="8" :filesList="imgSelected.img_1" @callback="onUpload" @delete="deleteImg(1)" title="上传职称照片"></upload-img>
            <!-- <span class="icon-camera"></span>
            <p class="text">上传职称照片</p> -->
          </div>
          <div class="image-box example">
            <img src="~@/assets/images/examples/07.png" />
            <p class="text">职称范例</p>
          </div>
        </li>
      </ul>
    </div>
    <select-title :showChoose.sync="showChooseTitle" @getData="getTitle"></select-title>
  </div>
</template>

<script>
import { commonMixin } from "@/mixins";
import step from "../step";
import topTip from "../top_tip";
import selectTitle from "../select_title";
import uploadImg from "../upload";
export default {
  name: "uploadIdcard",
  mixins: [commonMixin],
  props: {
    basicInfo: {
      type: Object,
      default: () => {
      }
    },
    stepIndex: {
      type: Number,
      default: 0
    },
  },
  data () {
    return {
      showChooseTitle:false,
      title:{
        name:"",
        value:""
      },
      imgSelected:{
        img_1:[],
        img1:""
      }
    };
  },
  components: {
    step,
    topTip,
    selectTitle,
    uploadImg
  },
  computed: {},
  methods: {
    getTitle(data){
      console.log(data);
      this.title.name = data.name;
      this.title.value = data.value;
      this.basicInfo.titles = data.name;
    },
    getImg(){
      let imageList = [""];
      if(this.imgSelected.img_1.length>0){
        this.img1 = this.imgSelected.img_1[0].id;
      }else{
        this.img1 = "";
      }
      imageList[0] = this.img1;
      this.basicInfo.professionPic = imageList.join(",");
      console.log(this.basicInfo.professionPic);
    },
    onUpload(file, successList, filesList) {
      this.getImg();
    },
    deleteImg(type){
      if(type==1){
        this.imgSelected.img_1 = [];
      }
      this.getImg();
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
@r: 75rem;
.upload-images-wrapper{
  padding: 20px 30px;
  .upload-list{
    display: flex;
    justify-content:center;
  }
  li{
    width: 300/@r;
  }
  .image-box{
    width: 300/@r;
    height:186/@r;
    border-radius: 3px;
    margin-bottom: 15px;
    text-align: center;
    img{
      display: inline-block;
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
    &.upload{
      background: #455A64;
      position: relative;
      // .icon-camera{
      //   display: inline-block;
      //   width: 74/@r;
      //   height:58/@r;
      //   background: url("~@/assets/images/btn_camera.png") no-repeat;
      //   background-size: 100% 100%;
      //   margin-top: 20px;
      // }
      // .text{
      //   color:#FFF;
      //   font-size:24/@r;
      //   line-height: 28/@r;
      //   padding: 10px 0 0;
      // }
    }
    &.example{
      background: #D8D8D8;
      position: relative;
      img{
        width:100%;
        height:auto;
      }
      .text{
        position: absolute;
        left:0;
        bottom: 0;
        width:100%;
        text-align: center;
        height:20px;
        line-height: 20px;
        background:rgba(0,0,0,1);
        opacity:0.4;
        color:#FFF;
        font-size:24/@r;
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
      }
    }
  }
}

.descript-wrapper{
  margin-bottom: 30px;
  height:50px;
  line-height:50px;
  border-bottom:1px solid #EFEFEF;
  display: flex;
  justify-content: space-between;
  label.title{
    font-size:30/@r;
    color:rgba(45,45,45,1);
    padding: 0 0 6px;
    display: inline-block;
  }
  .edit-area{
    flex:1;
    width:75%;
    text-align: right;
    input{
      width:300/@r;
      font-size:30/@r;
      text-align: right;
    }
    .arrow-right{
      display: inline-block;
      width:40/@r;
      height:40/@r;
      background: url("~@/assets/images/btn_enter.png") no-repeat;
      background-size: 100% 100%;
      margin-left: 4px;
      position: relative;
      top:5px;
    }
  }
}

</style>
