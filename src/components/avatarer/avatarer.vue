<template>
  <div>
    <img src="../../components/images/icon.png" alt />
    <div class="name">{{username}}</div>
    <div class="box">
      <div v-for="(item,index) in list" :key="index" class="for">
        <div class="font" @click="exchange(index)" :class="{'exchange':change===index}">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      change:-1,
      list: [
        "我的订单",
        "账户资料",
        "收货地址",
        "我的优惠",
        "售后服务",
        "以旧换新"
      ]
    };
  },
  components: {},
  methods: {
    exchange(index){
      this.change=index
    }
  },
  mounted() {
    this.username = JSON.parse(localStorage.getItem("user")).username;
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
img {
  width: 168px;
  height: 168px;
  margin-left: 20px;
}
.name {
  width: 100%;
  height: 48px;
  line-height: 48px;
  text-align: center;
  font-size: 18px;
  color: #666;
  font-weight: 700;
}
.box {
  margin-top: 15px;
  width: 100%;
  .for {
  width: 100%;
  height: 48px;
  .font {
    width: 100%;
    height: 48px;
    border-top: 1px solid #f2f2f2;
    line-height: 48px;
    text-align: center;
    font-size: 14px;
    color: #5057d9;
    &:hover {
      background: #5057d9;
      color: white;
      border-top: 1px solid #5057d9;
    }
  }
  .exchange{
    background: #5057d9;
    color: white;
    border-top: 1px solid #5057d9;
  }
}
}
</style>