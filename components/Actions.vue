<template>
  <div>
    <div class="relative">
      <div class="absolute w-full h-4/5 sm:h-3/5 left-0 top-1/5 sm:top-2/5 translate-y-6 px-2 sm:px-6">
        <div class="relative w-full h-full bg-secondary rounded-xl" />
        <div v-if="showNavigation" class="absolute h-full left-0 top-0">
          <div class="swiper-button-prev" ref="prevRef" />
        </div>
        <div v-if="showNavigation" class="absolute h-full right-0 top-0">
          <div class="swiper-button-next" ref="nextRef" />
        </div>
      </div>

      <div :class="[showNavigation && 'px-10']">
        <div class="swiper" ref="swiperRef">
          <div class="swiper-wrapper">
            <!-- Slides -->
            <div class="swiper-slide" v-for="(list, index) in actions" :key="index">
              <img
                class="mx-auto w-11/12 drop-shadow-md"
                :src="`${publicPath}static/images/actions/action${index+1}.svg`"
                :alt="list.title"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        
        <div class="relative">
          <div class="text-center sm:-translate-y-4 mb-4 sm:mb-0">
            <span class="inline-block text-white text-xl bg-primary px-5 py-1 sm:px-6 sm:py-2 rounded-full whitespace-nowrap">
              {{ actions[active].title }}
            </span>
          </div>
          <p class="sm:w-4/5 mx-auto">{{ actions[active].content }}</p>
        </div>
      </div>
    </div>

    <!-- pagination -->
    <div v-if="showPagination" class="swiper-pagination" ref="paginationRef" />

  </div>
</template>

<script>
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue';

import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import 'swiper/swiper-bundle.min.css';
import 'swiper/css/bundle';

import useClientConfig from '../composables/useClientConfig'

const { publicPath } = useClientConfig()

export default {
  props: {
    showNavigation: {
      type: Boolean,
    },
    showPagination: {
      type: Boolean,
    },
  },

  setup(props) {

    const swiperRef = ref(null);
    const paginationRef = ref(null);
    const nextRef = ref(null);
    const prevRef = ref(null);

    let swiper = null;
    const active = ref(0)

    const params = {
      spaceBetween: 60,
      breakpoints: {
        640: {
          spaceBetween: 30,
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 40,
        }
      },
      centeredSlides: true,
      // loop: true,
      // loopAdditionalSlides: 30,
      // autoplay: {
      //   delay: 5000,
      // },
      pagination: true,
      navigation: true,
      on: {
        init: (e) => {
          // console.log('swiper init')
        },
        slideChange: (e) => {
          active.value = e.activeIndex
        },
      },
    }

    const actions = ref([
      {
        title: '節電第一',
        content: '台灣家用電力目前90%以上，還是由傳統石化能源供應，減少家庭用電，永遠是自綠人生的第一步。多用LED燈具、買節能標章的家電用品、衣服多晾乾、少烘乾，把冷氣調到最宜人的26度。隨著人生階段不同，換小一點的房子，都是可以貢獻地球的自綠小改變。'
      },
      {
        title: '走路、騎車、大眾交通工具',
        content: '全球64%的石油、27%的能源，都用在交通運輸上，全球25%的溫室氣體排放，也是因為交通，交通是生活碳排的大魔王。走路、騎車、大眾交通工具，都是可以馬上做的「自綠」小改變。別忘了，塞車也是碳排放的主要來源之一，每個人每月少開車一次，塞車的機會就少一次，排碳少，都市空氣才更好。'
      },
      {
        title: '吃更多的蔬菜',
        content: '除了營養，自綠生活的餐桌上，需要多放一張食物碳排表，牛肉、羊肉、甲殼類海鮮，是碳排量最大的三大食材。蔬食飲食，是對地球最友善的行動。最棒的情況，可以減少31%的個人碳排，同時，又能完整滿足身體需要的營養，更是健康生活的選擇。多吃一點菜、真心愛地球！'
      },
      {
        title: '有意義的旅行',
        content: '捨不得放棄探索世界的機會？一點自律，可以讓旅行更有意義。行李愈重、耗油愈多，儘量簡化行李，減輕重量；不買過度包裝的伴手禮；自帶盥洗用品入住，減少使用拋棄式用品。旅遊業占全球碳排的5-12%，安排一場自綠新旅行，從解封的現在就開始。'
      },
      {
        title: '拒絕製造剩食',
        content: '每年，我們丟掉10億噸的食物，相當於全球17%的食物攝取，我們所製造的「剩食」，貢獻8%的地球碳排。如果把剩食看成一個國家，它的碳排放，高居全球第三，只輸美國及中國。把碗裡的飯菜全吃完，是自綠人生最簡單的開始。'
      },
      {
        title: '循環4R不能忘',
        content: '環保界的金律4R(Reduce 減少使用、Reuse物盡其用、Repair(修好再用)、 Recycle(循環再用)、雖然倡導了40年，但最近卻有倒退的情況，CIRCULARITY GAP REPORT說，2021年全球製造的產品中，只有8.6%是具備循環概念，比前一年的9.1% 還少。4R常我心，自綠生活才真到位！'
      },
      {
        title: '讓再生能源進家門',
        content: '太陽能板、充電樁、智慧電表，都是低碳自綠生活的好幫手。如果你住在陽光燦爛的地方，在屋頂裝上太陽能板吧！如果管委會要在停車場設充電樁，趕快投下贊成票！繳電費時，順便申請安裝智慧電表，自綠行動從生活開始!'
      },
      {
        title: '換電動車',
        content: '直到現在，人類社會中95%的移動，都還是靠化石能源驅動。電動車雖然目前仍無法零碳排，但比起油車，當然乾淨的多。在最好的狀況下，電動車的碳排，比傳統汽油車少81%，也比柴油車少80%。自綠人生的下一台車，一定要是電動的啦！'
      },
      {
        title: '選擇友善環境的產品',
        content: '你花的每一塊錢，都在影響地球的碳排，用你的荷包，讓友善環境的產品，佔滿超商的貨架上，下次shopping時，除了看看熱量及營養成份，也注意一下是否有碳足跡標籤(Carbon Footprint Label)，自綠花錢，豐富你的低碳生活！'
      },
      {
        title: '多講、多宣導',
        content: '還記得「瑞典氣候少女」格蕾塔？一句「你們成年人正糟蹋我的未來」，讓全球140萬學生跟隨她，參與氣候變遷行動。自綠新生活，少你發聲、差很多；自己做不夠，還得大聲說；拉幫結黨，自綠生活才能遍地開花！'
      },
      {
        title: '種植本地植物',
        content: '一起保護生物的多樣性！如果你有一個花園、甚至是家們前的一兩株植物，請考慮種植本地物種，因為植物、動物、昆蟲是相互依賴的，大多數的昆蟲不會吃非本地食物，這意味著鳥類和其他物種未失去一個食物來源。'
      },
      {
        title: '清理環境',
        content: '人類、動物和植物都會受到不當丟棄的垃圾汙染土地和水的影響，請盡量使用你需要的東西，當你不得不丟掉一些物品時，請妥善處裡，除了宣導清理物品的重要性外，也多多參與當地公園、河流、海灘的清潔運動，為環境盡一份心力。'
      },
    ])

    onMounted(() => {
      // initialize swiper
      swiper = new Swiper(swiperRef.value, {
        modules: [Navigation, Pagination, Autoplay],
        ...params,
        pagination: {
          el: paginationRef.value,
          clickable: true
        },
        navigation: {
          nextEl: nextRef.value,
          prevEl: prevRef.value,
        },
      });
    })

    onUnmounted(() => {
      swiper.destroy();
    })

    return {
      actions,
      active,
      publicPath,
      swiperRef,
      paginationRef,
      nextRef,
      prevRef
    }
  }
}
</script>

<style scoped>
/* swiper reset css */
.swiper-slide {
  transition: 0.5s;
}
.swiper-slide.swiper-slide-active {
  transform: translate(0, -65px) scale(1.2);
}
.swiper-initialized.swiper-horizontal {
  padding-top: 80px;
}
.swiper-button-next, .swiper-button-prev {
  color: var(--color-primary);
  width: 50px;
  height: 50px;
}
.swiper-pagination-bullet-active {
  background-color: var(--color-primary);
}
.swiper-horizontal>.swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal, .swiper-pagination-custom, .swiper-pagination-fraction {
  position: relative;
  bottom: 0;
}
.swiper-button-next, .swiper-rtl .swiper-button-prev {
  right: 0;
}
.swiper-button-prev, .swiper-rtl .swiper-button-next {
  left: 0;
}
.swiper-button-prev:after, .swiper-button-next:after {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  background-image: url('../assets/images/slider-arrow.png');
  background-size: cover;
  background-position: center;
}
.swiper-button-next:after {
  transform: rotate(180deg);
}

@media screen and (max-width: 640px) {
  .swiper-slide.swiper-slide-active {
    transform: translate(0, 0) scale(1);
  }
  .swiper-initialized.swiper-horizontal {
    padding-top: 0px;
  }
  .swiper-button-next, .swiper-button-prev {
    width: 40px;
    height: 40px;
  }
  .swiper-button-next, .swiper-rtl .swiper-button-prev {
    right: -10px;
  }
  .swiper-button-prev, .swiper-rtl .swiper-button-next {
    left: -10px;
  }
}
</style>