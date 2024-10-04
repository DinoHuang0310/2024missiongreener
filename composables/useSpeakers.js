import useClientConfig from './useClientConfig'

const loading = ref(false);
const speakers = ref([]);
const entertainers = ref([])

const { isDev } = useClientConfig()

export default function useSpeakers() {

  const getSpeakers = async () => {
    if (speakers.value.length || loading.value) return
    
    try {
      loading.value = true

      const fetchUrl = `${ isDev ? '' : '.' }/static/data/speakers.json?${new Date().getTime()}`

      await $fetch(fetchUrl, {
        onResponse({ response }) {
          if (Array.isArray(response._data)) {
            speakers.value = response._data
          } else {
            console.error(response)
          }
        },
      })

      loading.value = false
    } catch (error) {
      loading.value = false
      console.error(error)
    }
  }

  const getEntertainers = async () => {
    if (entertainers.value.length) return
    
    try {
      loading.value = true

      const fetchUrl = `${ isDev ? '' : '.' }/static/data/entertainer.json?${new Date().getTime()}`

      await useFetch(fetchUrl, {
        onResponse({ response }) {
          if (Array.isArray(response._data)) {
            entertainers.value = response._data
          } else {
            console.error(response)
          }
        },
      })

      loading.value = false
    } catch (error) {
      loading.value = false
      console.error(error)
    }
  }

  const lectures = computed(() => {
    return speakers.value.reduce((prev, item) => {
      const { lecture, time, name, title, image, description } = item
      const hasLecture = prev.findIndex(i => i.lecture === item.lecture)
      
      if (hasLecture > -1) {
        prev[hasLecture].speakers.push({ name, title, image, description })
        return prev
      }
      return prev.concat({
        lecture,
        time,
        speakers: [{ name, title, image, description }]
      })
    }, [])
  })

  return {
    loading,
    speakers,
    getSpeakers,
    entertainers,
    getEntertainers,
    lectures,
  }
}