<template>
  <div :class="[localClickAreaModel.content.imageField.enabled ? 'container-with-image' : 'container']">
    <div v-if="localClickAreaModel.content.blankField.enabled" >
      <div class="ClickStage">
        <AudioArea v-if="localClickAreaModel.content.Audio.enabled" :audio="localClickAreaModel.content.Audio" />
        <TextArea v-if="localClickAreaModel.content.textField.enabled" 
        class="text" :field="localClickAreaModel.content.textField" 
        :label="localClickAreaModel.label" 
        :labelIndex="labelIndex"
        :isBlankFill="isBlankFill" />
        <ImageArea v-if="localClickAreaModel.content.imageField.enabled" class="img" :field="localClickAreaModel.content.imageField"/> 
        <input :value="blankUserAnswer" @input="$emit('updateBlankAnswer', localClickAreaModel.label , $event.target.value)">
      </div>
    </div>

    <div v-else  @click="updateAnswers">
        <div v-if="interBeClick && checkBlockExist()" :class="[localClickAreaModel.content.imageField.enabled ? 'ClickStage-with-image' : 'ClickStage']">
            <AudioArea v-if="localClickAreaModel.content.Audio.enabled" :audio="localClickAreaModel.content.Audio" />
            <TextArea 
            class="text" :field="localClickAreaModel.content.textField" 
            :label="localClickAreaModel.label" 
            :labelIndex="labelIndex"
            :isBlankFill="isBlankFill"/>
            <ImageArea v-if="localClickAreaModel.content.imageField.enabled" 
            class="image" :field="localClickAreaModel.content.imageField"/> 
            <div class="highlight" />
        </div>

        <div v-else-if="checkBlockExist()" :class="[localClickAreaModel.content.imageField.enabled ? 'ClickStage-with-image' : 'ClickStage']" >
          <AudioArea v-if="localClickAreaModel.content.Audio.enabled" :audio="localClickAreaModel.content.Audio" />
          <TextArea 
          class="text" :field="localClickAreaModel.content.textField" 
          :label="localClickAreaModel.label" 
          :labelIndex="labelIndex"
          :isBlankFill="isBlankFill"/>
          <ImageArea v-if="localClickAreaModel.content.imageField.enabled" class="image" :field="localClickAreaModel.content.imageField"/> 
        </div>
        
    </div> 
  </div>
</template>
  
  <script lang="ts">
  import { defineComponent , PropType } from "vue";
  import { ClickAreaModel } from '@/models/QuizModel';
  import TextArea from '@/components/QuizView/TextArea.vue';
  import ImageArea from '@/components/QuizView/ImageArea.vue';
  import AudioArea from '@/components/QuizView/AudioArea.vue';
  // import BootstrapVue from "bootstrap-vue";
  export default defineComponent({
    name: 'ClickArea',
    components: {
      TextArea,
      ImageArea,
      AudioArea,
    },
    props: {
        clickAreaModel : {
            type: Object  as PropType<ClickAreaModel>,
            required: false,
            default: null,
        },
        currentIndex : {
          type: Number ,
          defualt: true,
        },
        beClicked : {
          type: Boolean,
          defualt: false,
        },
        blankFillAnswer : {
          type : Object,
          defualt : false,
        },
        isBlankFill : {
            type: Boolean,
            required: false,
            default: null,
        },
        labelIndex : {
            type: Number,
            required: false,
            default: null,
        },
    },
    data() {
      return {
        localClickAreaModel : {} as ClickAreaModel ,
        interBeClick : this.beClicked,
        blankUserAnswer : "",
      };
    },
    watch: {
      clickAreaModel : function() {
          this.localClickAreaModel = this.clickAreaModel
      },
      currentIndex : function() {
        this.interBeClick = this.beClicked
        if( this.blankFillAnswer != undefined ){
          this.blankUserAnswer = this.blankFillAnswer[this.clickAreaModel.label]
        }
      },
    },
    computed: {
     
    },
    methods: {
      updateAnswers() {
          //require text field
          
          if( this.clickAreaModel.action.type == 'answer' ){
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ' + this.clickAreaModel.content.textField.enabled);
            this.interBeClick = !this.interBeClick;
            this.$emit('updateByParent', this.clickAreaModel.label );
            
          }
      },
      checkBlockExist(){
        if( this.localClickAreaModel.content.Audio.enabled ){
          return true;
        }else if( this.localClickAreaModel.content.textField.enabled ){
          return true;
        }else if( this.localClickAreaModel.content.imageField.enabled ){
          return true;
        }
        return false;
      },
    },
    created() {
      //console.log( this.clickAreaModel.label )
      this.localClickAreaModel = this.clickAreaModel; 
      this.interBeClick = this.beClicked;
      
      if( this.localClickAreaModel.content.blankField.enabled ){
        if( this.blankFillAnswer != undefined ){
          const blankAnswerOfThisLabel = this.blankFillAnswer[this.clickAreaModel.label]
          if( blankAnswerOfThisLabel  != undefined){
            this.blankUserAnswer = blankAnswerOfThisLabel 
          }
        }
      }
    }
  });
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
  .container{
    display: flex;
    flex-direction: column;
    align-items: center;
    //background: red;
    .ClickStage{
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      position: relative;
      width: 95vw;
      border-radius: 10px;
      border-width: 1px; //改作答區虛線粗細
      border-style: dotted;
      border-color: rgb(0, 0, 0);
      &:hover {
        // cursor: pointer;
        box-shadow: 0 0 11px rgba(33,33,33,.2);
      }
      .image {
          width : 20px;
      }
    }   
    
    .highlight {
          
        position: absolute;
        top: 0;
        left: 0;
        width: 95vw;
        height: 100%;
        z-index: 999;

        background-color: rgb(0 255 8 / 10%);
        //border-radius: 24px;
        //border-width: 1.3px;
        border-style: solid;
        border-color: green;
    }
  }


.container-with-image{
    display: flex;
    margin-top: 5%;
    // display: inline-block;
    // // flex-direction: column;
    // align-items: center;
  .ClickStage-with-image{
    display: inline-block;
    // display: flex;
    // flex-wrap: nowrap;
    width: 100%; /* 2x2 grid, so each item takes 50% width */
    height: 100%;
    box-sizing: content-box;
    padding: 5px;
    margin:20px;
   
    position: relative;
    // margin-top: 10%;
    border-radius: 10px;
    border-width: 1px; //改作答區虛線粗細
    border-style: dotted;
    border-color: rgb(0, 0, 0);
    &:hover {
      // cursor: pointer;
      box-shadow: 0 0 11px rgba(33,33,33,.2);
    }
    .image {
        width : 100%;
    }
    .highlight {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      // z-index: 999;

      background-color: rgb(0 255 8 / 10%);
      //border-radius: 24px;
      //border-width: 1.3px;
      border-style: solid;
      border-color: green;
    }
  }    
}
  </style>