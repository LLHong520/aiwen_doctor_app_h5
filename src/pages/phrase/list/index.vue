<template>
  <div>
    <van-nav-bar title="常用语设置" left-text="返回" right-text="新增" left-arrow @click-left="onClickLeft"
      @click-right="onClickRight" />
    <div v-if="list.length > 0">

    <template v-for="(item,index) in list">
      <van-swipe-cell v-show="!item.isDel" :key="item.id">
        <van-cell @click="editHandler(item.id)" :value="item.content" />
        <template slot="right">
          <van-button @click="delConfirm(item.id,index)" square type="danger" text="删除" />
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
  components:{
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
    getList() {
      phraseService.findAllUseful({})
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data) {
            res.data = res.data.map((item) => {
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

</style>
