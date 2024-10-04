<template>
  <div class="relative overflow-hidden">
    <header class="fixed top-0 flex items-center justify-between p-2 px-4 w-full bg-white z-20 border-b shadow">
      <div class="w-1/4 max-w-28 sm:max-w-20 md:max-w-28">
        <a href="https://esg.businesstoday.com.tw/" target="blank">
          <img src="./assets/images/esg.businesstoday.svg" alt="今周刊-永續台灣ESG">
        </a>
      </div>
      <BtNavbar :navList="data.navList">
        <template v-slot:after>
          <div class="flex items-center space-x-2 p-2 lg:p-0 lg:ml-2">
            <a class="w-8" href="https://www.facebook.com/BToday/" target="blank">
              <img src="./assets/images/ico-facebook.svg" alt="btnet-facebook">
            </a>
            <a class="w-8" href="https://line.me/R/ti/p/%40btoday" target="blank">
              <img src="./assets/images/ico-line.svg" alt="btnet-line">
            </a>
            <a class="w-8" href="https://www.instagram.com/btoday_ig/" target="blank">
              <img src="./assets/images/ico-instagram.svg" alt="btnet-instagram">
            </a>
          </div>
        </template>
      </BtNavbar>
    </header>

    <div>
      <NuxtPage :info="data" />
    </div>

    <Organizer class="relative" />
    <BtFooter class="relative" />
    
    <ModalsContainer />
  </div>
</template>

<script setup>
import BtNavbar from './layouts/BtNavbar/Nav.vue'
import Organizer from './components/home/Organizer.vue'
import BtFooter from './layouts/BtFooter.vue'

import { ModalsContainer } from 'vue-final-modal'
import useClientConfig from './composables/useClientConfig'

const { isDev } = useClientConfig()
const { data } = await useFetch(`${isDev ? '' : '.'}/static/data/info.json?${new Date().getTime()}`)

</script>

<style>
body {
  font-family: 'Noto Sans TC', sans-serif, 'Microsoft JhengHei', arial;
  font-size: 18px;
  color: #505050
}
@media (min-width: 768px) {
  body {
    font-size: 19px;
  }
}
@media (min-width: 1024px) {
  body {
    font-size: 20px;
  }
}
</style>