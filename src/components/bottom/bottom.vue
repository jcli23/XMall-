<template>
  <div>
    <div class="all">
      <div class="warp">
        <div class="top">
          <div v-for="(item,index) in data" :key="index" class="for">
            <div v-for="(item1,index1) in item" :key="index1" :class="index1===0? 'one':'font'">
              <div :class="index1===0? 'title':'font'">{{item1}}</div>
            </div>
          </div>
          <div class="phone">1012139570</div>
          <div class="date">周一至周日 10:00-23:00（限Starrer或捐赠人联系）</div>
          <div class="help">在线帮助</div>
        </div>
        <div class="statement">
          <div class="font1">Copyright ©2017, exrick.cn Co., Ltd. All Rights Reserved.本网站设计内容大部分属锤子科技
</div>
          <div class="font2">法律声明</div>
          <div class="font2">隐私条款</div>
          <div class="font2">开发者中心</div>
        </div>
        <div class="last">
          <div class="font">蜀ICP备16030308号-1</div>
          <div class="font">蜀ICP备16030308号</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        ["订单服务", "购买指南", "支付方式", "送货政策"],
        ["服务支持", "官方开源", "项目前端", "项目后端"],
        ["自助服务", "个人博客", "个人简介", "个人视频"],
        ["其他项目", "XPay支付系统", "数据共享", "待开发..."],
        ["友情链接", "宇cccc", "Smartisan", "Vue"],
        ["关注我吧", "腾讯 QQ", "新浪微博", "官方邮箱"]
      ]
    };
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
  height: 350px;
  background: white;
  padding: 50px 0 20px 0;
  .top {
    width: 100%;
    height: 180px;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    position: relative;
    .for {
      width: 149px;
      height: 180px;
      padding-top: 40px;
      .one {
        height: 26px;
        padding: 0 0 14px;
        .title {
          font-size: 12px;
          color: #646464;
        }
        .font {
          font-size: 12px;
          color: #969696;
        }
      }
      .font {
        height: 24px;
        padding: 6px 0;
        .title {
          font-size: 12px;
          color: #646464;
        }
        .font {
          font-size: 12px;
          color: #969696;
        }
      }
    }
    .phone {
      top: 40px;
      height: 33px;
      font-size: 30px;
      line-height: 33px;
      color: #646464;
      position: absolute;
      right: 0;
    }
    .date {
      width: 241px;
      font-size: 12px;
      line-height: 16px;
      height: 33px;
      color: #c3c3c3;
      position: absolute;
      right: 0;
      top: 78px;
    }
    .help {
      width: 130px;
      height: 34px;
      line-height: 34px;
      text-align: center;
      font-size: 14px;
      color: #5079d9;
      border: 1px solid #dcdcdc;
      position: absolute;
      right: 0;
      top: 120px;
    }
  }
  .statement{
    display: flex;
    height: 55px;
    padding-top: 40px;
    align-items: center;
    .font1{
      font-size: 12px;
      color: #757575;
      padding-right: 20px;
    }
    .font2{
      font-size: 12px;
      padding: 0px 10px 0;
      height: 12px;
      color: #5079d9;
      line-height: 12px;
      border-left: 1px solid #f2f2f2;
    }
  }
  .last{
    display: flex;
    height: 14px;
    margin-top: 20px;
    .font{
      font-size: 12px;
      color: #bdbdbd;
      padding-right: 20px;
    }
  }
}
</style>