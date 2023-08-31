<template>
  <p :style="{'text-align': 'LEFT' ,'font-size': '20px' , 'width':   '98%', 'margin-top':'10px' }" > {{ getLabel() }} {{ field.text }}</p>
</template>
  
<script lang="ts">
  import Vue , { defineComponent , PropType} from "vue";
  import { TextField } from '@/models/QuizModel';
  import isEqual from 'lodash.isequal';

  export default defineComponent({
    name: 'TextArea',
    components: {
      //peiiNavbar,
    },
    props: {
        field: {
            type: Object  as PropType<TextField>,
            required: false,
            default: null,
        },
        label: {
            type: String,
            required: false,
            default: null,
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
      };
    },
    computed: {
      
    },
    methods: {
      getLabel(){
        let labels = [ "A" , "B" , "C" , "D" , "E"]
        // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ' + this.label);
        // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ' + this.isBlankFill);
        if(!this.isBlankFill){ 
          // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ' + this.label);
          if( !isEqual( this.label , "Title" ) ){
            // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ' + this.label);
            return "( " + labels[this.labelIndex] + " )"; 
          }
        }
      }
    },
  });
  </script>
<style lang="scss" scoped>
</style>