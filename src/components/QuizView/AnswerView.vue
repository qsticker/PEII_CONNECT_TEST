<template>
  <div class= "root">
    <div  v-for="( clickArea ,index ) in subAnswerModel.clickAreas" :key="index" class="ClickAreaList"> 
        <ClickArea :clickAreaModel="clickArea" :beClicked="beClickeds[index]" @updateByParent="updateAnswers" />
    </div>
    <div> {{ subAnswerModel.uuid }}</div>
  </div>

</template>
  
  <script lang="ts">
  import { defineComponent , PropType  } from "vue";
  import { Answer } from '@/models/AnswerModel';
  import ClickArea from '@/components/QuizView/ClickArea.vue';

  export default defineComponent({
    name: 'AnswerView',
    components: {
        ClickArea
    },
    props: {
        answerModel :{
          type: Object as PropType<Answer>,
          required: true,         
        }
    },
    data() {
      return {
        subAnswerModel : this.answerModel,
        beClickeds : [] as Array<boolean>,
        isCreated : false,
        //answerModel : {} as Answer
      };
    },
    watch: {
      answerModel : function() {
          console.log( "watch" )
          console.log( this.answerModel.uuid )
          this.subAnswerModel = this.answerModel
      },
    },
    computed: {
       
    },
    
    methods: {
       updateAnswers(answer: string) {
           //console.log(
           
           if( this.subAnswerModel.userAnswer.includes(answer) ){
                this.subAnswerModel.userAnswer = this.subAnswerModel.userAnswer.filter( (element) => {
                        return element !== answer;
                  }
                )
           }
           else{
              this.subAnswerModel.userAnswer.push(answer)
           }
           //console.log( this.answerModel.userAnswer )
      }
    },
   
  });
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
    
  </style>