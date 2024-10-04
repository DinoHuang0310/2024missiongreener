<template>
  <div class="bg-bgsecondary py-16 sm:py-24">
    <div class="w-11/12 mx-auto">
      <h2 class="mb-8 sm:mb-16">
        <img
          class="scale-[0.65] sm:scale-75 xl:scale-100 mx-auto"
          src="../../assets/images/news-title.png"
          alt="自綠最前線"
          loading="lazy"
        >
      </h2>
      
      <BtSlider :sliderData="news" :showNavigation="true" />
    </div>
  </div>
</template>

<script setup>
import BtSlider from '../BtSlider.vue'

const props = defineProps({
  news: {
    type: Array,
    default: []
  },
})

</script>
