<template>
  <div class="login">
    <div class="login-form-back">
      <form class="login-form">
        <!-- Email input -->
        <div class="email-input form-outline mb-4">
          <div class="input-wrapper">
            <b-icon icon="person" class="icon"></b-icon>
            <input id="form3Example3" class="form-control form-control-lg" v-model="username" placeholder="输入用户名" />
          </div>
        </div>

        <!-- Password input -->
        <div class="pawwsord-input form-outline mb-3">
          <div class="input-wrapper">
            <b-icon icon="key" class="icon"></b-icon>
            <input type="password" id="form3Example4" class="form-control form-control-lg" placeholder="输入密码"
            v-model="password" />
          </div>
        </div>

        <div class="remeber-and-forgot">
          <!-- Checkbox -->
          <div class="remeber-box form-check mb-0">
            <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
            <label class="form-check-label" for="form2Example3">
              记住密码
            </label>
          </div>

          <router-link to="/forgotPassword" class="forgot-password text-body">忘记密码?</router-link>
        </div>


        <b-button variant="dark" squared class="login-buttom btn btn-lg" @click="login">登录</b-button>
        <div class="text-center text-lg-start mt-4 pt-2">

          <p class="small fw-bold mt-2 pt-1 mb-0">尚未拥有账号? <router-link to="/register" class="link-danger">注册</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CognitoHandler from "@/handler/userpool"
import VueCookies from 'vue-cookies'
import router from "@/router";
import UserDataApi from "@/apis/UserDataApi";
//import peiiNavbar from '@/components/navbar.vue'

export default defineComponent({
  name: 'LoginView',
  components: {
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {

  },
  methods: {
    async login() {
      console.log(this.username)
      //console.log(this.password)
      await CognitoHandler.login(this.username , this.password , this.$router , this.$cookies , this.$store );
      
    },
    async retriveAndSetUserDetail() {
      const result = await UserDataApi.getDetail();
      // console.log("user detail" + JSON.stringify(result));
      this.$cookies.set('shoppingCarUuid', JSON.parse(JSON.stringify(result)).shoppingCar.uuid);
      this.$cookies.set('shoppingCar', JSON.parse(JSON.stringify(result)).shoppingCar);
      this.$cookies.set('userUuid', JSON.parse(JSON.stringify(result)).uuid);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.icon {
  /* 根据需要调整图标样式，比如大小、颜色等 */
  font-size: 24px;
  margin-right: 10px; /* 调整图标与输入框之间的距离 */
}
.input-wrapper {
  display: flex;
  align-items: center; /* 垂直居中对齐元素 */
  /* 添加其他样式，比如宽度、边距等 */
}
.login {
  display: block;

  .login-form-back {

    background-image: url("../assets/bg-login.jpg");
    display: flex;
    //width:600px;
    height: 600px;

    .login-form {
      border-radius: 5%;
      margin-top: 50px;
      margin-left: 70%;
      margin-right: 10%;
      width: 300px;
      height: 70%;
      background-color: white;
      display: flex;
      align-items: center;
      flex-direction: column;

      .email-input {
        margin-top: 10%;
        margin-right: 5%;
        margin-left: 5%;
      }

      .pawwsord-input {
        margin-top: 10%;
        margin-right: 5%;
        margin-left: 5%;
      }



      .remeber-and-forgot {
        display: flex;
        flex-direction: row;
        width: 100%;
        //background-color: aqua;
        margin-left: 5px;
        margin-right: 5px;

        .remeber-box {
          //flex: 1;
          //background-color: black;
          margin-top: 10%;
          margin-left: 10%;
          //argin-left: %;
        }

        .forgot-password {
          //flex: 1;
          margin-top: 10%;
          margin-right: 10%;
          margin-left: 25%;
        }

      }

      .login-buttom {
        margin-top: 10%;
        margin-bottom: 0%;
        padding-left: 2.5rem;
        padding-right: 2.5rem;
      }
    }
  }
}
</style>