<template>
  <div class="login">
    <div class="login-form-back">
      <form class="login-form">
        <!-- Email input -->
        <div class="email-input form-outline mb-4">
          <input type="email" id="form3Example3" class="form-control form-control-lg"
            placeholder="Enter a valid email address" />
        </div>

          <!-- Password input -->
        <div class="pawwsord-input form-outline mb-3">
          <input type="password" id="form3Example4" class="form-control form-control-lg"
            placeholder="Enter password" />
          
        </div>

        <div class="remeber-and-forgot">
          <!-- Checkbox -->
          <div class="remeber-box form-check mb-0">
            <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
            <label class="form-check-label" for="form2Example3">
              記住密碼
            </label>
          </div>

          <a href="#!" class="forgot-password text-body">忘記密碼?</a>          
        </div>

        
        <button type="button" class="login-buttom btn btn-primary btn-lg">登入</button>
        <div class="text-center text-lg-start mt-4 pt-2">
          
          <p class="small fw-bold mt-2 pt-1 mb-0">尚未擁有帳戶? <a href="#!"
              class="link-danger">註冊</a></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
//import peiiNavbar from '@/components/navbar.vue'

export default defineComponent({
  name: 'LoginView',
  components: {
    //peiiNavbar,
  },
  data() {
    return {
      
    };
  },
  computed: {
    
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login {
  display: block;

  .login-form-back {
    
    background-image: url("../assets/bg-login.jpg");
    display: flex;
    //width:600px;
    height:600px;
    
    .login-form {
      border-radius: 10px;
      margin-top: 50px;
      margin-left: 70%;
      margin-right: 10%;
      width: 300px;
      height: 70%;
      background-color: white;
      display :flex;
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

          .remeber-box{
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
          //background-color: aqua;
          padding-left: 2.5rem; 
          padding-right: 2.5rem;
        //top: 50%;
        //margin-right: 30%;
        //margin-left: ;
        //margin: -150px 0 0 -150px;
      }    
    }
  }
}
</style>