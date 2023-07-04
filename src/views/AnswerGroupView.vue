<template>
  <div class= "root">
      <b-navbar class="navbar navbar-expand-lg navbar-light  box-shadow:0px 4.9px 5px -3px grey;">
         <b-button v-if="isAllSelected" class="submitButton" variant="warning" @click="submitAnswer" >
            繳交
          </b-button>
          <b-button v-else class="submitButton" variant="outline-light" @click="submitAnswer">
            繳交
          </b-button>
      </b-navbar>
      <AnswerView class="answer" v-if="isCreated" :answerModel="currentAnsweModel" :beClickeds="beClickCurrent" :currentIndex="currentIndex"/>
      <div class="fixed-bottom">
        <div class="navbar-light" role="group">
          <div class="btn-group bottom-btns" style="height:70%">
            <b-button class="btn btn-light"  @click="previousBtn">
            &nbsp;&nbsp;
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
              </svg>
              上一題
            </b-button>
            <b-button class="btn btn-light" @click="listBtn">
            &nbsp;
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-nested" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5z" />
              </svg>
              答題進度
            </b-button>
            <b-button class="btn btn-light"  @click="nextBtn">
            &nbsp;&nbsp;
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
              </svg>
              下一題
            </b-button>
        </div>
      </div>
      <!--<AnswerProgress v-if="isCreated"  :answers="newAnswerModelList" @numChanged="changeNumber" />-->
      <b-modal v-model="modalShow"  hide-footer>
        <p>
          <AnswerProgress v-if="isCreated"  :answers="newAnswerModelList" @numChanged="changeNumber" />
        </p>
      </b-modal>
    </div>
  </div>
</template>
  
  <script lang="ts">
  import { defineComponent , PropType  } from "vue";
  import { AnswerGroupRespondModel } from '@/apis/models/GetAnswerGroupModel';
  import AnswerView from '@/components/QuizView/AnswerView.vue';
  import AnswerProgress from '@/components/QuizView/AnswerProgress.vue';
  import axios from 'axios';
  import { Answer , AnswerSubmitFormatModel } from '@/models/AnswerModel';
  import AnswerGroupApi from '@/apis/AnswerGroupApi';
  //import { QuizTemplateModel } from '@api/models/QuizModel';
  //import ClickArea from '@/components/QuizView/ClickArea.vue';

  export default defineComponent({
    name: 'AnswerGroupView',
    components: {
        AnswerView,
        AnswerProgress,
    },
    props: {
    },
    data() {
      return {
        originalQuizInstance: null as unknown as AnswerGroupRespondModel,
        quizData: [] as unknown[],
        amount: 0,
        newAnswerModelList: new Array<Answer>(),
        currentAnsweModel : {}  as Answer,
        currentIndex : 0,
        isCreated : false ,
        beClickCurrent : [] as Array<boolean>,
        modalShow: false,
        isAllSelected: false,
      };
    },
    computed: {
       
    },
    methods: {
      listBtn() {
        this.modalShow = true;
      },
      previousBtn(){
        let changeIndex = this.currentIndex;
        changeIndex = changeIndex -1
        this.changeNumber( changeIndex )
      },
      nextBtn(){
        let changeIndex = this.currentIndex;
        changeIndex = changeIndex +1
        this.changeNumber( changeIndex )
      },
      changeNumber(changeIndex : number) {
        if( changeIndex  >= this.amount){
          alert( "以超過總題數數量" )
        }else if(changeIndex < 0){
          alert( "以超過總題數數量" )
        }
        else{
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
      checkIsAllSelected() {
        let allSelected = false; 
        let finish = 0;
        for(let i = 0 ; i < this.newAnswerModelList.length ; i++){
            if( this.newAnswerModelList[i].checkSignleQuestion() ){
              finish = finish + 1;
            }
        }
        if(finish == this.amount){
          allSelected = true;
        }
        this.isAllSelected = allSelected;
      },
      async submitAnswer() {
        let submitAnswerFormatList = new Array<AnswerSubmitFormatModel>();
        for(let i = 0 ; i < this.newAnswerModelList.length ; i++ ){
          submitAnswerFormatList.push( this.newAnswerModelList[i].getSubmitFormat() );
        }
        const answerSubmitFormatSet = Answer.getSubmitJson( submitAnswerFormatList );
        let res = await AnswerGroupApi.save("cbdjq" , answerSubmitFormatSet );
        console.log(res)
        this.$router.push( { path: '/AnswerResult' } )
      },
    },
    watch: {
      currentAnsweModel : {
        handler : function() {
          this.checkIsAllSelected()
        },
        deep: true,
      }
    },
    async created() {
      //AnswerGroupApi.create( "554dfd1d-20ba-4cc2-a975-406aac08c623" );
      const instance  = await axios.get(process.env.VUE_APP_BASE_API_URL + '/answer-group/anwser-web?entranceCode=cbdjq') //as AnswerGroupRespondModel
      console.log( instance.data.amount )
      const instanceData = instance.data;
      this.amount = instance.data.amount;
     
      const newAnswerList = instanceData.answerList as Array<any>;
      const newAnswerModelList = new Array<Answer>();
      
      for (let i = 0; i < instanceData.amount; i += 1) {
       const {
          userAnswer, sourceQuiz, uuid, timeSpent, multipleSelect, isBlankFill, blankFillAnswer
        } = newAnswerList[i];
        newAnswerModelList.push( new Answer(userAnswer, sourceQuiz, uuid, timeSpent, multipleSelect, isBlankFill, blankFillAnswer , 0) );
      }
      this.newAnswerModelList = newAnswerModelList;
      this.currentAnsweModel = newAnswerModelList[0];
      console.log("parent")
      this.changeQuizBeClickeds()
      this.checkIsAllSelected()
      this.isCreated = true
    },
  });
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
  .navbar-light{
    background-color: #4186ED;
    .bottom-btns{
      margin-top: 10px;
      margin-bottom: 10px;
      width: 95%;
      label{
        margin: 0;
      }
    }
  }
  .answer {
    margin-top: 10%;
  }
  .submitButton{
    margin-left: auto;
  }
  </style>