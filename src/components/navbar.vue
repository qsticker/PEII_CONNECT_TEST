<template>
    <div class="navbar">
        <div class="navbar-brand">
      <!---<DebugToggler>
        <router-link :to="homepageLocation">
          <i class="far fa-comment fa-flip-horizontal" />
          {{ $t('brandname') }}
        </router-link>
    
      </DebugToggler>
      -->

        <div class="rwd-icon" >
            <span><i class="fas fa-bars" /></span>
        </div>

        <div class="nav" :class="{'side-close': !showSideNav}">
            <div class="rwd-icon" @click="closeSideNav">
                <span><i class="fas fa-times" /></span>
            </div>
        </div>
        <div v-if="isLogin" class="rwd-title">
            <h6> '頁面選擇' </h6>
        </div>
      <!-- Nav links -->
    <div v-if="isLogin" class="nav-btn-wrapper" @click="closeSideNav">

        <div class="rwd-title">
            <h6> '功能選擇' </h6>
        </div>

        <div class="lang-btn" @click="closeSideNav">
            <LanguageSelector class="mr-2" />
        </div>

        <div v-if="isLogin" class="login-btn" @click="closeSideNav">
            <!-- Login info -->
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
                '目前登入為'  <br><strong>{{ username }}</strong>
            </b-dropdown-item>
            <b-dropdown-divider />
            <b-dropdown-item
                @click.prevent="logout">
                '登出'
            </b-dropdown-item>
            </b-dropdown>
        </div>
    </div>
    <div v-else class="not-login-btn" @click="closeSideNav">
        <b-button
          variant="light"
          class="px-3 py-1"
        >
          註冊
        </b-button>
        <b-button variant="success" class="px-3 py-1">Button</b-button>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>

import Vue from 'vue';


interface NavbarLocation {
  label: string;
  location: Location;
}

export default {
  name: 'peiiNavbar',
  components: {
   
  },
  data() {
    return {
      showSideNav: false,
    };
  },
  computed: {
    links(): NavbarLocation[] {
      //if (!this.$store.state.currentWorkspace) {
        //return [];
      //}
      return [
        
      ];
    },
    username(): string {
      //if (this.$store.state.profile) {
        //return this.$store.state.profile.username;
      //}

      return 'unknown';
    },
    isLogin(): boolean {
      return false;
      //Boolean(this.$store.state.profile);
    },
  },
  methods: {
    logout() {
      //Auth.logout();
      console.log("out")
    },
    closeSideNav() {
      //this.showSideNav = false;
    },
  },
};
</script>

<style scoped lang="scss">
*{
  padding: 0;
  margin: 0;
}
.navbar {
  height: 50px;
  padding: 0 10px;
  box-shadow: 0 0 2px #ddd;
  background-color: #fff;
  position: fixed;
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
    .nav-btn-wrapper {
      display: flex;
      align-items: center;

      .nav-btn{
        margin: 0 20px;
        color: #2c3e50;
        padding: 4px 10px;
        border-radius: 3px;
        &.router-link-exact-active {
          color: #fff;
          background-color: #42b983;
        }
        &:hover{
          color: #fff;
          background-color: #42b983
        }
      }

      .stayHere{
        color: #fff;
        background-color: #42b983;
      }
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
      .not-login-btn{
        display: flex;
        flex-direction: column;
        width: 100%;
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
    }
    .rwd-icon {
      display: block;
    }
    .side-close{
      right: -200px;
      transition: all 0.6s ease;
    }
  }
}
</style>