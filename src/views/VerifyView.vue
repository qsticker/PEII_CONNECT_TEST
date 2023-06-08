<template>
    <div class="verify">
      <div class="verify-form-back">
        <form class="verify-form">
          <!-- Email input -->
          <div class="authcode-input form-outline b-4">
            <input type="number" id="form3Example3" class="form-control form-control-lg" 
              placeholder="輸入驗證碼" v-model="authcode"/>
          </div>
            
          <button type="button" class="verify-buttom btn btn-primary btn-lg" @click="verify">驗證</button>
        </form>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import CognitoHandler from "@/handler/userpool"
  //import peiiNavbar from '@/components/navbar.vue'
  
  export default defineComponent({
    name: 'VerifyView',
    components: {
      //peiiNavbar,
    },
    data() {
      return {
        authcode: "",
      };
    },
    computed: {
      
    },
    methods: {
      verify() {
        CognitoHandler.confirmUser( this.$route.params.username , this.authcode , this.$router)
      }
    },
  });
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
  .verify {
    display: block;
  
    .verify-form-back {
      
      background-image: url("../assets/bg-login.jpg");
      display: flex;
      //width:600px;
      height:600px;
      
      .verify-form {
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