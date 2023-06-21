<template>
  <div class= "root">
      <AnswerView v-if="isCreated" :answerModel="currentAnsweModel" :beClickeds="beClickCurrent" :currentIndex="currentIndex"/>
      <AnswerProgress v-if="isCreated"  :answers="newAnswerModelList" @numChanged="changeNumber" />

  </div>
</template>
  
  <script lang="ts">
  import { defineComponent , PropType  } from "vue";
  import { AnswerGroupRespondModel } from '@/apis/models/GetAnswerGroupModel';
  import AnswerView from '@/components/QuizView/AnswerView.vue';
  import AnswerProgress from '@/components/QuizView/AnswerProgress.vue';
  import axios from 'axios';
  import { Answer } from '@/models/AnswerModel';
  import AnswerGroupApi from '@/apis/AnswerGroupApi';
  //import { QuizTemplateModel } from '@api/models/QuizModel';
  //import ClickArea from '@/components/QuizView/ClickArea.vue';

  export default defineComponent({
    name: 'AnswerGroupView',
    components: {
        //ClickArea
        AnswerView,
        AnswerProgress,
    },
    props: {
        //quizModel : Object as PropType<QuizTemplateModel>,
    },
    data() {
      return {
        //clickAreaList : clickAreas ,
        originalQuizInstance: null as unknown as AnswerGroupRespondModel,
        quizData: [] as unknown[],
        amount: 0,
        newAnswerModelList: new Array<Answer>(),
        currentAnsweModel : {}  as Answer,
        currentIndex : 0,
        isCreated : false ,
        beClickCurrent : [] as Array<boolean>,
        //imageRatio: 500/imageWidth
      };
    },
    computed: {
       
    },
    methods: {
    async connect(){
      console.log('hi')
      const instance = await AnswerGroupApi.create( "554dfd1d-20ba-4cc2-a975-406aac08c623" ) as AnswerGroupRespondModel;
      console.log( instance )
      console.log('after')
      console.log('hi')
      this.originalQuizInstance = instance;
      this.quizData = instance.answerList;
      this.amount = instance.amount;
     
      },
      changeTest() {
        //this.isCreated = false;
        if(this.currentIndex == 0){
          console.log(this.currentIndex)
          this.currentAnsweModel = this.newAnswerModelList[1]
          console.log( this.currentAnsweModel.uuid )
          this.currentIndex = 1

        }else{
          console.log(this.currentIndex)
          this.currentAnsweModel = this.newAnswerModelList[0]
          console.log( this.currentAnsweModel.uuid )
          this.currentIndex = 0
        } 
        this.changeQuizBeClickeds()
        //this.isCreated =true
      },
      changeNumber(changeIndex : number) {
        if( changeIndex  >= this.amount){
          alert( "以超過總題數數量" )
        }else{
          console.log("change" + changeIndex)
          this.currentIndex = changeIndex
          this.currentAnsweModel = this.newAnswerModelList[changeIndex]
        }
        this.changeQuizBeClickeds()
      },
      changeQuizBeClickeds() {
        this.beClickCurrent = []
        const tempUserAnswer = this.currentAnsweModel.userAnswer
        for(let i = 0 ; i < this.currentAnsweModel.clickAreas.length ; i++ ){
            if( tempUserAnswer.includes( this.currentAnsweModel.clickAreas[i].label ) ){
              this.beClickCurrent.push( true )
            }else{
              this.beClickCurrent.push( false )
            }
        }
        console.log( this.currentAnsweModel.userAnswer )
      },
    },
    async created() {
      
      //AnswerGroupApi.create( "554dfd1d-20ba-4cc2-a975-406aac08c623" );
      const instance  = await axios.get(process.env.VUE_APP_BASE_API_URL + '/answer-group/anwser-web?entranceCode=554dfd1d-20ba-4cc2-a975-406aac08c623') //as AnswerGroupRespondModel
      console.log( instance.data.amount )
      const instanceData = instance.data;
      this.amount = instance.data.amount;
     
      const newAnswerList = instanceData.answerList as Array<any>;
      const newAnswerModelList = new Array<Answer>();
      
      for (let i = 0; i < instanceData.amount; i += 1) {
       const {
          userAnswer, sourceQuiz, uuid, timeSpent, multipleSelect, isBlankFill, blankFillAnswer
        } = newAnswerList[i];
        newAnswerModelList.push( new Answer(userAnswer, sourceQuiz, uuid, timeSpent, multipleSelect, isBlankFill, blankFillAnswer) );
      }
      this.newAnswerModelList = newAnswerModelList;
      this.currentAnsweModel = newAnswerModelList[0];
      console.log("parent")
      this.isCreated = true
    },
  });
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
    
  </style>