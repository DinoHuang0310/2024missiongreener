export default function useClientConfig() {

  const hostname = window.location.hostname
  const isWebtest = hostname.includes('webtest')
  const isDev = process.env.NODE_ENV === 'development'

  const publicPath = isDev ? '/' : '/bt_topic/2024/missiongreener/'

  return {
    isWebtest,
    isDev,
    publicPath,
  }
}