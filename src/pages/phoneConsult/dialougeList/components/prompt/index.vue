<template>
  <div class="top-wrapper">
    <div class="fixed-wrapper">
      <div class="prompt-wrapper">
        <div class="prompt-left">
          <div class="status confirming" v-if="data.status=='20001'">
            <span class="spot"></span>
            <span>待确认</span>
          </div>
          <div class="status asking" v-else-if="data.status=='70001'">
            <span class="spot"></span>
            <span>咨询中</span>
          </div>
        </div>
        <div class="prompt-right">
          <span class="tip" v-if="data.status=='20001'">{{data.callTime}}</span>
          <span class="tip" v-else-if="data.status=='70001'" id="timer"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "prompt",
    props: {
      data: {
        type: Object,
        default: () => {},
      }
    },
    data() {
      return {
        setInterTimer: null
      };
    },
    destroyed() {
      //销毁计时器
      clearInterval(this.setInterTimer);
    },
    computed: {},
    watch:{
      "data.status"(status){
        if (status == "70001") {
          console.log(this.data.residueTime);
          this.timer(this.data.residueTime);
        }
      }
    },
    created() {
      if (this.data.status == "70001") {
        console.log(this.data.residueTime);
        this.timer(this.data.residueTime);
      }
    },
    methods: {
      timer(ts) {
        let This = this;
        this.setInterTimer = setInterval(function () {
          var hh = Math.floor(ts / 1000 / 60 / 60); //计算剩余的小时数
          var mm = Math.floor(ts / 1000 / 60 % 60); //计算剩余的分钟数
          var ss =  Math.floor(ts / 1000  % 60); //计算剩余的秒数
          
          hh = checkTime(hh);
          mm = checkTime(mm);
          ss = checkTime(ss);

          function checkTime(i) {
            if (i < 10) {
              i = "0" + i;
            }
            return i;
          }

          if (ts > 0) {
            let residueTime = hh + " 小时 " + mm + " 分 " + ss + " 秒";
            document.getElementById("timer").innerHTML = "剩余 " + residueTime + " 自动结束";
            ts = ts - 1000;
          } else{
            clearInterval(This.setInterTimer);
            // document.getElementById("timer").innerHTML = "剩余 0 小时 0 分 0 秒";
            document.getElementById("timer").innerHTML = "";
          }
        }, 1000);
      }
    },
  };

</script>
<style scoped lang="less" rel="stylesheet/less">
  @r: 75rem;

  .top-wrapper {
    height:40px;
    width:100%;
    padding-top:8px;
  }

  .fixed-wrapper {
    background: #F3F4F5;
    position: fixed;
    left: 0;
    top: 0;
    height: 50px;
    line-height: 40px;
    width: 100%;
    z-index: 999;
  }

  .prompt-wrapper {
    padding: 0 10px;
    margin: 8px 8px 0px;
    background: #fff;
    border-radius: 3px;
    border: 1px solid rgba(239, 239, 239, 1);
    display: flex;
    justify-content: space-between;

    span {
      display: inline-block;
    }

    .status {
      .spot {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        position: relative;
        top: -3px;
        margin: 0 3px;
      }

      &.confirming {
        color: rgba(251, 67, 67, 1);

        .spot {
          background: rgba(251, 67, 67, 1);
          animation: show 1s infinite;
        }
      }

      &.asking {
        color: #3DAAE3;

        .spot {
          background: #3DAAE3;
          animation: show 2s infinite;
        }
      }
    }

    .prompt-right {
      color: #666666;
      font-size: 12px;
    }
  }

  @keyframes show
  {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

</style>
