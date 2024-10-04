/** @type {import('tailwindcss').Config} */

const isDev = process.env.NODE_ENV === 'development'
const publicPath = isDev ? '/' : '/bt_topic/2024/missiongreener/'

module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.{js,ts,vue}'
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        yellow: 'var(--color-yellow)',
        bgcolor: '#fffbf0',
        bgsecondary: '#f0eae2',
        footer: '#4b4b4b'
      },
      spacing: {
        '1/10': '10%',
        '2/5': '40%',
        '1/5': '20%',
      },
      maxWidth: {
        '2/3': '66.666667%',
        '11/12': '91.666667%',
        '20': '5rem',
        '28': '7rem',
      },
      maxHeight: {
        '3/4': '75%',
      },
      rotate: {
        '225': '225deg',
      },
      backgroundSize: {
        'full': '100%',
      },
      backgroundImage: {
        'kvm': `url("${publicPath}static/images/background-m.jpg")`,
        'kvpad': `url("${publicPath}static/images/background-p.jpg")`,
        'kv': `url("${publicPath}static/images/background.jpg")`,
      },
      aspectRatio: {
        '4/3': '4 / 3',
      },
    },
    container: {
      center: true,
      screens: {
        sm: '600px',
        md: '728px',
        lg: '900px',
        xl: '1024px',
      },
    },
  },
  plugins: []
}