const WEATHER_API = "b6d34a93459aad8ffe0c34e0f7e563c7";

let weather = {
    "apikey": WEATHER_API,
    fetchWeather : function (city) {
        fetch("http://api.openweathermap.org/geo/1.0/direct?q=" 
        + city 
        + "&appid=" 
        + this.apikey)
        .then((Response) => Response.json())
        .then((data) =>this.takeLoc(data));
    },

    takeLoc: function(data) {

        const { lat } = data[0];
        const {lon} = data[0];
        console.log(lon)
        fetch("https://api.openweathermap.org/data/2.5/weather?lat=" 
        + lat
        +"&lon="
        + lon
        + "&appid=" 
        + this.apikey)
        .then((Response) => Response.json())
        .then((data1) => this.displayWeather(data1));

    },

    displayWeather: function(data) {

        const { name } = data;
        const { icon, description } = data.weather[0];
        console.log(icon);
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = Math.floor(temp-273.15) + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },

    search : function() {
        this.fetchWeather(document.querySelector(".searchbar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document.querySelector(".searchbar").addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        weather.search();
    }
});

weather.fetchWeather("ahmedabad");
