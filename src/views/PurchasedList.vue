<template>
    <div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import isEqual from 'lodash.isequal';
import PurchasedItemsApis from "@/apis/PurchasedItemApis";

export default defineComponent ({
  name: 'PurchasedList',
    components: {
    //PeiiCommodity,
  },
  data() {
    return {
      shoppingCartSortArray : new Array<Array<any>>(),
      total : 0,
      showCheckoutSuccessTip: false,
    };
  },
  computed: {
    
  },
  watch: {

  },
  methods: {
    backToHomeBtn(){
      this.$router.push({name : "home"});
    },
   
  },
  async created() {
    PurchasedItemsApis.getPurchasedItems();
    
  }
});
</script>
<style scoped lang="scss">

</style>