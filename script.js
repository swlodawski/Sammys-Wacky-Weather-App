// const asideDiv = document.getElementById('aside-div');
const searchCity= document.getElementById('search-button');
const apiKey = '4f2cf59f02cfa6f47c2a9442e626336f';
const citiesArray = JSON.parse(localStorage.getItem('cities')) || [];
const cityHistory = document.getElementById('city-history');
const currentWeather = document.getElementById('current-weather');
const weeklyForecast = document.getElementById('week-forecast');


function updateLocalStorage(cityName) {
  if(!citiesArray.includes(cityName)) {
    citiesArray.push(cityName);
    localStorage.setItem('cities', JSON.stringify(citiesArray));
    rendercityHistory();
  }
}

function getApi(cityName = null) {

  if(!cityName) {
    cityName = document.getElementById('search-button').value;

  }
    const requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;
    updateLocalStorage(cityName);

    fetch(requestUrl)
      .then(response => response.json())
      .then(data => {
        const latitude = data[0].lat;
        const longitude = data[0].lon;
        getForecast(latitude, longitude, cityName);
    });
}

function getForecast (lat, lon, cityName) {
  const requestUrlCelcius = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  const requestUrlFarenheit = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

  Promise.all([
    fetch(requestUrlCelcius).then(response => response.json()),
    fetch(requestUrlFarenheit).then(response => response.json())
  ]).then(([dataCelcius, dataFarenheit]) => {
    renderCurrentWeather(dataCelcius, dataFarenheit, cityName);
    renderWeeklyHistory(dataCelcius, dataFarenheit);
  });
}

function renderCurrentWeather(currentWeatherCelcius, currentWeatherFarenheit, cityName) {
  currentWeather.innerHTML = '';

  const weatherContainer = document.createElement('div');
  weatherContainer.setAttribute('class', 'border');
  const cityNameEl = document.createElement('h2');
  const cityTemp = document.createElement('p');
  const cityWind = document.createElement('p');
  const cityHumidity = document.createElement('p');

  cityNameEl.textContent = cityName;
  cityTemp.textContent = `Temp: ${currentWeatherCelcius.list[0].main.temp} °C / ${currentWeatherFarenheit.list[0].main.temp} °F`;
  cityWind.textContent = `Wind: ${currentWeatherCelcius.list[0].wind.speed} m/s/ ${currentWeatherFarenheit.list[0].main.speed} mph`;
  cityHumidity.textContent = `Humidity: ${currentWeatherCelcius.list[0].main.humidity}`;

  weatherContainer.append(cityDate);
  weatherContainer.append(cityTemp);
  weatherContainer.append(cityWind);
  weatherContainer.append(cityHumidity);

  currentWeather.append(weatherContainer);
}


function renderWeeklyWeather(forecastCelcius, forecastFarenheit) {
  weeklyForecast.innerHTML = '';

  const dates = [...new Set(forecastCelcius.list.map(item => item.dt_txt.split('')[0]))].slice(0,5);

  dates.forEach(date => {
    const dailyForecastCelcius = forecastCelcius.list.find(item => item.dt_txt.startsWith(date));
    const dailyForecastFarenheit = forecastFarenheit.list.find(item => item.dt_txt.startsWith(date));

    const weatherCard = document.createElement('div');
    weatherCard.setAttribute('class', 'card');
    const cityDate = document.createElement('h2');
    const cityTemp = document.createElement('p');
    const cityWind = document.createElement('p');
    const cityHumidity = document.createElement('p');
  
    cityDate.textContent = dayjs(date).format('dddd');
    cityTemp.textContent = `Temp: ${dailyForecastCelcius.main.temp} °C / ${dailyForecastFarenheit.main.temp} °F`;
    cityWind.textContent = `Wind: ${dailyForecastCelcius.wind.speed} m/s / ${dailyForecastFarenheit.wind.speed} mph`;
    cityHumidity.textContent = `Humidity: ${dailyForecastCelcius.main.humidity} %`;
    
    weatherCard.append(cityDate);
    weatherCard.append(cityTemp);
    weatherCard.append(cityWind);
    weatherCard.append(cityHumidity);
  
    weeklyForecast.append(weatherCard); 
  });
}


function renderSearchHistory() {
  cityHistory.innerHTML = '';

  citiesArray.forEach(city => {
    const buttonEl = document.createElement('button');
    buttonEl.textContent = city;
    buttonEl.setAttribute('class', 'btn btn-secondary m-1');
    buttonEl.addEventListener('click', function() {
      getApi(city);
    });
   cityHistory.append(buttonEl);
  });
}

renderSearchHistory();


searchCity.addEventListener('click', () => getApi());