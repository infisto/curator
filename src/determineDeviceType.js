export function determineDeviceType(_value) {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
      _value = 'mobile'
    } else {
      _value = 'PC'
    }
  }