<template>
  <div class="bg-bgsecondary py-16 sm:py-24">
    <div class="container w-11/12 xl:w-full">
      <h2 class="mb-8 sm:mb-16">
        <img
          class="scale-[0.65] sm:scale-75 xl:scale-100 mx-auto"
          src="../../assets/images/flow-title.png"
          alt="節目表"
          loading="lazy"
        >
      </h2>
      
      <ul class="flex space-x-1">
        <li
          class="text-white cursor-pointer px-5 py-2 rounded-tl-lg rounded-tr-lg"
          :class="activeTab === 'day1' ? 'bg-primary' : 'bg-gray-500 bg-opacity-50 translate-y-1'"
          @click="activeTab = 'day1'"
        >10/26 (六)</li>
        <li
          class="text-white cursor-pointer px-5 py-2 rounded-tl-lg rounded-tr-lg"
          :class="activeTab === 'day2' ? 'bg-primary' : 'bg-gray-500 bg-opacity-50 translate-y-1'"
          @click="activeTab = 'day2'"
        >10/27 (日)</li>
      </ul>
      <div
        class="relative bg-white md:p-6 rounded-xl rounded-tl-none 
        shadow-[7px_7px_0px_0px_rgba(0,0,0,0.05)] sm:shadow-[10px_10px_0px_0px_rgba(0,0,0,0.05)]"
      >
        <table>
          <thead>
            <tr>
              <th>華山西一館</th>
              <th>自綠體驗區+逆轉舞台</th>
            </tr>
          </thead>
          <tbody v-if="activeTab === 'day1'" v-html="day1" />
          <tbody v-if="activeTab === 'day2'" v-html="day2" />
        </table>
      </div>

      <SwitchBtn
        class="my-6 xl:my-12 2xl:my-16"
        @handleSwitchVal="val => activeSwitch = val"
        :option="switchOption"
      />

      <div v-if="activeSwitch === 'speakers'">
        <BtSlider :sliderData="speakers" :showNavigation="true">
          <template v-slot:listItem="{ item }">
            <div class="text-center cursor-pointer" @click="activeSpeaker = item.id">
              <div class="mx-8 md:mx-0">
                <div class="relative pb-[100%] rounded-full overflow-hidden">
                  <img
                    class="absolute w-full h-full object-cover"
                    :src="`${app.baseURL}${item.image}`"
                    :alt="item.name"
                    loading="lazy"
                  >
                </div>
              </div>
              <h3 class="font-bold text-xl mt-2">{{ item.name }}</h3>
              <p class="font-bold text-lg text-primary">{{ item.title }}</p>
              <p class="text-lg">{{ item.lecture }}</p>
            </div>
          </template>
        </BtSlider>
      </div>

      <div v-if="activeSwitch === 'entertainer'">
        <BtSlider v-if="entertainers.length" :sliderData="entertainers" :showNavigation="true">
          <template v-slot:listItem="{ item }">
            <div class="text-center cursor-pointer" @click="activeEntertainers = item.id">
              <div class="mx-8 md:mx-0">
                <div class="relative pb-[100%] rounded-full overflow-hidden">
                  <img
                    class="absolute w-full h-full object-cover"
                    :src="`${app.baseURL}${item.image}`"
                    :alt="item.name"
                    loading="lazy"
                  >
                </div>
              </div>
              <h3 class="font-bold text-xl mt-2">{{ item.name }}</h3>
              <p class="font-bold text-lg text-primary">{{ item.title }}</p>
            </div>
          </template>
        </BtSlider>
        <div v-else class="text-center text-xl py-8 xl:py-16">
          <span class="inline-block text-primary border-2 border-primary px-4 py-2">敬請期待</span>
        </div>
      </div>
    </div>

    <!-- popup -->
    <VueFinalModal
      v-model="showModal"
      class="flex justify-center items-center"
      content-class="flex flex-col max-w-sm max-h-3/4 overflow-auto m-4 p-4 bg-white border rounded-lg"
      @beforeClose="closeModal"
      :reserveScrollBarGap="false"
    >
      <div>
        <div class="w-2/3 mx-auto mb-4">
          <div class="relative pb-[100%]">
            <img class="absolute w-full h-full object-cover rounded-full" :src="`${app.baseURL}${activeData.image}`" :alt="activeData.name">
          </div>
        </div>
        
        <h4 class="text-xl text-center font-bold mb-2">{{ activeData.name }}</h4>
        <p v-html="activeData.description"></p>
      </div>
    </VueFinalModal>
  </div>
</template>

<script setup>
import SwitchBtn from '../SwitchBtn.vue'
import useSpeakers from '../../composables/useSpeakers'
import BtSlider from '../BtSlider.vue'
import useClientConfig from '../../composables/useClientConfig'

import { VueFinalModal } from 'vue-final-modal'

const { isDev } = useClientConfig()
const { app } = useRuntimeConfig()
const showModal = ref(false)

const { data: day1 } = await useFetch(`${isDev ? '' : '.'}/static/flow/day1.html?${new Date().getTime()}`)
const { data: day2 } = await useFetch(`${isDev ? '' : '.'}/static/flow/day2.html?${new Date().getTime()}`)

const activeTab = ref('day1')

const { speakers, getSpeakers, entertainers, getEntertainers } = useSpeakers()
const activeSwitch = ref('speakers')
const switchOption = {
  left: {
    name: '講師介紹',
    value: 'speakers'
  },
  right: {
    name: '表演團體介紹',
    value: 'entertainer'
  }
}

const activeSpeaker = ref(null)
const activeEntertainers = ref(null)
watch([
  () => activeSpeaker.value,
  () => activeEntertainers.value
], ([val, val2]) => {
  if (val || val2) showModal.value = true
})

const activeData = computed(() => {
  return activeSwitch.value === 'speakers' ?
    speakers.value.find(i => i.id === activeSpeaker.value) :
    entertainers.value.find(i => i.id === activeEntertainers.value)
})

const closeModal = () => {
  activeSpeaker.value = null
  activeEntertainers.value = null
}

onMounted(() => {
  getSpeakers()
  getEntertainers()
})

</script>

<style>
#flow table {
  width: 100%;
}
#flow thead th {
  padding-top: 1.2rem;
  text-align: left;
  width: 50%;
}
#flow tr {
  border-bottom: solid 1px #ccc;
}
#flow tbody tr:last-child {
  border: none;
}
#flow th, #flow td {
  padding: 0.6rem;
}
#flow th:nth-child(odd), #flow td:nth-child(odd) {
  padding-right: 0.6rem;
}
#flow th:nth-child(even), #flow td:nth-child(even) {
  padding-left: 0.6rem;
}
#flow tr td:only-child {
  padding-right: 1rem;
  padding-left: 0.6rem;
}
#flow .label-lecture {
  background-color: var(--color-primary);
}
#flow .label-liveShow {
  background-color: var(--color-yellow);
}

@media (min-width: 768px) {
  #flow th, #flow td {
    padding: 1rem 0;
  }
}

.time-wrapper {
  @apply block md:inline-block text-base whitespace-nowrap font-normal pt-1 md:mr-2;
}
.label-lecture, .label-liveShow {
  @apply text-white text-base rounded-full px-3 py-0.5;
}
</style>