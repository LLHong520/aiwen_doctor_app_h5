<template>
  <div class="list-wrapper">
    <!-- <van-nav-bar title="常用语设置" left-text="返回" right-text="新增" left-arrow @click-left="onClickLeft"
      @click-right="onClickRight" /> -->
    <div v-if="list.length > 0">
      <template v-for="(item,index) in list">
        <van-swipe-cell v-show="!item.isDel" :key="item.id">
          <van-cell @click="confirmHandler(index,item.id)">
            <span class="content" v-html="item.content"></span>
          </van-cell>
          <template slot="right">
            <van-button @click="delConfirm(item.id,index)" square type="danger" text="删除" style="height:100%" />
          </template>
        </van-swipe-cell>
      </template>
    </div>
    <null-data v-else :nullText="nullText"></null-data>
  </div>
</template>

<script>
import phraseService from "@/services/phraseService.js";
import nullData from "@/components/null_data/index";
export default {
  components: {
    nullData
  },
  data() {
    return {
      list: [],
      nullText: "暂未添加常用语",
    };
  },
  created() {
    this.getList();
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onClickRight() {
      this.$router.push({
        name: "phrase.add"
      });
    },
    confirmHandler(index) {
      this.$emit("confirmPhrase", this.list[index].content);
    },
    editHandler(id) {
      this.$router.push({
        name: "phrase.add",
        query: {
          id
        }
      });
    },
    delConfirm(id, index) {
      this.$dialog.confirm({
        // title: "标题",
        message: "确认删除该常用语？",
        confirmButtonText: "确认",
        confirmButtonColor: "#E51C23",
        cancelButtonText: "取消",
        cancelButtonColor: "#666666",
      }).then(() => {
        console.log("确认删除");
        this.delhandler(id, index);
      }).catch(() => {
        // on cancel
      });
    },
    delhandler(id, index) {
      phraseService.deleteUsefulExpressions({
        id
      })
        .then((res) => {
          if (res.status == 200) {
            this.$mtoast.tip("操作成功！");
            this.list[index].isDel = true;
          } else {
            this.$mtoast.tip("操作失败！");
          }
        });
    },
    unshiftNew(newItem){
      // console.log(newItem);
      this.list.unshift({
        ...newItem,
        isDel:false
      });
    },
    getList() {
      phraseService.findAllUseful({})
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            res.data = res.data.map((item) => {
              item.content = utils.replaceBrTag(item.content);
              item.isDel = false;
              return item;
            });
            this.list = res.data;
          }
        });
    }
  }
};

</script>

<style lang="less" scoped>
.list-wrapper {
  /deep/ .van-cell{
    padding: 10px 16px;
  }
  /deep/ .van-cell__value{
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */

    word-break:break-all;
  }
  /deep/.van-cell:not(:last-child):after {
    left: 0;
  }
}
</style>
