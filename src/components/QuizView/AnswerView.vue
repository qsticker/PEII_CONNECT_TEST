<template>
  <div class= "root">
    <div  v-for="( clickArea ,index ) in subAnswerModel.clickAreas" :key="index" class="ClickAreaList"> 
      <ClickArea :clickAreaModel="clickArea" :beClicked="localBeClickeds[index]" :currentIndex="subCurrentIndex" 
      :blankFillAnswer="subAnswerModel.blankFillAnswer"
      :isBlankFill="subAnswerModel.isBlankFill"
      @updateByParent="updateAnswers" 
      @updateBlankAnswer="updateBlankAnswer"/>
    </div>
  </div>

</template>
  
  <script lang="ts">
  import { defineComponent , PropType  } from "vue";
  import { Answer } from '@/models/AnswerModel';
  import ClickArea from '@/components/QuizView/ClickArea.vue';
  import isEqual from "lodash.isequal";

  export default defineComponent({
    name: 'AnswerView',
    components: {
        ClickArea
    },
    props: {
        beClickeds : {
          type: [] as  PropType<Array<boolean>> ,
          defualt: true,
        },
        currentIndex : {
          type: Number ,
          defualt: true,
        },
        answerModel :{
          type: Object as PropType<Answer>,
          required: true,         
        }
    },
    data() {
      return {
        subAnswerModel : this.answerModel,
        localBeClickeds : this.beClickeds,
        isCreated : false,
        subCurrentIndex : this.currentIndex,
        //answerModel : {} as Answer
      };
    },
    watch: {
      answerModel : function() {
          console.log( "watch" )
          console.log( this.answerModel.uuid )
          this.subAnswerModel = this.answerModel
      },
      currentIndex : function() {
        this.localBeClickeds = this.beClickeds
        console.log( this.localBeClickeds )
        this.subCurrentIndex = this.currentIndex
      }
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
      },

      updateBlankAnswer(label : string , answer: string)  {
          console.log("blank")
          console.log( answer )
          if( this.subAnswerModel.blankFillAnswer == undefined ){
            this.subAnswerModel.blankFillAnswer = { 
              "A" : "",
              "B" : "",
              "C" : "",
              "D" : "",
              "E" : "",
            }  
          }

          this.subAnswerModel.blankFillAnswer[ label ] = answer 
          
          console.log( this.subAnswerModel.blankFillAnswer )
      },

      getBlankUserAnswer(clickArea : any , label : string){
          const map = new Map(Object.entries( this.subAnswerModel.blankFillAnswer ));
          return map.get( label ) ;
      },
    },
  });
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
    
  </style>