<template>
  <div>
    <top></top>
    <div class="all">
      <div class="warp">
        <div class="top">购物清单</div>
        <div class="titles">
          <div>商品信息</div>
          <div class="right">
            <div class="font">单价</div>
            <div class="font">数量</div>
            <div class="font">小计</div>
            <div class="font">操作</div>
          </div>
        </div>
        <div v-for="(item,index) in goods" :key="index" class="for">
           <div class="choose">
              <!-- <img  v-if="choosed===-1" src="../../components/images/choose.png" @click="choose(index)" alt="">
              <div class="nochoose" v-if="choose===false"></div> -->
           </div>

        </div>
      </div>
    </div>
    <bottom class="bottom"></bottom>
  </div>
</template>

<script>
import bottom from "../../components/bottom/bottom";
export default {
  data() {
    return {
      // choosed:false
    };
  },
  components: {
    bottom
  },
  methods: {
    choose(e){
      console.log(111)
      this.choosed=e
    }
  },
  mounted() {
    
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
.all {
  width: 100%;
  background: #f2f2f2;
  padding: 50px 0 100px 0;
  .warp {
    background: white;
    border-radius: 10px;
    box-shadow: 0 0 20px #b1b1b1;
    overflow: hidden;
    .top {
      width: 100%;
      height: 60px;
      padding: 0 10px 0 24px;
      line-height: 60px;
      font-size: 18px;
      color: #626262;
      border-bottom: 1px solid #d4d4d4;
      background: linear-gradient(#fbfbfb, #ececec);
    }
    .titles{
      height: 38px;
      width: 100%;
      padding: 0 0 0 40px;
      background: #eee;
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgb(211, 210, 210);
      justify-content: space-between;
      .right{
        display: flex;
        height: 38px;
        .font{
          width: 137px;
          height: 38px;
          line-height: 38px;
          text-align: center;
        }
      }
    }
    .for{
      width: 100%;
      height: 140px;
      display: flex;
      align-items: center;
      &:hover{
        background: #f2f2f2;
      }
      .choose{
        width: 60px;
        height: 140px;
        display: flex;
        justify-content: center;
        align-items: center;
        .nochoose{
          width: 15px;
          height: 15px;
          border-radius: 50%;
          box-shadow: 0 0 3px #bdbcbc;
        }
        img{
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}
</style>