<template>
  <div class= "root">
    <div v-for="( clickArea ,index) in clickAreaList" :key="index" class="ClickAreaList"> 
        <ClickArea :clickAreaModel="clickArea" @updateByParent="updateAnswers" />
    </div>
  </div>
</template>
  
  <script lang="ts">
  import { defineComponent  } from "vue";
  import { clickAreas } from '@/apis/models/FakeModel';
  import ClickArea from '@/components/QuizView/ClickArea.vue';

  export default defineComponent({
    name: 'QuizView',
    components: {
        ClickArea
    },
    props: {
        
    },
    data() {
      return {
        clickAreaList : clickAreas ,
        answerList : new Array<string>(),
        //imageRatio: 500/imageWidth
      };
    },
    computed: {
       
    },
    methods: {
       updateAnswers(answer: string) {
           //console.log(
        
           if( this.answerList.includes(answer)){
                this.answerList = this.answerList.filter((element) => {
                        return element !== answer;
                    }
                );
           }
           else{
               this.answerList.push(answer)
           }
          
           console.log( this.answerList )
       },
    }
  });
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
    
  </style>