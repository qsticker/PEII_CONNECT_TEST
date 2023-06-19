<template>
  <div class= "root">
    <div  v-for="( clickArea ,index ) in answerModel.clickAreas" :key="index" class="ClickAreaList"> 
        <ClickArea :clickAreaModel="clickArea" :beClicked="beClickeds[index]" @updateByParent="updateAnswers" />
    </div>
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
        beClickeds : [] as Array<boolean>,
        isCreated : false,
        //answerModel : {} as Answer
      };
    },
    computed: {
       
    },
    methods: {
       updateAnswers(answer: string) {
           //console.log(
           //this.answerModel = this.props.answerModel
           if( this.answerModel.userAnswer.includes(answer) ){
                //this.answerModel.userAnswer = this.answerModel.userAnswer.filter( (element) => {
                //        return element !== answer;
                //  }
                //)
           }
           else{
              //this.answerModel.userAnswer.push(answer)
           }
           //console.log( this.answerModel.userAnswer )
      }
    },
    created() {
      console.log(this.answerModel)
      console.log('hi')
      //this.subAnswerModel = this.answerModel
      //console.log( this.subAnswerModel )
      this.isCreated = true
    }
   
  });
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
    
  </style>