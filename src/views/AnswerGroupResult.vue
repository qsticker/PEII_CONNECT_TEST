<template>
  <div class="root">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet"/>
    <ul class="list-group  information-table">
      <li  class="list-group-item "> 題組名稱 : {{ originalQuizInstanceName  }}  </li> 
      <li  class="list-group-item "> 題目總數 : {{ answerResult.sourceQuizGroupSize }}  </li>    
      <li  class="list-group-item "> 題組總分 : {{ answerResult.totalScore }}  </li>    
      <li  class="list-group-item "> 你的得分 : {{ answerResult.scoreGot  }}  </li>    
      <li  class="list-group-item "> 正確率 : {{ answerResult.correctRate  }}  </li>
      <li v-if="currentAnswerModel.isBlankFill"  class="list-group-item "> 本題答案 : {{ getRealAnswer( ) }}  </li>  
      <li v-if="currentAnswerModel.isBlankFill" class="list-group-item "> 你的答案 : {{ getAnswer( ) }}  </li>  
    </ul>

    <b-modal
        v-model="modalShow"
        class="modal"
        hide-footer
        id="bv-modal-a"
      >
      <b-row class="indexSelector">
        <div v-for="(item, index) in answerModelList" :key="item" style="float: left;line-height: 34px;width:25%; text-align: right">
          <b-col  class="p-3 text-center ">
            <b-button variant="secondary" @click="changeNum(index)">
              {{ index + 1 }}
            </b-button>
          </b-col>
        </div>
      </b-row>

    </b-modal>

    <div  v-for="( clickArea ,index ) in currentAnswerModel.clickAreas" :key="index" class="ClickAreaList"> 
      <div class="result-clickArea-Container">
        <i v-if="checkThisAnswerIsCorrect(clickArea)" class="fas fa-check correct faicon" style="color: #14ee11;" />
        <i v-else-if="checkThisAnswerIsInCorrect(clickArea)" class="fa fa-times faicon" style="color: #ee1111;" />
        <ClickAreaForShowResult :clickAreaModel="clickArea"  :currentIndex="subCurrentIndex" />
      </div>
    </div>
  </div>
</template>
  
  <script lang="ts">
  import { defineComponent  } from "vue";
  import { Answer } from '@/models/AnswerModel';
  import { ClickAreaModel } from '@/models/QuizModel';
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
        modalShow: false,
      };
    },
    computed: {
    },
    methods: {
       changeNum(changeIndex : number) {
       
        console.log("change" + changeIndex)
        this.currentIndex = changeIndex
        this.currentAnswerModel = this.answerModelList[changeIndex]
        
      },
      checkThisAnswerIsCorrect(clickArea : ClickAreaModel){
        if( this.currentAnswerModel.isBlankFill ){
          return false;
        }else{
          let realAnswer = this.currentAnswerModel.realAnswer
          if( realAnswer.includes(clickArea.label) ){
            return true;
          }
        }
      return false;
      },
      checkThisAnswerIsInCorrect(clickArea : ClickAreaModel){
        if( this.currentAnswerModel.isBlankFill ){
          return false;
        }else{
          let realAnswer = this.currentAnswerModel.realAnswer
          let userAnswer = this.currentAnswerModel.userAnswer
          if( !realAnswer.includes(clickArea.label) ){
            if( userAnswer.includes( clickArea.label) ){
              return true;
            }
          }
        }
      return false;
      },
      getRealAnswer( ){
        let realAnswer = ""
        if( this.currentAnswerModel.isBlankFill ){
          if( this.currentAnswerModel.realBlankFillAnswer != undefined ){
            const keys = ["A" , "B" , "C" , "D" , "E"]

            for( let i = 0 ; i < keys.length ; i++){
              let tempAnswer = this.currentAnswerModel.realBlankFillAnswer[ keys[i] ]
              if( tempAnswer != ""){
                if(tempAnswer != undefined){
                  if( keys[i] != "A"){
                    realAnswer = realAnswer + " / " 
                  }
                  realAnswer = realAnswer + tempAnswer
                } 
              } 
            }
          }  
        }else{
          for(let i = 0 ; i < this.currentAnswerModel.realAnswer.length ; i++){
            realAnswer = realAnswer + " " + this.currentAnswerModel.realAnswer[i]
          } 
        }
        return realAnswer
      },
      getAnswer( ){
        let userAnswer = ""
        if( this.currentAnswerModel.isBlankFill ){
          if( this.currentAnswerModel.blankFillAnswer != undefined ){
            const keys = ["A" , "B" , "C" , "D" , "E"]

            for( let i = 0 ; i < keys.length ; i++){
              let tempAnswer = this.currentAnswerModel.blankFillAnswer[ keys[i] ]
              if( tempAnswer != ""){
                if(tempAnswer != undefined){
                  if( keys[i] != "A"){
                    userAnswer = userAnswer + " / " 
                  }
                  userAnswer = userAnswer + tempAnswer
                } 
              } 
            }
          }  
        }else{
          for(let i = 0 ; i < this.currentAnswerModel.userAnswer.length ; i++){
            userAnswer = userAnswer + " " + this.currentAnswerModel.userAnswer[i]
          } 
        }
        return userAnswer
      }
    },
    async created() {
      const answerResultInstance  = await axios.get(process.env.VUE_APP_PEII_BASE_API_URL + '/answer-group/' + this.$route.params.answerUuid )
      const {
        status , uuid , timeSpent , totalScore , scoreGot , correctRate , sourceQuizGroupId , sourceQuizGroupSize ,quizEventId , answerList , shortId
      } = answerResultInstance.data;
      this.answerResult = new AnswerGroupResultRespondModel( status , uuid , timeSpent , totalScore , scoreGot , correctRate , sourceQuizGroupId , sourceQuizGroupSize ,quizEventId , answerList );

      const instance  = await axios.get(process.env.VUE_APP_PEII_BASE_API_URL + '/answer-group/get-answer-result-with-area?entranceCode=' + shortId) //as AnswerGroupRespondModel
      const answerViewInstance = instance.data;
      console.log( instance )
      
      this.originalQuizInstanceName = answerViewInstance.sourceQuizGroupName
     
      console.log("answer")
      console.log( this.answerResult.answerList )
      const newAnswerList = this.answerResult.answerList as Array<any>;
      const newAnswerModelList = new Array<Answer>();
      for(let i = 0 ; i < this.answerResult.answerList.length ; i++){
        const {
          userAnswer , uuid, timeSpent, multipleSelect, isBlankFill, blankFillAnswer , realBlankFillAnswer
        } = newAnswerList[i];
        //retrieve clickArea from answerViewInstance
        for(let j = 0 ; j < answerViewInstance.answerList.length ; j++){
          if( answerViewInstance.answerList[j].sourceQuiz.uuid == newAnswerList[i].sourceQuiz.uuid){
            const { 
              sourceQuiz
            } = answerViewInstance.answerList[j]
            let answer = new Answer( userAnswer, sourceQuiz, uuid, timeSpent, multipleSelect, isBlankFill, blankFillAnswer , sourceQuiz.score)
            answer.setRealAnswer( newAnswerList[i].sourceQuiz.answerSet )
            if( answer.isBlankFill ){
              answer.setRealBlankFillAnswer( answerViewInstance.answerList[j].realBlankFillAnswer )
            }
            newAnswerModelList.push( answer );
          }
        }
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
    .result-clickArea-Container{
      display : flex;
      align-items: center; 
      .faicon{
        position: absolute;
        left: 3vw;
        //bottom: 0.1vw;
      }
    }
  }
  </style>