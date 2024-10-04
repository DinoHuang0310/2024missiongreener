<template>
  <footer class="text-center px-4 py-8 bg-footer">
    <div class="space-y-1 text-base text-white">
      <p>內容監製: 今周刊</p>
      <p>專題製作: 今周刊 數位內容部</p>
      <p>Copyright © 2024 今周刊.All rights reserved. 版權所有，禁止擅自轉貼節錄</p>
    </div>
    
    <div v-if="showFloatButton" class="fixed right-1 top-1/2 -translate-y-1/2 z-10">
      <button
        v-show="isHomePage"
        class="flex items-center justify-center bg-primary px-2 py-4 rounded-full border border-white"
        @click="toSignup"
      >
        <img class="block w-5 text-white" src="../assets/images/pen-solid.svg" alt="signup">
      </button>

      <a
        href="https://social-plugins.line.me/lineit/share?url=https://www.businesstoday.com.tw/bt_topic/2024/missiongreener/"
        target="blank"
      >
        <img class="w-9 mt-1 mx-auto" src="../assets/images/ico-line-share.svg" alt="分享到Line">
      </a>
      
      <!-- <button class="flex items-center justify-center" @click="useScrollTo(0)">
        <span class="relative bg-primary w-10 h-10 rounded-full scale-110 border border-white">
          <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/4 rotate-45 w-4 h-4 border-t-2 border-l-2 border-white" />
        </span>
      </button> -->
    </div>
    
  </footer>
</template>

<script>
import { computed } from 'vue';
import useClientSize from '../composables/useClientSize';
import useWindowScroll from '../composables/useWindowScroll';
import useScrollTo from '../composables/useScrollTo';

export default {
  props: {
    showFloat: {
      type: Boolean,
      default: true
    }
  },
  components: {},
  setup(props) {
    const { height } = useClientSize();
    const { scrollTop } = useWindowScroll();

    const route = useRoute()
    const homePagePath = ['/', '/event', '/flow', '/signup', '/news']
    const isHomePage = computed(() => homePagePath.some(i => i === route.path))

    const showFloatButton = computed(() => {
      return props.showFloat && scrollTop.value > height.value / 2;
    })

    const toSignup = () => {
      const elem = document.getElementById('signup')
      const rect = elem.getBoundingClientRect();
      const win = elem.ownerDocument.defaultView;
      useScrollTo(rect.top + win.pageYOffset)
    }
    
    return {
      showFloatButton,
      useScrollTo,
      toSignup,
      isHomePage,
    }
  }
  
}
</script>
