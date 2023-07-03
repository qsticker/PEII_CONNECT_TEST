<template>
  <div class="root">
    <ul class="list-group  information-table">
      <li  class="list-group-item "> 題組名稱 : {{ originalQuizInstanceName  }}  </li> 
      <li  class="list-group-item "> 題目總數 : {{ answerResult.sourceQuizGroupSize }}  </li>    
      <li  class="list-group-item "> 題組總分 : {{ answerResult.totalScore }}  </li>    
      <li  class="list-group-item "> 你的得分 : {{ answerResult.scoreGot  }}  </li>    
      <li  class="list-group-item "> 正確率 : {{ answerResult.correctRate  }}  </li>
      <li  class="list-group-item "> 本題答案 : {{ currentAnswerModel.realAnswer  }}  </li>  
      <li  class="list-group-item "> 你的答案 : {{ currentAnswerModel.userAnswer  }}  </li>  
    </ul>

    <b-row class="indexSelector">
      <div v-for="(item, index) in answerModelList" :key="item" style="float: left;line-height: 34px;width:25%; text-align: right">
        <b-col  class="p-3 text-center ">
          <b-button variant="secondary" @click="changeNum(index)">
            {{ index + 1 }}
          </b-button>
        </b-col>
      </div>
    </b-row>
    <div  v-for="( clickArea ,index ) in currentAnswerModel.clickAreas" :key="index" class="ClickAreaList"> 
      <ClickAreaForShowResult :clickAreaModel="clickArea"  :currentIndex="subCurrentIndex" />
    </div>
  </div>
</template>
  
  <script lang="ts">
  import { defineComponent  } from "vue";
  import { Answer } from '@/models/AnswerModel';
  import ClickAreaForShowResult from "@/components/QuizView/ClickAreaForShowResult.vue";
  import axios from 'axios';
  import { AnswerGroupResultRespondModel } from '@/apis/models/AnswerGroupResultModel';
  import isEqual from 'lodash.isequal';

  export default defineComponent({
    name: 'AnswerGroupResult',
    components: {
      ClickAreaForShowResult
    },
    props: {
    },
    data() {
      return {
        currentAnswerModel : {}  as Answer,
        answerModelList: new Array<Answer>(),
        currentIndex : 0,
        answerResult: null as unknown as AnswerGroupResultRespondModel,
        originalQuizInstanceName: "",
      };
    },
    computed: {
    },
    methods: {
       changeNum(changeIndex : number) {
        if( changeIndex  >= this.answerResult.sourceQuizGroupSize){
          alert( "以超過總題數數量" )
        }else if(changeIndex < 0){
          alert( "以超過總題數數量" )
        }
        else{
          console.log("change" + changeIndex)
          this.currentIndex = changeIndex
          this.currentAnswerModel = this.answerModelList[changeIndex]
        }
      },
    },
    async created() {
      const answerResultInstance  = await axios.get(process.env.VUE_APP_BASE_API_URL + '/answer-group/554dfd1d-20ba-4cc2-a975-406aac08c623')
      const {
        status , uuid , timeSpent , totalScore , scoreGot , correctRate , sourceQuizGroupId , sourceQuizGroupSize ,quizEventId , answerList
      } = answerResultInstance.data;
      this.answerResult = new AnswerGroupResultRespondModel( status , uuid , timeSpent , totalScore , scoreGot , correctRate , sourceQuizGroupId , sourceQuizGroupSize ,quizEventId , answerList );

      const instance  = await axios.get(process.env.VUE_APP_BASE_API_URL + '/answer-group/anwser-web?entranceCode=554dfd1d-20ba-4cc2-a975-406aac08c623') //as AnswerGroupRespondModel
      const instanceData = instance.data;
      console.log( instance  )
     
      const newAnswerList = instanceData.answerList as Array<any>;
      const newAnswerModelList = new Array<Answer>();
      
      this.originalQuizInstanceName = instanceData.sourceQuizGroupName

      for (let i = 0; i < instanceData.amount; i += 1) {
       const {
          userAnswer, sourceQuiz, uuid, timeSpent, multipleSelect, isBlankFill, blankFillAnswer
        } = newAnswerList[i];
        let answer = new Answer(userAnswer, sourceQuiz, uuid, timeSpent, multipleSelect, isBlankFill, blankFillAnswer , sourceQuiz.score)
        newAnswerModelList.push( answer );
        this.answerResult.answerList.forEach( ( realAnswer : any) => {
              if( isEqual( realAnswer.uuid , uuid ) ){
                answer.setRealAnswer( realAnswer.sourceQuiz.answerSet ) 
              }  
          }
        );
      }
      console.log( newAnswerModelList )
      this.answerModelList = newAnswerModelList;
      this.currentAnswerModel = newAnswerModelList[0];
    }
  });
  </script>
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
  .root{
    display : flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
     .indexSelector{
      margin-top : 1%;
      margin-bottom : 1%;
      width : 30%;
      border: 2px dotted;;
    }
    .information-table{
      width : 30%;
    }
  }
  </style>