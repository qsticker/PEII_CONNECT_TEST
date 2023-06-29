<template>
  <div class="home">
    <SlideShow />
    <CommodityList />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SlideShow from '@/components/SlideShow.vue'
import CommodityList from '@/components/CommodityList.vue'
//import peiiNavbar from '@/components/navbar.vue'
@Component({
  components: {
    //peiiNavbar,
    SlideShow,
    CommodityList,
  },
})
export default class HomeView extends Vue {}
</script>
