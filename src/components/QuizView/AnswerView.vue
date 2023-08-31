<template>
  <div class= "root">
    <div  v-for="( clickArea ,index ) in subAnswerModel.clickAreas" :key="index" :class="[clickArea.content.imageField.enabled ? 'ClickAreaList-with-image' : 'ClickAreaList']"> <!--class="ClickAreaList"-->
      <ClickArea  :clickAreaModel="clickArea" :beClicked="localBeClickeds[index]" :currentIndex="subCurrentIndex" 
      :blankFillAnswer="subAnswerModel.blankFillAnswer"
      :isBlankFill="subAnswerModel.isBlankFill"
      :labelIndex="getAreaIndex( clickArea.label )"
      @updateByParent="updateAnswers" 
      @updateBlankAnswer="updateBlankAnswer"/>
      <!-- <ClickImgArea v-else :clickAreaModel="clickArea" :beClicked="localBeClickeds[index]" :currentIndex="subCurrentIndex" 
      :blankFillAnswer="subAnswerModel.blankFillAnswer"
      :isBlankFill="subAnswerModel.isBlankFill"
      :labelIndex="getAreaIndex( clickArea.label )"
      @updateByParent="updateAnswers" 
      @updateBlankAnswer="updateBlankAnswer"/> -->
    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent , PropType  } from "vue";
import { Answer } from '@/models/AnswerModel';
import ClickArea from '@/components/QuizView/ClickArea.vue';
import isEqual from "lodash.isequal";
import { ClickAreaModel } from '@/models/QuizModel';
export default defineComponent({
  name: 'AnswerView',
  components: {
      ClickArea,
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
    getAreaIndex(label : string){
      // console.log(label + ' label!!!!!!!!!');
      if( !isEqual(label , "Title") ){
        let index = 0 ;
        for( let i = 0 ; i < this.subAnswerModel.clickAreas.length ; i++){
          if( !isEqual( this.subAnswerModel.clickAreas[i].label , "Title") ){
            if( this.checkBlockExist( this.subAnswerModel.clickAreas[i] ) ){
              index = index + 1;
            }
          }
          if( isEqual( this.subAnswerModel.clickAreas[i].label , label) ){
            return index - 1 ;
          }
        }
      }
    },
    checkBlockExist(clickArea : ClickAreaModel){
      if( clickArea.content.Audio.enabled ){
          return true;
        }else if( clickArea.content.textField.enabled ){
          return true;
        }else if( clickArea.content.imageField.enabled ){
          return true;
        }
        return false;
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
// .ClickAreaList{
//   display: grid;
//   width: 80%;
//   height: 600px;
//   /* 如同border，但不會占空間 */
//   outline: 5px solid #252a34;
//   /* 代表我設置一個 4x4 的格線，且各行列都佔1/4 */
//   grid-template-columns: 25% 25% 25% 25%;
//   grid-template-rows: 25% 25% 25% 25%;
//   /* 格線間的間距，如同bs的now-gutter */
// 	grid-gap: 10px;
// }
.root{
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  // background : blue;
  justify-content: center;
  .ClickAreaList-with-image {
    flex: 0 0 20%;
    margin-left: 2.5%;
    margin-top: 2.5%;
    font-size: 25px;
    // box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    // display: inline-block;
    // // display: flex;
    // // flex-wrap: nowrap;
    // align-items: stretch;
    // width: 26%; /* 2x2 grid, so each item takes 50% width */
    // box-sizing: content-box;
    // padding: 0px;
    // // border:1px solid black;
    // margin:10px;

  }
}

</style>