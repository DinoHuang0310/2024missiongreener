<template>
  <div>
    <div
      class="fixed w-full top-0 left-0 bg-cover bg-center bg-kvm sm:bg-kv portrait:sm:bg-kvpad"
      :style="{'height': `${height}px`}"
    >
      <div v-show="overY" class="fixed w-full h-full bg-footer" />
    </div>
    
    <div class="relative w-full h-[100vh] flex justify-center items-center">
      <h1
        class="fixed sm:relative w-[80%] sm:w-[60%] landscape:sm:w-1/2 xl:w-1/2 -mt-[40%] sm:-mt-12"
        :class="[isMobile && 'animate__animated animate__flipInX']"
        style="max-width: 720px"
      >
        <img
          :src="`${publicPath}static/images/event-title.png`"
          alt="2024自綠生活節"
          ref="titleRef"
        >
      </h1>
    </div>
    
    <div id="about" class="relative bg-bgcolor py-16 sm:py-24 border-t">
      <div class="absolute w-full pb-[15%] bottom-0 left-0 translate-y-1/2 bg-bgcolor" />
      <img
        class="absolute w-1/4 md:w-1/6 xl:w-1/10 top-0 right-0 opacity-20 xl:opacity-100"
        src="../../assets/images/backdrop-yellow.png"
        alt="backdrop"
        ref="bgYellowRef"
        loading="lazy"
      />
      <img
        class="absolute w-1/4 md:w-1/6 xl:w-1/10 top-[30%] left-0 opacity-20 xl:opacity-100"
        src="../../assets/images/backdrop-red.png"
        alt="backdrop"
        ref="bgRedRef"
        loading="lazy"
      />
      <img
        class="absolute w-1/4 md:w-1/6 xl:w-1/10 bottom-[10%] right-0 opacity-20 xl:opacity-100"
        src="../../assets/images/backdrop-green.png"
        alt="backdrop"
        ref="bgGreenRef"
        loading="lazy"
      />

      <div class="relative container w-11/12">
        <div class="sm:text-center space-y-2 mb-8">
          <p>過度使用化石燃料與極端氣候已造成不可逆的環境危機！</p>
          <p>乾旱、洪水、融化的冰層和海洋廢棄物，</p>
          <p>在在威脅著生活在地球上的人類與其它物種生命。</p>
          <p>我們必須即刻採取行動，搶救脆弱的地球！</p>
        </div>
        <div class="sm:text-center space-y-2 mb-8">
          <p>今周刊以聯合國ACT NOW【12大個人氣候變遷行動】作為行動基底，</p>
          <p>2022年發起第一屆「自綠生活節」，作為邁向永續生活的第一步，</p>
          <p>歷經2023年第二屆的擴大舉辦，邀請你2024年與我們一起同行</p>
        </div>
        <div class="text-center space-y-2 text-primary text-xl sm:text-2xl font-bold tracking-wider">
          <img class="mx-auto" src="../../assets/images/leaf.png" alt="green leaf" loading="lazy">
          <p>用行動替地球種下一顆永續樹</p>
          <p>實踐你我自綠的一小步</p>
        </div>

        <div class="py-16 sm:py-24">
          <Actions showNavigation />
        </div>

        <div v-if="youtube" class="relative flex justify-center py-16 sm:py-24 mb-16">
          <div class="absolute w-[130%] sm:w-[120%] -left-[15%] sm:-left-[10%] top-1/2 -translate-y-1/2">
            <img class="w-full" src="../../assets/images/media-wrapper.png" alt="decorate flowers" loading="lazy">
          </div>
          <div class="relative w-full sm:w-11/12 border-2 border-white bg-white/80">
            <BtYouTubePlayer :videoId="youtube" />
          </div>
        </div>
        
      </div>
    </div>

  </div>
</template>

<script>
// import { VueFinalModal } from 'vue-final-modal'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import useClientSize from '../../composables/useClientSize'
import useClientConfig from '../../composables/useClientConfig'
import useWindowScroll from '../../composables/useWindowScroll'
import ContentBox from '../../layouts/ContentBox.vue'
import BtYouTubePlayer from '../BtYouTubePlayer/Player.vue'
import Actions from '../Actions.vue'

export default {
  props: {
    youtube: {
      type: String,
      default: ''
    },
  },
  components: {
    ContentBox,
    BtYouTubePlayer,
    // VueFinalModal,
    Actions
  },
  setup() {
    const { height, width, isMobile } = useClientSize()
    const { overY } = useWindowScroll(height.value * 1.5)
    const { publicPath } = useClientConfig()

    gsap.registerPlugin(ScrollTrigger);

    const titleRef = ref(null)
    const bgYellowRef = ref(null)
    const bgRedRef = ref(null)
    const bgGreenRef = ref(null)

    watch(width, () => {
      resetGsap()
    })

    const resetGsap = () => {
      ScrollTrigger.killAll();

      if (isMobile.value) return;

      gsap.fromTo(titleRef.value, {
        y: 0,
      },
      {
        y: height.value * 0.5,
        scrollTrigger: {
          start: 0, // (物件開始位置, 卷軸開始位置) top center bottom px
          end: `${height.value * 2}`, // (物件結束位置, 卷軸結束位置), 也可以設卷軸捲動多少結束動畫(+=300)
          pin: false, // 物件執行完動畫會跟著卷軸走, 類似 fixed-top
          scrub: 0, // smooth 程度
          onUpdate: ScrollTrigger.update,
        },
      });

      const animationSetting = {
        start: 'top bottom',
        end: `+=${height.value * 2}`,
        pin: false,
        scrub: 0,
      }

      gsap.fromTo(bgYellowRef.value, { y: 0 }, {
        y: height.value / 2,
        scrollTrigger: {
          trigger: bgYellowRef.value,
          ...animationSetting
        },
      });
      gsap.fromTo(bgRedRef.value, { y: 0 }, {
        y: height.value / 2,
        scrollTrigger: {
          trigger: bgRedRef.value,
          ...animationSetting
        },
      });
      gsap.fromTo(bgGreenRef.value, { y: 0 }, {
        y: height.value / 2,
        scrollTrigger: {
          trigger: bgGreenRef.value,
          ...animationSetting
        },
      });
    }

    onMounted(resetGsap)
    
    return {
      titleRef,
      height,
      overY,
      publicPath,
      bgYellowRef,
      bgRedRef,
      bgGreenRef,
      isMobile,
    }

  }
}

</script>

<style>
:root {
  --animate-duration: 1s;
  --animate-delay: 1s;
  --animate-repeat: 1;
}
.animate__animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-duration: var(--animate-duration);
  animation-duration: var(--animate-duration);
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
@-webkit-keyframes flipInX {
  from {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 0;
  }

  40% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  60% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    opacity: 1;
  }

  80% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
  }

  to {
    -webkit-transform: perspective(400px);
    transform: perspective(400px);
  }
}
@keyframes flipInX {
  from {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 0;
  }

  40% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  60% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    opacity: 1;
  }

  80% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
  }

  to {
    -webkit-transform: perspective(400px);
    transform: perspective(400px);
  }
}
.animate__flipInX {
  -webkit-backface-visibility: visible !important;
  backface-visibility: visible !important;
  -webkit-animation-name: flipInX;
  animation-name: flipInX;
}
</style>
