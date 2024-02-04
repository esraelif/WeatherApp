const apiKey = "b3d83cf2313166c4f2930ab9b54fef07";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const weatherIcon = document.querySelector(".weather-icon");

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        handleUserInput();
    }
}

function handleUserInput() {
    checkWeather(searchBox.value);
}
searchBox.addEventListener("keypress", (event) => {
    if (event.key === 'Enter') {
        handleUserInput();
    }
});

document.querySelector(".search button").addEventListener("click", handleUserInput);


async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".details").style.display = "none";
    } else {
        var data = await response.json();
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "../images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "../images/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "../images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "../images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "../images/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
        document.querySelector(".details").style.display = "flex";

        // Save data to local storage
        localStorage.setItem(data.name, Math.round(data.main.temp) + "°C");
        showSavedData();
    }
}

function showSavedData() {
    const savedDataList = document.getElementById("savedDataList");
    savedDataList.innerHTML = ""; // Clear previous list

    // Get data from local storage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);

        // Create list item
        const listItem = document.createElement("li");
        listItem.textContent = `${key}: ${value}`;

        // Add to the list
        savedDataList.appendChild(listItem);
    }
}

document.addEventListener("DOMContentLoaded", showSavedData);