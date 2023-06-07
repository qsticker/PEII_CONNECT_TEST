<template>
    <div class="login">
      <div class="login-form-back">
        <form class="login-form">
          <!-- Email input -->
          <div class="username-input form-outline mb-4">
            <input  id="form3Example3" class="form-control form-control-lg" 
              placeholder="輸入使用者名稱" v-model="username"/>
          </div>

          <div class="name-input form-outline mb-4">
            <input  id="form3Example3" class="form-control form-control-lg"
              placeholder="輸入名稱" v-model="name"/>
          </div>

          <div class="email-input form-outline mb-3">
            <input type="email" id="form3Example4" class="form-control form-control-lg"
              placeholder="輸入電子信箱" v-model="email"/>    
          </div>
            <!-- Password input -->
          <div class="pawwsord-input form-outline mb-3">
            <input type="password" id="form3Example4" class="form-control form-control-lg"
              placeholder="輸入密碼" v-model="password"/>    
          </div>
            
          <button type="button" class="login-buttom btn btn-primary btn-lg" @click="register">註冊</button>
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
        name: "",
        password: "",
        email:"",
      };
    },
    computed: {
      
    },
    methods: {
      register() {
        let regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/

        let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if( this.password.length < 8){
          alert("密碼長度小於 8");
        }
        else if( !regex.test( this.password ) ){
          alert("密碼請至少包含數字和特殊符號和一大寫英文字母");
        }
        if( !emailRegex.test(this.email )){
          alert("錯誤的電子郵件格式")
        }
        if( this.username == ""){
          alert("使用者名稱不得為空")
        }
        if( this.name == ""){
          alert("名稱不得為空")
        }
        //var regex = 
        console.log(this.username)
        //console.log(this.password)
        CognitoHandler.register(this.username , this.name , this.password , this.email);
        
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
        height: 75%;
        background-color: white;
        display :flex;
        align-items: center;
        flex-direction: column;
        .username-input{
                margin-top: 10%;
                margin-right: 5%;
                margin-left: 5%;
            }
        .name-input{
                margin-top: 5%;
                margin-right: 5%;
                margin-left: 5%;
            }  
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