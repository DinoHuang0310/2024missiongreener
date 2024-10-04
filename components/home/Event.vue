<template>
  <div class="relative overflow-hidden">
    <h2
      class="relative w-full pb-[14%] top-0 left-0 bg-cover"
      :style="{'background-image': `url('${bgImage}')`}"
    >
      <div class="absolute w-full h-1/2 bottom-0 left-0 bg-primary"></div>
      <img
        class="absolute w-1/2 sm:w-auto left-1/2 top-0 sm:top-1/5 -translate-x-1/2 mx-auto"
        src="../../assets/images/title-mission.png"
        alt="自綠任務"
        loading="lazy"
      >
    </h2>
    
    <div class="relative bg-primary">
      <div class="hidden xl:block top-0 right-0 -translate-y-1/3" :class="backdropStype">
        <div class="pb-[100%] bg-full bg-[left_-600px]" :style="{'background-image': `url('${bgMission}')`}" />
      </div>
      <div class="hidden xl:block bottom-0 left-0 -translate-y-1/2" :class="backdropStype">
        <div class="pb-[100%] bg-full bg-[left_-1200px]" :style="{'background-image': `url('${bgMission}')`}" />
      </div>
      <div class="hidden xl:block bottom-0 right-0" :class="backdropStype">
        <div class="pb-[100%] bg-full bg-[left_-900px]" :style="{'background-image': `url('${bgMission}')`}" />
      </div>

      <div class="container w-11/12 pt-1/10 lg:pt-0">
        <ContentBox class="relative p-4 md:p-8 2xl:py-12 mb-16 sm:mb-20 z-10">
          <div class="top-0 left-0 -translate-x-full translate-y-1/2" :class="backdropStype">
            <div class="pb-[100%] bg-full bg-[left_-300px]" :style="{'background-image': `url('${bgMission}')`}" />
          </div>
          <div class="bottom-0 right-0 translate-x-full" :class="backdropStype">
            <div class="pb-[100%] bg-full bg-left-top" :style="{'background-image': `url('${bgMission}')`}" />
          </div>
          <img
            class="absolute top-4 sm:top-6 -left-3 sm:-left-2 scale-90 sm:scale-100"
            src="../../assets/images/mission-one.png"
            alt="任務一"
            loading="lazy"
          >
          <div class="text-center mb-8">
            <h3 class="text-primary mb-6 mt-14 sm:mt-6">
              <span class="text-2xl font-bold border-2 border-primary px-3 py-1">報名抽好禮</span>
            </h3>
            <p>預約報名參加自綠生活節<br>一起來參與活動拿好禮！</p>
          </div>
          <picture>
            <source srcset="../../assets/images/mission-one-content-m.png" media="(max-width: 639px)">
            <img
              class="mx-auto mb-2"
              src="../../assets/images/mission-one-content.png"
              alt="第一重好禮: 事前報名參加活動，並於現場完成報到，即可享有領取每日限量早鳥禮資格。"
              loading="lazy"
            />
          </picture>
          <picture>
            <source srcset="../../assets/images/mission-two-content-m.png" media="(max-width: 639px)">
            <img
              class="mx-auto mb-4"
              src="../../assets/images/mission-two-content.png"
              alt="第二重好禮: 當日活動現場、指定時間抽出精美好禮。"
              loading="lazy"
            />
          </picture>
          <div v-if="prize.length" class="text-primary text-2xl font-bold text-center sm:text-left mb-2 sm:pl-10">現場抽好禮</div>
          <BtSlider
            :sliderData="prize"
            :showNavigation="true"
            class="pb-4"
          >
            <template v-slot:listItem="{ item }">
              <div>
                <img :src="`${app.baseURL}${item.image}`" :alt="item.title">
                <p class="text-center text-sm">
                  <span class="inline-block bg-primary text-white px-3 py-1 rounded-full">{{ item.title }}</span>
                </p>
              </div>
            </template>
          </BtSlider>
          <div v-if="showMissionThree" class="text-center">
            <a class="inline-block mb-4" href="https://lihi2.com/JRbRj" target="blank">
              <picture class="block text-center">
                <source srcset="../../assets/images/mission-three-content-m.png" media="(max-width: 639px)">
                <img
                  src="../../assets/images/mission-three-content.png"
                  alt="第三重好禮: 民眾至活動現場的大會服務台出示悠遊付APP內的「我的減碳存摺」,只要出示減碳量成果,送限定悠遊卡1張。(隨機出貨,恕不挑選)"
                  loading="lazy"
                />
              </picture>
            </a>
          </div>
        </ContentBox>

        <ContentBox class="relative p-4 md:p-8 2xl:py-12 z-10">
          <img
            class="absolute top-4 sm:top-6 -left-3 sm:-left-2 scale-90 sm:scale-100"
            src="../../assets/images/mission-two.png"
            alt="任務二"
            loading="lazy"
          >
          <div class="text-center mb-8">
            <h3 class="text-primary mb-6 mt-14 sm:mt-6">
              <span class="text-2xl font-bold border-2 border-primary px-3 py-1">免「廢」闖關</span>
            </h3>
            <p>自綠生活節一起耍廢！<br>​完成活動現場所有關卡，即可兌換好禮</p>
          </div>
          <div class="sm:flex pb-4 sm:pb-0 lg:px-6">
            <div class="flex sm:w-1/2 items-center mb-4 sm:mb-0">
              <div class="w-1/3"><img src="../../assets/images/mission-two-step1.png" alt="步驟1" loading="lazy"></div>
              <div class="pl-4 pr-0 sm:pr-6 flex-1">
                <span class="inline-block text-white font-normal bg-primary rounded px-2 mb-2">step1</span>
                <p class="leading-tight">加入自綠生活節活動官方LINE帳號</p>
              </div>
            </div>
            <div class="flex sm:w-1/2 items-center">
              <div class="w-1/3"><img src="../../assets/images/mission-two-step2.png" alt="步驟2" loading="lazy"></div>
              <div class="pl-4 pr-0 sm:pr-6 flex-1">
                <span class="inline-block text-white font-normal bg-primary rounded px-2 mb-2">step2</span>
                <p class="leading-tight mb-1">完成活動會場所有關卡，即可兌換自綠小禮！<br>每日指定時間還有隱藏好禮加碼送！</p>
                <span class="text-sm text-primary font-bold border border-primary px-1">數量有限，換完為止</span>
              </div>
            </div>
          </div>
        </ContentBox>

        <div class="flex justify-center mt-12 pb-6">
          <button
            class="text-white text-2xl tracking-wider rounded-full border-2 border-white px-8 py-1 shadow [text-shadow:_1px_1px_3px_rgb(0_0_0_/_65%)]"
            style="background-image: linear-gradient(35deg, #ffc303 13%, #13b5b5 100%)"
            @click="toSignup"
          >立即報名</button>
        </div>
      </div>
    </div>

    <!-- <VueFinalModal
      v-model="showModal"
      class="flex justify-center items-center"
      content-class="flex flex-col max-w-lg max-h-[70vh] overflow-auto m-4 p-4 bg-white border rounded-lg"
      :reserveScrollBarGap="false"
    >
      <div>
        <img class="mb-4" :src="`${app.baseURL}${activeData.image}`" :alt="activeData.title">
        <div class="text-lg font-bold pb-2 mb-2 border-b border-gray-400">
          {{ activeData.title }}
        </div>
        <div v-html="activeData.description" />
      </div>
    </VueFinalModal> -->
  </div>
</template>

<script setup>
// import { VueFinalModal } from 'vue-final-modal'
import ContentBox from '../../layouts/ContentBox.vue'
import useScrollTo from '../../composables/useScrollTo'
import BtSlider from '../BtSlider.vue'

const props = defineProps({
  prize: {
    type: Array,
    default: []
  },
  showMissionThree: {
    type: Boolean,
  }
})
const { app } = useRuntimeConfig()

const bgImage = new URL(`../../assets/images/adornment-backdrop.svg`, import.meta.url).href
const bgMission = new URL(`../../assets/images/mission-backdrop.png`, import.meta.url).href
const stepBox = computed(() => (
  `flex items-center sm:w-1/2 md:px-8`
))

const backdropStype = computed(() => (
  `absolute w-[300px]`
))

const showModal = ref(false)
const activeIndex = ref(null)
const activeData = computed(() => props.prize[activeIndex.value])
// const handleClick = (index) => {
//   activeIndex.value = index
//   showModal.value = true
// }

const toSignup = () => {
  const elem = document.getElementById('signup')
  const rect = elem.getBoundingClientRect();
  const win = elem.ownerDocument.defaultView;
  useScrollTo(rect.top + win.pageYOffset)
}

</script>
