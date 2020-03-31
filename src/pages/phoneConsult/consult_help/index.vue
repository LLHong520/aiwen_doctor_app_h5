
<template>
  <div class="consult_help_wrapper">
    <!-- <m-header title="电话咨询帮助"></m-header> -->
    <div class="help_text">
      <ul>
        <li>
          <p>1. 什么是电话咨询？</p>
          <p>电话咨询是患者向医生发起的有偿电话咨询服务模式。患者订购该服务后，将向医生发起通话请求，医生可以在爱问医生诊室App中查看该患者的请求。通话成功则自动收取对应的咨询费用。若平台在预约时间内未回拨电话，则爱问医生平台将自动向患者退款，医生和患者均不受任何损失。</p>
        </li>
        <li>
          <p>2. 服务时间到了，电话会自动挂断吗？</p>
          <p>会自动挂断。</p>
        </li>
        <li>
          <p>3. 我可以设置哪些时间和价格？</p>
          <p>你可以在提供的默认价格选项中选择：49元/次，99元/次，149元/次，199元/次，249元/次。299元/次；请综合考虑以下因素制定价格：你的职称，患者的病情。若默认的价格选项中没有你认为合适的价格，你也可以自定义价格。</p>
        </li>
        <li>
          <p>4. 如果我错过了患者的电话咨询了，怎么办？</p>
          <p>如果患者的电话咨询请求超过了预约时间段，该电话咨询会自动失效并向患者退款。所以你可以在患者发起咨询前，与患者提前沟通好通话时间。</p>
        </li>
        <li>
          <p>5. 如果患者通话不成功或患者未接听怎么办？</p>
          <p>患者通话不成功或患者未接听，订单关闭后，将不会退款给患者，默认已完成此订单。</p>
        </li>
        <li>
          <p>6. 如果患者接听了，但因为信号中断怎么办？</p>
          <p>如在咨询期间电话中断，你可以主动联系患者，你的号码将被隐藏（在咨询页点击“回拨”）</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { commonMixin } from "@/mixins";
import mHeader from "@/components/header/index";

export default {
  name: "consultHelp",
  mixins: [commonMixin],
  data() {
    return {
    };
  },
  components: {
    mHeader,
  },
  created(){
  },
  methods:{}
};
</script>

<style scoped lang="less"  rel="stylesheet/less">
@r: 75rem;

.consult_help_wrapper {
  .help_text {
    padding-bottom: 130/@r;
    li {
      padding: 0 45/@r;
      margin-top: 50/@r;
      &:first-child {
        margin-top: 40/@r;
      }
    }
    p {
      font-size: 28/@r;
      color: #333333;
      line-height: 44/@r;
      &:first-child {
        margin-bottom: 10/@r;
      }
    }
  }
}
</style>
