<template>
    <div class="login">
      <div class="login-form-back">
        <form class="login-form">
          <!-- Email input -->
          <div class="username-input form-outline mb-4">
            <input  id="form3Example3" class="form-control form-control-lg" 
              placeholder="輸入使用者名稱" />
          </div>

          <div class="name-input form-outline mb-4">
            <input  id="form3Example3" class="form-control form-control-lg"
              placeholder="輸入名稱" />
          </div>

          <div class="email-input form-outline mb-3">
            <input type="password" id="form3Example4" class="form-control form-control-lg"
              placeholder="輸入電子信箱" />    
          </div>
            <!-- Password input -->
          <div class="pawwsord-input form-outline mb-3">
            <input type="password" id="form3Example4" class="form-control form-control-lg"
              placeholder="輸入密碼" />    
          </div>
            
          <button type="button" class="login-buttom btn btn-primary btn-lg" @click="login">登入</button>
        </form>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import CognitoHandler from "@/handler/userpool"
  //import peiiNavbar from '@/components/navbar.vue'
  
  export default defineComponent({
    name: 'RegisterView',
    components: {
      //peiiNavbar,
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
      login() {
        console.log(this.username)
        //console.log(this.password)
        CognitoHandler.login(this.username , this.password);
      }
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
        border-radius: 5%;
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
                margin-top: 5%;
                margin-right: 5%;
                margin-left: 5%;
            }
  
        .pawwsord-input {
                margin-top: 5%;
                margin-right: 5%;
                margin-left: 5%;
            }
        .username-input{
                margin-top: 5%;
                margin-right: 5%;
                margin-left: 5%;
            }
        .name-input{
                margin-top: 5%;
                margin-right: 5%;
                margin-left: 5%;
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
  
  </style>