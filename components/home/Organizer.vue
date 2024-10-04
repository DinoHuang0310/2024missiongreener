<template>
  <div
    id="corporate-sponsor"
    class="bg-white dark:bg-gray-100 bg-repeat py-16 sm:py-24"
    :style="{'background-image': `url(${bgImage})`}"
  >
    <div class="container space-y-16 md:space-y-8 w-11/12">
      <table class="block md:table w-full" v-for="group in data" :key="group.index">
        <tbody class="block md:table-row-group">
          <tr class="block md:table-row">
            <td class="block md:table-cell md:w-px whitespace-nowrap text-center text-xl font-bold align-top p-4 md:py-8">
              {{ group.title }}:
            </td>
            <td class="block md:table-cell">
              <div
                class="flex flex-wrap"
                :class="group.list.length === 1 && 'justify-center sm:justify-start'"
              >
                <div
                  v-for="organizer in group.list"
                  :key="organizer.index"
                  class="w-1/2 sm:w-1/4 p-4"
                >
                  <a v-if="organizer.href" class="relative block pb-[34%]" :href="organizer.href" target="_blank">
                    <img
                      class="absolute h-full w-full object-contain"
                      :src="`${app.baseURL}${organizer.image}`"
                      :alt="organizer.title"
                      loading="lazy"
                    >
                  </a>
                  <div v-else class="relative block pb-[34%]">
                    <img
                      class="absolute h-full w-full object-contain"
                      :src="`${app.baseURL}${organizer.image}`"
                      :alt="organizer.title"
                      loading="lazy"
                    >
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import useClientConfig from '../../composables/useClientConfig'

const bgImage = new URL(`../../assets/images/background.png`, import.meta.url).href

const { isDev } = useClientConfig()
const { app } = useRuntimeConfig()

const { data } = await useFetch(`${isDev ? '' : '.'}/static/data/organizer.json?${new Date().getTime()}`)

const handleLogoClick = (link) => {
  if (link) window.open(link, '_blank')
}
</script>