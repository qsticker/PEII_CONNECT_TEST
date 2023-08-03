<template>
    <div class="root">
      <div v-if="isCourse" >  
        <!-- add key just for identity every element for rerender-->
        <HierarchyClasses class="HierarchyClasses" :clickedClass="clickedClass" type="course" key="1"/>
        <CommodityList type="course" key="1"/>
      </div>  
      <div v-else >  
        <HierarchyClasses class="HierarchyClasses" :clickedClass="clickedClass" type="quiz" key="2"/>
        <CommodityList type="quiz" key="2"/>
      </div>  
    </div>
</template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import HierarchyClasses  from "@/components/HierarchyClasses.vue";
  import CommodityList  from "@/components/CommodityList.vue";
  import isEqual from "lodash.isequal";
  export default defineComponent({
    name: 'ClassficationCommodityList',
    components: {
      //peiiNavbar,
      HierarchyClasses ,
      CommodityList ,
    },
    data() {
      return {
        isFullPage : true ,
        clickedClass: "",
        type: "",
        created: false,
        isQuiz : false,
        isCourse : false
      };
    },
    computed: {
      
    },
     watch: {
      '$route.params.type'  : {
        handler : function( ) {
          console.log("change!")
          this.clickedClass = this.$route.params.classPath
          this.type = this.$route.params.type
          console.log( this.type )
          if (isEqual(this.type, "quiz")) {
            this.isQuiz = true;
            this.isCourse = false;
          }
          if (isEqual(this.type, "course")) {
            this.isQuiz = false;
            this.isCourse = true;
          }
        },
        deep: true,
      },
  },
    methods: {
    
    },
    async created() {
      console.log( this.$route.params.classPath );

      this.clickedClass = this.$route.params.classPath;
      this.type = this.$route.params.type;
      if (isEqual(this.type, "quiz")) {
          this.isQuiz = true;
          this.isCourse = false;
      }
      if (isEqual(this.type, "course")) {
          this.isQuiz = false;
          this.isCourse = true;
      }
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