<template>
  <transition name="confirm-fade">
    <div class="confirm" v-show="showFlag" @click.stop>
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <p class="title">目前只支持执业医师类型的在网页上进行注册</p>
          <p class="text">
            如果是其他类型的（包括执业药师、执业护师、公共营养师、健康管理师、心理咨询师、医学检验技师、康复治疗技师、药剂师）
            <span class="mark">请下载爱问医生诊室App进行注册</span>
          </p>
          <div class="operate">
            <div @click="cancel" class="operate-btn left">取消</div>
            <div @click="confirm" class="operate-btn">下载APP</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    // text: {
    //   type: String,
    //   default: ""
    // },
  },
  data() {
    return {
      showFlag: false,
    };
  },
  methods: {
    show() {
      this.showFlag = true;
    },
    hide() {
      this.showFlag = false;
    },
    cancel() {
      this.hide();
      this.$emit("cancel");
    },
    confirm() {
      this.hide();
      this.$emit("confirm");
    },
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
@r: 75rem;
.confirm{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 9998;
  background-color:rgba(0,0,0,.3);
  &.confirm-fade-enter-active{
    animation: confirm-fadein 0.3s;
    .confirm-content{
      animation: confirm-zoom 0.3s;
    }
  }
  .confirm-wrapper{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    .confirm-content{
      width: 270px;
      border-radius: 13px;
      background: #fff;
      .title{
        padding: 25px 25px 20px;
        line-height: 20px;
        text-align: center;
        font-size:34/@r;
        color: #2D2D2D;
        font-weight: 600;
      }
      .text{
        padding: 0px 25px 25px;
        line-height: 22px;
        font-size:30/@r;
        color: #666;
        .mark{
          color:#4B9BC5;
        }
      }
      .operate{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        text-align: center;
        font-size: 34/@r;
        .operate-btn{
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: 1;
          line-height: 50px;
          border-top: 1px solid #f2f2f2;
          color: #4B9BC5;
          &.left{
            color: #2D2D2D;
            border-right: 1px solid #eee;
          }
        }
      }
    }
  }
}

@keyframes confirm-fadein {
  from {
    opacity:0;
  }

  to {
    opacity:1;
  }
};


@keyframes confirm-zoom {
  0%
    {
      transform: scale(0);
    }
  50%
    {
      transform: scale(1.1);
    }
  100%
    {
      transform: scale(1);
    }
};
</style>
