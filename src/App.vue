<template>
  <peiiNavbar/>
  <SlideShow/>

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

<style lang="scss">
@import "~@/assets/scss/vendors/bootstrap-vue/index";
@import "~@/assets/scss/vendors/bootstrap-vue/index";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
