const searchbtn= document.getElementById('search-btn');

function getApi() {
    // fetch request gets a list of all the repos for the node.js organization
    const requestUrl = 'https://api.github.com/orgs/nodejs/repos';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)   
    });
}