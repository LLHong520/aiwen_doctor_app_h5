<template>
  <div>
    <!-- 待确认状态 -->
    <!-- <template v-if="item.telephoneConsultationOrder.orderStatus=='10001'">
      <div class="order_contrl">
        <span class="gray">待支付</span>
      </div>
    </template> -->
    <!-- 待确认 -->
    <template
      v-if="item.telephoneConsultationOrder.orderStatus=='20001' && item.telephoneConsultationOrder.refundStatus != '10001'">
      <div class="order_contrl">
        <span class="gray" @click="cancelOrder(item.telephoneConsultationOrder.payOrderId,item.telephoneConsultationOrder.patientId,index)">退款结束</span>
        <span class="blue" @click="confirmOrder(item.telephoneConsultationOrder,index)">确认订单</span>
      </div>
    </template>
    <!-- 已取消 -->
    <!-- <template v-if="['30001','40001','50001','60001'].indexOf(item.telephoneConsultationOrder.orderStatus) >= 0">
      <div class="order_contrl">
        <span class="gray">已取消</span>
      </div>
    </template> -->
    <!-- 咨询中状态 -->
    <template v-if="item.telephoneConsultationOrder.orderStatus=='70001'">
      <div class="order_contrl">
        <span class="blue" @click="openCallPatinet(item.telephoneConsultationOrder.id,index)">拨打电话</span>
      </div>
    </template>
    <!-- 订单超时 -->
    <!-- <template v-if="['80001'].indexOf(item.telephoneConsultationOrder.orderStatus) >= 0">
      <div class="order_contrl">
        <span class="gray">订单超时</span>
      </div>
    </template> -->
    <!-- <template v-if="['90001'].indexOf(item.telephoneConsultationOrder.orderStatus) >= 0">
      <div class="order_contrl">
        <span class="gray">待评价</span>
      </div>
    </template> -->
  </div>
</template>
<script>
  export default {
    name: "prompt",
    props: {
      item: {
        type: Object,
        default: () => {},
      },
      index: {
        type: Number,
        default: -1,
      }
    },
    data() {
      return {};
    },
    destroyed() {},
    computed: {},
    created() {},
    methods: {
      cancelOrder(payOrderId,patientId,index){
        this.$emit("cancelOrder",payOrderId,patientId,index)
      },
      openCallPatinet(id,index){
        this.$emit("openCallPatinet",id,index)
      },
      confirmOrder(order,index){
        this.$emit("confirmOrder",order,index)
      },
    },
  };

</script>
<style scoped lang="less" rel="stylesheet/less">
  @r: 75rem;
  .order_contrl {
    display: flex;
    justify-content: space-around;
    height: 80/@r;
    line-height: 80/@r;
    border-top: 1px solid #EFEFEF;
    border-radius: 0 0 6/@r 6/@r;

    span {
      width:50%;
      text-align: center;
      display: inline-block;
      font-size: 28/@r;
    }
    span:nth-child(2){
      border-left: 1px solid #EFEFEF;
    }

    .gray {
      color: #999999
    }

    .blue {
      color: #4B9BC5
    }
  }

</style>
