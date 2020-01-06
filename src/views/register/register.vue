<template>
  <div>
    <div class="all">
      <div class="big_box">
        <div class="top">注册 XMall 账号</div>
        <div class="box">
          <div class="input1">
            <input type="text" v-model="name" placeholder="账号" @blur="blur1" />
          </div>
          <div class="input2">
            <input type="password" v-model="password" placeholder="密码" @blur="blur2" />
          </div>
          <div class="input2">
            <input type="password" v-model="password2" placeholder="重复密码" @blur="blur3" />
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
            <Checkbox v-model="single"></Checkbox>
            <div class="font1">我已阅读并同意遵守</div>
            <div class="font">法律声明</div>
            <div class="font1">和</div>
            <div class="font">隐私条款</div>
          </div>
          <button
            class="register"
            @click="register"
            :class="{'change':name.length>0&&password.length>0&&password2.length>0}"
          >注册</button>
          <div class="line"></div>
          <div class="bottom">
            <div class="font">如果您已拥有 XMall 账号，则可在此</div>
            <div class="login" @click="login">登录</div>
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
      password2: "",
      vaptchaObj: null,
      namelock: false,
      passwordlock: false,
      checklock: false,
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
    login() {
      this.$router.push("/login");
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
    blur3() {
      if (this.password === this.password2) {
        this.checklock = true;
      }
    },
    register() {
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
      } else if (!this.checklock) {
        this.$Message["error"]({
          background: true,
          content: "请确认两次密码一致"
        });
      } else if (!this.vaptchlock) {
        this.$Message["error"]({
          background: true,
          content: "请进行验证后才能注册"
        });
      } else if (!this.single) {
        this.$Message["error"]({
          background: true,
          content: "请阅读并同意法律声明和隐私条款"
        });
      } else {
        this.$api
          .register({ username: this.name, password: this.password })
          .then(res => {
            console.log(res);
            if (res.code === 200) {
              this.$Message["success"]({
                background: true,
                content: res.msg
              });
            this.$router.push('/login')
            }
            if(res.code === 500){
               this.$Message["info"]({
                background: true,
                content: '此账号已注册，请直接登录'
              });
            }
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
    width: 450px;
    height: 550px;
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
    .top {
      width: 100%;
      height: 60px;
      border-bottom: 1px solid #f2f2f2;
      text-align: center;
      line-height: 60px;
      font-size: 20px;
      color: #666;
      font-weight: 700;
    }
    .box {
      width: 100%;
      margin-top: 40px;
      padding: 0 40px;
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
        .font {
          color: #5057d9;
          padding: 0 5px;
        }
        .font1 {
          color: #999;
        }
      }
      .register {
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
      .change {
        background: #3e47ec;
        &:hover {
          background: #353dca;
          cursor: pointer;
        }
      }
      .line {
        width: 100%;
        height: 1px;
        background: #ccc;
        margin: 40px 0 10px 0;
      }
      .bottom {
        width: 100%;
        height: 48px;
        align-items: center;
        display: flex;
        justify-content: center;
        .font {
          font-size: 12px;
          color: #666;
        }
        .login {
          color: #5057d9;
          font-size: 12px;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>