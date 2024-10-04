<template>
  <VueFinalModal
    v-if="target"
    v-model="showModal"
    class="flex justify-center items-center"
    content-class="flex flex-col max-w-xl max-h-3/4 overflow-auto m-4 p-4 bg-white border rounded-lg"
    @beforeClose="closeModal"
  >
    <div>
      <h2 class="text-xl mb-4">{{ target.title }}</h2>
      <p>{{ target.description }}</p>
      <a
        class="inline-block bg-slate-500 px-4 py-2"
        :href="`http://www.facebook.com/share.php?u=http://webtest-dino.businesstoday.com.tw/bt_topic/2023/test/exhibition/${id}`"
        target="blank"
      >share</a>
    </div>
  </VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal'

const showModal = ref(true)

const route = useRoute()
const { id } = route.params

const props = defineProps({
  exhibition: {
    type: Array,
  },
})

const target = computed(() => props.exhibition.find((element) => element.id === id))

const closeModal = () => {
  navigateTo('/exhibition')
}

if (!target.value) {
  closeModal()
}

// useHead({
//   meta: [
//     { name: 'description', content: target.description },
//     // { name: 'keywords', content: `${article.value.tags}` },
//     { property: 'og:title', content: target.title },

//     { property: 'og:description', content: target.description },
//     // { property: 'og:image', content: article.value.cover }
//   ],
//   title: target.title
// })

</script>
