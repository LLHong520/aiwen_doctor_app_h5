<template>
  <div class="dialouge_wrapper">
    <div slot="page_container" class="page_container">
      <!-- 最新订单顶部提示 -->
      <prompt v-if="dialogueStatus.status && dialogueStatus.status=='70001'||dialogueStatus.status=='20001'" :data="dialogueStatus"></prompt>
      <!-- <van-nav-bar :title="patientName" left-text="" right-text="患者资料" left-arrow @click-left="()=>{this.$router.back();}"
      @click-right="goToPatientDetails" /> -->
      <!-- /最新订单顶部提示 -->
      <div class="dialouge_box" :class="{'disMore':isShowMoreButton}" id="dialouge_box" ref="dialouge_box" @click="()=>{this.isShowMoreButton=false}">
        <div v-if="loading" class="p10">
          <img style="margin:0 auto" src="./images/loading.gif" width="25" alt />
        </div>

        <!-- <div class="dialouge_tip">你可以先与患者提前沟通，并确定服务时间</div> -->
        <div class="scrollList" ref="scrollList">
          <div v-for="(item,index) in dialougeList" :key="index">
            <!-- type//消息类型（系统消息:10001、普通对话消息:20001、订单业务消息:30001、图片消息:40001,动态时间消息:50001,通话类型:60001,订单结束标识:70001） -->

            <!-- 时间 -->
            <div class="time" v-if="(item.type=='30001'&&item.orderId)||item.type=='20001'||item.type=='10001'||item.type=='60001'">
              <!-- {{item.createDate | dateFormatDot}} -->
              {{item.createTimes}}
            </div>
            <!-- /时间 -->

            <!-- 系统消息 -->
            <div class="dialouge_tip" v-if="item.type=='10001'&&item.content&&item.content!=''">
              {{item.content}}
            </div>
            <!-- /系统消息 -->

            <!-- 医生start -->
            <div class="dialouge_item dialouge_my" v-if="item.contentSource=='doctor'">
              <div class="dialouge_txt">
                <!-- 文字信息 -->
                <template v-if="item.type=='40001' && item.images">
                  <img @click="previewImg(item.images)" :src="item.images[0]" />
                </template>
                <!-- 通话系统信息 -->
                <template v-else-if="item.type=='60001'">
                  <div class="txt_inner">
                    <!-- <span v-if="item.telephoneConsultationOrder>0">通话时长:
                      {{item.telephoneConsultationOrder.durationSec | durationSecFilter}}</span>
                    <span v-else>未接通</span> -->
                    <span>{{item.content}}</span>
                    <i class="icon-phone"></i>
                  </div>
                  <em class="arrow"></em>
                </template>
                <!-- 图片信息 -->
                <template v-else>
                  <div class="txt_inner" v-html="item.content"></div>
                  <em class="arrow"></em>
                </template>
              </div>
              <div class="face">
                <img :src="item.doctorUserResult.avatar" :alt="item.doctorUserResult.userName">
              </div>
            </div>
            <!-- 医生end -->

            <!-- 用户start -->
            <div class="dialouge_item dialouge_doc" v-if="item.contentSource=='user'">
              <div @click="goToPatientDetails" class="face" v-if="item.userResult">
                <img :src="GET_IMG_URL(item.userResult.avatar)" :alt="item.userResult.userName">
              </div>
              <div v-else class="face">
                <img/>
              </div>
              <!--type 40001 图片信息-->
                <div class="dialouge_txt" v-if="item.type == 40001">
                  <img @click="previewImg(item.images)" :src="GET_IMG_URL(item.images[0])" alt="">
                </div>
              <div class="dialouge_txt" v-else>
                <div class="txt_inner" v-html="item.content"></div>
                <em class="arrow"></em>
              </div>
            </div>
            <!-- 用户end -->

            <!-- 订单消息 -->
            <div v-if="item.type=='30001'&&item.telephoneConsultationOrder">
              <div class="dialouge_tip" v-if="item.telephoneConsultationOrder && ['20001','70001'].includes(item.telephoneConsultationOrder.orderStatus)">
                {{item.telephoneConsultationOrder.inquiryPatientName}}
                <template v-if="item.telephoneConsultationOrder.orderStatus=='20001'">
                  已完成支付并生成订单，请尽快确认；如果咨询不对症请及时退款结束；超过 24 小时未处理订单，系统将自动取消
                </template>
                <template v-if="item.telephoneConsultationOrder.orderStatus=='70001'">
                  已完成支付并生成订单，请尽量在预约时间点内与患者通话，超过 24 小时未接通电话，系统将自动关闭，并将咨询费退还给患者
                </template>
              </div>
              <!-- @order_card start -->
              <div class="order_card">
                <div class="card_hd">
                  <span>电话咨询预约</span>
                </div>
                <div v-if="item.telephoneConsultationOrder" class="card_bd">
                  <div class="order_item">
                    <label>基本资料：</label>
                    <div class="order_info">
                      {{item.telephoneConsultationOrder.inquiryPatientName}}
                      {{item.telephoneConsultationOrder.inquirySex}}
                      {{item.telephoneConsultationOrder.inquiryAge}}岁
                    </div>
                  </div>
                  <div class="order_item">
                    <label>患病时长：</label>
                    <div class="order_info">
                      {{item.telephoneConsultationOrder.sickTime}}
                    </div>
                  </div>
                  <div class="order_item">
                    <label>病情描述：</label>
                    <div class="order_info desc" v-html="item.telephoneConsultationOrder.illnessDescription"></div>
                  </div>
                  <div class="order_item">
                    <label>病情照片：</label>
                    <div class="order_info">
                      <ul class="order_info_imgs clearfix"
                        v-if="item.telephoneConsultationOrder.illnessImages && item.telephoneConsultationOrder.illnessImages.length>0">
                        <li v-for="(itemImg,index) in item.telephoneConsultationOrder.illnessImages" :key="index">
                          <img @click="previewImg(item.telephoneConsultationOrder.illnessImages,index)"
                            :src="GET_IMG_URL(itemImg)" />
                        </li>
                      </ul>
                      <span v-else>无</span>
                    </div>
                  </div>
                </div>
                  <order-actions
                  @cancelOrder="cancelOrder"
                  @confirmOrder="confirmOrder"
                  @openCallPatinet="openCallPatinet"
                  :item="item"
                  :index="index"
                  />
              </div>
              <!-- @order_card end -->
            </div>
            <!-- /订单消息 -->

            <!-- 订单状态消息 -->
            <order-foot-status v-if="item.type=='70001'" :text="item.content" ></order-foot-status>
            <!-- /订单状态消息 -->

            <div class="dialouge_tip" v-else-if="item.type=='40002'">付费电话咨询:通话中断</div>
            <div class="dialouge_tip" v-else-if="item.type=='40003'">付费电话咨询:通话成功</div>

          </div>

          <!-- 拨打电话弹窗 -->
          <call-dialog :show.sync="isShowCallDialog" :data="callDetail" @confrim="confrimCallPatinet"></call-dialog>
          <!-- /拨打电话弹窗 -->

        </div>
      </div>
    </div>
    <div slot="page_footer">
      <div class="edit_area" v-if="isEdit">
        <div class="edit_area_basic">
          <!-- <div v-if="callDirectlyParms.isShow" @click="callPatientDirectly(callDirectlyParms)" class="call_btn">
            <p class="icon-call"></p>
          </div> -->
          <div class="icon-camera">
            <upload-btn :size="20" @change="onUpload"></upload-btn>
          </div>
          <div class="edit_txt">
            <!-- <input class="edit-input" type="text" v-model="sentCont" @keypress.enter="sentMessage">  @input="removeClass"-->
            <textarea class="edit-input autoEdit iosEdit" @blur="inputBlur" id="edit" rows="5" cols="5" v-model="sentCont"></textarea>
          </div>
          <div class="edit_btn">
            <span v-if="sentCont.length>0" class="sent" @click="sentMessage">发送</span>
            <span v-else @click="toogleActionPanel" class="icon-Multi"></span>
          </div>
        </div>
        <!-- 更多操作按钮 -->
        <div v-show="isShowMoreButton" class="edit_area_more">
          <van-grid>
            <van-grid-item>
              <i class="van-icon van-icon-camera van-grid-item__icon">
                <upload-btn :size="20" @callback="onUpload"></upload-btn>
              </i>
              <span class="van-grid-item__text">照片</span>
            </van-grid-item>
            <!-- <van-grid-item icon="article" text="发送文章" />
            <van-grid-item icon="department" text="发送门诊" /> -->
            <van-grid-item @click="() => this.isShowChoosePhrase =!this.isShowChoosePhrase" icon="phrase" text="常用语" />

            <van-grid-item :icon="isCall?'end':'end-disabled'"
              text="退款结束" @click="cancelOrder(orderCurrentDetal.payOrderId,orderCurrentDetal.patientId,orderCurrentDetal.index)" />

            <van-grid-item
              :icon="(orderCurrentDetal.id && orderCurrentDetal.orderStatus=='70001')?'call':'call-disabled'"
              text="拨打电话" @click="openCallPatinet(orderCurrentDetal.id)" />

            <van-grid-item icon="editFull" text="全屏编辑" @click="openEditFull" />

            <van-grid-item icon="help" text="查看帮助" @click="toUseGuaid" />


          </van-grid>
        </div>
        <!-- /更多操作按钮 -->
      </div>

      <!-- 选择常用语 -->
      <van-popup v-model="isShowChoosePhrase" position="bottom" ref="container" style="height: 346px;">
        <van-sticky :container="container">
          <van-nav-bar title="选择常用语" left-text="取消" right-text="添加常用语"
            @click-left="() => this.isShowChoosePhrase =!this.isShowChoosePhrase" @click-right="addPhraseHandler" />
        </van-sticky>
        <!-- 常用语列表 -->
        <phraseList ref="phraseList" @confirmPhrase="confirmPhrase" />
        <!-- 常用语列表 -->
      </van-popup>
      <!-- /选择常用语 -->

      <!-- 添加常用语 -->
      <phrasePicker :show.sync="isShowAddPhrase" :config="phrasePickerConfig" @successCallback="confirmAddPhrase" />
      <!-- 添加常用语 -->


      <!-- 全屏编辑 -->
      <van-popup v-model="isShowEditFull" position="bottom" :style="{ height: '100%' }">
        <div class="editFull-wrapper">
          <div class="header-title">
            <div class="contrl cancle-btn" @click="cancelEditFull">取消 <span class="count_font"
                :class="{'error':sentCont.length>1000}">还可输入{{1000 - sentCont.length}}字</span></div>
            <div class="contrl confirm-btn" @click="confirmEditFull">确定</div>
          </div>
          <div class="edit-wrapper">
            <textarea v-model="sentCont" class="edit-full" id="edit_full"></textarea>
          </div>
        </div>
      </van-popup>
      <!-- /全屏编辑 -->

    </div>
  </div>
</template>
<script>
  import {
    commonMixin
  } from "@/mixins";
  import Vue from "vue";
  import {
    ImagePreview
  } from "vant";
  Vue.use(ImagePreview);
  import setTitle from "@/common/setTitle";
  import phoneService from "@/services/phoneService.js";
  import Load from "./images/loading.gif";
  import prompt from "./components/prompt";
  import orderActions from "./components/order-actions";
  import phraseList from "@/components/phrase/list";
  import phrasePicker from "@/components/phrase/picker";
  import uploadBtn from "../components/upload_btn";
  import callDialog from "./components/call_dialog";
  import orderFootStatus from "./components/order_foot_status";
  export default {
    mixins: [commonMixin],
    data() {
      return {
        container: null,
        patientId: "",
        canCallListOther: [],
        isShowRecallTip: true,
        isShowMoreButton: false,
        isShowChoosePhrase: false,
        isShowEditFull: false,
        isShowCallDialog: false,
        phrasePickerConfig: {
          title: "添加常用语",
          placeholder: "例如：感谢您的信任，有任何疑问可以随时找我",
        },
        sentCont: "",
        docInfo: {},
        callDetail: {
          id: "",
          phone: ""
        },
        dialougeList: [],
        latestOrderDetal: [],//最新订单详情
        dialogueStatus: {}, //顶部最新订单状态信息
        orderCurrentDetal: {}, //最新订单状态信息
        curPage: 0,
        pageSize: 15,
        totalCount: 2,
        pageCount: 2,
        loading: false,
        loadingText: "加载更多",
        isReachEnd: false,
        Load,
        state: 0,
        top: 0,
        isLoadMore: false,
        refreshTimer: false,
        refreshIngQuestion: false,
        isShowAddPhrase: false,
        imageMessage: "",
      };
    },
    components: {
      prompt,
      phraseList,
      phrasePicker,
      uploadBtn,
      callDialog,
      orderActions,
      orderFootStatus
    },
    mounted() {
      this.container = this.$refs.container;
      $("#dialouge_box").get(0).addEventListener("scroll", this.loadMore);
      
      // try {
      //   iwenJSNativeBridge.prototype.appTitle({
      //     hidden: true,
      //     title: this.$route.query.nickName
      //   });
      // } catch (error) {
      //   console.log(error);
      // }
    },
    // updated() {
    //   if (!this.isLoadMore) {
    //     this.scrollToBottom();
    //   }
    // },
    beforeDestroy() {
      clearInterval(this.refreshTimer);
      try {
        $("#dialouge_box").get(0).removeEventListener("scroll", this.loadMore);
      } catch (error) {
        console.log("--");
      }
    },
    created() {
      this.patientId = this.$route.params.id;
      this.setRead();
      this.getDialougeList("loadFirst");
      this.getLatestOrderDetal();

      this.refreshTimer = setInterval(() => {
        this.refreshQuestion();
      }, 2000);
      console.log(this.latestOrderDetal);
    },
    watch:{
      sentCont(val){
        $.each($(".autoEdit"), function(i, n){
          if(val==""){
            $(n).css("height", 36 + "px");
          }else{
            console.log(n.scrollHeight);
            if(n.scrollHeight<= 90){
              $(n).css("height", n.scrollHeight + "px");
            }
          }
        });
      }
    },
    computed:{
      isCall(){
        let statusArr = ["70001","90001","20001"];
        return this.orderCurrentDetal.id && (statusArr.indexOf(this.orderCurrentDetal.orderStatus)>=0);
      },
      isEdit(){
        if(this.dialougeList.length>0){
          let lastNew = this.dialougeList[this.dialougeList.length-1];
          if(lastNew.type == "70001"){
            return false;
          }else{
            return true;
          }
        }else{
          return false;
        }
      }
    },
    methods: {
      goToPatientDetails() {
        if(this.latestOrderDetal.inquiryPatientId && this.latestOrderDetal.inquiryPatientId != ""){
          iwenJSNativeBridge.openNativePage({
            path: "patientDetail",
            params: {
              memberID: this.latestOrderDetal.inquiryPatientId,
              realName: this.latestOrderDetal.inquiryPatientName||"",
            }
          });
          _hmt.push(["_trackEvent", "patientInfoButtonClick", "点击患者资料"]);
        }
      },
      previewImg(images, startPosition) {
        let posIndex = startPosition || 0;
        ImagePreview({
          images,
          startPosition: posIndex
        });
      },
      onUpload(file, successList, filesList) {
        this.imageMessage = file.url;
        this.sentMessage();
      },
      // 确认订单
      confirmOrder(params, index) {
        this.$dialog.alert({
          message: "确认预约后，请在意向通话时间段内拨打患者电话，如繁忙暂时无法拨打电话，请及时与患者沟通其他空闲时间。",
          confirmButtonText: "知道了",
          confirmButtonColor: "#4B9BC5"
        }).then(() => {
          this.doctorConfirmOrder(params, index);
        });
      },
      doctorConfirmOrder(params, index) {
        if (this.loading) return;
        this.loading = true;
        let This = this;
        phoneService.doctorConfirmOrder({
          id: params.id,
          orderStatus: "70001",
          payOrderId: params.payOrderId
        })
          .then(res => {
            This.loading = false;
            if (res.status == 200) {
              this.dialogueStatus = res.data.dialogueStatus;
              this.dialougeList[index].telephoneConsultationOrder.orderStatus = "70001";
              // this.dialogueStatus.status = "70001";
              this.orderCurrentDetal.orderStatus = "70001";
            }
          })
          .catch(() => {
            This.loading = false;
          });
      },

      //取消订单
      cancelOrder(payOrderId,patientId,index) {
        if (!this.isCall) return;
        this.$dialog.confirm({
          message: "确认要结束并退款给患者吗？",
          confirmButtonText: "确认",
          confirmButtonColor: "#E51C23",
          cancelButtonText: "取消",
          cancelButtonColor: "#2D2D2D",
        }).then(() => {
          this.doctorCancelOrder(payOrderId,patientId,index);
        }).catch(() => {

        });
      },
      doctorCancelOrder(payOrderId,patientId,index) {
        if (this.loading) return;
        this.loading = true;
        let This = this;
        _hmt.push(["_trackEvent", "endOfRefundButtonClick", "点击退款结束"]);
        phoneService.cancelOrder({
          payOrderId: payOrderId,
          patientId: patientId
        })
          .then(res => {
            This.loading = false;
            if (res.status == 200) {
              console.log("取消成功");
              this.dialougeList[index].telephoneConsultationOrder.orderStatus = "40001";
              this.dialogueStatus.status = "40001";
              this.orderCurrentDetal.orderStatus = "40001";
            }else{
              toast.tip(res.message);
            }
          })
          .catch(() => {
            This.loading = false;
          });
      },
      //获取当前最新订单信息
      getLatestOrderDetal() {
        phoneService.orderCurrent({
          patientId: this.patientId,
        })
          .then(res => {
            if (res.status == 200 && res.data) {
              this.latestOrderDetal = res.data;
            }
          })
          .catch(() => {});
      },

      //选择常用于发送时
      confirmPhrase(content) {
        this.isShowChoosePhrase = false;
        this.sentCont = content;
        this.sentMessage();
      },
      /**
       * 添加常用语
       */
      addPhraseHandler() {
        console.log("添加常用语言");
        this.isShowAddPhrase = true;
      },
      confirmAddPhrase(newItem) {
        this.$refs.phraseList.unshiftNew(newItem);
      },
      /**
       * 显示隐藏更多功能
       * */
      toogleActionPanel() {
        this.isShowMoreButton = !this.isShowMoreButton;
      },
      // callPatientDirectly(callDirectlyParms) {
      //   let order_id = callDirectlyParms.order_id;
      //   phoneService
      //     .reCallPatinet({
      //       order_id: order_id,
      //       auto_retry: "10001",
      //       doctor_call: true,
      //       doctor_call_back: false,
      //     })
      //     .then(res => {
      //       if (res.status == 200) {
      //         toast.tip("拨打成功，请耐心等待");
      //       } else {
      //         toast.tip(res.message);
      //       }
      //     });
      // },
      refreshDialougeList(allList) {
        this.dialougeList.map((item, index) => {
          this.dialougeList[index] = allList.find((sitem) => {
            return sitem.id === this.dialougeList[index].id;
          });
        });
      },

      // 通话时长小于1分钟 重拨弹窗
      queryReCall(telephoneConsultationOrder) {
        // if (telephoneConsultationOrder.durationSec && telephoneConsultationOrder.durationSec < 60) {
        console.log(typeof this.dialogueStatus.isPoPup);
        console.log(this.dialogueStatus.isPoPup);
        if (this.dialogueStatus.isPoPup) {
          this.reCall(telephoneConsultationOrder);
        }
      },
      reCall(telephoneConsultationOrder) {
        this.$dialog.confirm({
          message: "与患者通话成功，如异常中断，请重拨",
          confirmButtonText: "重拨",
          confirmButtonColor: "#E51C23",
          cancelButtonText: "取消",
          cancelButtonColor: "#2D2D2D",
        }).then(() => {
          this.confrimCallPatinet(telephoneConsultationOrder);
        });
      },

      //打开拨打电话弹窗
      openCallPatinet(orderId) {
        if (!this.orderCurrentDetal.id || this.orderCurrentDetal.orderStatus != "70001") return;
        this.isShowMoreButton= false;
        this.isShowCallDialog = true;
        this.callDetail.id = orderId;
        this.callDetail.phone = this.docInfo.phone;
      },
      // 确认拨打电话
      confrimCallPatinet(params) {
        if (this.loading) return;
        this.loading = true;

        const toast = this.$toast({
          duration: 0,
          forbidClick: true,
          message: "正在呼叫,请稍后..."
        });

        phoneService.reCallPatinet({
          orderId: params.id,
          inputPhone: params.phone || this.docInfo.phone
        })
          .then(res => {
            this.loading = false;
            this.$toast.clear();
            if (res.status == 200) {
              this.$mtoast.tip("拨通成功，请耐心等待");
            } else {
              this.$mtoast.tip(res.message);
            }
          })
          .catch(() => {
            this.$toast.clear();
            this.loading = false;
          });
      },
      // callPatientDirectly(callDirectlyParms) {
      //   let order_id = callDirectlyParms.order_id;
      //   phoneService
      //     .reCallPatinet({
      //       order_id: order_id,
      //       auto_retry: "10001",
      //       doctor_call: true,
      //       doctor_call_back: false,
      //     })
      //     .then(res => {
      //       if (res.status == 200) {
      //         toast.tip("拨打成功，请耐心等待");
      //       } else {
      //         toast.tip(res.message);
      //       }
      //     });
      // },

      // 获取添加滚动事件的元素
      getScrollEle() {
        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        var scrollEle = null;
        if (isiOS && platformInfo.isWeibo) {
          console.log("wrapper__inner");
          scrollEle = "#wrapper__inner";
        } else {
          console.log("window");
          scrollEle = window;
        }
        return scrollEle;
      },
      scrollToBottom() {
        this.$nextTick(function () {
          let wrapper_inner = $("#dialouge_box").get(0);
          wrapper_inner.scrollTop = wrapper_inner.scrollHeight;
        });
      },
      refreshDialouge(){
        this.curPage = 0;
        this.totalCount = 0;
        this.pageCount = 0;
        this.dialougeList = [];
        this.getDialougeList();
      },
      //刷新对话消息
      refreshQuestion() {
        if (this.refreshIngQuestion) return;
        this.refreshIngQuestion = true;
        phoneService
          .getDialougeList({
            patientId: this.patientId,
            page: 1,
            size: this.totalCount + 10
          })
          .then(res => {
            this.refreshIngQuestion = false;
            if (res.status == 200 && res.data && res.data.list) {
              this.dialogueStatus = res.data.dialogueStatus;

              //如果数据量相等 则证明没有新信息
              if (res.data.total <= this.totalCount) {
                console.log("没有新数据");
              } else {
                console.log("有新数据");

                console.log(this.orderCurrentDetal);
                if(this.orderCurrentDetal.index){//更新前者订单
                  let orderIndex = this.orderCurrentDetal.index;
                  this.dialougeList[orderIndex].telephoneConsultationOrder.orderStatus = this.dialogueStatus.status;
                  this.orderCurrentDetal.index = null;//清空
                }

                res.data.list = res.data.list.reverse();
                for (let index = this.totalCount; index < res.data.list.length; index++) {
                  const element = res.data.list[index];
                  this.dialougeList.push(element);
                }
                this.totalCount = parseInt(res.data.total);
              }
              // this.refreshDialougeList(res.data.list);
              this.formatContent();//内容换行空格转化
              this.getCurrentOrder(this.dialougeList);//获取最新订单
            }else{
              toast.tip(res.message);
            }
          })
          .catch(() => {
            this.refreshIngQuestion = false;
          });
      },

      //获取对话消息
      getDialougeList(type) {
        if (this.loading || this.isReachEnd) return;
        this.loading = true;
        let This = this;
        phoneService
          .getDialougeList({
            patientId: This.patientId,
            page: This.curPage + 1,
            size: This.pageSize
          })
          .then(res => {
            This.loading = false;
            if(type="loadFirst"){
              this.scrollToBottom();
            }
            if (res.status == 200 && res.data && res.data.list) {
              This.dialogueStatus = res.data.dialogueStatus; //顶部信息状态

              let list = res.data.list.reverse();
              This.dialougeList = list.concat(This.dialougeList);
              This.formatContent();//内容换行空格转化

              This.docInfo = This.dialougeList[0].doctorUserResult;//医生信息

              This.getCurrentOrder(This.dialougeList);//获取最新订单

              if(type="loadFirst"){
                setTitle(this.dialougeList[0].userResult.userName || this.dialougeList[0].userResult.realName ||"聊天记录");
              }

              This.curPage += 1;
              This.pageCount = Math.ceil(res.data.total / This.pageSize);

              This.totalCount = parseInt(res.data.total);
              if (This.curPage + 1 > This.pageCount) {
                This.isReachEnd = true;
                This.loadingText = "";
              } else {
                This.isReachEnd = false;
              }
            }else{
              toast.tip(res.message);
            }
          })
          .catch(() => {
            This.loading = false;
            if(type="loadFirst"){
              this.scrollToBottom();
            }
          });
      },

      //空格换行转化
      formatContent(){
        this.dialougeList.map((item)=>{
          if(item.telephoneConsultationOrder){
            item.telephoneConsultationOrder.illnessDescription = utils.replaceSpaceTag(utils.replaceBrTag(item.telephoneConsultationOrder.illnessDescription));
          }
          if(item.content && item.content!=""){
            item.content = utils.replaceSpaceTag(utils.replaceBrTag(item.content));
          }
        });
      },
      getCurrentOrder(newList){
        newList.map((item,index)=>{
          if(item.telephoneConsultationOrder &&(item.telephoneConsultationOrder.orderStatus=="20001"||item.telephoneConsultationOrder.orderStatus=="70001")){
            this.orderCurrentDetal = item.telephoneConsultationOrder;
            this.orderCurrentDetal.index = index;
          }
        });
        this.queryReCall(this.orderCurrentDetal);
      },
      sentMessage() {
        if (this.loading) return;
        let This = this;
        This.sentCont = utils.trim(This.sentCont);
        let params = {
          patientId: This.patientId,
          content: This.sentCont,
          contentSource: "doctor",
          type: "20001", //普通消息类型
          images: ""
        };
        //图片消息类型
        if (This.imageMessage != "") {
          params.type = "40001";
          params.images = This.imageMessage;
        }
        if (params.type == "20001" && This.sentCont == "") {
          This.$mtoast.tip("不能发送空白消息~");
          return;
        }else if(This.sentCont.length > 1000){
          This.$mtoast.tip("输入不超过1000字~");
          return;
        }

        console.log(params);

        This.loading = true;
        phoneService
          .answer(params)
          .then(res => {
            This.loading = false;
            if (res.status == 200 && res.data) {
              let newData = res.data;
              newData.content = utils.replaceSpaceTag(utils.replaceBrTag(newData.content));
              This.dialougeList.push(newData);
              if(params.type == "20001"){
                This.sentCont = "";
              }
              This.imageMessage = "";
              This.totalCount += 1;

              This.scrollToBottom();
              
            } else {
              This.$mtoast.tip("发送失败,请稍后重试~");
            }
          })
          .catch(() => {
            This.loading = false;
            This.$mtoast.tip("发送失败,请稍后重试~");
          });
      },
      removeClass(){
        $("#edit").removeClass("heightDefault");
      },
      loadMore() {
        let wrapper_inner = $("#dialouge_box").get(0);
        if (wrapper_inner.scrollTop <= 0) {
          this.isLoadMore = true;
          this.getDialougeList();
          wrapper_inner.scrollTop = 0;
        }
      },
      setRead() {
        let queryParams = {
          "patientId": this.patientId,
        };
        phoneService.read(queryParams).then();
      },
      toUseGuaid() {
        _hmt.push(["_trackEvent", "helpPageShow", "帮助页面展示"]);
        this.$router.push({
          name: "phone.useGuaid"
        });
      },
      openEditFull() {
        this.isShowEditFull = true;
        // $("#edit_full").focus();
        _hmt.push(["_trackEvent", "fullScreenButtonClick", "点击全屏编辑"]);
      },
      confirmEditFull() {
        if (this.sentCont.length <= 1000) {
          this.isShowEditFull = false;
        }else{
          this.$mtoast.tip("输入不超过1000字~");
        }
      },
      cancelEditFull() {
        this.isShowEditFull =false;
        this.sentCont = "";
      },
    },
    filters: {
      durationSecFilter(value) {
        let result = "";
        if (!value || value <= 0) {
          result = "00:00";
        } else {
          //分 ：秒
          let minute = Math.floor(value / 60),
            second, mm, ss;
          if (minute >= 1) {
            second = Math.floor(value % 60);
            mm = minute > 9 ? minute : "0" + minute;
            ss = second > 9 ? second : "0" + second;
            result = mm + " : " + ss;
          } else {
            second = value;
            ss = second > 9 ? second : "0" + second;
            result = "00 : " + ss;
          }
          //时 ：分
          // let hour = Math.floor(value / 60 / 60), minute , hh, mm;
          // if(hour>=1){
          //   minute = Math.floor(value / 60 % 60);
          //   hh = hour>9? hour:"0"+hour;
          //   mm = minute>9? minute : "0"+minute;
          //   result = hh + " : " + mm;
          // }else{
          //   minute = Math.floor(value / 60);
          //   mm = minute>9? minute : "0"+minute;
          //   result = "00 : " + mm;
          // }
        }
        return result;
      }
    }
  };

</script>

<style scoped lang="less" rel="stylesheet/less">
  @import "./css.less";

</style>
