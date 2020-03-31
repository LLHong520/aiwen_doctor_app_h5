<template>
  <section class="wrapper">
    <div class="tip_wrapper" v-if="tipIsShow">
      <div class="blank"></div>
      <div class="edit_tip">
        <em></em>你调整的新报价将于下月1号生效，本月仍以原有报价执行
      </div>
    </div>

    <div class="tab">
      <ul>
        <li>
          <a @click="goAnchor('#wb',0)" href="javascript:;" :class="{'current':activeIndex==0}">微博类</a>
        </li>
        <li>
          <a
            @click="goAnchor('#article',1)"
            href="javascript:;"
            :class="{'current':activeIndex==1}"
          >文章类</a>
        </li>
        <li>
          <a
            @click="goAnchor('#video',2)"
            href="javascript:;"
            :class="{'current':activeIndex==2}"
          >视频类</a>
        </li>
        <li>
          <a
            @click="goAnchor('#activity',3)"
            href="javascript:;"
            :class="{'current':activeIndex==3}"
          >活动类</a>
        </li>
        <li>
          <a
            @click="goAnchor('#other',4)"
            href="javascript:;"
            :class="{'current':activeIndex==4}"
          >其他类</a>
        </li>
      </ul>
    </div>

    <!-- 微博类start -->
    <div class="common_hd" id="wb">
      <em class="icon_line"></em>
      <h3>微博类</h3>
      <div class="tit_tip">含税价(元/篇)</div>
    </div>
    <div class="price_items">
      <div class="price_item" v-for="(item,index) in priceItems.wb" :key="index">
        <label for>{{item.title}}</label>
        <div class="price_wrapper">
          <input
            type="number"
            pattern="[0-9]*"
            @input="handelerInput($event,index,'wb')"
            class="ipt_txt"
            :class="{'disabled':!isFirst&&!isEditing}"
            :readonly="!isFirst&&!isEditing"
            v-model="item.price"
            placeholder="请填写报价"
          >
        </div>
      </div>
    </div>
    <!-- 微博类end -->
    <!-- 文章类start -->
    <div class="common_hd" id="article">
      <em class="icon_line"></em>
      <h3>文章类</h3>
      <div class="tit_tip">含税价(元/篇)</div>
    </div>
    <div class="price_items">
      <div class="price_item" v-for="(item,index) in priceItems.article" :key="index">
        <label for>{{item.title}}</label>
        <div class="price_wrapper">
          <input
            type="number"
            pattern="[0-9]*"
            @input="handelerInput($event,index,'article')"
            class="ipt_txt"
            :class="{'disabled':!isFirst&&!isEditing}"
            :readonly="!isFirst&&!isEditing"
            v-model="item.price"
            placeholder="请填写报价"
          >
        </div>
      </div>
    </div>
    <!-- 文章类end -->
    <!-- 视频类start -->
    <div class="common_hd" id="video">
      <em class="icon_line"></em>
      <h3>视频类</h3>
      <div class="tit_tip">含税价(元/个)</div>
    </div>
    <div class="price_items">
      <div class="price_item" v-for="(item,index) in priceItems.video" :key="index">
        <label for>{{item.title}}</label>
        <div class="price_wrapper">
          <input
            type="number"
            pattern="[0-9]*"
            @input="handelerInput($event,index,'video')"
            class="ipt_txt"
            :class="{'disabled':!isFirst&&!isEditing}"
            :readonly="!isFirst&&!isEditing"
            v-model="item.price"
            placeholder="请填写报价"
          >
        </div>
      </div>
    </div>
    <!-- 视频类end -->
    <!-- 活动类start -->
    <div class="common_hd" id="activity">
      <em class="icon_line"></em>
      <h3>活动类</h3>
      <div class="tit_tip">含税价(元/场)</div>
    </div>
    <div class="price_items">
      <div class="price_item" v-for="(item,index) in priceItems.activity" :key="index">
        <label for>{{item.title}}</label>
        <div class="price_wrapper">
          <input
            type="number"
            pattern="[0-9]*"
            @input="handelerInput($event,index,'activity')"
            class="ipt_txt"
            :class="{'disabled':!isFirst&&!isEditing}"
            :readonly="!isFirst&&!isEditing"
            v-model="item.price"
            placeholder="请填写报价"
          >
        </div>
      </div>
    </div>
    <!-- 活动类end -->
    <!-- 其他类start -->
    <div class="common_hd" id="other">
      <em class="icon_line"></em>
      <h3>其他类</h3>
      <div class="tit_tip">含税价(元)</div>
    </div>
    <div class="price_items">
      <div class="price_item" v-for="(item,index) in priceItems.other" :key="index">
        <label for>{{item.title}}</label>
        <div class="price_wrapper">
          <input
            type="number"
            pattern="[0-9]*"
            @input="handelerInput($event,index,'other')"
            class="ipt_txt"
            :class="{'disabled':!isFirst&&!isEditing}"
            :readonly="!isFirst&&!isEditing"
            v-model="item.price"
            placeholder="请填写报价"
          >
        </div>
      </div>
    </div>
    <!-- 其他类end -->
    <!-- 说明start -->
    <div class="txt_box">
      <h3>说明：</h3>
      <p>
        1、我们将根据报价，不定时地匹配合适的商业活动。
        <br>2、从未报过价的用户可随时填写报价。已经报过价的用户，每月25号后才开放修改报价的权限，修改后的报价将于次月1号开始生效。
      </p>
    </div>
    <!-- 说明end -->
    <div class="btn_wrapper" v-if="isFirst">
      <a href="javascript:;" class="btn_red" :class="{'disabled':!isChecked}" @click="saveConfirm">保存</a>
    </div>
    <div class="btn_wrapper" v-else>
      <p v-if="priceInfo.is_editor!='10001'">你已报过价，每月25号之后才可重新编辑报价</p>
      <a
        href="javascript:;"
        class="btn_red"
        :class="{'disabled':priceInfo.is_editor!='10001'}"
        v-if="!isEditing"
        @click="edit"
      >编辑</a>
      <a href="javascript:;" class="btn_red" v-if="isEditing" @click="savePrice">保存</a>
    </div>
    <div class="shadow" v-if="isConfirm"></div>
    <div class="layer_confirm" v-if="isConfirm">
      <div class="txt">
        <dl>
          <dt>确认报价</dt>
          <dd>这是你的第一次报价，本次报价提交后如需调整，可在每月25号之后操作，是否确认？</dd>
        </dl>
      </div>
      <div class="btn">
        <a href="javascript:;" class="cancel" @click="cancel">取消</a>
        <a href="javascript:;" @click="savePrice">确定</a>
      </div>
    </div>
  </section>
</template>
<script>
import priceService from "@/services/priceService.js";
export default {
  components: {},
  data() {
    return {
      activeIndex: 0,
      priceInfo: {},
      isFirst: false,
      isEditing: false,
      tipIsShow: false,
      firstId: "",
      isConfirm: false,
      priceItems: {
        wb: [
          { title: "自己写文案，有品牌露出的原发微博", price: "" },
          { title: "自己写文案，无品牌露出的原发微博", price: "" },
          { title: "合作方提供文案，有品牌露出的原发微博", price: "" },
          { title: "合作方提供文案，无品牌露出的原发微博", price: "" },
          { title: "自己写文案，有品牌露出的转发微博", price: "" },
          { title: "自己写文案，无品牌露出的转发微博", price: "" }
        ],
        article: [
          { title: "自己写，有品牌露出的原发头条文章", price: "" },
          { title: "自己写，无品牌露出的原发头条文章", price: "" },
          { title: "合作方提供，有品牌露出的原发头条文章", price: "" },
          { title: "合作方提供，无品牌露出的原发头条文章", price: "" },
          {
            title: "合作方提供，有品牌露出的文章发布到你的微信公众号上",
            price: ""
          },
          {
            title: "合作方提供，无品牌露出的文章发布到你的微信公众号上",
            price: ""
          },
          {
            title: "授权合作方转载你的文章到公众号或其他平台",
            price: ""
          },
          {
            title: "冠名文章",
            price: ""
          }
        ],
        video: [
          { title: "视频拍摄，有品牌露出(5-10分钟)", price: "" },
          { title: "视频拍摄，无品牌露出(5-10分钟)", price: "" },
          { title: "直播，有品牌露出(30-60分钟)", price: "" },
          { title: "直播，无品牌露出(30-60分钟)", price: "" }
        ],
        activity: [{ title: "出席线下沙龙、论坛活动", price: "" }],
        other: [
          { title: "产品代言", price: "" },
          { title: "肖像授权", price: "" }
        ]
      }
    };
  },
  computed: {
    isChecked() {
      let is = false;
      for (let i = 0; i < this.priceItems.wb.length; i++) {
        if (this.priceItems.wb[i].price != "") {
          is = true;
        }
      }
      for (let i = 0; i < this.priceItems.article.length; i++) {
        if (this.priceItems.article[i].price != "") {
          is = true;
        }
      }
      for (let i = 0; i < this.priceItems.video.length; i++) {
        if (this.priceItems.video[i].price != "") {
          is = true;
        }
      }
      for (let i = 0; i < this.priceItems.activity.length; i++) {
        if (this.priceItems.activity[i].price != "") {
          is = true;
        }
      }
      for (let i = 0; i < this.priceItems.other.length; i++) {
        if (this.priceItems.other[i].price != "") {
          is = true;
        }
      }
      return is;
    }
  },

  created() {
    console.log("医生id", this.$route.query.docId);
    //医生id "55dbe10f0cf217b4f9cbcf27"
    this.docId = this.$route.params.userId;
    this.getUserPrice();
  },
  methods: {
    handelerInput(e,index,key){
      console.log(e.target.value);
      this.priceItems[key][index].price = parseInt(e.target.value);
    },
    goAnchor(selector, index) {
      var anchor = this.$el.querySelector(selector);
      try {
        window.scrollTo(0,anchor.offsetTop);
      } catch (error) {
        document.documentElement.scrollTop = anchor.offsetTop;
      }
      this.changeTab(index);
    },
    changeTab(index) {
      this.activeIndex = index;
    },
    getUserPrice() {
      let _this = this;
      let queryParams = {
        takeEffectType: "",
        user_id: this.docId
      };
      priceService.getUserPrice(queryParams).then(res => {
        if (res.status == 200) {
          _this.priceInfo = res.data.proxy_commercial_price;
          _this.firstId = _this.priceInfo.id;
          if (_this.priceInfo.id == "") {
            _this.isFirst = true;
            return;
          }
          if (_this.priceInfo.take_effect_type == "10002") {
            _this.tipIsShow = true;
          }
          _this.priceItems = {
            wb: [
              {
                title: "自己写文案，有品牌露出的原发微博",
                price: _this.priceInfo.weibo_brand_own_orig_copy
              },
              {
                title: "自己写文案，无品牌露出的原发微博",
                price: _this.priceInfo.weibo_own_orig_copy
              },
              {
                title: "合作方提供文案，有品牌露出的原发微博",
                price: _this.priceInfo.weibo_brand_part_orig_copy
              },
              {
                title: "合作方提供文案，无品牌露出的原发微博",
                price: _this.priceInfo.weibo_part_orig_copy
              },
              {
                title: "自己写文案，有品牌露出的转发微博",
                price: _this.priceInfo.weibo_brand_own_forw_copy
              },
              {
                title: "自己写文案，无品牌露出的转发微博",
                price: _this.priceInfo.weibo_own_forw_copy
              }
            ],
            article: [
              {
                title: "自己写，有品牌露出的原发头条文章",
                price: _this.priceInfo.brand_own_orig_article
              },
              {
                title: "自己写，无品牌露出的原发头条文章",
                price: _this.priceInfo.own_orig_article
              },
              {
                title: "合作方提供，有品牌露出的原发头条文章",
                price: _this.priceInfo.brand_part_orig_article
              },
              {
                title: "合作方提供，无品牌露出的原发头条文章",
                price: _this.priceInfo.part_orig_article
              },
              {
                title: "合作方提供，有品牌露出的文章发布到你的微信公众号上",
                price: _this.priceInfo.brand_part_article_offic_accounts
              },
              {
                title: "合作方提供，无品牌露出的文章发布到你的微信公众号上",
                price: _this.priceInfo.part_article_offic_accounts
              },
              {
                title: "授权合作方转载你的文章到公众号或其他平台",
                price: _this.priceInfo.part_forw_article
              },
              {
                title: "冠名文章",
                price: _this.priceInfo.named_article
              }
            ],
            video: [
              {
                title: "视频拍摄，有品牌露出(5-10分钟)",
                price: _this.priceInfo.brand_video
              },
              {
                title: "视频拍摄，无品牌露出(5-10分钟)",
                price: _this.priceInfo.no_brand_video
              },
              {
                title: "直播，有品牌露出(30-60分钟)",
                price: _this.priceInfo.brand_live
              },
              {
                title: "直播，无品牌露出(30-60分钟)",
                price: _this.priceInfo.no_brand_live
              }
            ],
            activity: [
              {
                title: "出席线下沙龙、论坛活动",
                price: _this.priceInfo.offline_activities
              }
            ],
            other: [
              {
                title: "产品代言",
                price: _this.priceInfo.product_endorsements
              },
              {
                title: "肖像授权",
                price: _this.priceInfo.portrait_authorization
              }
            ]
          };

          for (const key in this.priceItems) {
            let item = this.priceItems[key];
            item.forEach((sitem)=>{
              sitem.price = parseInt(sitem.price);
            });
          }
          console.log(this.priceItems);
        }
      });
    },
    savePrice() {
      console.log("未执行保存操作");
      this.isEditing = false;
      if (this.isChecked) {
        console.log("执行了保存操作");
        let _this = this;
        let queryParams = {
          weibo_brand_own_orig_copy: _this.priceItems.wb[0].price,
          weibo_own_orig_copy: _this.priceItems.wb[1].price,
          weibo_brand_part_orig_copy: _this.priceItems.wb[2].price,
          weibo_part_orig_copy: _this.priceItems.wb[3].price,
          weibo_brand_own_forw_copy: _this.priceItems.wb[4].price,
          weibo_own_forw_copy: _this.priceItems.wb[5].price,

          brand_own_orig_article: _this.priceItems.article[0].price,
          own_orig_article: _this.priceItems.article[1].price,
          brand_part_orig_article: _this.priceItems.article[2].price,
          part_orig_article: _this.priceItems.article[3].price,
          brand_part_article_offic_accounts: _this.priceItems.article[4].price,
          part_article_offic_accounts: _this.priceItems.article[5].price,
          part_forw_article: _this.priceItems.article[6].price,
          named_article: _this.priceItems.article[7].price,

          brand_video: _this.priceItems.video[0].price,
          no_brand_video: _this.priceItems.video[1].price,
          brand_live: _this.priceItems.video[2].price,
          no_brand_live: _this.priceItems.video[3].price,

          offline_activities: _this.priceItems.activity[0].price,

          product_endorsements: _this.priceItems.other[0].price,
          portrait_authorization: _this.priceItems.other[1].price,

          real_name: _this.priceItems.real_name,
          user_id: _this.docId,
          status: _this.priceItems.status
        };
        priceService.priceUpdate(queryParams).then(res => {
          if (res.status == 200) {
            console.log("保存成功");
            _this.isFirst = false;
            _this.isEditing = false;
            _this.firstId = _this.priceInfo.id = res.data.commercial_price.id;
            _this.priceInfo.take_effect_type = res.data.commercial_price.take_effect_type;
            _this.priceInfo.is_editor = res.data.commercial_price.is_editor;
            if (_this.firstId != "") {
              if (_this.priceInfo.take_effect_type == "10002") {
                _this.tipIsShow = true;
              }
            }
          }
        });
      }
      this.isConfirm=false;
    },
    saveConfirm() {
      console.log("saveConfirm");
      let _this = this;
      if (this.isChecked) {
        if (_this.firstId == "") {
          _this.isConfirm = true;
        }
      }
    },
    cancel() {
      this.isConfirm = false;
    },
    edit() {
      let _this = this;
      if (_this.priceInfo.is_editor == "10001") {
        _this.tipIsShow = false;
        _this.isEditing = true;
      }
    }
  }
};
</script>
<style lang="less" scoped>
@r: 75rem;
.tab {
  padding: 20 / @r 0;
  background-color: #f3f4f5;
  ul {
    display: flex;
    li {
      flex: 1;
      padding: 0 10 / @r;
      width: 0;
      a {
        display: block;
        font-size: 26 / @r;
        height: 52 / @r;
        background: #fff;
        border: 1px solid #d9d9d9;
        border-radius: 26 / @r;
        text-align: center;
        line-height: 52 / @r;
        color: #666;
        &.current {
          color: #e51c23;
          border-color: #e51c23;
        }
      }
    }
  }
}
.common_hd {
  background-color: #f3f4f5;
  display: flex;
  padding: 20 / @r 30 / @r 0;
  line-height: 70 / @r;
  .icon_line {
    display: block;
    width: 6 / @r;
    height: 22 / @r;
    background-color: #e51c23;
    margin: 24 / @r 15 / @r 0 0;
  }
  h3 {
    font-size: 30 / @r;
    color: #2d2d2d;
    font-weight: bold;
    flex: 1;
    width: 0;
  }
  .tit_tip {
    font-size: 26 / @r;
    color: #999;
  }
}

.price_items {
  padding-left: 30 / @r;
  .price_item {
    display: flex;
    flex-direction: row;
    padding: 24 / @r 30 / @r 24 / @r 0;
    border-bottom: 1px solid #ececec;
    label {
      flex: 1;
      line-height: 40 / @r;
      font-size: 25 / @r;
      display: flex;
      align-items: center;
      width: 0;
    }
    .price_wrapper {
      width: 160 / @r;
      display: flex;
      align-items: center;
      padding-left: 28 / @r;
      .ipt_txt {
        box-sizing: border-box;
        width: 160 / @r;
        height: 52 / @r;
        border: 1px solid #d9d9d9;
        border-radius: 4 / @r;
        text-align: right;
        padding: 10 / @r;
        line-height: 30 / @r;
        font-size: 25 / @r;
        color: #666;
        &.disabled {
          color: #2D2D2D;
          background-color: #fff;
          border-color: #fff;
        }
        &::-webkit-input-placeholder {
          color: #ccc;
        }
        &:-moz-placeholder {
          color: #ccc;
        }
        &::-moz-placeholder {
          color: #ccc;
        }
      }
    }
    &:last-child {
      border: 0;
    }
  }
}
.txt_box {
  h3 {
    font-weight: bold;
    font-size: 26 / @r;
    padding-bottom: 18 / @r;
  }
  padding: 30 / @r 30 / @r 250 / @r 30 / @r;
  font-size: 24 / @r;
  color: #999;
  line-height: 36 / @r;
  background-color: #f3f4f5;
}

.btn_wrapper {
  padding: 20 / @r;
  position: fixed;
  background-color: #fff;
  box-shadow: 0px 0px 10px 0px rgba(236, 236, 236, 1);
  left: 0;
  right: 0;
  bottom: 0;
  p {
    font-size: 24 / @r;
    color: #999;
    padding-bottom: 19 / @r;
    text-align: center;
  }
  .btn_red {
    background-color: #e51c23;
    border-radius: 6 / @r;
    font-size: 30 / @r;
    color: #fff;
    height: 84 / @r;
    line-height: 84 / @r;
    color: #fff;
    text-align: center;
    display: block;
    &.disabled {
      opacity: 0.3;
    }
  }
}
.tip_wrapper {
  .blank {
    height: 80 / @r;
  }
}
.edit_tip {
  width: 100%;
  box-sizing: border-box;
  height: 80 / @r;
  line-height: 40 / @r;
  padding: 20 / @r 30 / @r;
  background-color: #fef3c8;
  color: #263238;
  font-size: 24 / @r;
  z-index: 1;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  em {
    display: inline-block;
    width: 40 / @r;
    height: 40 / @r;
    background: url(./images/msg_icon_tips@2x.png) no-repeat;
    background-size: 40 / @r 40 / @r;
    vertical-align: middle;
    margin: 0 17 / @r 0 0;
    position: relative;
    top: -2px;
  }
}

.shadow {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}
.layer_confirm {
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -260 / @r;
  margin-top: -175 / @r;
  width: 520 / @r;
  border-radius: 10 / @r;
  font-size: 30 / @r;
  line-height: 44 / @r;
  color: #666;
  background-color: #fff;
  .txt {
    text-align: center;
    padding: 30 / @r;
    dt {
      font-size: 34 / @r;
      padding-bottom: 18 / @r;
      color: #2d2d2d;
      font-weight: bold;
    }
  }
  .btn {
    display: flex;
    border-top: 1px solid #e5e5e5;
    a {
      flex: 1;
      line-height: 96 / @r;
      display: block;
      text-align: center;
      font-size: 34 / @r;
      color: #2d2d2d;
      border-right: 1px solid #e5e5e5;
      &:last-child {
        border: 0;
      }
      &.cancel {
        color: #999;
      }
    }
  }
}
</style>
