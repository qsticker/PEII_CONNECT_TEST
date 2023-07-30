<template>
    <div class="register">
      <div class="register-form-back">
        <form class="register-form">
          <!-- Email input -->
          <div class="username-input form-outline b-4">
            <div class="input-wrapper">
            <b-icon icon="person" class="icon"></b-icon>
            <input  id="form3Example3" class="form-control form-control-lg" 
              placeholder="输入用户名" v-model="username"/>
          </div>
          </div>

          <div class="name-input form-outline mb-4">
            <div class="input-wrapper">
            <b-icon icon="person-bounding-box" class="icon"></b-icon>
            <input  id="form3Example3" class="form-control form-control-lg"
              placeholder="输入名称" v-model="name"/>
          </div>
          </div>

          <div class="email-input form-outline mb-3">
            <div class="input-wrapper">
            <b-icon icon="envelope" class="icon"></b-icon>
            <input type="email" id="form3Example4" class="form-control form-control-lg"
              placeholder="输入电子邮箱" v-model="email"/>  
          </div>  
          </div>
            <!-- Password input -->
          <div class="pawwsord-input form-outline mb-3">
            <div class="input-wrapper">
            <b-icon icon="key" class="icon"></b-icon>
            <input type="password" id="form3Example4" class="form-control form-control-lg"
              placeholder="输入密码" v-model="password"/> 
          </div>   
          </div>
            
          <b-button variant="dark" squared class="register-buttom btn btn-lg" @click="register">注册</b-button>
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
          alert("密码长度小于 8");
        }
        else if( !regex.test( this.password ) ){
          alert("密码需至少包含数字、特殊符号和一个大写英文字母");
        }
        if( !emailRegex.test(this.email )){
          alert("电子邮箱格式错误")
        }
        if( this.username == ""){
          alert("用户名不得为空")
        }
        if( this.name == ""){
          alert("名称不得为空")
        }
        //var regex = 
        console.log(this.username)
        //console.log(this.password)
        CognitoHandler.register(this.username , this.name , this.password , this.email , this.$router);
        
      }
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
  .register {
    display: block;
  
    .register-form-back {
      
      background-image: url("../assets/bg-login.jpg");
      display: flex;
      //width:600px;
      height:600px;
      
      .register-form {
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
                //margin-top: 5%;
                margin-right: 5%;
                margin-left: 5%;
            }
  
        .pawwsord-input {
                //margin-top: 5%;
                margin-right: 5%;
                margin-left: 5%;
            }
        }
        
        .register-buttom {
            margin-top: 10%;
            margin-bottom: 0%;
            padding-left: 2.5rem; 
            padding-right: 2.5rem;
        }    
      }
    }
  
  </style>