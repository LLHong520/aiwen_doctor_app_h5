<template>
  <div>
    <van-nav-bar :title="title" left-text="返回" right-text="保存" left-arrow @click-left="onClickLeft"
      @click-right="add" />
    <div>
      <van-field maxlength="200" v-model="info.content" type="textarea" placeholder="常用语最多输入200字" rows="3" autosize />
    </div>
  </div>
</template>

<script>
import phraseService from "@/services/phraseService.js";
export default {
  data() {
    return {
      info: {
        content: ""
      }
    };
  },
  computed: {
    title() {
      let title = "常用语";
      return this.$route.query.id ? "编辑" + title : "新增" + title;
    }
  },
  created() {
    if (this.$route.query.id) {
      this.getInfo();
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    add() {
      if (this.$route.query.id) {
        this.edit();
        return;
      }
      let content = this.info.content;
      if (content == "") {
        this.$mtoast.tip("请输入常用语~");
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
          if (res.status == 200) {
            this.$mtoast.tip("保存成功！");
            this.onClickLeft();
          } else {
            this.$mtoast.tip("保存失败！");
          }
        }).finally(() => {
          this.$toast.clear();
        });
    },
    edit() {
      let content = this.info.content;
      let id = this.$route.query.id;
      if (content == "") {
        this.$mtoast.tip("请输入常用语~");
        return;
      }
      this.$toast.loading({
        mask: true,
        message: "保存中..."
      });
      phraseService.updateUsefulExpressions({
        content,
        id,
      })
        .then((res) => {
          if (res.status == 200) {
            this.$mtoast.tip("保存成功！");
            this.onClickLeft();
          } else {
            this.$mtoast.tip("保存失败！");
          }
        })
        .finally(() => {
          this.$toast.clear();
        });
    },
    getInfo() {
      let id = this.$route.query.id;
      phraseService.UsefulExpressionsDetails({
        id
      })
        .then((res) => {
          if (res.status == 200 && res.data) {
            this.info = res.data;
          } else {
            this.$mtoast.tip("获取常用语详情失败~");
          }
        });
    }
  }
};

</script>

<style lang="less" scoped>

</style>
