//Global variables
let input = document.querySelector("input");
let current = document.querySelector("#current");
let historyCount = document.querySelector(".historycount");

let button = document.querySelector("#searchcity");
button.addEventListener("click", createHistory);
button.addEventListener("click", getCurrent);

//Populates the search history upon page refresh using localStorage
let array = [];
let localArray = JSON.parse(localStorage.getItem("array"));
if (localArray !== null) {
  array = localArray;
}

for (let i = 0; i < array.length; i++) {
  let rem = document.createElement("button");
  rem.classList.add("history");
  rem.innerHTML = array[i];
  historyCount.appendChild(rem);
  historyCount.classList.add("purple");

  rem.addEventListener("click", function() {
    input.value = this.innerHTML;
  })
  rem.addEventListener("click", getCurrent);
  rem.addEventListener("click", createHistory);
}

//Clears search history
let clear = document.querySelector("#clear");
clear.addEventListener("click", function() {
  array = [];
  localStorage.setItem("array", JSON.stringify(array));
  historyCount.innerHTML = "";
  historyCount.classList.remove("purple");
})

//Populates the search history when the user types in cities

function createHistory() {
  
  let history = document.createElement("button");
  
  history.innerHTML = input.value;
  history.classList.add("history");

  historyCount.classList.add("purple");
  historyCount.appendChild(history);
  
  array.push(history.innerHTML);
  localStorage.setItem("array", JSON.stringify(array));

  history.addEventListener("click", function() {
    input.value = this.innerHTML;
  })
  history.addEventListener("click", getCurrent);
  history.addEventListener("click", createHistory);
}




//Populates a field with the current weather conditions of the desired city
function getCurrent() {
    let requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + input.value + "&appid=de53a40654766cb8ce20288a99c9f736";

    fetch(requestUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);

        let tempD = (data["main"]["temp"] - 273.15) * 9/5 + 32;
        let tempF = tempD.toFixed(1);

        current.children[0].innerHTML = data["name"] + moment().format(" (M/D/YYYY) ");

        let image = document.createElement("img");
        image.setAttribute("src", "https://openweathermap.org/img/wn/" + data["weather"][0]["icon"] + "@2x.png");
        current.children[0].appendChild(image);

        current.children[1].innerHTML = "Temperature: " + tempF + " F";
        current.children[2].innerHTML = "Humidity: " + data["main"]["humidity"] + "%";
        current.children[3].innerHTML = "Wind Speed: " + data["wind"].speed + " mph";

        let lat = data["coord"]["lat"];
        let lon = data["coord"]["lon"];
        getFiveDay(lat, lon);
      })
      .catch(function() {
        console.log("Error");
      });
}

//Accesses the UV Index and five day forecast, this function is called by the getCurrent function
function getFiveDay(lat, lon) {
    let requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=de53a40654766cb8ce20288a99c9f736";

    fetch(requestUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        current.children[4].innerHTML = "UV Index: " + data["current"]["uvi"];

        let week = document.querySelector("#week");
        week.innerHTML = "";
        for (i = 1; i <= 5; i++) {
            let tempD = (data["daily"][i]["temp"]["day"] - 273.15) * 9/5 + 32;
            let tempF = tempD.toFixed(2);
            let day = document.createElement("div");
            let d = parseInt(moment().format("d")) + i;

            let date = document.createElement("p");
            date.innerHTML = moment().format("M/" + d + "/YYYY");
            day.appendChild(date);

            let emoji = document.createElement("img");
            emoji.setAttribute("src", "https://openweathermap.org/img/wn/" + data["daily"][i]["weather"][0]["icon"] + "@2x.png");
            day.appendChild(emoji);

            let temp = document.createElement("p");
            temp.innerHTML = "Temp: " + tempF + " F";
            day.appendChild(temp);

            let humid = document.createElement("p");
            humid.innerHTML = "Humidity: " + data["daily"][i]["humidity"] + "%";
            day.appendChild(humid);

            week.appendChild(day);
        }
      })
      .catch(function() {
        console.log("Error");
      });
}
