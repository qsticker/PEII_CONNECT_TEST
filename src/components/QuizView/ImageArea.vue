<template>
  <img :src="field.url" :style="{  'width': field.paddingX + '%' , 'border-radius': field.radius + 'px' }" />
</template>
  
<script lang="ts">
  import Vue , { defineComponent , PropType} from "vue";
  import { ImageField } from '@/apis/models/QuizModel';
  export default defineComponent({
    name: 'ImageArea',
    components: {
      //peiiNavbar,
    },
    props: {
        field: {
            type: Object  as PropType<ImageField>,
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