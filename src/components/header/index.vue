<template>
  <header class="header_wrapper"  >
    <slot name='left'>
      <i class="icon_back" @click="backPrev"></i>
    </slot>

    <slot name='middle'>
      <p v-if="title != ''">{{title}}</p>
    </slot>

    <slot name='right'>
      <i class="header_icon_right"></i>
    </slot>
  </header>
</template>

<script>
import { commonMixin } from "@/mixins";

export default {
  name: "mHeader",
  mixins: [commonMixin],
  props: {
    title: {
      type: String,
      default: ""
    },
  },
  data () {
    return {};
  },
  components: {},
  computed: {},
  methods: {
    backPrev() {
      this.$router.back(-1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
@r: 75rem;

.header_wrapper {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  // padding-left: 10/@r;
  .icon_back {
    display: block;
    width: 80/@r;
    height: 80/@r;
    background: url("~@/assets/images/nav_back@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  p {
    color: #2D2D2D;
    font-size: 34/@r;
    font-weight: bold;
    line-height: 80/@r;
  }
  .header_icon_right {
    display: block;
    width: 80/@r;
    height: 80/@r;
    margin-right: 10/@r;
  }
}
</style>
