<template>
    <div class="forgot-password">
      <div class="forgot-password-form-back">
        <form class="forgot-password-form">
          <!-- Email input -->
          <div class="forgot-password-input form-outline b-4">
            <input  id="form3Example3" class="form-control form-control-lg" 
              placeholder="输入用户名" v-model="username"/>
          </div>        
          <b-button variant="outline-dark" squared class="verify-buttom btn" @click="sendAuthcode">发送验证码</b-button>
        </form>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import CognitoHandler from "@/handler/userpool"
  //import peiiNavbar from '@/components/navbar.vue'
  
  export default defineComponent({
    name: 'ForgotPassword',
    components: {
      //peiiNavbar,
    },
    data() {
      return {
        username: "",
      };
    },
    computed: {
      
    },
    methods: {
      sendAuthcode() {
            CognitoHandler.sendAuthcodeWhenForgotPassword(this.username ,this.$router);
        },
    },
  });
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
  .forgot-password  {
    display: block;
  
    .forgot-password-form-back {
      
      background-image: url("../assets/bg-login.jpg");
      display: flex;
      //width:600px;
      height:600px;
      
      .forgot-password-form {
        border-radius: 5%;
        margin-top: 50px;
        margin-left: 70%;
        margin-right: 10%;
        width: 300px;
        height: 50%;
        background-color: white;
        display :flex;
        align-items: center;
        flex-direction: column;
        .forgot-password-input{
                margin-top: 10%;
                margin-right: 5%;
                margin-left: 5%;
            }

        }
        .verify-buttom {
            margin-top: 10%;
            margin-bottom: 0%;
            padding-left: 2.5rem; 
            padding-right: 2.5rem;
        }    
      }
    }
  
  </style>