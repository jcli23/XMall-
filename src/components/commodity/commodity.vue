<template>
  <div>
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
          <img :src="item.productImageBig" alt />
          <div class="font1">{{item.productName}}</div>
          <div class="font2">{{item.subTitle}}</div>
          <div class="price">
            <div class="look">查看详情</div>
            <div class="add">加入购物车</div>
            <div class="font">￥{{item.salePrice.toFixed(2)}}</div>
          </div>
        </div>
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
      goods: []
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
        .getGoods({ page: this.page, size: this.size, sort: 1,priceGt: Number(this.lowprice),
          priceLte: Number(this.highprice)})
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
      console.log(this.lowprice,111)
      this.num = 2;
      let lowprice= Number(this.lowprice);
      let highprice=Number(this.highprice)
        this.$api
        .getGoods({ page: this.page, size: this.size, sort: -1,priceGt: lowprice,
          priceLte:highprice})
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
.goods {
  width: 100%;
  background: #f2f2f2;
  .warp {
    display: flex;
    flex-wrap: wrap;
    background: white;
    .for {
      width: 25%;
      height: 428px;
      border: 1px solid #f2f2f2;
      img {
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