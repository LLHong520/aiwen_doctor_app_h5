<template>
  <div class="record_wrapper">
    <!-- <m-header>
      <div slot="left"></div>
      <div class="header_title" slot="middle">
        <p>
          电话咨询
          <router-link tag="i" :to="{name: 'phone.useGuaid'}" class="header_icon_help"></router-link>
        </p>
      </div>
      <div slot="right" class="icon_right">
        <router-link tag="i" :to="{name: 'consultSettings'}" class="header_icon_settines"></router-link>
        <span class="header_icon_share" @click="share"></span>
      </div>
    </m-header> -->

    <div class="top_statistics">
      <ul class="clearfix">
        <li>
          <p class="num">{{consultData.patientCount}}</p>
          <p class="text">已获得患者</p>
        </li>
        <li>
          <span class="border_l">
            <p class="num">{{consultData.orderCount}}</p>
            <p class="text">已完成订单</p>
          </span>
        </li>
      </ul>
    </div>
    <div class="bottom_list">
      <div class="tab_wrapper">
        <ul class="clearfix">
          <li :class="{'active': tabActive == index}" v-for="(item, index) in tabList" :key="index"
            @click="tabChange(item.value)">
            <span>{{item.label}}</span>
          </li>
        </ul>
      </div>
      <div class="list_wrapper">
        <consult-list v-if="tabActive == '0'"></consult-list>
        <history-order v-else-if="tabActive == '1'"></history-order>
      </div>
    </div>
    <m-confirm 
    title="" 
    text="你还没开通电话咨询服务，暂不能分享，现在就去开通吗？" 
    confirmBtnText="去开通"
    cancelBtnText="再想想"
    @confirm="()=>{this.$router.push({name: 'consultSettings'});}"
    ref="m_confirm" >
    </m-confirm>
  </div>
</template>

<script>
  import {
    APP_URL,
  } from "@/config";
  import {
    commonMixin
  } from "@/mixins";
  import iask_doctor_logo from "./images/iask_doctor_logo@2x.png";
  import mHeader from "@/components/header/index";
  import mConfirm from "@/components/confirm";
  import consultList from "./components/consult_list/index";
  import historyOrder from "./components/history_order/index";
  import phoneService from "@/services/phoneService.js";
  export default {
    name: "recordList",
    mixins: [commonMixin],
    data() {
      return {
        APP_URL,
        docInfo: {},
        tabList: [{
          label: "患者咨询",
          value: "0"
        },
        {
          label: "历史订单",
          value: "1"
        }
        ],
        tabActive: "0",
        consultData: {
          patientCount: 0,
          orderCount: 0,
        },
        telephoneSetting: {
          isSwitch: "20001",
          isAvailable: false,
        },
      };
    },
    computed: {
      shareConfig() {
        let url = `https://health.sina.cn/linkcard/awyh_doctorindex/${this.docInfo.userId}.htm?channel=&tag=pc&m=doctor_Index&n=${this.docInfo.userId}`;
        let text = "";
        if(this.docInfo.illnessTagIds && this.docInfo.illnessTagIds.length > 0){
          text = this.docInfo.illnessTagIds.map((item)=>{
            return item.tagName;
          }).join("、");
        }else{
          text = this.docInfo.areasOfExpertise||this.docInfo.expertiseArea||"";
        }
        text = text == ""? "健康":text;
        let imgUrl = this.GET_IMG_URL(this.docInfo.headPicUrl||this.docInfo.headPic);
        if (imgUrl == "" || imgUrl == undefined || imgUrl == null) {
          imgUrl = this.APP_URL + iask_doctor_logo;
        }
        let config = {
          title: `『${this.docInfo.realName}』医生的诊室`,
          url: url,
          img: `${imgUrl}`,
          content: `亲爱的朋友，我今天在#爱问诊室#还有${this.consultData.residueCount || 0}个电话咨询名额，如果您和亲友有关于${text}方面的疑问，欢迎向我咨询，我会为您提供具体、专业的指导意见。`,
          sourceType: 4
        };
        return config;
      }
    },
    components: {
      mHeader,
      consultList,
      historyOrder,
      mConfirm
    },
    created() {
      this.renderConsultData();
      if (this.$route.query.tabActive) {
        this.tabActive = this.$route.query.tabActive;
      }
      _hmt.push(["_trackEvent", "phoneConsultationButtonClick", "点击电话咨询按钮"]);
    },
    mounted() {
      this.settingsGet();
    },
    methods: {
      settingsGet() {
        phoneService.settingsGet({}).then((res) => {
          if (res.status == 200 && res.data) {
            //isSwitch该医生是否开通了电话咨询服务(是:10001,否:20001)
            //isAvailable该医生是否允许开通/使用电话咨询服务(是:10001,否:20001)
            this.telephoneSetting = res.data;
          };
        }).catch(() => {});
      },
      phoneConsultHomeMessage() {
        let _this = this;
        var params = {
          title: "电话咨询",
          callbacks: {
            setup: "phoneConsultCallback",
            phoneConsultCallback: function (params) {
              // alert("phoneConsultCallback");
              // alert(params);
              _this.callbackHandler(params);
            },
            help: "phoneConsultCallback",
            share: "phoneConsultCallback",
          }
        };
        try {
          iwenJSNativeBridge.phoneConsultHomeMessage(params);
        } catch (error) {
          console.log(error);
        }
      },
      callbackHandler(params) {
        console.log(params);
        console.log(typeof params);
        if (params.type == "share") {
          console.log("share");
          this.share();
        }
        if (params.type == "help") {
          console.log("help");
          this.$router.push({
            name: "phone.useGuaid"
          });
        }
        if (params.type == "setup") {
          this.$router.push({
            name: "consultSettings"
          });
        }
      },
      // showShareForbiddenTip() {
      //   this.$dialog.confirm({
      //     message: "你还没开通电话咨询服务，暂不能分享，现在就去开通吗？",
      //     confirmButtonText: "去开通",
      //     confirmButtonColor: "#4B9BC5",
      //     cancelButtonText: "再想想",
      //     cancelButtonColor: "#666666",
      //   }).then(() => {
      //     // on confirm
      //     this.$router.push({
      //       name: "consultSettings"
      //     });
      //   }).catch(() => {
      //     // on cancel
      //   });
      // },
      getInformation() {
        phoneService.getInformation({}).then((res) => {
          if (res.status == 200 && res.data) {
            this.docInfo = res.data;
            this.phoneConsultHomeMessage();
          };
        }).catch(() => {});
      },
      tabChange(value) {
        this.tabActive = value;
        this.$router.push({
          path: this.$route.name,
          params: this.$route.params,
          query: {
            ...this.$route.query,
            tabActive: value
          }
        });
      },
      renderConsultData() {
        phoneService.consultStatistics({}).then((res) => {
          if (res.status == 200 && res.data) {
            this.consultData = res.data;
            this.getInformation();
          };
        }).catch(() => {});
      },
      share() {
        if (this.telephoneSetting.isSwitch == "20001" || this.telephoneSetting.isSwitch == null) {
          // this.showShareForbiddenTip();
          this.$refs.m_confirm.show();
          return;
        }
        console.log(this.consultData.residueCount);
        if (this.consultData.residueCount == 0 || this.consultData.residueCount == undefined) {
          this.$mtoast.tip("你今日的名额已经用完了");
          return;
        }
        console.log("1111111");
        iwenJSNativeBridge.appShare(this.shareConfig);
        _hmt.push(["_trackEvent", "shareButtonClick", "点击分享按钮"]);
      },
    }
  };

</script>

<style scoped lang="less" rel="stylesheet/less">
  @import "./css.less";

</style>
