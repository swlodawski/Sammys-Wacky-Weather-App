const asideDiv = document.getElementById('aside-div');
const searchBtn= document.getElementById('search-btn');

function getApi() {
    // fetch request gets a list of all the repos for the node.js organization
    const requestUrl = '`https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={50d9fa3c2b681d0729030adef69fc4b6}`';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)   
    });
}

const createCityHistory = function(data) {

}

const createWeatherDiv = function(data) {
   const weatherContainer = document.createElement('divContainer');
    const cityDate = document.createElement('h2');
    const cityTemp = document.createElement('p');
    const cityWind = document.createElement('p');
    const cityHumidity = document.createElement('p');
};

const createWeatherCards = function(data) {

}


searchBtn.addEventListener('click', onclick);