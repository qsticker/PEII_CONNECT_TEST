<template>
  <div id="app">
    <HierarchyClasses />
    <router-view class="router-view" />
    <!--<AnswerGroupView/>-->
    <!--
     
     
     //<router-view class="router-view" />
     -->
  </div>
</template>

<script>

import HierarchyClasses from './components/HierarchyClasses.vue'
//import AnswerGroupView from './views/AnswerGroupView.vue'
//import CommodityList from './components/CommodityList.vue'
//import HomeView from './views/HomeView'
export default {
  name: 'App',
  components: {
    //peiiNavbar,
    //HomeView
    //QuizView
    //AnswerGroupView,
    //ShoppingCartCommodity,
    HierarchyClasses,
    //AnswerGroupView,
  },
  
   methods: {
      async send() {
        if(this.currentIndex == 0){
          this.currentAnsweModel = this.newAnswerModelList[1]
          this.currentIndex = 1
        }else{
          this.currentAnsweModel = this.newAnswerModelList[0]
          this.currentIndex = 0
        } 
      }     
    },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
