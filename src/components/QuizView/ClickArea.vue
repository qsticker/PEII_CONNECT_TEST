<template>
  <div class = "container">
    <div  @click="updateAnswers">
      <div v-if="interBeClick" class="ClickStage">

          <AudioArea v-if="localClickAreaModel.content.Audio.enabled" :audio="localClickAreaModel.content.Audio" />
          <TextArea v-if="localClickAreaModel.content.textField.enabled" class="text" :field="localClickAreaModel.content.textField" />
          <ImageArea v-if="localClickAreaModel.content.imageField.enabled" class="image" :field="localClickAreaModel.content.imageField"/> 
          <div class="highlight" />
      </div>

      <div v-else class="ClickStage" >
        <AudioArea v-if="localClickAreaModel.content.Audio.enabled" :audio="localClickAreaModel.content.Audio" />
        <TextArea v-if="localClickAreaModel.content.textField.enabled" class="text" :field="localClickAreaModel.content.textField" />
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
        beClicked : {
          type: Boolean,
          defualt: false,
        },
    },
    data() {
      return {
        localClickAreaModel : {} as ClickAreaModel ,
        interBeClick : false,
        //answerModel : {} as Answer
      };
    },
    watch: {
      clickAreaModel : function() {
          console.log( "watch" )
          
          this.localClickAreaModel = this.clickAreaModel
      },
    },
    computed: {
     
    },
    methods: {
      updateAnswers() {
          //require text field
          
          if( this.clickAreaModel.action.type == 'answer' ){
            this.interBeClick = !this.interBeClick;
            this.$emit('updateByParent', this.clickAreaModel.label );
          }
      }
    },
    created() {
      console.log( this.clickAreaModel.label )
      this.localClickAreaModel = this.clickAreaModel; 
      this.interBeClick = this.beClicked;
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
      width: 400px;
      border-radius: 10px;
      border-width: 10px;
      border-style: solid;
      border-color: blue;
      &:hover {
        // cursor: pointer;
        box-shadow: 0 0 11px rgba(33,33,33,.2);
      }
      .image {
          width : 300px;
      }
    }
        
        
    
     .highlight {
          
        position: absolute;
        top: 0;
        left: 0;
        width: 380px;
        height: 100%;
        z-index: 999;

        background-color: rgb(0 255 8 / 10%);
        //border-radius: 24px;
        //border-width: 1.3px;
        border-style: solid;
        border-color: green;
    }
  }
    
  </style>