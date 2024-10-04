<template>
  <div class="relative aspect-4/3 overflow-hidden">
    <svg class="absolute left-1/2 top-1/2 -ml-3 -mt-3 animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <div class="swiper bg-white" ref="swiperRef">
      <div class="swiper-wrapper">
        <!-- Slides -->
        <div class="swiper-slide" v-for="speaker in speakers" :key="speaker.index">
          <img :src="`${app.baseURL}${speaker.image}`" :alt="speaker.name">
          <div
            class="absolute w-full left-0 bottom-0 text-white px-3 py-2 font-medium
            bg-gradient-to-b from-black/0 to-black/90"
          >
            <span class="text-base font-normal">講師</span> {{ speaker.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue';

import Swiper from 'swiper';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css/bundle';

import useClientConfig from '../composables/useClientConfig'

const { app } = useRuntimeConfig()

const { isDev } = useClientConfig()

export default {
  props: {
    speakers: {
      type: Array,
    },
  },

  setup() {

    const swiperRef = ref(null);

    let swiper = null;
    const active = ref(0)

    onMounted(() => {
      swiper = new Swiper(swiperRef.value, {
        modules: [EffectFade, Autoplay],
        effect: 'fade',
        // loop: true,
        // loopAdditionalSlides: 10,
        autoplay: {
          delay: 5000,
        },
      });
    })

    onUnmounted(() => {
      swiper.destroy();
    })

    return {
      app,
      active,
      isDev,
      swiperRef,
    }
  }
}
</script>
