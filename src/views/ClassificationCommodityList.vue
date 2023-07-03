<template>
    <div class="root">
        <HierarchyClasses class="HierarchyClasses" :clickedClass="clickedClass" :type="type"/>
        <CommodityList :type="type" />
    </div>
</template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import HierarchyClasses  from "@/components/HierarchyClasses.vue"
  import CommodityList  from "@/components/CommodityList.vue"
  
  export default defineComponent({
    name: 'ClassficationCommodityList',
    components: {
      //peiiNavbar,
      HierarchyClasses ,
      CommodityList ,
    },
    props: {
        clickedClass : {
            type: String ,
            defualt: true,
        },
        type : {
            type: String ,
            defualt: true,
        },
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
    .HierarchyClasses {
        margin-left : 8%;
        margin-top : 1%;
    }
  
  </style>