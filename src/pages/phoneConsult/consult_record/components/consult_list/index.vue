<template>
  <section>
    <div v-if="consultList.length > 0" class="item_wrapper">
      <div class="item" :class="{'item_new':item.doctorIsRead=='20001'}" v-for="(item, index) in consultList"
        :key="index">

        <van-swipe-cell :on-close="onClose" :name="item.patientId">
          <router-link :to="{name: 'dialougeList', params: { id: item.patientId},query:{'nickName': item.userResult.userName}}">
            <div class="photo_wrapper">
              <img :src="item.userResult.avatar" alt="" />
            </div>
            <div class="content_wrapper">
              <div class="info">
                <p class="nick_name">{{item.userResult.userName}}</p>
                <div class="date_wrapper">
                  <i class="icon_time"></i>
                  <span class="date_time">{{item.createDate|dataFormat}}</span>
                </div>
              </div>
              <div class="question">
                <p :class="{'red':item.telephoneConsultationOrder.orderStatus=='20001'}" v-if="item.telephoneConsultationOrder">
                  [{{orderStatusMap[item.telephoneConsultationOrder.orderStatus]}}]</p>
                <p v-else-if="item.type == '10001'">{{item.content}}</p>
                <p v-else-if="item.type == '20001'">{{item.content}}</p>
                <p v-else-if="item.type == '40001'">[图片]</p>
                <p v-else-if="item.type == '60001'">{{item.content}}</p>
                <p v-else-if="item.type == '70001'">{{item.content}}</p>
              </div>
            </div>
          </router-link>
          <template slot="right">
            <van-button square type="danger" text="删除" style="height:100%" />
          </template>
        </van-swipe-cell>
      </div>
      <loading-more :loading="loading" :title="loadingText" @loadFn="renderDataList" :scroll_load="true"></loading-more>
    </div>

    <null-data v-else :nullText="nullText"></null-data>
  </section>
</template>

<script>
  import {
    commonMixin
  } from "@/mixins";
  import nullData from "../null_data/index";
  import loadingMore from "@/components/loading_more/index";
  import phoneService from "@/services/phoneService.js";
  export default {
    name: "consultList",
    mixins: [commonMixin],
    props: {},
    data() {
      return {
        nullText: "你收到的咨询将显示在这里",
        loading: false,
        loadingText: "加载更多",
        consultList: [],
        pageSize: 10,
        pageIndex: 0,
        isThereMore: true,
        orderStatusMap: {
          10001: "待支付订单",
          20001: "待确认订单",

          30001: "已取消订单", //未支付取消-（用户未支付就主动取消）
          40001: "已取消订单", //支付取消(用户支付了医生确认前取消)
          50001: "已取消订单", //支付超时取消

          60001: "已退款结束", //医生取消 已取消订单
          70001: "已确认订单", //已确认待通话(医生已确认,订单无法取消))

          80001: "订单超时关闭", //超时取消
          80002: "已取消订单", //超时取消

          90001: "已完成订单", //待评价(可拨打)
          90002: "已完成订单", //待评价(不拨打)
          99999: "已完成订单", //订单已关闭，支付超时取消(用户评价完,订单关闭)
        }
      };
    },
    components: {
      nullData,
      loadingMore
    },
    mounted() {
      document.body.addEventListener("focusout",()=>{
        setTimeout(()=>{
          const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
          window.scroll(0, Math.max(scrollHeight - 1 , 0));
        },100);
      });
    },
    created() {
      this.renderDataList();
    },
    methods: {
      onClose(clickPosition, instance, id) {
        switch (clickPosition) {
          case "left":
          case "cell":
          case "outside":
            instance.close();
            break;
          case "right":
            this.$dialog.confirm({
              message: "确定删除该患者相关对话？",
              confirmButtonText:"删除",
              confirmButtonColor:"#E51C23",
              cancelButtonColor:"#2D2D2D",
            }).then(() => {
              // on confirm
              this.deleteConsultList(id.name);
              instance.close();
            }).catch(() => {
              // on cancel
              instance.close();
            });
            break;
        }
      },
      deleteConsultList(id) {
        if (this.loading) return;
        this.loading = true;
        _hmt.push(["_trackEvent", "deleteConversationButtonClick", "点击删除按钮"]);
        phoneService.deleteConsultList({
          patientId: id
        }).then((res) => {
          this.loading = false;
          if (res.status == 200) {
            toast.tip("删除成功~");
            this.consultList = [];
            this.pageIndex = 0;
            this.isThereMore = true;
            this.renderDataList();
          }
        }).catch(() => {
          this.loading = false;
        });
      },
      renderDataList() {
        if (this.loading || !this.isThereMore) return;
        this.loading = true;
        let queryParams = {
          "size": this.pageSize,
          "page": this.pageIndex + 1
        };
        phoneService.consultList(queryParams).then((res) => {
          this.loading = false;
          if (res.status == 200 && res.data) {
            this.pageIndex += 1;
            res.data.list = res.data.list.map((item) => {
              item.userResult = item.userResult == null ? {} : item.userResult;
              return item;
            });
            console.log(res.data.list);
            this.consultList = this.consultList.concat(res.data.list);
            let allPages = Math.floor(res.total / this.pageSize);
            if (this.pageIndex > allPages) {
              this.isThereMore = false;
              this.loadingText = "没有更多了~";
            } else {
              this.isThereMore = true;
            };
          } else {
            this.loading = false;
            toast.tip("加载失败~");
          };
        }).catch(() => {
          this.isThereMore = false;
          this.loadingText = "没有更多了~";
        });
      },

    },
    filters:{
      orderStatusFilter(value){
        let result = "";
        switch (value) {
          case "10001": result = "待支付订单";
          break;
          case "20001": result = "待确认订单";
          break;
          case "30001": result = "已取消订单";
          break;
          case "40001": result = "已取消订单";
          break;
          case "50001": result = "已取消订单";
          break;
          case "60001": result = "已退款结束";
          break;
          case "70001": result = "已确认订单";
          break;
          case "80001": result = "订单超时关闭";
          break;
          case "80002": result = "已取消订单";
          break;
          case "90001": result = "已完成订单";
          break;
          case "90002": result = "已完成订单";
          break;
          case "99999": result = "已完成订单";
          break;
        }
        return result;
      }
    }
  };

</script>

<style scoped lang="less" rel="stylesheet/less">
  @r: 75rem;

  .item_wrapper {
    background-color: #fff;
  }

  .item {
    a {
      display: flex;
      padding: 33/@r 30/@r 0 30/@r;
    }

    &:last-child {
      .content_wrapper {
        border-bottom: none;
      }
    }
  }

  .item_new {
    .photo_wrapper {
      position: relative;

      &:after {
        content: " ";
        display: block;
        width: 4px;
        height: 4px;
        background-color: #EE242B;
        position: absolute;
        border-radius: 50%;
        top: 0;
        right: 0;
      }
    }
  }

  .photo_wrapper {
    img {
      width: 80/@r;
      height: 80/@r;
      border-radius: 50%;
      background-color: #f1f1f1;
    }
  }

  .content_wrapper {
    flex: 1;
    margin-left: 25/@r;
    padding-bottom: 30/@r;
    border-bottom: 1/@r solid #EFEFEF;

    .info {
      display: flex;
      justify-content: space-between;
    }

    .nick_name {
      color: #2D2D2D;
      font-size: 30/@r;
      line-height: 1;
      font-weight: bold;
    }

    .date_wrapper {
      position: relative;
      padding-left: 28/@r;
    }

    .icon_time {
      display: block;
      width: 28/@r;
      height: 28/@r;
      background: url("./images/list_icon_time@2x.png") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      left: 0;
      top: 4/@r;
    }

    .date_time {
      color: #999999;
      font-size: 24/@r;
    }

    .question {
      background-color: #F3F4F5;
      padding: 12/@r 20/@r;
      margin-top: 19/@r;
      border-radius: 10/@r;

      p {
        width: 530/@r;
        font-size: 26/@r;
        color: #666666;
        line-height: 44/@r;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        &.red {
          color: #EA444A;
        }
      }
    }
  }

</style>
