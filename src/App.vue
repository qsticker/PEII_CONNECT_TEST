<template>
  <div id="app">
    <peiiNavbar />
    <router-view class="router-view" />
    <peiiFooter />
  </div>
</template>

<script>
import peiiNavbar from './components/navbar.vue'
import peiiFooter from './components/PageFooter.vue'
//import AnswerGroupResult from './views/AnswerGroupResult.vue'
export default {
  name: 'App',
  components: {
    peiiNavbar,
    peiiFooter,
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