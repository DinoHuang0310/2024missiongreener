<template>
  <div class="relative bg-white sm:bg-bgsecondary overflow-hidden">
    <div
      class="pb-[105%] sm:pb-[60%] xl:pb-[45%] 2xl:pb-[35%] 
      bg-no-repeat bg-[length:100%] sm:bg-cover bg-bgsecondary sm:bg-bgcolor bg-right-bottom sm:bg-right"
      :style="{'background-image': `url('${isMobile ? backdropM : backdrop}')`}"
      ref="bgRef"
    />
    
    <div class="container sm:w-11/12 pb-16 sm:pb-32 bg-white sm:bg-white/0">
      <div>
        <ContentBox
          class="relative p-4 sm:p-6 md:p-8 2xl:py-12 sm:-mt-[18%] sm:shadow-lg"
          classes="rounded-none"
        >
          <img
            v-if="!isMobile"
            class="sm:block absolute -top-1 -right-1 w-[45%] sm:w-1/4 md:w-auto -scale-x-100"
            src="../assets/images/adornment-banner.png"
            alt="adornment-banner"
          >
          <div class="absolute w-11/12 sm:w-full 2xl:w-[110%] top-0 left-1/2 
          -translate-x-1/2 -translate-y-[70%] md:-translate-y-[80%] lg:-translate-y-[88%] sm:pl-[2%]">
            <div
              class="absolute w-11/12 sm:w-[55%] top-0 left-1/2 sm:left-auto sm:right-0
              -translate-x-1/2 sm:-translate-x-[5%] -translate-y-full sm:translate-y-1/5 -mt-4 xl:mt-0"
            >
              <img :src="`${publicPath}static/images/event-title.png`" alt="2024自綠生活節" ref="titleRef">
            </div>
            <div class="relative w-[65%] sm:w-[40%] mx-auto sm:ml-0">
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
              class="relative w-[65%] sm:w-[40%] mx-auto sm:ml-0"
              src="../assets/images/lecture.png"
              alt="綠生活講座"
            > -->
          </div>
          
          <div>
            <div class="text-center mb-8">
              <h1 class="mt-1/5 sm:mt-[10%] mb-4 xl:mb-8">
                <img
                  class="mx-auto inline-block scale-[0.65] sm:scale-100"
                  src="../assets/images/lecture-title.png"
                  alt="沙龍講座"
                >
              </h1>
              <p>不確定如何開始你的自綠生活？一起做就對了！</p>
              <p>手作課程、講座分享、兒童劇團演出，</p>
              <p>我們陪你一起邁出屬於你的自綠第一步！</p>
            </div>

            <ul class="flex flex-wrap">
              <li
                v-for="(list, index) in lectures"
                :key="index"
                class="w-1/2 sm:w-1/3 p-1 mb-3 sm:mb-0 sm:p-2 md:p-3 lg:p-4 xl:p-5"
              >
                <div class="rounded-lg sm:rounded-xl border overflow-hidden shadow-md sm:shadow-lg bg-white">
                  <SpeakerSlider v-if="list.speakers.length > 1" :speakers="list.speakers" />
                  <div v-else class="relative aspect-4/3 overflow-hidden">
                    <svg class="absolute left-1/2 top-1/2 -ml-3 -mt-3 animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <img
                      class="relative w-full bg-white"
                      :src="`${app.baseURL}${list.speakers[0].image}`"
                      :alt="list.speakers[0].name"
                      loading="lazy"
                    >
                    <div
                      class="absolute w-full left-0 bottom-0 text-white px-3 py-2 font-medium
                      bg-gradient-to-b from-black/0 to-black/90"
                    >
                      <span class="text-base font-normal">講師</span> {{ list.speakers[0].name }}
                    </div>
                  </div>
                  
                  <div class="pb-4 px-2 sm:px-3 min-h-[5rem]">
                    <h3 class="text-lg xl:text-xl font-bold mt-2 mb-1 leading-tight line-clamp-2">
                      {{ list.lecture }}
                    </h3>
                    <p class="text-lg xl:text-xl leading-tight line-clamp-2 opacity-70">
                      {{ list.time }}
                    </p>
                    <button
                      class="w-full bg-primary text-white sm:text-lg rounded-md py-1 sm:py-2 mt-3 sm:mt-4 
                      outline-none opacity-100 hover:md:opacity-60 transform duration-500"
                      @click="handleClick(index)"
                    >了解更多</button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </ContentBox>

        <!-- <Signup /> -->
      </div>
    </div>

    <!-- popup -->
    <VueFinalModal
      v-model="showModal"
      class="flex justify-center items-center"
      content-class="flex flex-col max-w-lg max-h-[70vh] sm:max-h-[80vh] w-full
      md:max-h-[70vh] overflow-auto m-4 p-4 pt-0 bg-white border rounded-lg"
    >
      <div class="flex justify-between items-start bg-white sticky top-0 py-4 z-10">
        <div class="flex-1 text-2xl sm:text-2xl font-bold pr-4">{{ activeData.lecture }}</div>
        <button class="relative w-10 h-10" @click="showModal = !showModal">
          <div class="absolute left-0 w-10 rotate-45 border-gray-500 border-b" />
          <div class="absolute left-0 w-10 -rotate-45 border-gray-500 border-b" />
        </button>
      </div>
      
      <div class="mb-8" v-for="(list, index) in activeData.speakers" :key="list.index">
        <hr v-if="index != 0" class="mb-8" />
        <div class="w-1/2 sm:w-[40%] mx-auto">
          <div class="relative pb-[100%]">
            <img
              class="absolute w-full h-full object-cover rounded-full"
              :src="`${app.baseURL}${list.image}`"
              :alt="`講師: ${list.name}`"
            >
          </div>
        </div>
        <div class="my-2">
          <div class="text-2xl text-center font-bold">{{ list.name }}</div>
          <div class="text-center text-primary font-medium mb-2 w-3/4 mx-auto">{{ list.title }}</div>
          <p v-html="list.description" />
        </div>
      </div>
      
    </VueFinalModal>
  </div>
</template>

<script setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { VueFinalModal } from 'vue-final-modal'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

import ContentBox from '../layouts/ContentBox.vue'
import SpeakerSlider from '../components/SpeakerSlider.vue'
// import Signup from '../components/lecturePage/Signup.vue'

import useSpeakers from '../composables/useSpeakers'
import useClientSize from '../composables/useClientSize'
import useClientConfig from '../composables/useClientConfig'
import useScrollTo from '../composables/useScrollTo'

const { app } = useRuntimeConfig()
const { publicPath } = useClientConfig()

gsap.registerPlugin(ScrollTrigger);
const titleRef = ref(null)
const bgRef = ref(null)

const showModal = ref(false)
const active = ref(null)
const activeData = computed(() => {
  return lectures.value[active.value]
})

const { height, isMobile } = useClientSize()
const backdrop = new URL(`../assets/images/lecture-backdrop.svg`, import.meta.url).href
const backdropM = new URL(`../assets/images/lecture-backdrop-m.svg`, import.meta.url).href

const { getSpeakers, lectures } = useSpeakers()
getSpeakers()

const handleClick = (index) => {
  active.value = index
  showModal.value = true
}

const scrollToSignup = () => {
  useScrollTo(document.getElementById('signup').offsetTop)
}

onMounted(() => {
  gsap.fromTo(bgRef.value, {
    y: 0,
  },
  {
    y: height.value * 0.7,
    scrollTrigger: {
      start: 0,
      end: `${height.value * 2}`,
      scrub: 0,
    },
  });
})

</script>
