<template>
  <div class="root">
    <ul class="list-group  ">
      <li  class="list-group-item "> 題組名稱 : {{  originalQuizInstance.sourceQuizGroupName }}  </li>    
      
    </ul>
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
  import { AnswerGroupRespondModel } from '@/apis/models/GetAnswerGroupModel';
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
        subCurrentIndex : 0,
        originalQuizInstance: null as unknown as AnswerGroupRespondModel,
      };
    },
    computed: {
    },
    methods: {
    },
    async created() {
      const instance  = await axios.get(process.env.VUE_APP_BASE_API_URL + '/answer-group/anwser-web?entranceCode=554dfd1d-20ba-4cc2-a975-406aac08c623') //as AnswerGroupRespondModel
      console.log( instance.data.amount )
      const instanceData = instance.data;
      const newAnswerList = instanceData.answerList as Array<any>;
      const newAnswerModelList = new Array<Answer>();
        const {
          status, uuid, ownerId, sourceQuizGroupId, sourceQuizGroupName,shortId,amount,answerLis,eyeballDetect
        } = instance.data;
      this.originalQuizInstance = new AnswerGroupRespondModel( status, uuid, ownerId, sourceQuizGroupId, sourceQuizGroupName,shortId,amount,answerLis,eyeballDetect );
      for (let i = 0; i < instanceData.amount; i += 1) {
       const {
          userAnswer, sourceQuiz, uuid, timeSpent, multipleSelect, isBlankFill, blankFillAnswer
        } = newAnswerList[i];
        newAnswerModelList.push( new Answer(userAnswer, sourceQuiz, uuid, timeSpent, multipleSelect, isBlankFill, blankFillAnswer) );
      }
      this.answerModelList = newAnswerModelList;
      this.currentAnswerModel = newAnswerModelList[0];
    }
  });
  </script>
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
  </style>