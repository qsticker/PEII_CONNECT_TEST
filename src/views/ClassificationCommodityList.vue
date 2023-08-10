<template>
    <div class="root">
      <div v-if="isCourse" >  
        <!-- add key just for identity every element for rerender-->
        <HierarchyClasses class="HierarchyClasses" :clickedClass="clickedClass" type="course" key="1"/>
        <CommodityList type="course" key="1"/>
      </div>  
      <div v-else-if="isQuiz && isFourQuiz" >  
        <div style="margin-top: 40px; font-size: 25px" >
          <h2>購買一份真題四選系列測驗，包含4回真題測驗，您欲購買{{getReturnCartNumber}}份，請選擇{{getReturnCartNumber*4}}回測驗</h2>
        </div> 
        <ChooseExam :totalNumber='getReturnCartNumber*4' type="quiz" key="2"  />
      </div>  
      <div v-else >  
        <HierarchyClasses class="HierarchyClasses" :clickedClass="clickedClass" type="quiz" key="2"/>
        <CommodityList type="quiz" key="2" @ReturnCartNumber="getCommodityNumber" />
      </div>  
    </div>
</template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import HierarchyClasses  from "@/components/HierarchyClasses.vue";
  import CommodityList  from "@/components/CommodityList.vue";
  import ChooseExam  from "@/components/ChooseExam.vue";
  import isEqual from "lodash.isequal";
  export default defineComponent({
    name: 'ClassficationCommodityList',
    components: {
      //peiiNavbar,
      HierarchyClasses ,
      CommodityList ,
      ChooseExam
    },
    data() {
      return {
        isFullPage : true ,
        clickedClass: "",
        type: "",
        created: false,
        isQuiz : false,
        isCourse : false,
        isFourQuiz : false,
        getReturnCartNumber:0
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
            this.$store.state.sellPlanId = null;
          }
          if (isEqual(this.type, "course")) {
            this.isQuiz = false;
            this.isCourse = true;
            this.$store.state.sellPlanId = null;
          }
        },
        deep: true,
      },
      "$store.state.isFourQuiz" :{
        handler : function(){
          this.isFourQuiz=this.$store.state.isFourQuiz;
          console.log("change FourQuiz: " + this.isFourQuiz);
        }
      },
  },
    methods: {
      getCommodityNumber(data:number){ 
        this.getReturnCartNumber = data;
      }
    },
    async created() {
      // this.isFourQuiz=this.$store.state.isFourQuiz;
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