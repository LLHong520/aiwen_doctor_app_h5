<template>
  <div class="up_btn_wrapper">
    <div class="up_btn">
      <input
        :accept="accept"
        type="file"
        @change="handleChange"
        @click="handleClick"
        ref="input"
      />
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
    value: {
      type: Boolean,
      default: false
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
  },
  data() {
    return {
      loading: false,
      isSuccess: false,
      uploadStatus: 0, // 失败：-1，上传中：0，成功： 1
      queueList: [],
      successList: [],
    };
  },
  computed:{
    filesLength() {
      return this.successList.length;
    },
    uploadStatusTxt() {
      let status = this.uploadStatus;

      if (status === -1) {
        return "发送图片失败，请重新发送";
      }
      if (status === 0) {
        return "发送图片中...";
      }
      if (status === 1) {
        return "发送成功！";
      }
      if (status === 2) {
        return "删除成功！";
      }
    }
  },
  watch: {},
  created() {},
  methods: {
    handleChange(e) {
      let file = e.target.files[0];

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
