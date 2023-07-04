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
    data() {
      return {
        clickedClass : "",
        type : "",
      };
    },
    computed: {
      
    },
     watch: {
      '$route.params.classPath'  : {
        handler : function( ) {
          console.log("c")
          this.clickedClass = this.$route.params.classPath
          this.type = this.$route.params.type
        },
        deep: true,
      },
  },
    methods: {
    
    },created() {
      console.log( this.$route.params.classPath )
      this.clickedClass = this.$route.params.classPath
      this.type = this.$route.params.type
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