<template>
    <div class="navbar">
      
      <!---<DebugToggler>
        <router-link :to="homepageLocation">
          <i class="far fa-comment fa-flip-horizontal" />
          {{ $t('brandname') }}
        </router-link>
    
      </DebugToggler>
      -->

      <div class="rwd-icon" @click="changeSideNav" >
        <span><img src="../assets/bars-solid.png" /></span>
      </div>
     
      <div class = "nav" :class="{'side-close': !showSideNav}" >
        
        <div class="peiiicon">
          <img src="../assets/logo.png" class="img-fluid" alt="Responsive image">
        </div>
        <div class="d-flex logo-box align-items-center">
          <a class="logo-text" href="http://customer.6ms.cn/Etc/index.php" title="北一國際教育">
              <div class="title font-weight-bold"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">智能型英語教學.自學云</font></font></div>
              <div class="des text-family-light"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">北一國際教育集團旗下品牌</font></font></div>
          </a>
        </div>
        
        <div class="nav-item dropdown position-static show">
         
          <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
              課程
          </button>
          <ul class="dropdown-menu w-100  active">
            <div class="dropdown-item">
              <div class="row">
                <div v-for="(classfication,index) in courseRootClassifications" :key="index" class="col">
                  
                  <h6><a href="#">{{ classfication.name }}</a></h6>
                  <li v-for="(subClassfication,index) in classfication.subClassfication" :key="index" class="list-group-item"><a href="#">{{subClassfication}}</a></li>
                  
                </div>
              </div>  
            </div>
          </ul>               

          <button class="btn btn-secondary dropdown-toggle next-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
            測驗
          </button>
          <ul class="dropdown-menu w-100  active">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else hereaaaaaaaaaaaaaaaaaaaaaaaaaaa</a></li>
          </ul>
          
        </div>

          

        <div v-if="isLogin" class="rwd-title">
            <h6> '頁面選擇' </h6>
        </div>
       
        <!-- Nav links -->
        <div v-if="isLogin" class="login-nav nav-btn-wrapper" @click="changeSideNav">

          <div class="rwd-title">
              <h6> '功能選擇' </h6>
          </div>
          
          <div class="lang-btn" @click="changeSideNav">
              <LanguageSelector class="mr-2" />
          </div>

          

          <div v-if="isLogin" class="login-btn" @click="changeSideNav">
            <!-- Login info -->
            <span class="cart-size" > 0 </span><img src="@/assets/shopping-cart.png" />
            <b-dropdown
            v-if="isLogin"
            id="account-dropdown"
            right
            size="sm"
            variant="light"
            no-caret
            >
            
            <template v-slot:button-content>
                <!-- <i class="fa fa-user-circle" /> -->
                <b-avatar size="1.5rem" />
                <i class="fas fa-sort-down ml-2" />
            </template>
            <b-dropdown-item>
                目前登入為  <br><strong>{{ username }}</strong>
            </b-dropdown-item>
            <b-dropdown-divider />
            <b-dropdown-item
                @click.prevent="logout">
                登出
            </b-dropdown-item>
            </b-dropdown>
          </div>
        </div>

       

        <div v-else class="not-login-btn">
          <b-btn
            variant="light"
            @click="register"
          >
            註冊
          </b-btn>
          <b-btn variant="success" @click="login">登入</b-btn>
        </div>
      </div>

      
    
  </div>
</template>

<script lang='ts'>

import CognitoHandler from '@/handler/userpool';
import { defineComponent } from "vue";

interface NavbarLocation {
  label: string;
  location: Location;
}

export default defineComponent({
  name: 'peiiNavbar',
  components: {
   
  },
  data() {
    return {
      showSideNav: true,
    };
  },
  computed: {
    courseRootClassifications() {
      return this.$store.state.courseClassfication;
    },

    links(): NavbarLocation[] {
      //if (!this.$store.state.currentWorkspace) {
        //return [];
      //}
      return [
        
      ];
    },
    username(): string {
      if (this.$store.state.profile) {
        return this.$store.state.profile.username;
      }

      return 'unknown';
    },
    isLogin(): boolean {
      return true; 
      //Boolean(this.$store.state.profile);
      //return false;
      //Boolean(this.$store.state.profile);
    },
  },
  methods: {
    logout() {
      //Auth.logout();
      console.log("out")
    },
    
    changeSideNav() {
      this.showSideNav = !this.showSideNav;
      // if( this.showSideNav == true ){
      //   this.showSideNav = false
      // }else{
      //   this.showSideNav = true;
      // }
      //this.showSideNav = !this.showSideNav;
      console.log(this.showSideNav)
    },
    login() {
      this.$router.push({ path: '/login' })
      //CognitoHandler.login("yukina1026" , "Barry0501!"  )
    },
    register(){
      this.$router.push({ path: '/register' })
    }
  },
});
</script>

<style scoped lang="scss">
*{
  padding: 0;
  margin: 0;
}
.navbar {
  height: 80px;
  padding: 0 10px;
  box-shadow: 0 0 2px #ddd;
  background-color: #fff;
  //position: fixed;
  display: block;
  width: 100%;
  z-index:10;
  a {
    font-weight: bold;
    text-decoration: none;
  }
  .navbar-brand {
    line-height: 50px;
    padding-right:10px;
    a{
      color: #333;
      vertical-align:middle;
      &.router-link-exact-active {
        color: #333;
      }
    }
  }
  .group-name{
    margin-right: auto;
    display: flex;
    align-self: center;
  }
  .nav{
    display: flex;
    align-items: center;
    //background-color: #f23f3f;
    //display: block;

    .nav-item{
      margin-left : 20%; 
      //flex : 2;
    }
    .next-btn{
      margin : 10px;
    }
    .logo-box .logo-text{
      line-height: 1.4;
      color: #002969;
      margin-left : 15px;
    }
    .logo-box .logo-text .title{
      font-size: 16px;
    }
    .logo-box .logo-text .des{
      font-size: 14px;
    }
    
    

    .not-login-btn{
      //background: blue;
      display : flex;
      width : 150px;
      margin-left : 40%;
      //background-color: #333;
      text-align: right;
      //margin-left : auto;
      //b-btn {
      //  margin-left : auto;
      //}
      
    }
    .login-nav {
      //background : blue;
      margin-left : 40%;
    }
  }
  .rwd-title{
    display: none;
  }
  .rwd-icon {
    display: none;
    line-height: 50px;
    font-size: 1.5rem;
    margin-right: 10px;
    &:hover{
      cursor: pointer;
    }
  }
}
//.peiiicon{
//  height : 40px;
//  width: 120px;
//}

@media screen and (max-width: 1000px) {
  .navbar{
    align-items: flex-start;
    .nav{
      position: absolute;
      right: 0;
      box-shadow: -2px 0px 10px #ddd;
      background-color: #fff;
      width: 200px;
      height: 100vh;
      flex-direction: column;
      //display: block;
      transition: all 0.6s ease;
      .nav-btn-wrapper{
        flex-direction: column;
        width: 100%;
        .nav-btn{
          width: 100%;
          border-radius: 0;
        }
      }
      .lang-btn, .login-btn{
        width: 100%;
        margin: 0;
        .dropdown{
          width: 100%;
        }
      }
      
      .rwd-title{
        display: block;
        background-color: #ddd;
        width: 100%;
        h6{
          font-size: 1.1rem;
          font-weight: 600;
          text-align: left;
          padding: 10px;
        }
        :hover{
          cursor: default;
        }
      }
      .rwd-icon {
        position: relative;
        margin-left: auto;
        span{
          i{
            width: 1.5rem;
            height: 1.5rem;
            text-align: center;
          }
        }
      }
      
      display: block;
      .logo-box .logo-text{
        line-height: 1.4;
        color: #002969;
      }
      .logo-box .logo-text  .title{
        font-size:  16px;
      }
      .logo-box .logo-text  .des{
        font-size:  14px;
      }
      

      .not-login-btn {
        //display: block;
        display: flex;
        flex-direction: column;
        width: 100%;
      }

    }
    .rwd-icon {
      display: flex;
      //background-color: #002969;
        span{
          margin-left: auto;
          img{
            
            width: 1.5rem;
            height: 1.5rem;
            text-align: center;
          }
        }
    }
    .side-close{
      display: flex;
      right: -200px;
      //background-color: #002969;
        span{
          margin-left: auto;
          img{
            
            width: 1.5rem;
            height: 1.5rem;
            text-align: center;
          }
        }
    }
  }
}


</style>