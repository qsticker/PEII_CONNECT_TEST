<template>
  <div class = "container">
    <div class="ClickStage">
      <AudioArea :audio="readFakeAudio" />
      <TextArea class="text" :field="readFakequizText" />
      <!--<img src="https://peiiquizs.s3.ap-northeast-1.amazonaws.com/quizImage/fortest" />-->
      <ImageArea class="image" :field="readFakeImage"/>  
      
    </div>
  </div>
</template>
  
  <script lang="ts">
  import { defineComponent  } from "vue";
  import { TextField , ImageField , Audio } from '@/apis/models/QuizModel';
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

    data() {
      return {
        showImage : false,
        showText : false,
        imgurl: "",

        //imageRatio: 500/imageWidth
      };
    },
    computed: {
      readFakequizText(): TextField{
          const textField : TextField = {
            enabled: true,
            paddingX: 80,
            paddingY: 100,
            size: 10,
            text: "Course Timetable \nStandard Course	Mon－Fri	20 lessons	9:30-12:30 \nIntensive Course	Mon－Fri	20 lessons	9:30-12:30 \n		20 lessons	13:30-14:30 \nEvaluation\nStudent are placed into classes according to their current language skills. The majority of them take on online language test before starting their programme. However, if this is not available, \nstudents sit the exam on the first Monday of their course.\nLearning materials are provided to students throughout their course, and there will never be more than 15 participants in each class.\nArrivals and Transfer\nOur programme offers the full package—students are take good care of from the start through to the very end. They are collected from the airport upon arrival and brought\nto their accommodation in comfort. Werequire the student's full details at least 4 weeks in advance.\nMeals/Allergies(过敏)/Special Dietary Requirements\nStudents are provided with breakfast\ndinner and either a cooked or packed lunch (which consists of a sandwich, a drink and adessert). Snacks outside of meal times may be purchased by the student individually.\nWe ask that you let us know of any allergies or dietary requirements as well as information about any medicines you take. Depending on the type of allergies and/ or dietary requirements, an extra charge may be made\nfor providing special food."
          }
        return textField;
      },
      readFakeImage(): ImageField{
        const imageField : ImageField = {
            enabled: true,
            paddingX: 90,
            paddingY: 100,
            size: 0,
            radius: 10,
            url: "https://peiiquizs.s3.ap-northeast-1.amazonaws.com/quizImage/fortest",
        }
        return imageField;
      },
      readFakeAudio(): Audio{
        const audio : Audio = {
            enabled: true,
            url: "https://storage.googleapis.com/quiz-storage/audios/eUjj6XtzWLwHa5U.m4a",
        }
        return audio;
      },
    },
    methods: {
      
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
        top: 50%;  
        left: 50%;
        width: 350px;
        border-radius: 5%;
        border-style:  solid;
        border-width: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        //background : blue;
        //.text {
        //  background: blue;
        //}
        .image {
          width : 300px;
        }
    }
  }
    
  </style>