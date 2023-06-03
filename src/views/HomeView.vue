<template>
  <div class="home">
    <peiiNavbar/>
    <SlideShow/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SlideShow from '@/components/SlideShow.vue'
import peiiNavbar from '@/components/navbar.vue'
@Component({
  components: {
    peiiNavbar,
    SlideShow,
  },
})
export default class HomeView extends Vue {}
</script>
