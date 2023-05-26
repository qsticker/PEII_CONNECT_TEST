<template>
<vueper-slides bullets-outside :dragging-distance="50"  :autoplay=true :slideRatio="1/4">
  <vueper-slide
    v-for="(slide, i) in slides"
    :key="i"
    :image="slide.image"
    :title="slide.title"
    :content="slide.content" />
</vueper-slides>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
export default {
  name: 'SlideShow',
  components: { VueperSlides, VueperSlide },
  data() {
    return {
      slides: [
                {
                    image: require('@/assets/03.jpg'),
                },
                {
                    image: require('@/assets/04.jpg'),
   
                }
            ]
    }
  },
}
</script>

