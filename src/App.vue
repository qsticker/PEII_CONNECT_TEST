<template>
  <div id="app">
    <!--<peiiNavbar />-->
    <RandomQuiz categoryNodeId="d2176997-1973-487c-a604-c407b60d94fa"/>

    <!--<router-view class="router-view" />-->

    <!--<peiiFooter />-->
  </div>
</template>

<script>

//import peiiNavbar from './components/navbar.vue'
//import peiiFooter from './components/PageFooter.vue'
import RandomQuiz from './components/RandomQuiz.vue'
export default {
  name: 'App',
  components: {
    //peiiNavbar,
    //peiiFooter,
    RandomQuiz
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
