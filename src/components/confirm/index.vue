<template>
  <transition name="confirm-fade">
    <div class="confirm" v-show="showFlag" @click.stop>
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <p class="title" v-if="title!=''">{{title}}</p>
          <p class="text">{{text}}</p>
          <div class="operate">
            <div @click="cancel" class="operate-btn left">{{cancelBtnText}}</div>
            <div @click="confirm" class="operate-btn right">{{confirmBtnText}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: "提示"
    },
    confirmBtnText: {
      type: String,
      default: "确定"
    },
    cancelBtnText: {
      type: String,
      default: "取消"
    }
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
  background-color:rgba(0,0,0,.4);
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
      width: 280px;
      border-radius:5px;
      background: #fff;
      .title{
        padding: 10px 15px;
        line-height: 22px;
        text-align: center;
        color: #333;
      }
      .text{
        padding: 36/@r 36/@r 28/@r;
        line-height:44/@r;
        text-align: center;
        font-size:30/@r;
        color: #2D2D2D;
      }
      .operate{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        text-align: center;
        .operate-btn{
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: 1;
          padding: 24/@r 0;
          border-top: 1px solid #E5E5E5;
          
          line-height: 48/@r;
          &.left{
            font-size: 34/@r;
            color: #666666;
            border-right: 1px solid #E5E5E5;
          }
          &.right{
            font-size: 34/@r;
            color: #4B9BC5;
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
