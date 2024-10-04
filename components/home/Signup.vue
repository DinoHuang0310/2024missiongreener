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

      <div class="relative bg-white p-6 xl:px-10 sm:py-12 rounded-xl shadow-[7px_7px_0px_0px_rgba(0,0,0,0.05)] sm:shadow-[10px_10px_0px_0px_rgba(0,0,0,0.05)]">
        <div class="flex flex-wrap justify-center sm:space-x-8">
          <div class="w-full sm:w-[40%] space-y-4 sm:space-y-6 mb-4 sm:mb-0">
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
              <label class="mr-4">
                <input class="scale-125 mr-2 w-4 h-4" type="radio" v-model="gender" value="男性">男
              </label>
              <label class="mr-4">
                <input class="scale-125 mr-2 w-4 h-4" type="radio" v-model="gender" value="女性">女
              </label>
              <label class="mr-4">
                <input class="scale-125 mr-2 w-4 h-4" type="radio" v-model="gender" value="其他">其他
              </label>
            </div>
          </div>

          <div class="w-full sm:w-[40%] space-y-4 sm:space-y-6">
            <!-- <select
              class="border-2 p-3 w-full invalid:text-black/30 invalid:text-base"
              v-model="gender"
              required
            >
              <option class="hidden" value="" disabled>性別</option>
              <option value="男性">男</option>
              <option value="女性">女</option>
              <option value="其他">其他</option>
            </select> -->
            <input
              type="text"
              class="border-2 p-3 w-full placeholder:text-black/30 placeholder:text-base"
              placeholder="E-mail"
              v-model="email"
              maxlength="100"
            >
            <div>
              <p class="text-lg">報名日期</p>
              <div>
                <label class="inline-block mr-6">
                  <input class="scale-125 mr-2 w-4 h-4" type="checkbox" v-model="is_join_day_1">10/26(六)
                </label>
                <label class="inline-block">
                  <input class="scale-125 mr-2 w-4 h-4" type="checkbox" v-model="is_join_day_2">10/27(日)
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="sm:w-[80%] mx-auto mt-8 text-center">
          <label class="inline-block whitespace-nowrap">
            <input class="scale-125 mr-2 w-4 h-4 mb-6" type="checkbox" v-model="is_agree">
            我已閱讀<span class="text-yellow underline cursor-pointer" @click.prevent="showModal = !showModal">個資條款</span>且同意送出資料
          </label>
          <div>
            <button class="text-white bg-yellow p-3 w-full font-bold tracking-widest" @click="submit">送出報名</button>
          </div>
        </div>
      </div>

      <ol class="mt-6 mb-12 pl-4 space-y-1">
        <li class="flex items-center">
          <span class="w-6 mr-2"><img src="../../assets/images/list-style-leaf.png" alt="leaf" loading="lazy"></span>
          <p class="flex-1">本活動為免費參加。</p>
        </li>
        <li class="flex items-center">
          <span class="w-6 mr-2"><img src="../../assets/images/list-style-leaf.png" alt="leaf" loading="lazy"></span>
          <p class="flex-1">主辦單位保留變更日期、終止活動及受理報名之權利。​</p>
        </li>
      </ol>
    </div>

    <div class="flex flex-wrap bg-white">
      <div class="w-full lg:w-1/2">
        <div class="relative pb-[60%]">
          <iframe
            class="absolute w-full h-full top-0 left-0 border-0 outline-none focus:border-0 focus:outline-none"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.7052606447637!2d121.52678337599347!3d25.044074637884666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a96523e0246d%3A0xf1c9276707165c71!2z6I-v5bGxMTkxNOaWh-WMluWJteaEj-eUoualreWckuWNgA!5e0!3m2!1szh-TW!2stw!4v1689578266488!5m2!1szh-TW!2stw"
            loading="lazy"
            frameBorder="0"
            referrerpolicy="no-referrer-when-downgrade"
          />
        </div>
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
        <p class="font-bold mb-2">我已同意以下條款：</p>
        <p>謹依個人資料保護法第 8 條規定告知以下事項：</p>
        <p>您為本次活動的參與者（以下簡稱參與人）。 參與人所填寫的資料將會提供今周刊。請確認在勾選同意前已詳閱並同意以下條款：今周刊基於客戶管理、統計及調查分析、行銷及其他合於營業登記項目或章程所定業務需要或其他法令所准許之特定目的，向參與人蒐集前述個人資料，並管理維護及處理利用，其得就該等個人資料用於寄送出版物、提供各項服務或活動訊息與調查分析使用。參與人得向今周刊請求查閱、提供複本、更正或補充個人資訊，及請求刪除或停止處理利用。若參與人填寫資料不完整時，可能會影響參與人獲得今周刊所提供之服務或各項訊息通知與活動之權益。</p>
      </div>
    </VueFinalModal>

    <VueFinalModal
      v-model="signupSuccess"
      class="flex justify-center items-center"
      content-class="flex flex-col max-w-xl max-h-3/4 overflow-auto m-4 p-4 bg-white border rounded-lg"
      :reserveScrollBarGap="false"
      :clickToClose="false"
    >
      <div class="space-y-4">
        <h4 class="text-2xl text-primary font-bold">報名成功</h4>
        <p>活動另有多場精彩<NuxtLink class="text-yellow underline" to="/lecture">沙龍講座</NuxtLink>，歡迎預約報名~</p>
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
import api from '../../service/api'
import useClientConfig from '../../composables/useClientConfig'

const props = defineProps({
  registrable: {
    type: Boolean,
    default: false
  },
  deadlineMsg: {
    type: String,
    default: ''
  }
})

const bgImage = new URL(`../../assets/images/signup-backdrop.svg`, import.meta.url).href
const bgStyle = new URL(`../../assets/images/background.png`, import.meta.url).href

const showModal = ref(false)

const loading = ref(false)
const signupSuccess = ref(false)
// form
const name = ref('')
const cell_phone = ref('')
const gender = ref('')
const email = ref('')
const is_join_day_1 = ref(false)
const is_join_day_2 = ref(false)
const is_agree = ref(false)

const submit = () => {
  if (loading.value || !props.registrable) return;

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
      alert('請輸入有效的 e-mail');
      return;
    }
  }
  if (!is_join_day_1.value && !is_join_day_2.value) {
    alert('請選擇您想參加的日期')
    return
  }
  if (!is_agree.value) {
    alert('請勾選同意個資蒐集')
    return
  }

  loading.value = true
  const { isWebtest, isDev } = useClientConfig()

  const httpReq = isDev ? api.get : api.post;
  const requestTarget = isWebtest ?
    'https://events-johnny.businesstoday.com.tw/backend/missiongreener_2024/sign_up' :
    'https://events.businesstoday.com.tw/backend/missiongreener_2024/sign_up';

  httpReq(isDev ? '/static/data/signup_res.json' : requestTarget, {
    'Name': name.value,
    'Cell_phone': cell_phone.value,
    'Gender': gender.value,
    'Email': email.value,
    'Is_join_day_1': is_join_day_1.value ? 1 : 0,
    'Is_join_day_2': is_join_day_2.value ? 1 : 0,
    'Is_agree': is_agree.value ? 1 : 0,
  }).then((res) => {
    if (res.bIsSuccess === 1) {
      signupSuccess.value = true

      // 重置
      name.value = ''
      cell_phone.value = ''
      gender.value = null
      email.value = ''
      is_join_day_1.value = true
      is_join_day_2.value = false
      is_agree.value = false

    } else {
      alert(`報名失敗: ${res.sError}`)
    }

    loading.value = false
    
  }).catch((error) => {
    alert('報名失敗')
    loading.value = false
    console.error(error)
  })
}

</script>