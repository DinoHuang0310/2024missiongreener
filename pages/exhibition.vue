<template>
  <div class="relative bg-white sm:bg-bgsecondary overflow-hidden">
    <div
      class="pb-[105%] sm:pb-[60%] xl:pb-[45%] 2xl:pb-[35%] bg-cover bg-bgsecondary sm:bg-bgcolor"
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
            class="sm:block absolute -top-1 -left-1 w-[45%] sm:w-1/4 md:w-auto"
            src="../assets/images/adornment-banner.png"
            alt="adornment-banner"
          >
          <div class="absolute w-11/12 sm:w-full xl:w-[104%] 2xl:w-[110%] top-0 left-1/2 -translate-x-1/2 -translate-y-[70%]">
            <div
              class="absolute w-11/12 sm:w-[55%] top-0 left-1/2 sm:left-0 
              -translate-x-1/2 sm:translate-x-0 -translate-y-full sm:-translate-y-1/5 -mt-4 xl:mt-0"
            >
              <img :src="`${publicPath}static/images/event-title.png`" alt="2024自綠生活節" ref="titleRef">
            </div>
            <div class="relative w-[85%] sm:w-1/2 mx-auto sm:mr-0">
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
              class="relative w-[85%] sm:w-1/2 mx-auto sm:mr-0"
              src="../assets/images/exhibition.png"
              alt="自綠行動"
            > -->
          </div>
          
          <div>
            <div class="text-center mb-8">
              <h1 class="mt-1/5 sm:mt-[10%] mb-4 xl:mb-8">
                <img
                  class="mx-auto inline-block scale-[0.65] sm:scale-100"
                  src="../assets/images/exhibition-title.png"
                  alt="主題特展"
                >
              </h1>
              <p>自綠行動，從小事做起</p>
              <p>每一個小小的改變，都能為地球帶來大大的影響！</p>
            </div>
            
            <ul class="flex flex-wrap">
              <li
                v-for="(list, index) in exhibition"
                :key="index"
                class="w-1/2 sm:w-1/3 p-1 mb-3 sm:mb-0 sm:p-2 md:p-3 lg:p-4 xl:p-5"
              >
                <div
                  class="rounded-lg sm:rounded-xl border overflow-hidden shadow-md 
                  sm:shadow-lg bg-white cursor-pointer group"
                  @click="handleClick(index)"
                >
                  <div class="relative aspect-4/3 overflow-hidden">
                    <svg class="absolute left-1/2 top-1/2 -ml-3 -mt-3 animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <img class="relative w-full bg-white" :src="`${app.baseURL}${list.image}`" :alt="list.title">
                    <div class="absolute w-full h-1/5 bg-gradient-to-b from-black/0 to-black/20 bottom-0 left-0" />
                    <div class="absolute w-full h-full top-0 left-0 flex justify-center 
                    items-center opacity-0 group-hover:md:opacity-100 transform duration-500 bg-black/70">
                      <div class="text-white text-sm xl:text-base border border-white px-4 py-2">了解更多</div>
                    </div>
                  </div>
                  
                  <div class="pb-4 px-2 sm:px-3 min-h-[5rem]">
                    <h3 class="text-lg xl:text-xl font-bold mt-2 mb-1 leading-tight line-clamp-2">{{ list.title }}</h3>
                    <p class="text-base xl:text-lg leading-tight line-clamp-2 opacity-70">{{ list.eventName }}</p>
                    <div v-if="list.tags.length" class="text-primary text-sm xl:text-base font-bold leading-tight">
                      <hr class="mt-2 mb-1">
                      {{ renderTagName(list.tags) }}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </ContentBox>
      </div>
    </div>

    <!-- popup -->
    <VueFinalModal
      v-model="showModal"
      class="flex justify-center items-center"
      content-class="flex flex-col max-w-lg max-h-[70vh] sm:max-h-[80vh] 
      md:max-h-[70vh] overflow-auto m-4 p-4 pt-0 bg-white border rounded-lg"
    >
      <div class="flex justify-between bg-white sticky top-0 py-4 pb-2">
        <div class="w-1/2 sm:w-2/5">
          <div
            class="pb-[20%] bg-contain bg-left bg-no-repeat"
            :style="{'background-image': `url('${app.baseURL}${activeData.logo}')`}"
            :alt="`${activeData.title}-logo`"
          />
        </div>
        
        <button class="relative w-10 h-10" @click="showModal = !showModal">
          <div class="absolute left-0 w-10 rotate-45 border-gray-500 border-b" />
          <div class="absolute left-0 w-10 -rotate-45 border-gray-500 border-b" />
        </button>
      </div>
      
      <img
        class="mb-4"
        :src="`${app.baseURL}${activeData.contentImage}`"
        :alt="activeData.title"
      >
      <div class="text-lg xl:text-xl font-bold pb-2 mb-4 border-b border-gray-400">
        {{ `${activeData.title}${activeData.eventName && ' | ' + activeData.eventName}` }}
      </div>

      <div class="space-y-3">
        <article v-if="activeData.content.org">
          <h4 class="mb-1">
            <span class="inline-block bg-primary text-white px-2 py-1 rounded">品牌介紹</span>
          </h4>
          <div v-html="activeData.content.org"></div>
        </article>

        <article v-if="activeData.content.missiongreener">
          <h4 class="mb-1">
            <span class="inline-block bg-primary text-white px-2 py-1 rounded">自綠宣言</span>
          </h4>
          <div v-html="activeData.content.missiongreener"></div>
        </article>

        <article v-if="activeData.content.event">
          <h4 class="mb-1">
            <span class="inline-block bg-primary text-white px-2 py-1 rounded">攤位活動</span>
          </h4>
          <div v-html="activeData.content.event"></div>
        </article>

        <div v-if="activeData.content.link.length">
          <h4 class="mb-1">
            <span class="inline-block bg-primary text-white px-2 py-1 rounded">官方網站</span>
          </h4>
          <p v-for="link in activeData.content.link" :key="link.index">
            <a class="underline break-all" :href="link" target="blank">{{ link }}</a>
          </p>
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
import useClientConfig from '../composables/useClientConfig'
import useClientSize from '../composables/useClientSize'
// 若要使用SSG生成包含meta的靜態網頁, 改用import直接靜態取得data
// import data from '../public/exhibition.json'
// const exhibition = ref(data)

// if (process.server) {
//   console.log('doing setup on: "Server"')
// } else if (process.client) {
//   console.log('doing setup on: "Client"')
// }

gsap.registerPlugin(ScrollTrigger);
const titleRef = ref(null)
const bgRef = ref(null)

const { app } = useRuntimeConfig()

const showModal = ref(false)
const active = ref(null)
const activeData = computed(() => {
  return exhibition.value[active.value]
})

const { height, isMobile } = useClientSize()
const backdrop = new URL(`../assets/images/exhibition-backdrop.svg`, import.meta.url).href
const backdropM = new URL(`../assets/images/exhibition-backdrop-m.svg`, import.meta.url).href

const error = ref(false)
const { publicPath } = useClientConfig()
const fetchUrl = `${publicPath}static/data/exhibition.json?${new Date().getTime()}`

const { data: exhibition } = await useFetch(fetchUrl, {
  onResponse({ response }) {
    if (!Array.isArray(response._data)) {
      error.value = true
    }
  },
})

const renderTagName = (arr) => {
  return arr.reduce((prev, item, index) => {
    return index === 0 ? prev += `#${item}` : prev += ` #${item}`
  }, '')
}

const handleClick = (index) => {
  active.value = index
  showModal.value = true
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
