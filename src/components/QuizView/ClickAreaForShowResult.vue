<template>
    <div class = "container">
      <div >
        <div v-if="checkBlockExist()" class="ClickStage">
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
          currentIndex : {
            type: Number ,
            defualt: true,
          },
          beClicked : {
            type: Boolean,
            defualt: false,
          },
      },
      data() {
        return {
          localClickAreaModel : {} as ClickAreaModel ,
        };
      },
      watch: {
        clickAreaModel : function() {
            this.localClickAreaModel = this.clickAreaModel
        },
        currentIndex : function() {
          
          console.log(this.clickAreaModel.label)
          console.log("hi")
        },
      },
      computed: {
       
      },
      methods: {
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
        console.log( this.clickAreaModel.label )
        this.localClickAreaModel = this.clickAreaModel; 
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
        width: 90vw;
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
    }
    </style>