const CITY = '2643743' // Find your city ID here: https://openweathermap.org/current#cityid
const API_KEY = 'xxx' // Add your API key

document.addEventListener('DOMContentLoaded', function (event) {
  // Refresh content every 30 mins
  window.setTimeout(function () {
    window.location.reload()
    //   }, 30000) // 30 seconds for testing
  }, 1800000)

  const setTime = () => {
    const now = new Date()
    const utcTime = now.toISOString().replace('T', ' ').replace('.', ' ').substring(11, 19) + ' UTC'

    document.getElementById('current-time').innerHTML = now.toLocaleTimeString()
    document.getElementById('utc-time').innerHTML = utcTime
  }

  const setDate = () => {
    const date = new Date()
    const today = date.toLocaleString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    })
    document.getElementById('date').innerHTML = today
    document.getElementById('longdate').innerHTML = date.toDateString()

    return today
  }

  const replace = (id, data) => {
    document.getElementById(id).innerHTML = data
  }

  const setWeather = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?id=${CITY}&appid=${API_KEY}&units=imperial`
    const response = await fetch(url)
    if (response.status === 200) {
      const data = await response.json()

      // Parse data
      const city = `${data.name}: `
      const desc = `${data.weather[0].description}`
      const current = `${Math.round(data.main.temp)}°F`
      const feels = `${Math.round(data.main.feels_like)}°F`
      const high = `${Math.round(data.main.temp_max)}°F`
      const low = `${Math.round(data.main.temp_min)}°F`
      const humidity = `${data.main.humidity}%`
      const sunriseStamp = new Date(data.sys.sunrise * 1000)
      const sunrise = `${sunriseStamp.getHours()}`.padStart(2, '0') + `:${sunriseStamp.getMinutes()}`
      const sunsetStamp = new Date(data.sys.sunset * 1000)
      const sunset = `${sunsetStamp.getHours()}`.padStart(2, '0') + `:${sunsetStamp.getMinutes()}`
      const icon = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" width="75px" height="75px">`

      replace('city', city)
      replace('desc', desc)
      replace('current', current)
      replace('feels', feels)
      replace('high', high)
      replace('low', low)
      replace('humidity', humidity)
      replace('sunrise', sunrise)
      replace('sunset', sunset)
      replace('icon', icon)

      return sunriseStamp.getHours(), sunsetStamp.getHours()
    } else {
      const result = await response.json()
      console.log(result)
      replace('weather-content', '')
    }
  }

  const search = () => {
    const str = document.getElementById('search').value

    const output = 'https://www.startpage.com/do/dsearch?query=' + str

    location.href = output
  }

  function ColorLuminance (hex, lum) {
    // https://www.sitepoint.com/javascript-generate-lighter-darker-color/
    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '')
    if (hex.length < 6) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
    }
    lum = lum || 0

    // convert to decimal and change luminosity
    let rgb = '#'
    let c, i
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i * 2, 2), 16)
      c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16)
      rgb += ('00' + c).substr(c.length)
    }

    return rgb
  }

  const setStyle = (riseHour, setHour, today) => {
    const now = new Date()
    let h = now.getHours()

    let period

    if (h >= 4 && h < 12) period = 1
    else if (h >= 12 && h < 18) period = 2
    else if (h >= 18) period = 3
    else period = 0

    if (period === 1) {
      replace('greeting', 'Good morning. It\'s ')
    }
    if (period === 2) {
      replace('greeting', 'Good afternoon. It\'s ')
    }
    if (period === 3) {
      replace('greeting', 'Good evening. It\'s still ')
    }
    if (period === 0) {
      replace('greeting', 'Go get some sleep! It\'s already ')
    }

    // Set colors based on the hour
    let hour = h // Redeclare for testing
    if (hour === riseHour) {
      // Set sunrise colors
      document.querySelector(':root').style.setProperty('--background', '#c9cde5')
      document.querySelector(':root').style.setProperty('--weather', ColorLuminance('#c9cde5', 0.06))
      document.querySelector(':root').style.setProperty('--input', '#e3d6ce')
      document.querySelector(':root').style.setProperty('--link', '#9db2c5')
      document.querySelector(':root').style.setProperty('--shadow', '#e9e5dc')
      document.querySelector(':root').style.setProperty('--color', '#445b6d')
    }
    if (hour > riseHour) {
      // Set daytime colors
      document.querySelector(':root').style.setProperty('--background', '#e8e8e8')
      document.querySelector(':root').style.setProperty('--weather', ColorLuminance('#e8e8e8', 0.02))
      document.querySelector(':root').style.setProperty('--input', '#f8f8f8')
      document.querySelector(':root').style.setProperty('--link', '#788571')
      document.querySelector(':root').style.setProperty('--shadow', '#c79c72')
      document.querySelector(':root').style.setProperty('--color', '#222222')
    }
    if (hour === setHour) {
      // Set sunset colors 
      document.querySelector(':root').style.setProperty('--background', '#6e7382')
      document.querySelector(':root').style.setProperty('--weather', ColorLuminance('#6e7382', 0.09))
      document.querySelector(':root').style.setProperty('--input', '#e7ebee')
      document.querySelector(':root').style.setProperty('--link', '#ccc4b9')
      document.querySelector(':root').style.setProperty('--shadow', '#535240')
      document.querySelector(':root').style.setProperty('--color', '#222222')
    }
    if (hour > setHour) {
      // Set nighttime colors
      document.querySelector(':root').style.setProperty('--background', '#091008')
      document.querySelector(':root').style.setProperty('--weather', ColorLuminance('#091008', 0.8))
      document.querySelector(':root').style.setProperty('--input', '#3e563e')
      document.querySelector(':root').style.setProperty('--link', '#93a889')
      document.querySelector(':root').style.setProperty('--shadow', '#1f2f22')
      document.querySelector(':root').style.setProperty('--color', '#ced9df')
    }
  }
  setTime()
  let today = setDate()
  setInterval(setTime, 1000)
  let riseHour, setHour = setWeather()
  setStyle(riseHour, setHour, today)
  const button = document.querySelector('#search-button')
  button.addEventListener('click', search)

  document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') search()
  })
})