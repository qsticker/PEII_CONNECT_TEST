<template>
  <div class="navbar">
    <div class="rwd-icon" @click="changeSideNav">
      <span><img src="../assets/bars-solid.png" /></span>
    </div>

    <div class="nav" :class="{ 'side-close': !showSideNav }">
      <!--<div class="rwd-icon" @click="changeSideNav" >
          <span><img src="../assets/bars-solid.png" /></span>
        </div>-->

      <div class="computer-view peiiicon" style="margin-top: 15px">
        <img
          src="../assets/logo.png"
          class="img-fluid"
          alt="Responsive image"
        />
      </div>
      <div class="computer-view d-flex logo-box align-items-center">
        <router-link class="logo-text" to="/" title="北一国际教育">
          <div class="computer-view title font-weight-bold">
            <font style="vertical-align: inherit"
              ><font style="vertical-align: inherit"
                >智能型英语教学.自学云</font
              ></font
            >
          </div>
          <div class="computer-view des text-family-light">
            <font style="vertical-align: inherit"
              ><font style="vertical-align: inherit"
                >北一国际教育集团旗下品牌</font
              ></font
            >
          </div>
        </router-link>
      </div>

      <div class="nav-item dropdown position-static show">
        <b-button
          squared
          variant="link"
          class="text-decoration-none computer-view dropdown-toggle"
          aria-expanded="false"
          id="navMenuItemBtn"
          @click="goToClassficationCommidityList('', '*', 'course')"
        >
          课程
        </b-button>

        <!-- <ul class="dropdown-menu active" id="ulStyle">
          <div id="dropdownMenuTopLine" />
          <div
            style="
              margin-left: 15px;
              font-size: 23px;
              margin-top: 10px;
              font-weight: bold;
            "
          >
            课程
          </div>
          <hr id="driodiwbMenuHrLineBetweenTopicAndList" />
          <div class="dropdown-item">
            <div class="row">
              <div
                v-for="(classfication, index) in courseRootClassifications"
                :key="index"
                class="col"
              >
                <h6 @click="goToClassficationCommidityList(classfication.name, '*', 'course')">
                  <a href="#" id="listItemStyle">{{ classfication.name }}</a>
                </h6>
                <li
                  v-for="(subClassfication, index) in classfication.subClassfication"
                  :key="index"
                  class="list-group-item"
                  @click="goToClassficationCommidityList(classfication.name, '*', 'quiz')"
                >
                  <a href="#" id="listItemStyle">{{ subClassfication }}</a>
                </li>
              </div>
            </div>
          </div>
        </ul> -->

        <b-button
          squared
          variant="link"
          class="text-decoration-none computer-view dropdown-toggle"
          aria-expanded="false"
          id="navMenuItemBtn"
          @click="
            goToClassficationCommidityList('', '*', 'quiz')
          "
        >
          测验
        </b-button>

        <ul class="dropdown-menu active" id="ulStyle">
          <div id="dropdownMenuTopLine" />
          <div
            style="
              margin-left: 15px;
              font-size: 23px;
              margin-top: 10px;
              font-weight: bold;
            "
          >
            测验
          </div>
          <hr id="driodiwbMenuHrLineBetweenTopicAndList" />
          <div class="dropdown-item">
            <div class="row">
              <div
                v-for="(classfication, index) in quizRootClassifications"
                :key="index"
                class="col"
              >
                <h6
                  @click="
                    goToClassficationCommidityList(
                      classfication.name,
                      '*',
                      'quiz'
                    )
                  "
                >
                  {{ classfication.name }}
                </h6>
                <li
                  v-for="(
                    subClassfication, index
                  ) in classfication.subClassfication"
                  :key="index"
                  class="list-group-item"
                  @click="
                    goToClassficationCommidityList(
                      classfication.name,
                      '*',
                      'quiz'
                    )
                  "
                >
                  <a href="#" id="listItemStyle">{{ subClassfication }}</a>
                </li>
              </div>
            </div>
          </div>
        </ul>
      </div>

      <!-- Nav links -->
      <div
        v-if="isLogin"
        class="login-nav nav-btn-wrapper"
        @click="changeSideNav"
      >
        <div v-if="isLogin" class="rwd-title">
          <h6>页面选择</h6>
        </div>

        <div class="rwd-title">
          <h6>功能选择</h6>
        </div>
        <!-- login-btn ie button after login -->
        <div v-if="isLogin" class="login-btn" @click="changeSideNav">
          <!-- Login info -->
          <div class="shopping-cart" style="margin-right: 15px">
            <!--<span class="cart-size" >-->
            {{ shoppingCartNumber }}
            <img
              @click="goToShoppingCart"
              src="@/assets/icons/shopping_cart.svg"
              style="
                width: 30%;
                align-items: center;
                justify-content: center;
                height: 100%;
              "
            />
          </div>

          <b-dropdown
            v-if="isLogin"
            id="account-dropdown"
            right
            size="sm"
            variant="outline-dark"
            no-caret
          >
            <template v-slot:button-content>
              <!-- <i class="fa fa-user-circle" /> -->
              <img src="@/assets/icons/person.svg" style="width: 30px" />
              <!-- <i class="fas fa-sort-down ml-2" /> -->
            </template>
            <b-dropdown-item>
              目前登录为 <br /><strong>{{ username }}</strong>
            </b-dropdown-item>
            <b-dropdown-divider />
            <b-dropdown-item @click.prevent="logout"> 退出 </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>

      <div v-else class="not-login-btn">
        <b-btn
          squared
          variant="dark"
          style="margin-top: 10px; padding-right: 10px; padding-left: 10px"
          @click="register"
        >
          注册
        </b-btn>
        <b-btn
          style="
            margin-left: 10px;
            margin-top: 10px;
            padding-right: 10px;
            padding-left: 10px;
          "
          squared
          variant="outline-dark"
          @click="login"
          >登录</b-btn
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CognitoHandler from "@/handler/userpool";
//import { commodity } from "@/models/commodity"
import { defineComponent } from "vue";

interface NavbarLocation {
  label: string;
  location: Location;
}

export default defineComponent({
  name: "peiiNavbar",
  components: {},
  data() {
    return {
      showSideNav: false,
      shoppingCartNumber: 0,
      //commodityInShoppingCart : new Array<commodity>(),
    };
  },
  computed: {
    courseRootClassifications() {
      return this.$store.state.courseClassfication;
    },

    quizRootClassifications() {
      return this.$store.state.quizClassfication;
    },

    links(): NavbarLocation[] {
      //if (!this.$store.state.currentWorkspace) {
      //return [];
      //}
      return [];
    },
    username(): string {
      if (this.$store.state.profile) {
        return this.$store.state.profile.username;
      }
      return "unknown";
    },
    isLogin(): boolean {
      return Boolean(this.$store.state.profile); //true;
    },
  },
  watch: {
    "$store.state.shoppingCart": {
      handler: function () {
        this.shoppingCartNumber = this.$store.state.shoppingCart.size;
      },
      deep: true,
    },
  },
  methods: {
    logout() {
      //Auth.logout();
      console.log("out");
      this.$cookies.remove("accessToken");
      this.$store.state.profile = null;
    },
    changeSideNav() {
      this.showSideNav = !this.showSideNav;
      console.log(this.showSideNav);
    },
    login() {
      this.$router.push({ path: "/login" });
      //CognitoHandler.login("yukina1026" , "Barry0501!"  )
    },
    register() {
      this.$router.push({ path: "/register" });
    },
    goToShoppingCart() {
      this.$router.push({ path: "/ShoppingCart" });
    },
    goToClassficationCommidityList(
      class1: string,
      class2: string,
      type: string
    ) {
      let classPath = class1 + "/" + class2;
      this.$router.push({
        name: "classficationCommodityList",
        params: { type, classPath },
      });
    },
  },
  //load commodity.ts in shoppinng cart when created()
});
</script>

<style scoped lang="scss">
* {
  padding: 0;
  margin: 0;
}

#ulStyle {
  margin-top: 5px;
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
}

#driodiwbMenuHrLineBetweenTopicAndList {
  margin-left: 10px;
  margin-right: 10px;
  background-color: #8f9bb3;
  height: 1.3px;
  margin-bottom: 10px;
  margin-top: 10px;
}
#dropdownMenuTopLine {
  float: right;
  width: 100%;
  height: 3.9px;
  margin-top: -0.5em;
  background: #42aaff;
  position: relative;
  text-align: center;
}
#listItemStyle {
  color: black;
  font-weight: normal;
}
#navMenuItemBtn:hover,
#navMenuItemBtn:active {
  background-color: #1a2138;
  color: #fff;
  height: 72px;
}
#navMenuItemBtn {
  color: #1a2138;
}
.navbar {
  height: 80px;
  padding: 0 10px;
  box-shadow: 0 0 2px #ddd;
  background-color: #fff;
  //position: fixed;
  display: block;
  width: 100%;
  z-index: 10;
  a {
    font-weight: bold;
    text-decoration: none;
  }
  .navbar-brand {
    line-height: 50px;
    padding-right: 10px;
    a {
      color: #333;
      vertical-align: middle;
      &.router-link-exact-active {
        color: #333;
      }
    }
  }
  .group-name {
    margin-right: auto;
    display: flex;
    align-self: center;
  }
  .nav {
    display: flex;
    align-items: center;
    //background-color: #f23f3f;
    //display: block;

    .nav-item {
      margin-left: 20%;
      //background-color: #002969;
      justify-content: space-around;
      //flex : 2;
    }
    .next-btn {
      margin-left: 10px;
    }
    .logo-box .logo-text {
      line-height: 1.4;
      color: #002969;
      margin-left: 15px;
    }
    .logo-box .logo-text .title {
      font-size: 16px;
    }
    .logo-box .logo-text .des {
      font-size: 14px;
    }

    .not-login-btn {
      //background: blue;
      display: flex;
      width: 150px;
      //margin-left : 33%;
      //background-color: #333;
      text-align: right;
      margin-left: auto;
      //b-btn {
      //  margin-left : auto;
      //}
    }
    .login-nav {
      //background : blue;
      margin-left: auto;

      .login-btn {
        display: flex;

        .shopping-cart {
          //background : blue;
          //display : flex;
          width: 100px;
          display: inline-block;
          vertical-align: middle;
          border: black;
          border-style: solid;
          border-radius: 5px;
          border-width: 1px;
        }
      }
    }
  }
  .rwd-title {
    display: none;
  }
  .rwd-icon {
    display: none;
    line-height: 50px;
    font-size: 1.5rem;
    margin-right: 10px;
    &:hover {
      cursor: pointer;
    }
  }
}
//.peiiicon{
//  height : 40px;
//  width: 120px;
//}

@media screen and (max-width: 1000px) {
  .navbar {
    align-items: flex-start;

    .nav {
      position: absolute;
      right: 0;
      box-shadow: -2px 0px 10px #ddd;
      background-color: #fff;
      width: 275px;
      height: 100vh;
      flex-direction: column;
      //display: block;
      transition: all 0.6s ease;
      .nav-btn-wrapper {
        flex-direction: column;
        width: 100%;
        .nav-btn {
          width: 100%;
          border-radius: 0;
        }
      }
      .login-nav {
        //.lang-btn, .login-btn{
        width: 100%;
        margin: 0;
        .dropdown {
          width: 100%;
        }
        //}
      }

      .rwd-title {
        display: block;
        background-color: #ddd;
        width: 100%;
        h6 {
          font-size: 1.1rem;
          font-weight: 600;
          text-align: left;
          padding: 10px;
        }
        :hover {
          cursor: default;
        }
      }
    }

    display: block;
    .logo-box .logo-text {
      line-height: 1.4;
      color: #002969;
    }
    .logo-box .logo-text .title {
      font-size: 16px;
    }
    .logo-box .logo-text .des {
      font-size: 14px;
    }

    .not-login-btn {
      //display: block;
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .rwd-icon {
      display: flex;
      //background-color: #002969;
      span {
        margin-left: auto;
        img {
          width: 1.5rem;
          height: 1.5rem;
          text-align: center;
        }
      }
    }
    .side-close {
      display: flex;
      right: -250px;
      //background-color: #002969;
      span {
        margin-left: auto;
        img {
          width: 1.5rem;
          height: 1.5rem;
          text-align: center;
        }
      }
    }
  }

  .computer-view {
    display: none;
  }
}
</style>
