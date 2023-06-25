<template>
    <div class="commodity-list">
        <PeiiCommodity classOfCommodity="中考真題" name="2012-中考真題測驗11111111" />
        <PeiiCommodity classOfCommodity="中考真題" name="2012-中考真題測驗" />
        <PeiiCommodity classOfCommodity="中考真題" name="2012-中考真題測驗" />
        <PeiiCommodity classOfCommodity="中考真題" name="2012-中考真題測驗" />
        <PeiiCommodity classOfCommodity="中考真題" name="2012-中考真題測驗" />
        <PeiiCommodity classOfCommodity="中考真題" name="2012-中考真題測驗" />
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import PeiiCommodity from '@/components/ShoppingCart/Commodity.vue'
//import peiiNavbar from '@/components/navbar.vue'

export default defineComponent({
  name: 'CommodityList',
  components: {
      PeiiCommodity,
  },
  data() {
    return {
      
    };
  },
  computed: {
    
  },
  methods: {
    
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.commodity-list{
		//background-color: coral;
		display : flex;
        flex-wrap: wrap;
        align-items: stretch ;
        //background : blue;
        justify-content: center;   
	}
	
</style>