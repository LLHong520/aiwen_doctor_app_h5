<template>
  <div class="dialog-wrapper">
    <van-dialog v-model="show" :title="config.title" :showConfirmButton="false">
      <a href="javascript:;" class="close" @click="hideAction"></a>
      <div class="custom-wrapper">
        <div class="input-wrapper">
          <textarea class="edit" maxlength="200" v-model="content" :placeholder="config.placeholder"></textarea>
          <!-- <van-field maxlength="200" v-model="content" type="textarea" autofocus :placeholder="config.placeholder" rows="3"
            autosize /> -->
          <div class="count_font">{{200 - content.length}}</div>
        </div>
        <div class="contrl-wrapper">
          <van-button type="danger" @click="add">确定添加</van-button>
        </div>
      </div>
    </van-dialog>
  </div>
</template>
<script>
import phraseService from "@/services/phraseService.js";
export default {
  name: "phrasePicker",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    config: {
      type: Object,
      default: () => {
        return {
          title: "添加常用语",
          placeholder: "例如：感谢您的信任，有任何疑问可以随时找我",
        };
      },
    }
  },
  data() {
    return {
      content: "",
      list:""
    };
  },
  created() {
    // this.getList();
  },
  methods: {
    hideAction() {
      this.$emit("cancel");
      this.$emit("update:show", false);
    },
    saveCustom(newItem) {
      this.$emit("successCallback", newItem);
      this.$emit("update:show", false);
    },
    add() {
      // if(this.list.length>=20){
      //   this.$mtoast.tip("最多只能添加20条常用语");
      //   return;
      // }
      let content = utils.trim(this.content);
      if(content == ""){
        this.$mtoast.tip("请输入常用语");
        return;
      }
      this.$toast.loading({
        mask: true,
        message: "保存中..."
      });
      phraseService.saveUsefulExpressions({
        content
      })
        .then((res) => {
          if (res.status == 200 && res.data) {
            this.$mtoast.tip("保存成功！");
            this.content = "";
            res.data.content = utils.replaceBrTag(res.data.content)
            this.saveCustom(res.data);
          } else {
            this.$mtoast.tip(res.message);
          }
        }).finally(() => {
          this.$toast.clear();
        });
    },
    // getList() {
    //   phraseService.findAllUseful({})
    //     .then((res) => {
    //       if (res.status == 200 && res.data) {
    //         this.list = res.data;
    //       }
    //     });
    // }
  }
};

</script>
<style scoped lang="less" rel="stylesheet/less">
  @r: 75rem;

  .dialog-wrapper /deep/ .picker-title {
    height: 38px;
    line-height: 38px;

    span {
      font-size: 26/@r !important;
      height: 38px;
      line-height: 38px;
    }

    h4 {
      font-size: 24/@r;
      color: #AEB1B6 !important;
      height: 38px;
      line-height: 38px;
    }

    .pt-cancel {
      color: #2D2D2D !important;
    }

    .pt-submit {
      color: #4B9BC5 !important;
    }
  }

  .dialog-wrapper /deep/ .picker {
    // height: 222px;
    border-radius: 6px 6px 0px 0px;
  }

  // .dialog-wrapper /deep/ .picker-panel{
  //   padding: 0 12px;
  // }
  // .dialog-wrapper /deep/ .picker-panel .picker-mask-top {
  //   top: 0px;
  // }
  .dialog-wrapper /deep/ .picker-wheel-wrapper .wheel-scroll .wheel-item {
    height: 30px;
    line-height: 30px;
    font-size: 40/@r;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #2D2D2D;
  }

  .dialog-wrapper {
    position: relative;
    .close {
      display: inline-block;
      width: 72/@r;
      height: 72/@r;
      background: url("~@/assets/images/btn_icon_cancel@2x.png") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      left: 10px;
      top: 10px;
    }

    /deep/ .van-dialog__header {
      height: 72/@r;
      line-height: 72/@r;
      margin: 10px 0;
      padding-top: 0;
      font-size: 34/@r;
      font-weight: 600;
      color: rgba(45, 45, 45, 1);
    }

    .custom-wrapper {
      padding: 15px;
    }

    .input-wrapper {
      margin-bottom: 15px;
      background: #F3F4F5;
      border-radius: 4px;
      padding: 24/@r;
      .edit{
        width:100%;
        height: 90px;
        overflow: scroll;
        background: #F3F4F5;
      }
      // /deep/ .van-cell{
      //   max-height: 120px;
      //   overflow: scroll;
      //   background: #F3F4F5;
        
      // }
      // /deep/ .van-cell:not(:last-child):after {
      //   border:none!important;
      // }
      .count_font{
        text-align: right;
        font-size: 24/@r;
        color: #999999;
      }
    }

    .contrl-wrapper {
      .van-button {
        width: 100%;
      }
    }
  }

</style>
