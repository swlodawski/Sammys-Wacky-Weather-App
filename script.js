const asideDiv = document.getElementById('aside-div');
const weatherContainerDiv = document.getElementById('weather-container-div');
const weatherCardDiv = document.getElementById('weather-card-div');
const searchBtn= document.getElementById('search-btn');
const citiesArray = JSON.parse(localStorage.getItem('cities')) || [];
const cityHistory = document.getElementById('city-history');
const apiKey = '50d9fa3c2b681d0729030adef69fc4b6';


function updateLocStorage(cityName) {
  if(!cityHistory.includes(cityName)) {
    cityHistory.push(cityName);
    localStorage.setItem('cities', JSON.stringify(cityHistory));
    render.cityHistory();
  }
}

function getApi(cityName = null) {

  if(!cityName) {
    cityName = document.getElementById('searchBtn').value;

  }
    const requestUrl = `https:api.openweathermap.org/geo/1.0/direct?q${cityName}&appid=${apiKey}`;
    updateLocStorage(cityName);

    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const latitude = data[0].lat;
        const longitude = data[0].long;
        getForecast(latitude, longitude, cityName);
    });
}

function getForecast (latitude, longitude, cityName) {
  const requestUrlCelcius = `https:api.openweathermap.org/geo/1.0/direct?q${cityName}&appid=${apiKey}`;
  const requestUrlFarenheit = `https:api.openweathermap.org/geo/1.0/direct?q${cityName}&appid=${apiKey}`;
  Promise.all([
    fetch(requestUrlCelcius).then(function (response) {
      return response.json(),
    })
    fetch(requestUrlFarenheit).then(function (response) {
      return response.json();
    })
  ]).then([dataCelcius, dataFarenheit]) 
}






const createWeatherDiv = function(data) {
   const weatherContainer = document.createElement('divContainer');
    const cityDate = document.createElement('h2');
    const cityTemp = document.createElement('p');
    const cityWind = document.createElement('p');
    const cityHumidity = document.createElement('p');
};

const createWeatherCards = function(data) {

};


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
  })
}

renderSearchHistory();


searchBtn.addEventListener('click', () => getApi());