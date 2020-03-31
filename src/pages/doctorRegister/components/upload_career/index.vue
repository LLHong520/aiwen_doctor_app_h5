<template>
  <div>
    <top-tip text="上传的证件仅用于认证，不会向患者或第三方公开"></top-tip>
      <step :stepIndex="2"></step>
      <div class="upload-images-wrapper">
        <div class="descript-wrapper">
          <p class="title">职业认证<em>*</em></p>
          <p class="content">海外及港澳台医师请上传<span>《外国医师短期行医许可证》</span>或<span>《国内医师执业证》</span>，部队医师请上传<span>《军队医师执业证书》</span></p>
        </div>
        <ul class="upload-list">
          <li>
            <div class="image-box upload">
              <upload-img title="上传执业证首页" :size="8" :filesList="imgSelected.img_1" @callback="onUpload" @delete="deleteImg(1)"></upload-img>
            </div>
            <div class="image-box upload">
              <upload-img title="执业证最新变更页" txt="(选填，变更上传)" :size="8" :filesList="imgSelected.img_3" @callback="onUpload" @delete="deleteImg(3)"></upload-img>
            </div>
            <div class="image-box example">
              <img src="~@/assets/images/examples/03.png" />
              <p class="text">执业证首页范例</p>
            </div>
            <div class="image-box example">
              <img src="~@/assets/images/examples/05.png" />
              <p class="text">执业证最新变更页范例</p>
            </div>
          </li>
          <li>
            <div class="image-box upload">
              <upload-img title="上传执业证姓名与" txt="注册地址页" :size="8" :filesList="imgSelected.img_2" @callback="onUpload" @delete="deleteImg(2)"></upload-img>
            </div>
            <div class="image-box upload">
              <upload-img title="上传胸牌或工作证" txt="(选填)" :size="8" :filesList="imgSelected.img_4" @callback="onUpload" @delete="deleteImg(4)"></upload-img>
            </div>
            <div class="image-box example">
              <img src="~@/assets/images/examples/04.png" />
              <p class="text">执业证姓名与注册地址范例</p>
            </div>
            <div class="image-box example">
              <img src="~@/assets/images/examples/06.png" />
              <p class="text">胸牌或工作证范例</p>
            </div>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
import { commonMixin } from "@/mixins";
import uploadImg from "../upload";
import step from "../step";
import topTip from "../top_tip";
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
        img_4:[],
        img1:"",
        img2:"",
        img3:"",
        img4:"",
      }
    };
  },
  components: {
    step,
    topTip,
    uploadImg
  },
  computed: {},
  methods: {
    getImg(){
      let imageList = ["","","",""];

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

      if(this.imgSelected.img_4.length>0){
        this.img4 = this.imgSelected.img_4[0].id;
      }else{
        this.img4 = "";
      }

      imageList[0] = this.img1;
      imageList[1] = this.img2;
      imageList[2] = this.img3;
      imageList[3] = this.img4;
      this.basicInfo.qualificationsPics = imageList.join(",");
      console.log(this.basicInfo.qualificationsPics);
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
      }else if(type==4){
        this.imgSelected.img_4 = [];
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
    justify-content: space-between;
    margin-bottom: 70px;
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
      // /deep/.icon-camera{
      //   display: inline-block;
      //   width: 74/@r;
      //   height:58/@r;
      //   background: url("~@/assets/images/btn_camera.png") no-repeat;
      //   background-size: 100% 100%;
      //   margin-top: 20px;
      // }
      // /deep/.text{
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
  padding-bottom: 30/@r;
  margin-bottom: 24/@r;
  border-bottom:1px solid rgba(239,239,239,1);
  .title{
    font-size:30/@r;
    color:rgba(45,45,45,1);
    padding: 0 0 6px;
    em{
      color:#E51C23
    }
  }
  .content{
    font-size:24/@r;
    color:#999999;
    line-height:36/@r;
    span{
      text-decoration: underline;
    }
  }
}
</style>
