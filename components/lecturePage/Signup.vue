<template>
  <div class="relative py-16 sm:py-24 pb-0 sm:pb-0">
    <div class="absolute top-0 left-0 w-full h-[90vh] sm:h-[50vh] bg-bgsecondary">
      <div
        class="absolute w-full pb-[7.1875%] bottom-1 left-0 translate-y-full bg-bottom bg-full"
        :style="{'background-image': `url('${bgImage}')`}"
      />
      <img src="../../assets/images/signup-backdrop.svg" alt="signup backdrop" loading="lazy">
    </div>

    <div class="container relative w-11/12">
      <div class="text-center mb-4 md:mb-12">
        <h2 class="mb-10">
          <img
            class="scale-[0.65] sm:scale-75 xl:scale-100 mx-auto"
            src="../../assets/images/signup-title.png"
            alt="報名參加"
            loading="lazy"
          >
        </h2>
      </div>
      <ul class="mb-6 space-y-5 sm:space-y-3">
        <li class="space-y-1 sm:space-y-0">
          <span class="inline-block text-white bg-primary px-3 py-1 rounded-lg mr-2">活動時間</span>
          2024/10/26(六)-27(日)
        </li>
        <li class="space-y-1 sm:space-y-0">
          <span class="inline-block text-white bg-primary px-3 py-1 rounded-lg mr-2">活動地點</span>
          <p class="xl:inline-block">華山文創園區 西1館、北側綠地草原</p>
          <span class="inline-block text-primary font-medium px-2 border border-primary ml-2">活動免費入場</span>
        </li>
      </ul>

      <div
        class="relative bg-white p-6 xl:px-10 sm:py-12 rounded-xl 
        shadow-[7px_7px_0px_0px_rgba(0,0,0,0.05)] sm:shadow-[10px_10px_0px_0px_rgba(0,0,0,0.05)]"
      >
        <div v-if="formState.registrable">
          <div>
            <div class="md:flex md:justify-center">
              <!-- 基本資料 -->
              <div class="sm:w-2/3 md:w-2/5 lg:w-1/3 sm:p-4 mx-auto md:mx-0 space-y-3">
                <h3 class="text-xl font-bold">基本資料:</h3>
                <input
                  type="text"
                  class="border-2 p-3 w-full placeholder:text-black/30 placeholder:text-base"
                  placeholder="姓名"
                  v-model="name"
                  maxlength="25"
                >
                <input
                  type="text"
                  class="border-2 p-3 w-full placeholder:text-black/30 placeholder:text-base"
                  placeholder="手機"
                  v-model="cell_phone"
                  maxlength="10"
                >
                <div>
                  <label class="mr-4"><input class="scale-125 mr-2 w-4 h-4" type="radio" v-model="gender" value="男性">男</label>
                  <label class="mr-4"><input class="scale-125 mr-2 w-4 h-4" type="radio" v-model="gender" value="女性">女</label>
                  <label class="mr-4"><input class="scale-125 mr-2 w-4 h-4" type="radio" v-model="gender" value="其他">其他</label>
                </div>
                <input
                  type="text"
                  class="border-2 p-3 w-full placeholder:text-black/30 placeholder:text-base"
                  placeholder="E-mail"
                  v-model="email"
                  maxlength="100"
                >
                <div>
                  <h3 class="text-xl font-bold pt-3">2024自綠生活節 預約報名:</h3>
                  <div class="mt-2">
                    <label class="inline-block mr-6">
                      <input class="scale-125 mr-2 w-4 h-4" type="checkbox" v-model="is_join_day_1">10/26(六)
                    </label>
                    <label class="inline-block">
                      <input class="scale-125 mr-2 w-4 h-4" type="checkbox" v-model="is_join_day_2">10/27(日)
                    </label>
                  </div>
                </div>
                
              </div>
              <!-- 場次選擇 -->
              <div
                v-if="lectures.length"
                class="sm:w-2/3 md:w-auto sm:p-4 mx-auto md:mx-0 mt-6 md:mt-0 max-w-lg"
              >
                <h3 class="text-xl font-bold">請選擇報名場次/參加人數:</h3>
                <div
                  v-for="(list, index) in lectures"
                  :key="list.code"
                  class="flex justify-between items-center"
                  :class="[list.full && 'opacity-50']"
                >
                  <input
                    :id="`lecture${index}`"
                    class="scale-125 mr-3 sm:mr-4 w-4 h-4"
                    type="checkbox"
                    v-model="list.checked"
                    :disabled="list.full"
                  >
                  <div :class="[index != lectures.length - 1 && 'border-b']" class="flex flex-1 items-center py-2 sm:py-3 border-black/20">
                    <label class="flex items-center flex-1" :for="`lecture${index}`">
                      <div class="relative w-16 h-16 rounded-full bg-gray-300 overflow-hidden mr-2">
                        <img
                          class="absolute w-full h-full object-cover"
                          :src="`${app.baseURL}${list.image}`"
                          alt=""
                        >
                      </div>
                      <div class="flex-1">
                        <span class="text-base">{{ list.date }}</span>
                        <p class="leading-none" v-html="list.name" />
                      </div>
                    </label>
                    <div class="w-16 md:w-20 text-right">
                      <div v-if="list.full">已額滿</div>
                      <select
                        v-else
                        class="border border-gray-400"
                        :class="[!list.checked && 'opacity-50']"
                        v-model="list.attendances"
                        :disabled="!list.checked"
                      >
                        <option v-for="num in 4" :key="num" :value="num">{{ num }}位</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="text-center mt-8">
              <label class="inline-block whitespace-nowrap">
                <input class="scale-125 mr-2 w-4 h-4 mb-6" type="checkbox" v-model="is_agree">
                我已閱讀<span class="text-yellow underline cursor-pointer" @click.prevent="showModal = !showModal">個資條款</span>且同意送出資料
              </label>
              <div class="sm:w-3/4 mx-auto">
                <button
                  class="text-white bg-yellow p-3 w-full font-bold tracking-widest"
                  @click="submit"
                >送出報名</button>
              </div>
            </div>
          </div>
        </div>
        <div v-else v-html="formState.deadlineMsg" />

      </div>
      <ol class="mt-6 mb-12 pl-4 space-y-3 xl:space-y-1">
        <li class="flex items-start">
          <span class="w-6 mr-2"><img src="../../assets/images/list-style-leaf.png" alt="leaf" loading="lazy"></span>
          <p class="flex-1">本活動為免費參加。</p>
        </li>
        <li class="flex items-start">
          <span class="w-6 mr-2"><img src="../../assets/images/list-style-leaf.png" alt="leaf" loading="lazy"></span>
          <p class="flex-1">沙龍課程報名人數若為兩人以上，請分別報名，或來電預約。 (02)2581-6196 #203 陳小姐</p>
        </li>
        <li class="flex items-start">
          <span class="w-6 mr-2"><img src="../../assets/images/list-style-leaf.png" alt="leaf" loading="lazy"></span>
          <p class="flex-1">主辦單位保留變更日期、終止活動及受理報名之權利。</p>
        </li>
      </ol>
    </div>

    <div class="flex flex-wrap bg-white">
      <div class="relative w-full lg:w-1/2">
        <div class="pb-[60%]" />
        <iframe
          class="absolute w-full h-full top-0 left-0 border-0 outline-none focus:border-0 focus:outline-none"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.7052606447637!2d121.52678337599347!3d25.044074637884666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a96523e0246d%3A0xf1c9276707165c71!2z6I-v5bGxMTkxNOaWh-WMluWJteaEj-eUoualreWckuWNgA!5e0!3m2!1szh-TW!2stw!4v1689578266488!5m2!1szh-TW!2stw"
          loading="lazy"
          frameBorder="0"
          referrerpolicy="no-referrer-when-downgrade"
        />
      </div>
      <div
        class="flex justify-center items-center w-full lg:w-1/2 bg-repeat"
        :style="{'background-image': `url('${bgStyle}')`}"
      >
        <div class="space-y-4 p-4 lg:p-8" style="max-width: 700px">
          <div>
            <h3 class="text-xl lg:text-2xl text-primary font-bold mb-2">華山1914文創產業園區 西一館&大草原</h3>
            <p class="mb-4">台北市中正區八德路一段1號</p>
          </div>
          <div>
            <span class="text-lg text-white px-3 py-1 bg-primary rounded-lg">搭乘捷運</span>
            <p class="mt-1">忠孝新生站 1號出口 / 善導寺站 6號出口</p>
          </div>
          <div>
            <span class="text-lg text-white px-3 py-1 bg-primary rounded-lg">搭乘公車</span>
            <p class="mt-1">站牌: 華山公園站(市民大道) / 台北科技大學站(八德路) / 忠孝國小站 / 華山文創園區(忠孝東路)</p>
          </div>
          <div>
            <span class="text-lg text-white px-3 py-1 bg-primary rounded-lg">自行開車</span>
            <p class="mt-1">園區停車場 / 周邊停車場</p>
          </div>
        </div>
      </div>
    </div>

    <VueFinalModal
      v-model="showModal"
      class="flex justify-center items-center"
      content-class="flex flex-col max-w-xl max-h-3/4 overflow-auto m-4 p-4 bg-white border rounded-lg"
      :reserveScrollBarGap="false"
    >
      <div>
        <p class="font-bold text-lg mb-2">我已同意以下條款：</p>
        <p>謹依個人資料保護法第 8 條規定告知以下事項：</p>
        <p>您為本次活動的參與者（以下簡稱參與人）。 參與人所填寫的資料將會提供今周刊。請確認在勾選同意前已詳閱並同意以下條款：今周刊基於客戶管理、統計及調查分析、行銷及其他合於營業登記項目或章程所定業務需要或其他法令所准許之特定目的，向參與人蒐集前述個人資料，並管理維護及處理利用，其得就該等個人資料用於寄送出版物、提供各項服務或活動訊息與調查分析使用。參與人得向今周刊請求查閱、提供複本、更正或補充個人資訊，及請求刪除或停止處理利用。若參與人填寫資料不完整時，可能會影響參與人獲得今周刊所提供之服務或各項訊息通知與活動之權益。</p>
      </div>
    </VueFinalModal>

    <VueFinalModal
      v-model="signupSuccess"
      class="flex justify-center items-center"
      content-class="relative flex flex-col max-w-xl max-h-3/4 overflow-auto m-4 p-4 bg-white border rounded-lg"
      :reserveScrollBarGap="false"
      :clickToClose="false"
    >
      <div class="space-y-4">
        <h4 class="text-2xl text-primary font-bold">
          報名成功！
        </h4>
        <p>感謝您報名參加「2024 自綠生活節」!</p>
        <div v-if="signupResult.length">
          <ul class="pl-6">
            <li v-for="result in signupResult" :key="result.index" class="list-disc font-bold">
              {{ result.sSignUpResult }}
            </li>
          </ul>
          <div>
            <p>本次沙龍講座為免費參加，請準時入場！</p>
            <p>若逾時入場，將不保留座位，並開放給現場民眾，謝謝！</p>
          </div>
        </div>
        <div class="text-center">
          <button class="btn w-full sm:w-1/3" @click="signupSuccess = false">確定</button>
        </div>
      </div>
    </VueFinalModal>
  </div>
</template>

<script setup>
import ContentBox from '../../layouts/ContentBox.vue'
import { VueFinalModal } from 'vue-final-modal'
import useClientConfig from '../../composables/useClientConfig'
import api from '../../service/api'

const showModal = ref(false)

const loading = ref(false)
const signupSuccess = ref(false)
const signupResult = ref([])

const { isWebtest, isDev } = useClientConfig()
const { app } = useRuntimeConfig()

const bgImage = new URL(`../../assets/images/signup-backdrop.svg`, import.meta.url).href
const bgStyle = new URL(`../../assets/images/background.png`, import.meta.url).href

watch(() => signupSuccess.value, (bool) => {
  if (!bool) {
    // 重置表單
    signupResult.value = []
    getLectureStatus()

    name.value = ''
    cell_phone.value = ''
    gender.value = null
    email.value = ''
    is_join_day_1.value = false
    is_join_day_2.value = false
    is_agree.value = false
  }
})

const formState = reactive({
  registrable: false,
  deadlineMsg: ''
})

// form
const name = ref('')
const cell_phone = ref('')
const gender = ref(null)
const email = ref('')
const is_join_day_1 = ref(false)
const is_join_day_2 = ref(false)
const is_agree = ref(false)

const lectures = reactive([])
api.get(`${app.baseURL}static/data/get_lectures.json?${new Date().getTime()}`).then((res) => {
  if (typeof res === 'object') {
    const { registrable, deadlineMsg } = res
    lectures.push(...res.lectures)
    formState.registrable = registrable
    formState.deadlineMsg = deadlineMsg

    if (registrable) getLectureStatus()
    
  } else {
    alert('取得沙龍講座失敗')
    console.error(res)
  }
}).catch((error) => {
  alert('取得沙龍講座錯誤')
  console.error(error)
})

const lecturesMapping = computed(() => {
  const payloadStr = lectures.reduce((prev, item) => {
    return item.checked ? prev += `${item.code}:${item.attendances}/` : prev
  }, '')
  return payloadStr.slice(0, -1)
})

const eventMapping = computed(() => {
  if (is_join_day_1.value && is_join_day_2.value) {
    return '1_2'
  }
  return is_join_day_1.value ? '1' : '2'
})

const getLectureStatus = () => {
  const httpReq = isDev ? api.get : api.post;
  const requestTarget = isWebtest ?
    'https://events-cherry.businesstoday.com.tw/backend/missiongreener2_2024/getDisabledSignUpId' :
    'https://events.businesstoday.com.tw/backend/missiongreener2_2024/getDisabledSignUpId';

  httpReq(isDev ? '/static/data/getDisabledSignUpId.json' : requestTarget).then((res) => {
    if (res.bIsSuccess === 1) {
      lectures.forEach(item => {
        item.full = res.aDisableSignUpId.some(id => id === item.code)
        item.checked = false
        item.attendances = '1'
      })
    } else {
      alert(res.sError)
    }
  }).catch((error) => {
    alert('取得講座額滿狀態失敗')
    console.error(error)
  })
}

const submit = () => {
  if (loading.value) return;

  if (!name.value) {
    alert('請輸入您的姓名')
    return
  }

  if (!cell_phone.value || cell_phone.value.length < 10) {
    alert('請輸入手機號碼，如：0912345678')
    return
  } else {
    if (!cell_phone.value.split('').every(str => /^\d+$/.test(str))) {
      alert('請輸入手機號碼，如：0912345678')
      return
    }
  }
  
  if (!gender.value) {
    alert('請選擇您的性別')
    return
  }

  if (!email.value) {
    alert('請輸入您的 e-mail')
    return
  } else {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!pattern.test(email.value)) {
      alert('請輸入有效的 e-mail')
      return
    }
  }

  if (!is_join_day_1.value && !is_join_day_2.value) {
    alert('請選擇您想參加的日期')
    return
  }

  // if (!lecturesMapping.value) {
  //   alert('請選擇您想參加的沙龍講座場次')
  //   return
  // }

  if (!is_agree.value) {
    alert('請勾選同意個資蒐集')
    return
  }

  loading.value = true
  const httpReq = isDev ? api.get : api.post;
  const requestTarget = isWebtest ?
    'https://events-cherry.businesstoday.com.tw/backend/missiongreener2_2024/sign_up' :
    'https://events.businesstoday.com.tw/backend/missiongreener2_2024/sign_up';
  
  httpReq(isDev ? '/static/data/signup_lecture_res.json' : requestTarget, {
    'Name': name.value,
    'Cell_phone': cell_phone.value,
    'Gender': gender.value,
    'Email': email.value,
    'Sign_up_data': lecturesMapping.value,
    'Sign_up_data_2': eventMapping.value,
    'Is_agree': is_agree.value ? '1' : '0',
  }).then((res) => {
    // console.log(res)
    if (res.bIsSignUpSuccess === 1) {
      signupResult.value = res.aSignUpResult
      signupSuccess.value = true
    } else {
      alert(`報名失敗: ${res.sError}`)
    }

    loading.value = false
    
  }).catch((error) => {
    alert('報名送出失敗')
    loading.value = false
    console.error(error)
  })
  
}

</script>