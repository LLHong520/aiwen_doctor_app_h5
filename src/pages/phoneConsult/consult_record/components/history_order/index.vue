
<template>
  <section>
    <div v-if="historyOrderList.length > 0" class="item_wrapper">
      <div class="order_item" v-for="(item, index) in historyOrderList" :key="index">
        <router-link v-if="item.userResult" :to="{name: 'dialougeList', params: { id: item.userResult.id }}">
          <div class="photo_wrapper">
            <img :src="item.userResult.avatar" alt="">
          </div>
          <div class="order_info">
            <div class="top">
              <p>{{item.userResult.userName}}</p>
              <p class="price">￥{{item.servicePrice}}</p>
            </div>
            <div class="bottom">
              <p>{{item.createDate | dataFormat}}</p>
              <p v-if="item.orderStatus=='90001'||item.orderStatus=='99999'">已完成</p>
              <p v-if="item.orderStatus=='80001'">超时关闭</p>
              <p v-if="item.orderStatus=='80002'" class="red">已取消</p>
              <p v-if="item.orderStatus=='60001'" class="red">退款结束</p>
              <p v-if="item.orderStatus=='40001'" class="red">已取消</p>
            </div>
          </div>
        </router-link>
      </div>

      <loading-more
        :loading="loading"
        :title="loadingText"
        @loadFn="renderDataList"
        :scroll_load="true"
      ></loading-more>
    </div>
    <null-data v-else :nullText="nullText"></null-data>

  </section>
</template>

<script>
import { commonMixin } from "@/mixins";
import nullData from "../null_data/index";
import loadingMore from "@/components/loading_more/index";

import phoneService from "@/services/phoneService.js";

export default {
  name: "historyRrder",
  mixins: [commonMixin],
  props: {
  },
  data() {
    return {
      nullText: "暂无咨询订单",
      loading: false,
      loadingText: "加载更多",
      historyOrderList: [],
      pageSize: 10,
      pageIndex: 0,
      isThereMore: true,
    };
  },
  components: {
    nullData,
    loadingMore
  },
  created(){
    this.renderDataList();
  },
  methods:{
    renderDataList() {
      if(this.loading || !this.isThereMore) return;
      this.loading = true;

      let data = {
        "size": this.pageSize,
        "page": this.pageIndex + 1
      };
      phoneService.historyOrderList(data).then((res) => {
        this.loading = false;
        if(res.status == 200 && res.data) {
          this.pageIndex += 1;
          this.historyOrderList = this.historyOrderList.concat(res.data.list);
          let allPages = Math.floor(res.total/this.pageSize);
          if (this.pageIndex > allPages) {
            this.isThereMore = false;
            this.loadingText = "没有更多了~";
          } else {
            this.isThereMore = true;
          };
        }else {
          this.loading = false;
          toast.tip("加载失败~");
        };
      }).catch(() => {
        this.isThereMore = false;
        this.loadingText = "没有更多了~";
      });
    },
  }
};
</script>

<style scoped lang="less"  rel="stylesheet/less">
@r: 75rem;

.item_wrapper {
  background-color: #fff;
}
.order_item {
  a{
    display: flex;
    padding: 33/@r 0 0 30/@r;
  }
}

.photo_wrapper {
  margin-right: 24/@r;
  img {
    width: 80/@r;
    height: 80/@r;
    border-radius: 80/@r;
    background-color: #f1f1f1;
  }
}
.order_info {
  flex: 1;
  border-bottom: 1/@r solid #EFEFEF;
  padding: 0 30/@r 36/@r 0;
  box-sizing: border-box;
  .top,
  .bottom {
    display: flex;
    justify-content: space-between;
  }
  p {
    line-height: 1;
  }
  .top {
    margin-bottom: 19/@r;
    p {
      color: #2D2D2D;
      font-size: 28/@r;
    }
    .price {
      color: #2D2D2D;
      font-size: 32/@r;
      font-weight: bold;
    }
  }
  .bottom {
    p {
      font-size: 24/@r;
      color: #CCCCCC;
    }
    .red{
      color: #EA444A;
    }
  }
}
</style>
