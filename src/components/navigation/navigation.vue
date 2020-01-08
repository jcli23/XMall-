<template>
  <div>
    <div class="navigation" :class="{'navigation_last':searchBarFixed}">
      <div class="warp center">
        <div class="left">
          <div v-for="(item,index) in navSub" :key="index" class="for">
            <div class="spot"></div>
            <div class="font" :class="num===index? 'bold':''" @click="click(index)">{{item}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 0,
      searchBarFixed: false,
      navSub: [
        "首页",
        "全部",
        "品牌周边",
        "捐赠名单",
        "后台管理系统",
        "XPay支付系统",
        "XBoot开发平台",
        "宣传视频",
        "Github",
        "商用授权"
      ]
    };
  },
  components: {},
  methods: {
    click(e) {
      this.num = e;
      if(e===0){
        this.$router.push('/')
      }
      if(e===1){
        this.$router.push('/goods')
      }
    },
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop >=                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       100) {
        this.searchBarFixed = true;
      } else {
        this.searchBarFixed = false;
      }
    }
  },
  mounted() {
     window.addEventListener("scroll", this.handleScroll);
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.navigation {
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  .center {
    display: flex;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      .for {
        width: 0 auto;
        height: 28px;
        display: flex;
        min-width: 68px;
        justify-content: center;
        align-items: center;
        position: relative;
        .spot {
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background: #666;
          position: absolute;
          left: 0;
          top: 13px;
        }
        .font {
          padding: 0 10px;
          &:hover {
            color: #5079d9;
          }
        }
        .bold {
          font-weight: 700;
        }
      }
    }
    .right_right {
      display: none;
    }
  }
}
.navigation_last {
  width: 100%;
  height: 60px;
  display: flex;
  z-index: 100;
  align-items: center;
  background: rgb(252, 251, 251);
  position: fixed;
  top: 0;
}
</style>