<template>
  <div id="app">
    <peiiNavbar/>
    <SlideShow/>
  </div>
</template>

<script>
import SlideShow from './components/SlideShow.vue'
import peiiNavbar from './components/navbar.vue'
export default {
  name: 'App',
  components: {
    SlideShow,
    peiiNavbar
  }
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
