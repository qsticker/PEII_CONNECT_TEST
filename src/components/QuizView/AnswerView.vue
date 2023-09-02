<template>
  <div class= "root" >
    <div  v-for="( clickArea ,index ) in subAnswerModel.clickAreas"  
      :key="index" :class="[clickArea.content.imageField.enabled ? 'ClickAreaList-with-image' : 'ClickAreaList']">
      <ClickArea  v-if="checkBlockExist(clickArea)" :clickAreaModel="clickArea" :beClicked="localBeClickeds[index]" :currentIndex="subCurrentIndex" 
      :blankFillAnswer="subAnswerModel.blankFillAnswer"
      :isBlankFill="subAnswerModel.isBlankFill"
      :labelIndex="getAreaIndex( clickArea.label )"
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
    // filteredClickAreas() {
    //   // 使用 filter 函数来过滤 subAnswerModel.clickAreas 数组
    //   return this.subAnswerModel.clickAreas.filter(item => {
    //     // 根据条件判断是否要包含该项
    //     return item.content.textField.enabled && item.content.imageField.enabled;
    //   });
    // }
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
.root{
  // display: inline-block;
  // width: 100%; /* 2x2 grid, so each item takes 50% width */
  // box-sizing: border-box;
  // padding: 10px;
  // text-align: left;
  // box-sizing: border-box;

  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: center;
  padding: 2%;
  .ClickAreaList-with-image {
    // display: inline-block;
    // flex: 0 0 calc(40% - 10px);
    // align-items: stretch;
    // width: 40%; /* 2x2 grid, so each item takes 50% width */
    // box-sizing: content-box;
    // padding: 0px;
    // margin:10px;

    flex: 0 0 calc(40% - 10px); /* 一格格方格，可根据需要调整宽度 */
    margin-right: 10px; 
    margin-bottom: 10px; 
    margin-top: 20px;
    // padding: 10px; /* 格子内的填充，可以根据需要调整 */
    // text-align: left; 

  }
}

</style>