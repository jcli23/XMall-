<template>
  <div>
    <div class="top">
      <div class="center">
        <div class="left">
          <div class="icon">M</div>
        </div>
        <div class="right">
          <div class="left">
            <Input search placeholder="请输入商品信息" class="input" />
            <div class="font">全部商品</div>
            <div class="font">捐赠</div>
            <div class="line"></div>
          </div>
          <div class="right_right" :class="{'right_right_after':searchBarFixed}">
            <div @mouseenter="mouseenter" @mouseleave="mouseleave" class="left">
              <img class="user" v-if="enter===false" src="../images/user_befor.png" @click="login" alt />
              <img class="user" v-if="enter===true" src="../images/user_last.png" @click="login" alt />
            </div>
            <div class="right">
              <div class="cart_icon" @mouseenter="mouseenter1" @mouseleave="mouseleave1">
                <img class="cart" v-if="enter1===false" src="../images/cart_befor.png" alt />
                <img class="cart" v-if="enter1===true" src="../images/cart_last.png" alt />
              </div>
              <div class="count">
                <div class="font">{{count}}</div>
              </div>
            </div>
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
      searchBarFixed: false,
      enter: false,
      enter1: false,
      count: 0
    };
  },
  components: {},
  methods: {
    mouseenter() {
      this.enter = true;
    },
    mouseleave() {
      this.enter = false;
    },
    mouseenter1() {
      this.enter1 = true;
    },
    mouseleave1() {
      this.enter1 = false;
    },
    login(){
      this.$router.push('/login')
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
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.top {
  width: 100%;
  height: 100px;
  background: #1a1a1a;
  .center {
    width: 1220px;
    height: 100px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      width: 50px;
      height: 40px;
      .icon {
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: #1a1a1a;
        background: white;
        font-size: 28px;
        border-radius: 50%;
        margin: 0 auto;
      }
    }
    .right {
      width: 700px;
      display: flex;
      height: 100px;
      align-items: center;
      .left {
        display: flex;
        width: auto;
        height: 36px;
        align-items: center;
        margin: 0 22px 0 0;
        .input {
          width: 305px;
          .ivu-input {
            height: 36px;
          }
        }
        .font {
          font-size: 14px;
          padding: 0 25px 0 25px;
          width: auto;
          color: #c8c8c8;
        }
        .line {
          width: 1px;
          height: 13px;
          background: #333;
          margin: 0 0 0 25px;
        }
      }
      .right_right {
        width: 160px;
        height: 36px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          width: 20px;
          height: 20px;
          margin-left: 50px;
          .user {
            width: 20px;
            height: 20px;
          }
        }
        .right {
          width: 60px;
          height: 30px;
          display: flex;
          .cart_icon {
            width: 30px;
            height: 30px;
            .cart {
              width: 30px;
              height: 30px;
            }
          }
        }
        .count {
          width: 30px;
          height: 20px;
          .font {
            width: 20px;
            height: 20px;
            background: #c8c8c8;
            text-align: center;
            line-height: 20px;
            color: white;
            border-radius: 50%;
          }
        }
      }
      .right_right_after {
        width: 160px;
        height: 36px;
        display: flex;
        position: fixed;
        left: 50%;
        top: 19px;
        margin-left: 451px;
        margin-top: 0;
        z-index: 101;
        top: -50px;
        transform: translate3d(0, 59px, 0);
        transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
      }
    }
  }
}
</style>