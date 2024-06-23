const asideDiv = document.getElementById('aside-div');
const searchBtn= document.getElementById('search-btn');

function getApi() {
    // fetch request gets a list of all the repos for the node.js organization
    const requestUrl = '`https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={b792be78f2bfe310ca378c0e295b739b}`';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)   
    });
}

const createCityHistory = function() {

}

const createWeatherDiv = function() {
    document.createElement('divContainer');
    document.createElement('h2');
    document.createElement('p');
    document.createElement('p');
    document.createElement('p');
}


searchBtn.addEventListener('click', onclick);