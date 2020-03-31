<template>
  <div>
    <top-tip text="上传的证件仅用于认证，不会向患者或第三方公开。如需使用护照或军官证进行身份认证，请到爱问诊室App上操作"></top-tip>
      <step :stepIndex="2"></step>
      <div class="upload-images-wrapper">
        <ul class="upload-list">
          <li>
            <div class="image-box upload">
              <upload-img :size="8" :filesList="imgSelected.img_1" @callback="onUpload" @delete="deleteImg(1)" title="上传身份证正面照片"></upload-img>
            </div>
            <div class="image-box example">
              <img src="~@/assets/images/examples/01.png" />
              <p class="text">正面范例</p>
            </div>
          </li>
          <li>
            <div class="image-box upload">
              <upload-img :size="8" :filesList="imgSelected.img_2" @callback="onUpload" @delete="deleteImg(2)" title="上传身份证背面照片"></upload-img>
            </div>
            <div class="image-box example">
              <img src="~@/assets/images/examples/02.png" />
              <p class="text">背面范例</p>
            </div>
          </li>
          <li>
            <div class="image-box upload">
              <upload-img :size="8" :filesList="imgSelected.img_3" @callback="onUpload" @delete="deleteImg(3)" title="上传手持身份证照片"></upload-img>
            </div>
            <div class="image-box example">
              <img src="~@/assets/images/examples/user_handle_sd_photo.jpg" />
              <p class="text">手持身份证照片范例</p>
            </div>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
import { commonMixin } from "@/mixins";
import step from "../step";
import topTip from "../top_tip";
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
      imgSelected:{
        img_1:[],
        img_2:[],
        img_3:[],
        img1:"",
        img2:"",
        img3:"",
      }
    };
  },
  components: {
    step,
    topTip,
    uploadImg
  },
  watch: {},
  computed: {},
  methods: {
    getImg(){
      let imageList = ["","",""];
      if(this.imgSelected.img_1.length>0){
        this.img1 = this.imgSelected.img_1[0].id;
      }else{
        this.img1 = "";
      }
      if(this.imgSelected.img_2.length>0){
        this.img2 = this.imgSelected.img_2[0].id;
      }else{
        this.img2 = "";
      }
      if(this.imgSelected.img_3.length>0){
        this.img3 = this.imgSelected.img_3[0].id;
      }else{
        this.img3 = "";
      }
      imageList[0] = this.img1;
      imageList[1] = this.img2;
      imageList[2] = this.img3;
      this.basicInfo.identityPics = imageList.join(",");
      console.log(this.basicInfo.identityPics);
    },
    onUpload(file, successList, filesList) {
      this.getImg();
    },
    deleteImg(type){
      if(type==1){
        this.imgSelected.img_1 = [];
      }else if(type==2){
        this.imgSelected.img_2 = [];
      }else if(type==3){
        this.imgSelected.img_3 = [];
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
  // .upload-list{
  //   display: flex;
  //   justify-content: space-between;
  // }
  li{
    display: flex;
    justify-content: space-between;
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
      // /deep/ .icon-camera{
      //   display: inline-block;
      //   width: 74/@r;
      //   height:58/@r;
      //   background: url("~@/assets/images/btn_camera.png") no-repeat;
      //   background-size: 100% 100%;
      //   margin-top: 20px;
      // }
      // /deep/ .text{
      //   color:#FFF;
      //   font-size:24/@r;
      //   margin-top: 10px;
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
</style>
