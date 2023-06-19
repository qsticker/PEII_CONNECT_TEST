<template>
  <p :style="{ 'font-size': field.size + 'px' , 'width':  field.paddingX + '%' }" > {{ field.text }}</p>
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