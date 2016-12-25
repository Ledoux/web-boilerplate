import { IS_PROD } from './config'

const MIXPANEL_API_TOKEN = IS_PROD ? 'fffb50939895382d08cc14ca10ff89f8' : '3118ab516bbfb20e3809480eccc40c17'

// from http://stackoverflow.com/a/8809472
function generateUUID () {
  var d = new Date().getTime()
  if (typeof window !== 'undefined' && window.performance && typeof window.performance.now === 'function') {
    d += window.performance.now() // use high-precision timer if available
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
  return uuid
}

const userTrackingId = generateUUID()

export function trackEvent (value, extra) {
  if (!IS_PROD) {
    console.info('DEV::trackEvent', value, extra)
    return
  }
  if (window.navigator.doNotTrack) {
    return
  }
  if (window.ga) {
    window.ga('send', 'event', 'Click', value, extra, { 'nonInteraction': true })
  }
  if (window.mixpanel && window.mixpanel.track) {
    window.mixpanel.track(value, { 'extra': extra })
  }
  window['optimizely'] = window['optimizely'] || []
  window.optimizely.push(['trackEvent', value])
}

export function trackPageView () {
  const pathname = window.location.pathname
  if (!IS_PROD) {
    console.info('DEV::trackPageView', pathname)
    return
  }
  if (window.navigator.doNotTrack || !window.ga) {
    return
  }
  window.ga('set', 'page', pathname)
  window.ga('send', 'pageview')
}

export function trackException (e) {
  if (window.navigator.doNotTrack || !window.ga || !e) {
    return
  }
  window.ga('send', 'exception', {
    exDescription: 'JavaScript Error ' + e.message + ' ' + e.filename + ': ' + e.lineno
  })
}

export function trackMixpanelUser (user) {
  const http = new window.XMLHttpRequest()

  http.open('POST', 'https://r.snips.ai/registration', true)
  http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
  let data = {
    id: userTrackingId,
    mixpanelApiToken: MIXPANEL_API_TOKEN,
    mixpanelData: user
  }
  if (!IS_PROD) {
    data.isDev = true
  }
  http.send(JSON.stringify(data))
}

export function trackFBPixelEvent (eventId, eventConfig) {
  if (IS_PROD && window._fbq && !window.navigator.doNotTrack) {
    window._fbq.push(['track', eventId, eventConfig])
  }
}
