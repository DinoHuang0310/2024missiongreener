<template>
  <div class="relative overflow-hidden">
    <div
      class="relative pb-1/5 sm:pb-[45%] bg-right-bottom bg-no-repeat bg-contain sm:bg-cover sm:bg-center"
      :style="{'background-image': `url('${isMobile ? exhibitionBgM : exhibitionBg}')`}"
    >
      <div :class="areaBox" class="sm:top-1/2 sm:-translate-y-1/2 sm:right-1/2 sm:mt-[3%] sm:text-right">
        <img
          class="inline-block sm:mb-4 scale-[0.65] sm:scale-100"
          src="../../assets/images/exhibition-title.png"
          alt="主題特展"
          loading="lazy"
        >
        <p class="mb-5">自綠行動，從小事做起<br>每一個小小的改變，都能為地球帶來大大的影響！</p>
        <NuxtLink class="btn text-xl" to="/exhibition">了解更多</NuxtLink>
      </div>
      <div
        :class="setMainImg"
        class="w-[80%] sm:absolute sm:w-[33%] sm:bottom-0 sm:-translate-y-[30%] sm:right-[14%]"
      >
        <div class="relative pb-[67.8%]">
          <DotLottieVue
            class="absolute w-full h-full left-0 top-0"
            autoplay
            loop
            :src="`${publicPath}static/data/animations/exhibition.json`"
          />
        </div>
      </div>
      
      <!-- <img
        :class="setMainImg"
        class="w-[80%] sm:absolute sm:w-[32%] sm:bottom-0 sm:-translate-y-[30%] sm:right-[14%]"
        src="../../assets/images/exhibition.png"
        alt=""
        loading="lazy"
      /> -->
    </div>

    <div
      class="absolute w-full pb-[7.1875%] top-0 left-0 bg-bottom bg-full"
      :style="{'background-image': `url('${bgImage}')`}"
    ></div>

    <div
      class="relative pb-1/5 sm:pb-[37.5%] bg-left-bottom bg-no-repeat bg-contain sm:bg-cover sm:bg-center"
      :style="{'background-image': `url('${isMobile ? marketBgM : marketBg}')`}"
    >
      <div
        :class="areaBox"
        class="sm:top-1/3 sm:right-0 sm:-translate-y-1/2 lg:right-[5%] xl:right-[8%] 2xl:right-[12%] 2xl:translate-y-0 sm:text-right"
      >
        <img
          class="inline-block sm:mb-4 scale-[0.65] sm:scale-100"
          src="../../assets/images/market-title.png"
          alt="自綠商店街"
          loading="lazy"
        >
        <p class="mb-5">為你想要的未來買單<br>逛逛自綠商店街，來趟綠色消費之旅！</p>
        <NuxtLink v-if="showMarket" class="btn text-xl" to="/market">了解更多</NuxtLink>
        <span v-else class="btn text-xl opacity-50">敬請期待</span>
      </div>
      <div
        :class="setMainImg"
        class="w-[70%] sm:absolute sm:w-[26%] sm:bottom-0 sm:-translate-y-[10%] sm:left-[40%] md:left-[48%]"
      >
        <div class="relative pb-[95%]">
          <DotLottieVue
            class="absolute w-full h-full left-0 top-0"
            autoplay
            loop
            :src="`${publicPath}static/data/animations/market.json`"
          />
        </div>
      </div>
      <!-- <img
        :class="setMainImg"
        class="w-[70%] sm:absolute sm:w-[26%] sm:bottom-0 sm:-translate-y-[10%] sm:left-[40%] md:left-[48%]"
        src="../../assets/images/market.png"
        alt=""
        loading="lazy"
      /> -->
    </div>

    <div
      class="relative pb-1/5 sm:pb-[37.5%] bg-right-bottom bg-no-repeat bg-contain sm:bg-cover sm:bg-center"
      :style="{'background-image': `url('${isMobile ? lectureBgM : lectureBg}')`}"
    >
      <div :class="areaBox" class="sm:top-1/2 sm:-translate-y-1/2 sm:left-[37%] sm:text-left">
        <img
          class="inline-block sm:mb-4 scale-[0.65] sm:scale-100"
          src="../../assets/images/lecture-title.png"
          alt="沙龍講座"
          loading="lazy"
        >
        <p class="mb-5">想要實踐自綠卻不知道如何起步？<br>從手作小物、視覺影象、經驗分享<br>打造屬於你的自綠行動</p>
        <NuxtLink class="btn text-xl" to="/lecture">了解更多</NuxtLink>
      </div>
      <div
        :class="setMainImg"
        class="w-[70%] sm:absolute sm:w-[29%] sm:bottom-0 sm:-translate-y-[15%] sm:left-[5%]"
      >
        <div class="relative pb-[95.7%]">
          <DotLottieVue
            class="absolute w-full h-full left-0 top-0"
            autoplay
            loop
            :src="`${publicPath}static/data/animations/lecture.json`"
          />
        </div>
      </div>
      <!-- <img
        :class="setMainImg"
        class="w-[70%] sm:absolute sm:w-[29%] sm:bottom-0 sm:-translate-y-[15%] sm:left-[5%]"
        src="../../assets/images/lecture.png"
        alt=""
        loading="lazy"
      /> -->
    </div>

  </div>
</template>

<script setup>
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

import useSpeakers from '../../composables/useSpeakers'
import useClientSize from '../../composables/useClientSize'
import useClientConfig from '../../composables/useClientConfig'

const props = defineProps({
  showMarket: {
    type: Boolean,
  },
})

const { isMobile } = useClientSize()
const { publicPath } = useClientConfig()

const bgImage = new URL(`../../assets/images/adornment-backdrop.svg`, import.meta.url).href

const exhibitionBg = new URL(`../../assets/images/exhibition-backdrop.svg`, import.meta.url).href
const exhibitionBgM = new URL(`../../assets/images/exhibition-backdrop-m.svg`, import.meta.url).href

const marketBg = new URL(`../../assets/images/market-backdrop.svg`, import.meta.url).href
const marketBgM = new URL(`../../assets/images/market-backdrop-m.svg`, import.meta.url).href

const lectureBg = new URL(`../../assets/images/lecture-backdrop.svg`, import.meta.url).href
const lectureBgM = new URL(`../../assets/images/lecture-backdrop-m.svg`, import.meta.url).href

const exhibitionRef = ref(null)
const exhibitionImg = ref(null)

const areaBox = computed(() => (
  `w-11/12 sm:w-auto mx-auto pt-[20%] sm:pt-0 text-center 
  sm:absolute sm:scale-75 lg:scale-90 xl:scale-100`
))

const setMainImg = computed(() => (
  `mx-auto translate-y-[13%]`
))

const { speakers, getSpeakers, lectures } = useSpeakers()

const dateLectures = computed(() => {
  return [
    lectures.value.filter(i => i.time.includes('9/16')),
    lectures.value.filter(i => i.time.includes('9/17')),
  ]
})

onMounted(getSpeakers)

</script>