import $ from 'jquery'

const Main = () => {

  const APIKEY = '68bcf7afc9907f0b7516e5ff37358f68'

  async function currentWeather (lon, lat) {
    const WEATHERURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`

      const RESPONSEWEATHER = await fetch(WEATHERURL)
      const DATAWEATHER = await RESPONSEWEATHER.json();
      const WEATHERICON = `https://openweathermap.org/img/w/${DATAWEATHER.weather[0].icon}.png`

      $(document).ready(function() {
        $('.search-bar').css("top", -60)
        $('.humidity').html(`<i class="fa fa-water"></i> ${DATAWEATHER.main.humidity}% Humidity`)
        $('.wind-speed').html(`<i class="fa fa-wind"></i> ${DATAWEATHER.wind.speed}m/s Wind Speed`)
        $('.weather-location').text(`${DATAWEATHER.name}, ${DATAWEATHER.sys.country}`)
        $('.weather-temp').html(`${(DATAWEATHER.main.temp - 273.15).toFixed(1)}&degC`)
        $('.weather-pic').html("<img src='' alt='' class='weather-icon' id='weather-icon'/>")
        $('.weather-icon').attr('src', WEATHERICON)
        $('.supscript').text(`${DATAWEATHER.weather[0].description}`)
    })
}

async function geocodeConvert(){
  const CITYNAME = document.getElementById('search-place').value
  const GEOURL = `http://api.openweathermap.org/geo/1.0/direct?q=${CITYNAME}&appid=${APIKEY}`

  const RESPONSEGEO = await fetch(GEOURL)
  const DATA = await RESPONSEGEO.json();

  const LONGITUDE = DATA[0].lon, LATITUDE = DATA[0].lat

  currentWeather(LONGITUDE, LATITUDE)
}

  return ( 
    <main className="wrapper">
      <h1 className="title">Weather Application</h1>
      <div className="container container-fluid">
        <div className="search-bar container-fluid">
          <div className="col-xs-10">
            <input type="text" name="Search" id="search-place" className="search-place form-control" placeholder="Enter your location"/>
          </div>
          <div className="col-xs-2">
            <button className="btn" type="button" id="search-btn" onClick={geocodeConvert}><i className="fa fa-search"></i></button>
          </div>
        </div>
        <div className="weather-main container-fluid">
          <div className="weather-pic">
            
          </div>  
          <div class="temp">
            <h1 className="weather-temp" id="weather-temp"></h1>
            <p className="supscript"><sup></sup></p>
          </div>
          <div>
            <h3 className="weather-location" id="weather-location"></h3>
          </div>
        </div>
        <div className="weather-side container-fluid">
          <div className="col-xs-6">
            <p className="humidity" id="humidity"></p>
          </div>
          <div className="col-xs-6">
            <p className="wind-speed" id="wind-speed"></p>
          </div>
        </div>
    </div>
    </main>
  );
}

export default Main;