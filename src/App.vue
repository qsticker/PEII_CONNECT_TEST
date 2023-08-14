<template>
  <div id="app">
    <peiiNavbar />
    
    <!--<AnswerGroupResult />-->
    <!---<ClassficationCommodityList clickedClass="北師大/第一冊" type="quiz" />-->
    <!---<CommodityList />-->
    <!---<HierarchyClasses type="quiz" clickedClass="北師大/第一冊" />-->
    <router-view class="router-view" />
    <!---<AnswerGroupView/>-->
    <!---<ShoppingCart />-->
    <peiiFooter />
  </div>
</template>

<script>
//import HierarchyClasses from './components/HierarchyClasses.vue'
//import AnswerGroupView from './views/AnswerGroupView.vue'
//import CommodityList from './components/CommodityList.vue'
//import HomeView from './views/HomeView'
//import ShoppingCart from './views/ShoppingCart.vue'
//import ClassficationCommodityList from './views/ClassificationCommodityList'
import peiiNavbar from './components/navbar.vue'
import peiiFooter from './components/PageFooter.vue'
//import AnswerGroupResult from './views/AnswerGroupResult.vue'
export default {
  name: 'App',
  components: {
    peiiNavbar,
    peiiFooter,
    //CommodityList,
    //HomeView
    //QuizView
    //AnswerGroupView,
    //ShoppingCart,
    //HierarchyClasses,
    //AnswerGroupView,
    //ClassficationCommodityList,
    //AnswerGroupResult,
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
