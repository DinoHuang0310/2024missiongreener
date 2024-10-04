import { resolve } from 'path'
// import { defineNuxtModule } from 'nuxt'
// https://nuxt.com/docs/api/configuration/nuxt-config
const isDev = process.env.NODE_ENV === 'development'
const publicPath = isDev ? '/' : '/bt_topic/2024/missiongreener/'

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],

  'vite': {
    'build': {
      'assetsInlineLimit': 0, // 禁止圖檔轉base64
    }
  },

  typescript: {
    typeCheck: true
  },

  css: [
    'vue-final-modal/style.css',
    '~/assets/css/main.css',
  ],

  hooks: {
    'pages:extend' (pages) {
      // add a route
      pages.push({
        name: 'event',
        path: '/event',
        file: resolve(__dirname, './pages/index.vue'),
      })
      pages.push({
        name: 'signup',
        path: '/signup',
        file: resolve(__dirname, './pages/index.vue'),
      })
      pages.push({
        name: 'news',
        path: '/news',
        file: resolve(__dirname, './pages/index.vue'),
      })
    }
  },

  app: {
    baseURL: publicPath,
    cdnURL: publicPath,
    head: {
      htmlAttrs: {
        lang: 'zh-TW',
      },
      title: '2024 自綠生活節｜用行動替地球種下一顆永續樹 實踐你我自綠的一小步',
      meta: [
        { name: 'viewport', content: 'initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, width=device-width' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'keywords', content: '自綠, 永續, 綠生活, 循環經濟, 綠能, ESG, 生活節, 市集'},
        { name: 'author', content: '今周刊' },
        { name: 'copyright', content: `©${new Date().getFullYear()} Business Today All rights reserved` },
        { name: 'description', content: '今周刊以聯合國ACT NOW 12大個人氣候變遷行動做為基底，10/26-27邀請你一起來華山參加自綠生活節，即刻採取永續行動，搶救脆弱的地球！' },
        
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: '2024 自綠生活節｜用行動替地球種下一顆永續樹 實踐你我自綠的一小步' },
        { property: 'og:description', content: '今周刊以聯合國ACT NOW 12大個人氣候變遷行動做為基底，10/26-27邀請你一起來華山參加自綠生活節，即刻採取永續行動，搶救脆弱的地球！' },
        { property: 'og:image', content: `${ publicPath }ogimage.jpg` },
      ],
      link: [
        { rel: 'icon', href: `${ publicPath }favicon.ico` },
        { rel: 'preload', href: `${ publicPath }static/images/event-title.png`, as: 'image' }
      ],
      script: [
        isDev ? {} : { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-E8H9YJZQJP' },
        isDev ? {} : { children: `
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }
          gtag('js', new Date());
          gtag('config', 'G-E8H9YJZQJP');
        ` }
      ],
    },
  },
  ssr: false,
})