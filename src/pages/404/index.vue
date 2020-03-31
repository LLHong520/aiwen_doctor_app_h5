<template>
  <section class="wrapper 404">
    <section class="empty">
      <img src="./bg_null_normal@2x.png" />
      <div class="tip">
        em....页面好像走丢了
      </div>
    </section>
  </section>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      dataList: []
    };
  },
  computed: {},
  created() {
  },
  methods: {}
};
</script>

<style lang="less" scoped>

.wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: fixed;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
}

.empty{
  width: 195px;
  height: 220px;

  img{
    width: 100%;
  }
  .tip{
    text-align: center;
    color: #ccc;
    font-size: 14px;
  }

}

</style>
