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
    },
    data() {
      return {
      };
    },
    computed: {
      
    },
    methods: {
      getLabel(){
        if(!this.isBlankFill){
          if( !isEqual( this.label , "Title" ) ){
            return "( " + this.label + " )"; 
          }
        }
      }
    },
  });
  </script>
<style lang="scss" scoped>
</style>