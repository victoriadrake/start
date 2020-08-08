document.addEventListener('DOMContentLoaded', function (event) {
  setTime()
  setDate()
  setStyle()
  setInterval(setTime, 1000)

  const button = document.querySelector('.content-input > button')

  button.addEventListener('click', search)
  document.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) search()
  })

  function setTime () {
    const now = new Date()
    const utcTime = now.toISOString().replace('T', ' ').replace('.', ' ').substr(11, 9) + ' UTC'

    document.getElementById('current-time').innerHTML = now.toLocaleTimeString()
    document.getElementById('utc-time').innerHTML = utcTime
  }

  function setDate () {
    const now = new Date()
    document.getElementById('date').innerHTML = now.toDateString().substr(4)
  }

  function search () {
    const str = document.getElementById('search').value

    const output = 'https://www.startpage.com/do/dsearch?query=' + str

    location.href = output
  }

  function setStyle () {
    const now = new Date()
    const h = now.getHours()
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const w = now.getDay()
    const day = days[w]

    const greetings = document.querySelector('.content-greeting > h1')

    let period

    if (h >= 4 && h < 12) period = 1
    else if (h >= 12 && h < 18) period = 2
    else if (h >= 18) period = 3
    else period = 0

    if (period === 1) {
      greetings.innerHTML = 'Good morning. It\'s ' + day + '.'
      document.querySelector(':root').style.setProperty('--background', '#DCEDFF')
      document.querySelector(':root').style.setProperty('--input', '#fff')
      document.querySelector(':root').style.setProperty('--link', '#4A5E6D')
      document.querySelector(':root').style.setProperty('--shadow', '#232C33')
      document.querySelector(':root').style.setProperty('--color', '#232C33')
    }
    if (period === 2) {
      greetings.innerHTML = 'Good afternoon. It\'s ' + day + '.'
      document.querySelector(':root').style.setProperty('--background', '#97C3B6')
      document.querySelector(':root').style.setProperty('--input', '#F9E7E7')
      document.querySelector(':root').style.setProperty('--color', '#0A2E36')
      document.querySelector(':root').style.setProperty('--shadow', '#0A2E36')
    }
    if (period === 3) {
      greetings.innerHTML = 'Good evening. It\'s still ' + day + '.'
      document.querySelector(':root').style.setProperty('--background', '#161212')
      document.querySelector(':root').style.setProperty('--input', '#7B6565')
      document.querySelector(':root').style.setProperty('--color', '#F9E7E7')
      document.querySelector(':root').style.setProperty('--link', '#7B6565')
      document.querySelector(':root').style.setProperty('--hover', '#F9E7E7')
      document.querySelector(':root').style.setProperty('--shadow', '#000')
    }
    if (period === 0) {
      greetings.innerHTML = 'It\'s ' + day + ' already. Go get some sleep!'
      document.querySelector(':root').style.setProperty('--background', '#0C0606')
      document.querySelector(':root').style.setProperty('--input', '#755')
      document.querySelector(':root').style.setProperty('--color', '#EDD')
      document.querySelector(':root').style.setProperty('--link', '#755')
      document.querySelector(':root').style.setProperty('--hover', '#EDD')
      document.querySelector(':root').style.setProperty('--shadow', '#000')
    }
  }
})
