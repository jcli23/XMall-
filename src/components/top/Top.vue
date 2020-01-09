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
              <img
                class="user"
                v-if="enter===false"
                src="../images/user_befor.png"
                @click="login"
                alt
              />
              <img
                class="user"
                v-if="enter===true"
                src="../images/user_last.png"
                @click="login"
                alt
              />
              <div v-if="user!==null&enter===true" class="userbox">
                <div class="information">
                  <img src="../../components/images/icon.png" alt />
                  <div class="username">{{user.username}}</div>
                </div>
                <div v-for="(item,index) in firstList" :key="index" class="for">
                  <div class="name">{{item.name}}</div>
                </div>
              </div>
            </div>
            <div class="right">
              <div class="cart_icon" @mouseenter="mouseenter1" @mouseleave="mouseleave1">
                <img class="cart" v-if="enter1===false" src="../images/cart_befor.png" alt />
                <img class="cart" v-if="enter1===true" src="../images/cart_last.png" @click="gotocart" alt />
                <img
                  class="sanjiao"
                  v-if="entercart===true"
                  src="../../components/images/sanjiao.png"
                  alt
                />
                <div class="carbox" v-if="entercart===true" @mouseleave="mouseleave2">
                  <div class="box">
                    <div v-if="length<4">
                      <div v-for="(item,index) in goods" :key="index" class="for">
                        <div class="img">
                          <img :src="item.productImageBig" alt />
                        </div>
                        <div class="rightbox">
                          <div class="name">{{item.productName}}</div>
                          <div class="total">
                            <div class="price">￥{{item.salePrice}}</div>
                            <div class="count">X{{item.count}}</div>
                          </div>
                        </div>
                        <div class="del">
                          <img src="../../components/images/del.png" alt />
                        </div>
                      </div>
                    </div>
                    <div v-else>
                      <Scroll  height="480">
                        <div v-for="(item,index) in goods" :key="index" class="for">
                          <div class="img">
                            <img :src="item.productImageBig" alt />
                          </div>
                          <div class="rightbox">
                            <div class="name">{{item.productName}}</div>
                            <div class="total">
                              <div class="price">￥{{item.salePrice}}</div>
                              <div class="count">X{{item.count}}</div>
                            </div>
                          </div>
                          <div class="del" @click="delgoods(item._id)">
                            <img src="../../components/images/del.png" alt />
                          </div>
                        </div>
                      </Scroll>
                    </div>
                  </div>
                  <div class="bottom">
                    <div class="lefter">
                      <div class="totalcount">共{{count}}件商品</div>
                      <div class="bottom">
                        <div class="font">合计:</div>
                        <div class="totalprice">￥{{totalprice}}</div>
                      </div>
                    </div>
                    <div class="righter">
                      <div class="button" @click="gotocart">去购物车</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="count">
                <div class="font" :class="{'red':count!==0}" id="buycar">{{count}}</div>
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
      entercart: false,
      enter1: false,
      user: {},
      user: null,
      firstList: [
        {
          name: "我的订单",
          path: "/order"
        },
        {
          name: "账号资料",
          path: "/order"
        },
        {
          name: "收货地址",
          path: "/order"
        },
        {
          name: "售后服务",
          path: "/order"
        },
        {
          name: "我的优惠",
          path: "/order"
        },
        {
          name: "退出",
          path: "/order"
        }
      ]
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
      this.entercart = true;
    },
    mouseleave1() {
      this.enter1 = false;
    },
    mouseleave2() {
      this.entercart = false;
    },
    login() {
      if (localStorage.getItem("user")) {
        this.$router.push("/my_order");
      } else {
        this.$router.push("/login");
      }
    },
    gotocart(){
      this.$router.push('/cart')
    },
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop >= 100) {
        this.searchBarFixed = true;
      } else {
        this.searchBarFixed = false;
      }
    },
    delgoods(id) {
      this.$api.delCart({ productId: id }).then(res => {
        console.log(res);
        this.$api.getCarts().then(res => {
          this.$store.state.length= res.data.length;
          this.$store.state.goods = res.data;
          // console.log(this.goods);
          let count=0;
          let totalprice = 0;
          res.data.map(item => {
            count += item.count;
            totalprice += item.count * item.salePrice;
          });
          this.$store.state.count = count;
          this.$store.state.totalprice = totalprice;
        });
      });
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    let user = localStorage.getItem("user");
    if (user) {
      this.user = JSON.parse(user);
      console.log(this.user);
    }
    this.$api.getCarts().then(res => {
      this.$store.state.length= res.data.length;
          this.$store.state.goods = res.data;
          // console.log(this.goods);
          let count=0;
          let totalprice = 0;
          res.data.map(item => {
            count += item.count;
            totalprice += item.count * item.salePrice;
          });
          this.$store.state.count = count;
          this.$store.state.totalprice = totalprice;
    });
  },
  watch: {},
  computed: {
    count() {
      return this.$store.state.count;
    },
    length(){
      return this.$store.state.length;
    },
    goods(){
      return this.$store.state.goods;
    },
    totalprice(){
      return this.$store.state.totalprice;
    }
  }
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
          position: relative;
          .user {
            width: 20px;
            height: 20px;
          }
          .userbox {
            position: absolute;
            top: 43px;
            right: -45px;
            z-index: 500;
            width: 120px;
            background: white;
            border: 1px solid #b3b3b3;
            border-radius: 10px;
            .information {
              width: 100%;
              height: 120px;
              img {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                margin-left: 20px;
              }
              .username {
                height: 30px;
                width: 100%;
                text-align: center;
                line-height: 30px;
                font-size: 14px;
              }
            }
            .for {
              width: 100%;
              height: 35px;
              border-top: 1px solid #eeeeee;
              .name {
                width: 100%;
                height: 35px;
                text-align: center;
                font-size: 13px;
                line-height: 35px;
              }
            }
          }
        }
        .right {
          width: 60px;
          height: 30px;
          display: flex;
          .cart_icon {
            width: 30px;
            height: 30px;
            position: relative;
            .cart {
              width: 30px;
              height: 30px;
            }
            .sanjiao {
              width: 30px;
              height: 30px;
              position: absolute;
              top: 40px;
              right: 0;
              z-index: 601;
            }
            .carbox {
              width: 380px;
              min-height: 300px;
              max-width: 700px;
              background: white;
              position: absolute;
              top: 60px;
              right: -40px;
              z-index: 600;
              overflow: hidden;
              border-radius: 5px;
              box-shadow: 0 0 20px #cfcece;
              .box {
                width: 100%;
                .for {
                  width: 100%;
                  position: relative;
                  height: 120px;
                  padding: 15px 20px;
                  border-bottom: 1px solid #f2f2f2;
                  display: flex;
                  align-items: center;
                  .img {
                    width: 80px;
                    height: 80px;
                    border: 1px solid #f2f2f2;
                    img {
                      width: 100%;
                      height: 100%;
                    }
                  }
                  .rightbox {
                    margin-left: 20px;
                    width: 220px;
                    height: 80px;
                    padding: 0 15px 0 0;
                    .name {
                      height: 30px;
                      margin-top: 10px;
                      line-height: 30px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    }
                    .total {
                      display: flex;
                      height: 30px;
                      margin-top: 10px;
                      align-items: center;
                      .price {
                        color: rgb(250, 36, 36);
                        padding: 0 5px;
                        font-size: 14px;
                        font-weight: 700;
                      }
                      .count {
                        color: #999;
                        padding: 0 10px;
                        font-size: 12px;
                      }
                    }
                  }
                  .del {
                    position: absolute;
                    width: 20px;
                    right: 20px;
                    top: 50px;
                    height: 20px;
                    display: none;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 1px solid #b9b9c4;
                    &:hover {
                      background: #f2f2f2;
                    }
                    img {
                      margin-left: 4px;
                      width: 10px;
                      height: 10px;
                    }
                  }
                  &:hover {
                    background: #fcfafa;
                    .del {
                      display: block;
                    }
                  }
                }
              }
            }
            .bottom {
              width: 100%;
              height: 100px;
              display: flex;
              align-items: center;
              .lefter {
                width: 55%;
                height: 100px;
                padding: 15px 20px;
                .totalcount {
                  height: 30px;
                  line-height: 30px;
                  font-size: 13px;
                  color: #999;
                }
                .bottom {
                  height: 40px;
                  display: flex;
                  align-items: center;
                  .totalprice {
                    color: rgb(247, 48, 48);
                    font-size: 16px;
                    font-weight: 700;
                    padding-left: 10px;
                  }
                }
              }
              .righter {
                width: 40%;
                height: 100px;
                display: flex;
                align-items: center;
                .button {
                  width: 120px;
                  height: 50px;
                  line-height: 50px;
                  text-align: center;
                  background: #4336f3;
                  color: white;
                  border-radius: 5px;
                }
              }
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
          .red {
            background: red;
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