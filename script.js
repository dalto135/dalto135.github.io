//Global variables defined
let input = document.querySelector(".input");
let button = document.querySelector("button");
let search = document.querySelector("#search");
let current = document.querySelector("#current");
let week = document.querySelector("#week");

//Function that populates the search history
button.addEventListener("click", function() {
    let history = document.createElement("button");
    history.innerHTML = input.value;
    search.appendChild(history);

    history.addEventListener("click", function() {
        console.log(this.innerHTML);
    })
    history.addEventListener("click", getCurrent);
    history.addEventListener("click", getFiveDay);
});

//Function that populates a field with the current weather conditions of the desired city
button.addEventListener("click", getCurrent);
function getCurrent() {
    let requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + input.value + "&appid=de53a40654766cb8ce20288a99c9f736";
    console.log(requestUrl);

    fetch(requestUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);

        let tempF = Math.floor((data["main"]["temp"] - 273.15) * 9/5 + 32);

        current.children[0].innerHTML = data["name"] + moment().format(" (M/D/YYYY) ");

        let image = document.createElement("img");
        image.setAttribute("src", "http://openweathermap.org/img/wn/" + data["weather"][0]["icon"] + "@2x.png");
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

//Function that accesses the UV Index and five day forecast
function getFiveDay(lat, lon) {
    let requestUrl = "http://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=de53a40654766cb8ce20288a99c9f736";
    console.log(requestUrl);

    fetch(requestUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        current.children[4].innerHTML = "UV Index: " + data["current"]["uvi"];

        for (i = 1; i <= 5; i++) {
            let tempF = Math.floor((data["daily"][i]["temp"]["day"] - 273.15) * 9/5 + 32);
            // let tempF = data["list"][i]["temp"]["day"]["imperial"];
            let day = week.children[i - 1];
            let dd = parseInt(moment().format("d")) + i;
            console.log(dd);
            day.innerHTML = "";

            let date = document.createElement("p");
            date.innerHTML = data["daily"][i]["dt"];
            date.innerHTML = moment().format("M/" + dd + "/YYYY");
            day.appendChild(date);

            let emoji = document.createElement("img");
            emoji.setAttribute("src", "http://openweathermap.org/img/wn/" + data["daily"][i]["weather"][0]["icon"] + "@2x.png");
            day.appendChild(emoji);

            let temp = document.createElement("p");
            temp.innerHTML = "Temp: " + tempF + " F";
            day.appendChild(temp);

            let humid = document.createElement("p");
            humid.innerHTML = "Humidity: " + data["daily"][i]["humidity"] + "%";
            day.appendChild(humid);
        }

      })
      .catch(function() {
        console.log("Error");
      });
}

