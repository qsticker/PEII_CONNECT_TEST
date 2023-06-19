<template>
    <audio  controls>
        <source :src="audio.url" type="audio/mpeg">
    </audio>
</template>
  
<script lang="ts">
  import Vue , { defineComponent , PropType} from "vue";
  import { Audio } from '@/models/QuizModel';
  export default defineComponent({
    name: 'AudioArea',
    components: {
      //peiiNavbar,
    },
    props: {
        audio: {
            type: Object  as PropType<Audio>,
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