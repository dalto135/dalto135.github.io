//Global variables
let input = document.querySelector(".input");
let button = document.querySelector("button");
let search = document.querySelector("#search");
let current = document.querySelector("#current");
let week = document.querySelector("#week");

// let historyList = document.querySelector(".history");
let historyCount = document.querySelector(".historycount");

//Function that populates the search history
button.addEventListener("click", createHistory);
function createHistory() {
  let history = document.createElement("button");
  let br = document.createElement("br");
  historyCount.classList.add("purple");
  console.log("hello");

  history.innerHTML = input.value;
  history.classList.add("history");
  historyCount.appendChild(history);
  historyCount.appendChild(br);

  history.addEventListener("click", function() {
      console.log(this.innerHTML);
      input.value = this.innerHTML;
  })
  history.addEventListener("click", getCurrent);
  history.addEventListener("click", createHistory);
}


//Function that populates a field with the current weather conditions of the desired city
button.addEventListener("click", getCurrent);
function getCurrent() {
    let requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + input.value + "&appid=de53a40654766cb8ce20288a99c9f736";
    console.log(requestUrl);

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
        // current.children[0].innerHTML += image;

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

//Function that accesses the UV Index and five day forecast
function getFiveDay(lat, lon) {
    let requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=de53a40654766cb8ce20288a99c9f736";
    console.log(requestUrl);

    fetch(requestUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        current.children[4].innerHTML = "UV Index: " + data["current"]["uvi"];

        week.innerHTML = "";
        for (i = 1; i <= 5; i++) {
            let tempD = (data["daily"][i]["temp"]["day"] - 273.15) * 9/5 + 32;
            // let tempD = data["list"][i]["temp"]["day"]["imperial"];
            let tempF = tempD.toFixed(2);
            
            let day = document.createElement("div");

            let d = parseInt(moment().format("d")) + i;
            console.log(d);

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

