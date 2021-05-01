<template>
  <div class="cloud" v-if="deviceType === 'PC'">
    <div class="cloud-content">
      <div class="AppWeather-wrapper" ref="wrapper">
        <div class="AppWeather-content-up">
          <div class="AppWeather-content-up-main">
            <select class="select-css" v-model="selectedCity" @change="getWeatherData(selectedCity)">
              <option v-for="(city, index) in cities" :key="index" :value="index">{{city}}</option>
            </select>
            <div class="AppWeather-content-up-main-data">
              <h1>{{new Date().getDate()}}</h1>
              <div>
                <h2>{{date.months[new Date().getMonth()]}}</h2>
                <h2>{{date.week[new Date().getDay()]}}</h2>
                <h2>{{date.hour}}:{{date.minutes < 10 ? '0' + date.minutes : date.minutes}}</h2>
              </div>
            </div>
            <div class="AppWeather-content-up-main-description">
              <h1>{{temperatureCity}}&deg;</h1>
              <h2>{{descriptionWeather}}</h2>
            </div>
          </div>
        </div>
        <div class="AppWeather-content-up-additional">
          <div class="AppWeather-content-up-additional-left">
            <p>Visibility: {{visibility}}km</p>
            <p>Sunrise: {{sunrise}} A.M.</p>
            <p>Sunset: {{sunset}} P.M.</p>
            <p>Timezone: {{timezone}}</p>
          </div>
          <div class="AppWeather-content-up-additional-right">
            <p>Max: {{maxTemp}}&deg; Min: {{minTemp}}&deg;</p>
            <p>Feels like: {{feelsLikeTemp}}&deg;</p>
            <p>Pressure: {{pressure}}mmHg</p>
            <p>Humidity: {{humidity}}%</p>
          </div>
        </div>
        <div class="AppWeather-content-footer">
          <!-- 8 боксов для информации -->
          <div class="appWeather-content-footer-wrapper">
            <div class="appWeather-content-footer-wrapper-box" v-for="data in weatherData">
              <div><img :src="`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`" alt="" class="icon-weather"></div>
              <p>{{data.dt_txt.slice(5,10)}}</p>
              <p>{{data.dt_txt.slice(10)}}</p>
              <h2>{{Math.round(data.main.temp - 273.15)}}&deg;</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <img src="../pictures/cloud-01(1).png" alt="" class="cloud1">
    <img src="../pictures/cloud-02(1).png" alt="" class="cloud2">
    <img src="../pictures/cloud-03(1).png" alt="" class="cloud3">
    <img src="../pictures/cloud-04(1).png" alt="" class="cloud4">
  </div>
  <div class="cloud-wrapper" v-else>
    <select class="select-css" v-model="selectedCity" @change="getWeatherData(selectedCity)">
      <option v-for="(city, index) in cities" :key="index" :value="index">{{city}}</option>
    </select>
    <div class="description">
      <h2>{{descriptionWeather}}</h2>
      <h2>{{temperatureCity}}&deg;</h2>
      <h2>Max: {{maxTemp}}&deg; Min: {{minTemp}}&deg;</h2>
    </div>
    <div class="appWeather-content-footer-wrapper">
      <div class="appWeather-content-footer-wrapper-box" v-for="data in weatherData">
        <div><img :src="`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`" alt="" class="icon-weather"></div>
        <p>{{data.dt_txt.slice(5,10)}}</p>
        <p>{{data.dt_txt.slice(10)}}</p>
        <h2>{{Math.round(data.main.temp - 273.15)}}&deg;</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppWeather",
  data() {
    return {
      date: {
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        week: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
        hour: new Date().getHours(),
        minutes: new Date().getMinutes()
      },
      cities: {
        500095: 'Ryazan',
        524901: 'Moscow',
        542420: 'Krasnodar',
        1496747: 'Novosibirsk',
        498677: 'Saratov',
        480716: 'Tuapse',
        522941: 'Neftekumsk',
        515003: 'Orenburg',
      },
      selectedCity: 500095,
      temperatureCity: '',
      descriptionWeather: '',
      maxTemp: '',
      minTemp: '',
      pressure: '',
      visibility: '',
      humidity: '',
      sunset: '',
      sunrise: '',
      feelsLikeTemp: '',
      timezone: '',
      weatherData: [],
      icons: [],
      timesArray: [],
      wrapper: '',
      deviceType: ''
    }
  },
  mounted() {
    this.getWeatherData(500095)
    this.determineDeviceType()
  },
  methods: {
    getWeatherData(cityId) {
      fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${process.env.VUE_APP_OW_KEY}`)
      .then(response => response.json())
      .then(data => {
        this.temperatureCity = Math.round(data.list[0].main.temp - 273,15)
        this.descriptionWeather = data.list[0].weather[0].description[0].toUpperCase() + data.list[0].weather[0].description.slice(1)
        this.maxTemp = Math.round(data.list[0].main.temp_max -273.15)
        this.minTemp = Math.round(data.list[0].main.temp_min -273.15)
        this.visibility = data.list[0].visibility / 1000
        this.pressure = (data.list[0].main.pressure / 1.333).toFixed(2)
        this.humidity = data.list[0].main.humidity
        this.sunset =  new Date(data.city.sunset * 1000).getHours()
        this.sunrise = new Date(data.city.sunrise * 1000).getHours()
        this.timezone = data.city.timezone
        this.feelsLikeTemp = Math.round(data.list[0].main.feels_like -273.15)
        this.weatherData = data.list.filter((item, index) => {
          return  index % 4 === 0
        })
        this.icons = this.weatherData.map(item => {
          return item.weather[0].icon
        })
        this.timesArray = this.weatherData.map(item => {
          return item.dt_txt
        })
      })
    },
    determineDeviceType() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        this.deviceType = 'mobile'
      } else {
        this.deviceType = 'PC'
      }
    }
  },
}
</script>

<style>
h1 {
  color: black;
  text-transform: uppercase;
}
h2, p {
  color: black;
}
.AppWeather-wrapper {
  display: flex;
  flex-direction: column;
  margin-top: 2%;
}
.AppWeather-content-up {
  display: flex;
}
.AppWeather-content-up-main {
  padding-left: 100px;
}
.AppWeather-content-up-main-data {
  display: flex;
  margin-bottom: 1%;
  margin-top: 25%;
}
.AppWeather-content-up-main-data div {
  margin-top: 24px;
  margin-left: 15px;
}
.AppWeather-content-up-main-data h1{
  font-size: 110px;
}
.AppWeather-content-up-additional {
  display: flex;
  width: 100vh;
  justify-content: space-between;
  margin-top: 3%;
}
.AppWeather-content-up-additional p {
  font-size: 18px;
}
.AppWeather-content-up-additional-left {
  margin-left: 100px;
}
.AppWeather-content-up-additional-right p{
  font-size: 24px;
}
.AppWeather-content-up-additional-left p {
  font-size: 24px;
}
.AppWeather-content-up-main-description {
  margin-top: 5%;
}
.AppWeather-content-up-main-description h1 {
  font-size: 75px;
  margin-top: 3%;
}
.AppWeather-content-up-main-description h2 {
  margin-top: 10px;
}
.AppWeather-content-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  opacity: 0.5;
  margin-top: 3%;
}
.appWeather-content-footer-wrapper {
  display: flex;
}
.appWeather-content-footer-wrapper-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 25px;
  border-radius: 10px;
  box-shadow: 0 0 10px grey;

}
.appWeather-content-footer-wrapper-box p,
.appWeather-content-footer-wrapper-box h2{
  text-align: center;
  color: white;
}
.appWeather-content-footer-wrapper-box div {
  display: flex;
  align-items: center;
  justify-content: center;
}
.appWeather-content-footer-wrapper-box div img {
  width: 70%;
  position: relative;
}
.select-css {
  display: block;
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 700;
  color: #444;
  line-height: 1.3;
  padding: .6em 1.4em .5em .8em; width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
  border-radius: .5em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'), linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
  background-repeat: no-repeat, repeat;
  background-position: right .7em top 50%, 0 0;
  background-size: .65em auto, 100%;
}
.select-css::-ms-expand { display: none; }
.select-css:hover { border-color: #888; }
.select-css:focus { border-color: #aaa;
  box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
  color: #222;
  outline: none;
}
.select-css option { font-weight:normal; }
*[dir="rtl"] .select-css, :root:lang(ar) .select-css, :root:lang(iw) .select-css {
  background-position: left .7em top 50%, 0 0;
  padding: .6em .8em .5em 1.4em;
}
.cloud {
  overflow: hidden;
  position: relative;
  width:100%;
  background: url(../pictures/mountains-29.jpg);
  background-size: cover;
}
.cloud-content {
  position: relative;
  padding:30px;
  color: #337AB7;
  font-size:22px;
  font-weight:bold;
  z-index:100;
}
.cloud img {
  width: 100%;
  left: 0;
  top: 0;
  position: absolute;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  pointer-events: none;
}
@-webkit-keyframes animCloud {
  from {
    -webkit-transform: translateX(100%)
  }
  to {
    -webkit-transform: translateX(-100%)
  }
}
@-moz-keyframes animCloud {
  from {
    -moz-transform: translateX(100%)
  }
  to {
    -moz-transform: translateX(-100%)
  }
}
@keyframes animCloud {
  from {
    -webkit-transform: translateX(100%);
    -moz-transform: translateX(100%);
    -ms-transform: translateX(100%);
    -o-transform: translateX(100%);
    transform: translateX(100%)
  }
  to {
    -webkit-transform: translateX(-100%);
    -moz-transform: translateX(-100%);
    -ms-transform: translateX(-100%);
    -o-transform: translateX(-100%);
    transform: translateX(-100%)
  }
}
.cloud1 {
  -webkit-animation: animCloud 20s infinite linear;
  -moz-animation: animCloud 20s infinite linear;
  animation: animCloud 20s infinite linear
}
.cloud2 {
  -webkit-animation: animCloud 40s infinite linear;
  -moz-animation: animCloud 40s infinite linear;
  animation: animCloud 40s infinite linear
}
.cloud3 {
  -webkit-animation: animCloud 60s infinite linear;
  -moz-animation: animCloud 60s infinite linear;
  animation: animCloud 60s infinite linear
}
.cloud4 {
  -webkit-animation: animCloud 80s infinite linear;
  -moz-animation: animCloud 80s infinite linear;
  animation: animCloud 80s infinite linear
}
@media (max-width: 768px) {
  .cloud-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    background-color: #ffffff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 800'%3E%3Cdefs%3E%3CradialGradient id='a' cx='400' cy='400' r='44.5%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%231cf0ff'/%3E%3C/radialGradient%3E%3CradialGradient id='b' cx='400' cy='400' r='47.2%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%230FF'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='800'/%3E%3Cg fill-opacity='0.27'%3E%3Cpath fill='url(%23b)' d='M998.7 439.2c1.7-26.5 1.7-52.7 0.1-78.5L401 399.9c0 0 0-0.1 0-0.1l587.6-116.9c-5.1-25.9-11.9-51.2-20.3-75.8L400.9 399.7c0 0 0-0.1 0-0.1l537.3-265c-11.6-23.5-24.8-46.2-39.3-67.9L400.8 399.5c0 0 0-0.1-0.1-0.1l450.4-395c-17.3-19.7-35.8-38.2-55.5-55.5l-395 450.4c0 0-0.1 0-0.1-0.1L733.4-99c-21.7-14.5-44.4-27.6-68-39.3l-265 537.4c0 0-0.1 0-0.1 0l192.6-567.4c-24.6-8.3-49.9-15.1-75.8-20.2L400.2 399c0 0-0.1 0-0.1 0l39.2-597.7c-26.5-1.7-52.7-1.7-78.5-0.1L399.9 399c0 0-0.1 0-0.1 0L282.9-188.6c-25.9 5.1-51.2 11.9-75.8 20.3l192.6 567.4c0 0-0.1 0-0.1 0l-265-537.3c-23.5 11.6-46.2 24.8-67.9 39.3l332.8 498.1c0 0-0.1 0-0.1 0.1L4.4-51.1C-15.3-33.9-33.8-15.3-51.1 4.4l450.4 395c0 0 0 0.1-0.1 0.1L-99 66.6c-14.5 21.7-27.6 44.4-39.3 68l537.4 265c0 0 0 0.1 0 0.1l-567.4-192.6c-8.3 24.6-15.1 49.9-20.2 75.8L399 399.8c0 0 0 0.1 0 0.1l-597.7-39.2c-1.7 26.5-1.7 52.7-0.1 78.5L399 400.1c0 0 0 0.1 0 0.1l-587.6 116.9c5.1 25.9 11.9 51.2 20.3 75.8l567.4-192.6c0 0 0 0.1 0 0.1l-537.3 265c11.6 23.5 24.8 46.2 39.3 67.9l498.1-332.8c0 0 0 0.1 0.1 0.1l-450.4 395c17.3 19.7 35.8 38.2 55.5 55.5l395-450.4c0 0 0.1 0 0.1 0.1L66.6 899c21.7 14.5 44.4 27.6 68 39.3l265-537.4c0 0 0.1 0 0.1 0L207.1 968.3c24.6 8.3 49.9 15.1 75.8 20.2L399.8 401c0 0 0.1 0 0.1 0l-39.2 597.7c26.5 1.7 52.7 1.7 78.5 0.1L400.1 401c0 0 0.1 0 0.1 0l116.9 587.6c25.9-5.1 51.2-11.9 75.8-20.3L400.3 400.9c0 0 0.1 0 0.1 0l265 537.3c23.5-11.6 46.2-24.8 67.9-39.3L400.5 400.8c0 0 0.1 0 0.1-0.1l395 450.4c19.7-17.3 38.2-35.8 55.5-55.5l-450.4-395c0 0 0-0.1 0.1-0.1L899 733.4c14.5-21.7 27.6-44.4 39.3-68l-537.4-265c0 0 0-0.1 0-0.1l567.4 192.6c8.3-24.6 15.1-49.9 20.2-75.8L401 400.2c0 0 0-0.1 0-0.1L998.7 439.2z'/%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
  }
  .select-css {
    margin-top: 15px;
    width: 50%;
  }
  .appWeather-content-footer-wrapper {
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .appWeather-content-footer-wrapper-box {
    padding: 0;
    margin: 5px;
  }
  .description {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .description h2 {
    color: white;
  }
}

</style>

