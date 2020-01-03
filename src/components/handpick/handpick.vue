<template>
  <div>
    <div class="all">
      <div class="warp">
        <div class="top">
          <div class="font">{{selection.name}}</div>
        </div>
        <div class="center">
          <div
            v-for="(item,index) in selection.panelContents"
            :key="index"
            :class="index===0? 'one':'for'"
          >
            <img :src="item.picUrl" alt />
            <div v-if="index!==0" class="font1">{{item.productName}}</div>
            <div v-if="index!==0" class="font2">{{item.subTitle}}</div>
            <div v-if="index!==0" class="price">
              <div class="look">查看详情</div>
              <div class="add">加入购物车</div>
              <div class="font">￥{{item.salePrice}}.00</div>
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
      data: []
    };
  },
  props: {
    selection: {
      type: Object,
      default: () => {}
    }
  },
  components: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.all {
  width: 100%;
  height: 922px;
  background: #f2f2f2;
  .warp {
    height: 922px;
    background: white;
    border: 1px solid #dfdede;
    border-radius: 10px;
    overflow: hidden;
    .top {
      width: 100%;
      height: 60px;
      padding-left: 24px;
      background: linear-gradient(#fbfbfb, #ececec);
      box-shadow: 0 1px 7px rgba(0, 0, 0, 0.06);
      .font {
        font-size: 18px;
        color: #626262;
        line-height: 60px;
      }
    }
    .center {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .one {
        width: 50%;
        height: 430px;
        img {
          width: 100%;
          height: 430px;
        }
        &:hover{
          border: 1px solid #f2f2f2;
          box-shadow: 0 0 20px #b4b3b3;
        }
      }
      .for {
        width: 25%;
        height: 428px;
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
        &:hover{
          border: 1px solid #f2f2f2;
          box-shadow: 0 0 20px #b4b3b3;
          .price .look,.add{
            display: block;
          }
          .price .font{
            display: none;
          }
        }
      }
    }
  }
}
</style>