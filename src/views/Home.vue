<template>
  <div>
    <top></top>
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
    <div class="a" v-if="num===0">
      <banner :banner="banner" :class="{'banner':searchBarFixed}"></banner>
      <panel :panel="panel"></panel>
      <hot class="hot" :hot="hot"></hot>
      <handpick :selection="selection1" class="selection"></handpick>
      <handpick :selection="selection2" class="selection"></handpick>
      <handpick :selection="selection3" class="selection"></handpick>
      <panel :panel="panel2" class="panel"></panel>
      <bottom class="bottom"></bottom>
    </div>
    <div class="a" v-if="num===1">
      222
    </div>
  </div>
</template>

<script>
import banner from '../../src/components/banner/banner'
import panel from '../../src/components/panel/panel'
import hot from '../../src/components/hot/hot'
import handpick from '../../src/components/handpick/handpick'
import bottom from '../../src/components/bottom/bottom'
export default {
  data() {
    return {
      searchBarFixed: false,
      num: 0,
      banner:{},
      panel:[],
      panel2:[],
      hot:{},
      selection1:{},
      selection2:{},
      selection3:{},
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
  components: {
    banner,
    panel,
    hot,
    handpick,
    bottom
  },
  mounted() {
    this.$api
      .getHome()
      .then(res => {
        console.log(res);
        this.banner=res.data[0]
        this.panel=res.data[1].panelContents
        this.panel2=res.data[6].panelContents
        this.hot=res.data[2]
        this.selection1=res.data[3]
        this.selection2=res.data[4]
        this.selection3=res.data[5]
      })
      .catch(err => {
        console.log(err);
      }),
      window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    click(e) {
      this.num = e;
    },
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 100) {
        this.searchBarFixed = true;
      } else {
        this.searchBarFixed = false;
      }
    }
  },
  watch: {},
  computed: {}
};
</script>

<style lang='scss' scoped>
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
.a {
  height: 1000px;
  .banner{
    margin-top: 120px;
  }
  .hot{
    width: 100%;
    height: 522px;
    padding-top:30px;
    background: #f2f2f2;
  }
  .panel{
    width: 100%;
    padding-top:30px;
    background: #f2f2f2;
  }
  .selection{
    width: 100%;
    padding-top:30px;
    background: #f2f2f2;
  }
  .bottom{
    width: 100%;
    padding-top:50px;
    background: #f2f2f2;
  }
}
</style>