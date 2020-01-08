<template>
  <div :class="{'all2':searchBarFixed===true}">
    <div class="all">
      <div class="warp">
        <div class="font1" :class="{'color':num===0}" @click="comprehensive">综合排序</div>
        <div class="font" :class="{'color':num===1}" @click="hign">价格从低到高</div>
        <div class="font" :class="{'color':num===2}" @click="low">价格从高到低</div>
        <div class="box">
          <input type="number" placeholder="价格" v-model="lowprice" />
          <span class="span">-</span>
          <input type="number" placeholder="价格" v-model="highprice" />
          <div class="confirm" @click="confirm">确定</div>
        </div>
      </div>
    </div>
    <div class="goods">
      <div class="warp">
        <div
          v-for="(item,index) in goods.slice((current-1)*page_size,current*page_size)"
          :key="index"
          class="for"
        >
          <img :src="item.productImageBig" class="img" alt />
          <div class="font1">{{item.productName}}</div>
          <div class="font2">{{item.subTitle}}</div>
          <div class="price">
            <div class="look">查看详情</div>
            <div class="add" @click="add(item.productImageBig,item.productId)">加入购物车</div>
            <div class="font">￥{{item.salePrice.toFixed(2)}}</div>
          </div>
        </div>
        <transition
            appear
            @before-appear="beforeEnter"
            @after-appear="afterEnter"
            v-for="(item,index) in showMoveDot"
            :key="index.id"
          >
            <div class="move_dot" ref="ball" v-if="item">
              <img :src="dropImage" alt="">
            </div>
          </transition>
      </div>
    </div>
    <div class="pages">
      <div class="warp">
        <Page
          :total="total"
          :current="current"
          show-total
          :page-size-opts="[6,10,15,20]"
          :page-size="page_size"
          @on-change="pages"
          @on-page-size-change="change_size"
          show-sizer
          show-elevator
          class="Page"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lowprice: "",
      highprice: "",
      current: 1,
      total: 30,
      page: 1,
      page_size: 6,
      size: 30,
      num: 0,
      searchBarFixed:false,
      addlock: false,
      addcart: null,
      goods: [],
      showMoveDot: [], //控制下落的小圆点显示隐藏
      elLeft: 0, //当前点击购物车按钮在网页中的绝对top值
      elTop: 0 //当前点击购物车按钮在网页中的绝对left值
    };
  },
  components: {},
  methods: {
    comprehensive() {
      this.num = 0;
    },
    hign() {
      this.num = 1;
      this.$api
        .getGoods({
          page: this.page,
          size: this.size,
          sort: 1,
          priceGt: Number(this.lowprice),
          priceLte: Number(this.highprice)
        })
        .then(res => {
          // console.log(res)
          this.goods = res.data;
          this.total = res.data.length;
          console.log(this.goods);
        })
        .catch(err => {
          console.log(err);
        });
    },
    low() {
      console.log(this.lowprice, 111);
      this.num = 2;
      let lowprice = Number(this.lowprice);
      let highprice = Number(this.highprice);
      this.$api
        .getGoods({
          page: this.page,
          size: this.size,
          sort: -1,
          priceGt: lowprice,
          priceLte: highprice
        })
        .then(res => {
          // console.log(res)
          this.goods = res.data;
          this.total = res.data.length;
          console.log(this.goods);
        })
        .catch(err => {
          console.log(err);
        });
    },
    confirm() {
      this.$api
        .getGoods({
          page: this.page,
          size: this.size,
          priceGt: Number(this.lowprice),
          priceLte: Number(this.highprice)
        })
        .then(res => {
          // console.log(res)
          this.goods = res.data;
          this.total = res.data.length;
          console.log(this.goods);
        })
        .catch(err => {
          console.log(err);
        });
    },
    pages(e) {
      this.current = e;
    },
    change_size(e) {
      this.page_size = e;
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
    },
    add(e,id) {
      this.dropImage = e;
      console.log(id)
      this.$api.addCart({productId:id}).then(res=>{
        console.log(res)
      })
      this.showMoveDot = [...this.showMoveDot, true];
      this.elLeft = event.target.getBoundingClientRect().left;
      this.elTop = event.target.getBoundingClientRect().top;
      console.log(this.elLeft, 1);
      console.log(this.elTop, 2);

    },
    beforeEnter(el) {
      // 设置transform值
      el.style.transform = `translate3d(${this.elLeft}px,${
        this.elTop-235
      }px , 0)`;
      // 设置透明度
      el.style.opacity = 0;
    },
    afterEnter(el) {
      // 获取底部购物车徽标
      const badgePosition = document
        .getElementById("buycar")
        .getBoundingClientRect();
      // 设置小球移动的位移
      console.log(badgePosition.left, badgePosition.top);
      el.style.transform = `translate3d(${badgePosition.left-90}px,${
        badgePosition.top-220
      }px,0)`;
      // 增加贝塞尔曲线
      el.style.transition =
        "transform .88s cubic-bezier(0.3, -0.25, 0.7, -0.15)";
      el.style.transition = "transform .88s linear";
      this.showMoveDot = this.showMoveDot.map(item => false);
      // 设置透明度
      el.style.opacity = 1;
    }
  },
  mounted() {
    this.$api
      .getGoods({ page: this.page, size: this.size })
      .then(res => {
        // console.log(res)
        this.goods = res.data;
        this.total = res.data.length;
        console.log(this.goods);
      })
      .catch(err => {
        console.log(err);
      });
    window.addEventListener("scroll", this.handleScroll);  
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.all {
  width: 100%;
  height: 60px;
  background: #f2f2f2;
  .warp {
    display: flex;
    align-items: center;
    .font1 {
      font-size: 12px;
      color: #999;
      height: 60px;
      line-height: 60px;
      padding: 0 15px;
    }
    .font {
      font-size: 12px;
      color: #999;
      height: 60px;
      line-height: 60px;
      padding: 0 15px;
    }
    .color {
      color: #5057d9;
    }
    .box {
      height: 60px;
      padding: 0 10px;
      display: flex;
      align-items: center;
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
      input[type="number"] {
        -moz-appearance: textfield;
      }
      input {
        width: 80px;
        height: 30px;
        border-radius: 5px;
        background: #f2f2f2;
        outline: none;
        border: 1px solid #ccc;
        text-align: center;
      }
      .span {
        padding: 0 10px;
      }
      .confirm {
        width: 80px;
        height: 30px;
        border-radius: 5px;
        background: #3559fa;
        line-height: 30px;
        text-align: center;
        color: white;
        font-size: 14px;
        margin-left: 10px;
        &:hover {
          background: #1a43f7;
        }
      }
    }
  }
}
.all2{
  padding-top: 60px;
}
.goods {
  width: 100%;
  background: #f2f2f2;
  .warp {
    display: flex;
    flex-wrap: wrap;
    background: white;
    .move_dot {
      position: fixed;
      width: 30px;
      height: 30px;
      z-index: 999;
        img {
          width: 30px;
          height: 30px;
        }
    }
    .for {
      width: 25%;
      height: 428px;
      border: 1px solid #f2f2f2;
      position: relative;
      .img {
        width: 206px;
        height: 206px;
        margin: 50px 49.25px 10px;
      }
      .font1 {
        height: 19px;
        text-align: center;
        font-size: 16px;
      }
      .font2 {
        height: 34px;
        padding: 10px;
        text-align: center;
        font-size: 12px;
        color: #d0d0d0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .price {
        display: flex;
        height: 31px;
        justify-content: center;
        .look {
          display: none;
          width: 100px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          font-size: 13px;
          margin-right: 10px;
          color: #666;
          border: 1px solid #dddcdc;
          border-radius: 4px;
          &:hover {
            background: #f2f2f2;
          }
        }
        .add {
          display: none;
          width: 100px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          color: white;
          // z-index: 999;
          font-size: 13px;
          margin-left: 10px;
          border: 1px solid #dddcdc;
          border-radius: 4px;
          background: #4178f0;
          &:hover {
            background: #2e6cf1;
          }
        }
        .font {
          display: block;
          font-size: 18px;
          margin: 0 auto;
          line-height: 31px;
          color: #d44;
          font-weight: 700;
        }
      }
      &:hover {
        border: 1px solid #f2f2f2;
        box-shadow: 0 0 30px #b4b3b3;
        .price .look,
        .add {
          display: block;
        }
        .price .font {
          display: none;
        }
      }
    }
  }
}
.pages {
  width: 100%;
  height: 100px;
  background: #f2f2f2;
  .warp {
    position: relative;
    .Page {
      position: absolute;
      right: 30px;
      top: 30px;
    }
  }
}
</style>