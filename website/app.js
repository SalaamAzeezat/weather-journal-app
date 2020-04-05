/* Global Variables */
const form = document.querySelector('.form');

// Personal API Key for OpenWeatherMap API
let baseURL ='http://api.openweathermap.org/data/2.5/weather?zip=,ng';
let apiKey = '&appid=d3847693e36f8b671bc7bb8f7744c5e8';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);
/* Function called by event listener */
function performAction(e){
  const zip = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;
 
  getWeather(baseURL, zip, apiKey)
  .then(function (userResponse) {
  // add data to POST request
  postData('/add', { date: newDate, temp: userResponse.main.temp, content })
}).then(function (newData) {
  // call updateUI to update browser content
  updateUI()
})
// reset form
form.reset();
}

/* Function to GET Web API Data*/
const getWeather = async(baseURL, zip, apiKey) =>{
  const res = await fetch(baseURL + zip + apiKey);
  try {
    const userResponse = await res.json();
    return userResponse;
  } 
  catch (error) {
    console.log("error", error);
  }
};

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify({
        date: data.date,
        temp: data.temp,
        content: data.content
      })
    })
  
    try {
      const newData = await response.json();
      return newData;
    }
    catch (error) {
      console.log(error);
    }
  };

  const updateUI = async () => {
    const request = await fetch('/all');
    try {
      const allData = await request.json()
      // show icons on the page
      icons.forEach(icon => icon.style.opacity = '1');
      // update new entry values
      document.getElementById('date').innerHTML = allData.date;
      document.getElementById('temp').innerHTML = allData.temp;
      document.getElementById('content').innerHTML = allData.content;
    }
    catch (error) {
      console.log("error", error);
    }
  };
/* Function to GET Project Data */
