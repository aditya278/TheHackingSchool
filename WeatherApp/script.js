function main() {
    let long;
    let lat;

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            getCityWeather(lat, long)
                .then((res) => {
                    const city = res.data.name;
                    const temprature = (res.data.main.temp - 273.15).toFixed(0);
                    const feelsLike = (res.data.main.feels_like - 273.15).toFixed(0);
                    const tempUnit = 'C';
                    const weather_id = res.data.weather[0].id;
                    const weather_desc = res.data.weather[0].description;
                    const minTemp = (res.data.main.temp_min - 273.15).toFixed(0);
                    const maxTemp = (res.data.main.temp_max - 273.15).toFixed(0);
                    document.getElementById("location-city").innerHTML = city;
                    document.getElementById("temprature-value").innerHTML = temprature;
                    document.getElementById("details-description").innerHTML = weather_desc;
                    document.getElementById("details-feelslike").innerHTML = `Feels like: ${feelsLike}°C`;
                    document.getElementById("temprature-min").innerHTML = `Min: ${minTemp}°C`;
                    document.getElementById("temprature-max").innerHTML = `Max: ${maxTemp}°C`;

                    let tempIcon = document.getElementById("temprature-icon");
                    if (weather_id<250){
                        tempIcon.src = './icons/storm.svg' ;
                      }
                      else if (weather_id<350){
                        tempIcon.src = './icons/drizzle.svg' ;
                      }
                      else if (weather_id<550){
                        tempIcon.src = './icons/rain.svg' ;
                      }
                      else if (weather_id<650){
                        tempIcon.src = './icons/snow.svg' ;
                      }
                      else if (weather_id<800){
                        tempIcon.src = './icons/atmosphere.svg' ;
                      }
                      else if (weather_id===800){
                        tempIcon.src = './icons/sun.svg' ;
                      }
                      else if(weather_id>800){
                        tempIcon.src = './icons/clouds.svg' ;
                      }
                })
                .catch((err) => {
                    console.log(err.message);
                });
        })
    }
}

const getCityWeather = (lat, long) => {
    const URL = 'http://api.openweathermap.org/data/2.5/weather?';
    const apiCall = `${URL}lat=${lat}&lon=${long}&appid=ff92aeed286bc824f06aa14b2a0e08b3`;
    return axios.get(apiCall);
}

function changeTempUnit() {
    let tempVal = document.getElementById("temprature-value");
    let tempUnit = document.getElementById("temprature-unit");
    let minTemp = document.getElementById("temprature-min");
    let maxTemp = document.getElementById("temprature-max");
    let feelsLike = document.getElementById("details-feelslike");
    console.log(tempVal, tempUnit, minTemp, maxTemp);
    
    if(tempUnit.innerHTML.split('')[1] === 'C') {
        tempVal.innerHTML = celciusToFarenhite(tempVal.innerText).toFixed(0);
        tempUnit.innerHTML = '°F | °C';
        
        minVal = minTemp.innerHTML.split(' ')[1].replace('°C','');
        minVal = celciusToFarenhite(minVal).toFixed(0);
        minTemp.innerHTML = `Min: ${minVal}°F`;

        maxVal = maxTemp.innerHTML.split(' ')[1].replace('°C','');
        maxVal = celciusToFarenhite(maxVal).toFixed(0);
        maxTemp.innerHTML = `Min: ${maxVal}°F`;

        feelVal = feelsLike.innerHTML.split(': ')[1].replace('°C','');
        feelVal = celciusToFarenhite(feelVal).toFixed(0);
        feelsLike.innerHTML = `Feels like: ${feelVal}°F`;
    }
    else {
        tempVal.innerHTML = farenhiteToCelcius(tempVal.innerText).toFixed(0);
        tempUnit.innerHTML = '°C | °F';
        
        minVal = minTemp.innerHTML.split(' ')[1].replace('°F','');
        minVal = farenhiteToCelcius(minVal).toFixed(0);
        minTemp.innerHTML = `Min: ${minVal}°C`;

        maxVal = maxTemp.innerHTML.split(' ')[1].replace('°F','');
        maxVal = farenhiteToCelcius(maxVal).toFixed(0);
        maxTemp.innerHTML = `Min: ${maxVal}°C`;

        feelVal = feelsLike.innerHTML.split(': ')[1].replace('°F','');
        feelVal = farenhiteToCelcius(feelVal).toFixed(0);
        feelsLike.innerHTML = `Feels like: ${feelVal}°C`;
    }
    console.log(tempVal, tempUnit, minTemp, minVal, maxTemp, feelVal);
    
}

function celciusToFarenhite(val) {
    return ((val * 1.8) + 32);
}
function farenhiteToCelcius(val) {
    return ((val - 32) * 0.56);
}

document.addEventListener('DOMContentLoaded', main);