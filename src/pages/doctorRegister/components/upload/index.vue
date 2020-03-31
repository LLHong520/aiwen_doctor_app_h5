<template>
  <div class="up_btn_wrapper">
    <ul v-show="successList.length>0" class="image-list-wrapper">
      <li v-for="(item,index) in successList" :key="index">
        <img :src="item.url" @click="preView(item.url)">
      </li>
    </ul>
    <div v-show="!Multify&&successList.length==0" class="up_btn">
      <span class="icon-camera"></span>
      <p v-if="title!=''" class="text">{{title}}</p>
      <p v-if="txt!=''" class="txt">{{txt}}</p>
      <!-- <p v-show="filesLength == 0">上传图片</p>
      <p v-show="filesLength > 0">{{ filesLength }}/{{ limit }}</p> -->
      <input
        :accept="accept"
        type="file"
        @change="handleChange"
        @click="handleClick"
        ref="input"
      />
    </div>

    <div class="chose_layer preView-wrapper" v-show="showPreView">
			<div class="chose_top room_top">
        <span class="fl back" @click="showPreView=false"></span>
        <!-- <span class="flex1"></span> -->
        <span class="fr confirm" @click="deleteImg">删除</span>
      </div>
			<section class="room_list">
        <div class="img-wrapper">
          <img :src="preViewImg">
        </div>
			</section>
    </div>

    <div class="loading" v-show="loading && showLoading">
      <div class="content">
        {{ uploadStatusTxt }}
      </div>
    </div>
  </div>
</template>

<script>
import lrz from "lrz";
import registerService from "@/services/registerService.js";

export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    txt: {
      type: String,
      default: ""
    },
    value: {
      type: Boolean,
      default: false
    },
    filesList: {
      type: Array,
      default: []
    },
    isCompress: { //是否开启压缩，默认开启
      type: Boolean,
      default: true
    },
    limit: { // 图片数量
      type: Number,
      default: 20
    },
    size: { // 图片大小, 单位M
      type: Number,
      default: 5,
    },
    accept: { // 图片格式: image/png,image/jpg,image/jpeg,image/gif
      type: String,
      default: "image/*"
    },
    imgWH: {
      type: String,
      // default: "" // 图片宽高限制，格式：592*296
    },
    showLoading: { // 是否开启上传loading，默认开启
      type: Boolean,
      default: true
    },
    Multify: { // 是否开启多图上传，默认不开启
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      loading: false,
      isSuccess: false,
      showPreView: false,
      uploadStatus: 0, // 失败：-1，上传中：0，成功： 1
      queueList: [],
      successList: [],
      preViewImg:"",//当前预览图片
      currentIndex:0,//当前index
    };
  },
  computed: {
    filesLength() {
      return this.successList.length;
    },
    uploadStatusTxt() {
      let status = this.uploadStatus;

      if (status === -1) {
        return "上传图片失败，请重新上传";
      }
      if (status === 0) {
        return "上传图片中...";
      }
      if (status === 1) {
        return "上传成功！";
      }
      if (status === 2) {
        return "删除成功！";
      }
    }
  },
  watch: {
    filesList(val) {
      this.successList = this.filesList;
    }
  },
  created() {
    this.successList = this.filesList;
  },
  methods: {
    handleChange(e) {
      let file = e.target.files[0];
      e.target.value = "";
      if (!file) { return; }
      if (!this.checkSize(file)) { return; }
      if (!this.checkAccept(file)) { return; }
      if (!this.checkLimit(file)) { return; }
      if (!this.checkScale(file)) { return; }

      this.loading = true;
      this.isCompress ? this.onCompressImg(file) : this.uploadImg(file);
    },
    handleClick(e) {
      this.$emit("click");
      if (this.filesLength >= this.limit) {
        this.$mtoast.tip(`最多选择${ this.limit }张图片,请删除后再添加`);
        e.preventDefault();
      }
    },
    uploadImg(file) {
      let params = new FormData();
      params.append("file", file);

      registerService.uploadImg(params).then( res => {
        let status = 0;
        let time = new Date().getTime(); // 注：被使用的时候才获取到时间戳，不要用在对象属性中

        if (res.status == 200 && res.data) {
          // status = 1;
          this.successList.push({
            ...res.data,
            status: status,
            file: file,
            picId: `img${ time }`
          });
        } else {
          status = -1;
        }

        let fileObj = {
          file: file,
          status: status,
          picId: `img${ time }`,
          ...res.data,
        };

        this.uploadStatus = status;
        this.queueList.push(fileObj);
        this.onEmit(fileObj);
      }).finally( () => {
        // 清空input
        this.$refs.input.value = "";

        // 一定时间后，关闭loading
        setTimeout( () => {
          this.loading = false;
          this.uploadStatus = 0;
        }, 300);
      });
    },
    onEmit(file) {
      this.$emit("change", file, this.successList, this.queueList);
      this.$emit("callback", file, this.successList, this.queueList);
    },
    onCompressImg(file) {
      // 压缩图片
      lrz(file, {
        width: 1200
      })
        .then( res => {
          // 压缩成功
          this.uploadImg(res.file);
        })
        .catch( err => {
          // 压缩失败,直接上传图片
          this.uploadImg(file);
        });
    },
    checkSize(file) {
      let size = (file.size / 1024 / 1024).toFixed(2);
      let max = this.size;

      if (size > max) {
        this.$mtoast.tip(`请选择小于${ this.size }M的图片`);
        return false;
      }

      return true;
    },
    checkAccept(file) {
      let imgType = this.accept.indexOf(file.type) > -1;

      if (this.accept.indexOf("image/*") > -1) {
        return true;
      }
      if (!imgType) {
        return false;
      }

      return true;
    },
    checkLimit(file) {
      let limit = this.successList.length < this.limit;

      if (!limit) {
        this.$mtoast.tip(`最多选择${ this.limit }张图片`);
      }

      return limit;
    },
    checkScale(file) {
      // 检查图片宽高
      if (!this.imgWH) { return true; }

      return new Promise((resolve, reject) => {
        let imgWH = this.imgWH.split("*");
        let width = imgWH[0];
        let height = imgWH[1];
        let _URL = window.URL || window.webkitURL;
        let img = new Image();

        img.onload = function() {
          let valid = img.width == width && img.height == height;
          valid ? resolve() : reject();
        };

        img.src = _URL.createObjectURL(file);
      }).then(() => {
        this.$emit("imgWHErrorCallback", false);
        return file;
      }, () => {
        this.$emit("imgWHErrorCallback", true);
        // this.$message.error(`图片的长宽不符合规范，请上传大小为 ${this.imgWH}的图片!`);
        return Promise.reject();
      });
    },
    preView(url,index){//预览图片
      this.showPreView = true;
      this.preViewImg = url;
      this.currentIndex = index;
    },
    deleteImg(){//删除图片
      this.successList.splice(this.currentIndex,1);
      this.showPreView = false;
      // this.uploadStatus = 2;//删除成功
      this.$emit("delete",this.preViewImg);
    }
  }
};
</script>
<style scoped lang="less">
  @r: 75rem;
  .up_btn_wrapper {
    width:100%;
    height:100%;
    z-index: 9999;
    .up_btn {
      width:100%;
      height:100%;
      input {
        position: absolute;
        width:100%;
        height:100%;
        opacity: 0;
        left: 0;
        top: 0;
      }
      .icon-camera{
        display: inline-block;
        width: 74/@r;
        height:58/@r;
        background: url("~@/assets/images/btn_camera.png") no-repeat;
        background-size: 100% 100%;
        margin-top: 20px;
      }
      .text{
        color:#FFF;
        font-size:24/@r;
        line-height: 28/@r;
        padding: 14/@r 0 0;
      }
      .txt{
        color:#FFF;
        font-size:24/@r;
        line-height: 28/@r;
        padding: 0;
      }
    }
    .image-list-wrapper{
      width:100%;
      height:100%;
      padding: 0px;
      margin: 0px;
    }
    .image-list-wrapper li{
      width:100%;
      height:100%;
      img{
        display: inline-block;
        width:100%;
        height:100%;
        z-index: 9999;
        border-radius: 3px;
      }
    }
    .loading {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 999;
      background: rgba(0, 0, 0, .2);
      display: flex;
      justify-content: center;
      align-items: center;
      .content {
        padding: 9px 10px;
        background: rgba(0, 0, 0, .6);
        color: #fff;
        font-size: 16px;
        border-radius: 4px;
      }
    }
  }

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
  .chose_top span.confirm {
    display: inline-block;
    position: absolute;
    right:20px;
    top:2px;
    color:#E51C23;
    font-size: 28/@r;
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
    // margin-top: 44px;
    height:100%;
    .img-wrapper{
      height:100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        max-width:100%;
      }
    }
  }

  @media screen and(min-device-width:760px) {
  .chose_layer,.chose_top{
    left: 50%;
    margin-left: -380px;
    width: 760px;
  }
  }
</style>
