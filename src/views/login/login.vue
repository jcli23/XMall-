<template>
  <div>
    <div class="all">
      <div class="big_box">
        <div class="icon">
          <img src="../../components/images/icon.png" alt />
        </div>
        <div class="font">使用 XMall 账号 登录官网</div>
        <div class="input_box">
          <div class="input1">
            <input type="text" v-model="name" placeholder="账号" @blur="blur1" />
          </div>
          <div class="input2">
            <input type="password" v-model="password" placeholder="密码" @blur="blur2" />
          </div>
          <div id="vaptchaContainer" style="width: 100%;height: 40px; margin-top:15px;">
            <!--vaptcha-container是用来引入VAPTCHA的容器，下面代码为预加载动画，仅供参考-->
            <div class="vaptcha-init-main">
              <div class="vaptcha-init-loading">
                <a href="/" target="_blank">
                  <img src="https://r.vaptcha.com/
public/img/vaptcha-loading.gif" />
                </a>
                <span class="vaptcha-text">Vaptcha启动中...</span>
              </div>
            </div>
          </div>
          <div class="pr">
            <div class="left">
              <Checkbox v-model="single"></Checkbox>
              <div class="remember">记住密码</div>
            </div>
            <div class="right">
              <div class="register" @click="register">注册XMall账号</div>
              <div class="line"></div>
              <div class="forget">忘记密码？</div>
            </div>
          </div>
          <button class="login" :class="{'change':name.length>0&&password.length>0}" @click="login">登录</button>
          <div class="back">返回</div>
          <div class="bottom">
            <div class="main">
              <div class="font">其它账号登录：</div>
              <img src="../../components/images/weixin.png" alt="">
              <img src="../../components/images/weibo.png" alt="">
              <img src="../../components/images/QQ.png" alt="">
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
      name: "",
      password: "",
      single: false,
      vaptchaObj: null,
      namelock: false,
      passwordlock: false,
      vaptchlock: false,
      single: false
    };
  },
  updated() {
    let that = this;
    vaptcha({
      vid: "5e12d69f4c6b8b41680b90e9", // 验证单元id
      type: "click", // 显示类型 嵌入式
      scene: 0, // 场景值 默认0
      container: "#vaptchaContainer", // 容器，可为Element 或者 selector
      offline_server: "http://localhost:8888/" //离线模式服务端地址
    }).then(function(vaptchaObj) {
      that.vaptchaObj = vaptchaObj; //将VAPTCHA验证实例保存到局部变量中
      that.vaptchaObj.render(); // 调用验证实例 vpObj 的 render 方法加载验证按钮
      //获取token的方式一：
      //vaptchaObj.renderTokenInput('.login-form')//以form的方式提交数据时，使用此函数向表单添加token值
      //获取token的方式二：
      that.vaptchaObj.listen("pass", function() {
        that.vaptchlock = true;
      });
    });
  },
  components: {},
  methods: {
    register(){
      this.$router.push("/register")
    },
    blur1() {
      if ((this.name.length >= 3) & (this.name.length <= 15)) {
        this.namelock = true;
      }
    },
    blur2() {
      if ((this.password.length >= 6) & (this.password.length <= 12)) {
        this.passwordlock = true;
      }
    },
    login(){
      if (!this.namelock) {
        this.$Message["error"]({
          background: true,
          content: "账号长度不低于3位且不超过15位"
        });
      } else if (!this.passwordlock) {
        this.$Message["error"]({
          background: true,
          content: "密码长度不低于6位且不超过12位"
        });
      } else if (!this.vaptchlock) {
        this.$Message["error"]({
          background: true,
          content: "请进行验证后才能注册"
        });
      } else {
        this.$api
          .login({ username: this.name, password: this.password })
          .then(res => {
            console.log(res);
            if (res.code === 200) {
              this.$Message["success"]({
                background: true,
                content: `登录成功，欢迎${res.data.user.username}`
              });
              localStorage.setItem('adminToken',res.data.token)
              let user=JSON.stringify(res.data.user)
              localStorage.setItem('user',user)
            this.$router.push('/')
            }
            // if(res.code === 500){
            //    this.$Message["info"]({
            //     background: true,
            //     content: '此账号已注册，请直接登录'
            //   });
            // }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.all {
  width: 100%;
  height: 800px;
  background: url("../../components/images/login_background.png") repeat;
  .big_box {
    width: 453px;
    height: 670px;
    background: white;
    border: 1px solid #dadada;
    border-radius: 10px;
    position: relative;
    top: 40px;
    margin: 0 auto;
    box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
      0 18px 20px -10px rgba(0, 0, 0, 0.04),
      0 18px 20px -10px rgba(0, 0, 0, 0.04),
      0 10px 20px -10px rgba(0, 0, 0, 0.04);
    .icon {
      padding: 23px 0 0;
      img {
        margin-left: 150px;
      }
    }
    .font {
      font-size: 20px;
      height: 1em;
      text-align: center;
    }
    .input_box {
      position: relative;
      top: 50px;
      width: 370px;
      margin: 0 auto;
      .input1 {
        width: 100%;
        height: 50px;
        height: 100%;
        padding: 10px 15px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 6px;
        input {
          width: 100%;
          height: 100%;
          border: none;
          outline: none;
          font-size: 16px;
        }
      }
      .input2 {
        width: 100%;
        height: 50px;
        height: 100%;
        padding: 10px 15px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 6px;
        margin-top: 15px;
        input {
          width: 100%;
          height: 100%;
          border: none;
          outline: none;
          font-size: 16px;
        }
      }
      .pr {
        width: 100%;
        height: 20px;
        margin: 15px 0;
        display: flex;
        justify-content: space-between;
        .left {
          height: 20px;
          width: auto;
          display: flex;
          .remember {
            font-size: 14px;
            color: #999;
            padding: 0 0 0 5px;
          }
        }
        .right {
          height: 20px;
          width: auto;
          display: flex;
          align-items: center;
          .register{
            color: #5057D9;
            font-size: 14px;
            padding: 0 10px;
            height: 20px;
            line-height: 20px;
          }
          .line{
            width: 1px;
            height: 20px;
            background: #999;
          }
          .forget{
            color: #5057D9;
            font-size: 14px;
            padding: 0 0 0 10px;
            height: 20px;
            line-height: 20px;
          }
        }
      }
      .login{
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        margin-top: 15px;
        background: #a9a9a9;
        border: none;
        border-radius: 5px;
        font-size: 20px;
        color: white;
        outline: none;
        cursor: not-allowed;
        &:hover {
          background: #b3b2b2;
        }
      }
      .back{
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        margin: 15px 0;
        border: 1px solid #f3f3f3;
        background: white;
        border-radius: 5px;
        font-size: 20px;
        color: #666;
        outline: none;
        &:hover{
          background: #f7f6f6;
        }
      }
      .change {
        background: #3e47ec;
        &:hover {
          background: #353dca;
          cursor: pointer;
        }
      }
      .bottom{
        width: 100%;
        height: 40px;
        border-top: 1px solid rgb(230, 228, 228);
        .main{
          height: 20px;
          margin-top: 20px;
          display: flex;
          align-items: center;
          .font{
            height: 20px;
            line-height: 20px;
            font-size: 12px;
            color: #999;
          }
          img{
            width: 20px;
            height: 20px;
            margin: 0 10px;
          }
        }
      }
    }
  }
}
</style>