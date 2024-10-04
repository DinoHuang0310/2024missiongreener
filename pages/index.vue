<template>
  <div>
    <div class="relative">

      <Kvarea ref="contentRef" :youtube="info.youtube" />

      <div class="relative">

        <Event id="event" :prize="info.prize" :showMissionThree="info.showMissionThree" />

        <ContentArea class="bg-bgcolor" :showMarket="info.showMarket" />

        <Flow v-if="info.showFlow" id="flow" class="bg-bgcolor" />

        <Signup id="signup" class="bg-bgcolor" />

        <News v-if="info.news.length" id="news" :news="info.news" />

      </div>
    </div>
  </div>
</template>

<script setup>
import Kvarea from '../components/home/Kvarea.vue'
import Event from '../components/home/Event.vue'
import ContentArea from '../components/home/ContentArea.vue'
import Flow from '../components/home/Flow.vue'
import Signup from '../components/lecturePage/Signup.vue'
import News from '../components/home/News.vue'

import useScrollTo from '../composables/useScrollTo'

const contentRef = ref(null)

const contentEndPosition = computed(() => contentRef.value ? contentRef.value.$el.clientHeight : 0)

const props = defineProps({
  info: {
    type: Object,
  },
})

onMounted(() => {
  const { path } = useRoute()
  if (path !== '/') {
    setTimeout(() => {
      const elem = document.getElementById(path.replaceAll('/', ''))
      const rect = elem.getBoundingClientRect();
      const win = elem.ownerDocument.defaultView;
      useScrollTo(rect.top + win.pageYOffset)
    }, 300);
  }
})

</script>
