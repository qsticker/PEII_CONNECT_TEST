<template>
  <p :style="{'text-align': 'LEFT' ,'font-size': '20px' , 'width':   '98%', 'margin-top':'10px' }" > {{ field.text }}</p>
</template>
  
<script lang="ts">
  import Vue , { defineComponent , PropType} from "vue";
  import { TextField } from '@/models/QuizModel';
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
    },
    data() {
      return {
      };
    },
    computed: {
      
    },
    methods: {

    },
  });
  </script>
<style lang="scss" scoped>
</style>