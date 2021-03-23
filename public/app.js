const condition = document.getElementById('condition');
const city = document.getElementById('city');
const country = document.getElementById('country');
const mainText = document.getElementById('main');
const description = document.getElementById('description');
const temp = document.createElement('temp');
const pressure = document.createElement('pressure');
const humidity = document.getElementById('humidity');

const cityInput = document.getElementById('city-input');
const historyElm = document.getElementById('history');
const masterHistory = document.getElementById('master-history');

const API_KEY = '146d1fff867d756daca119a9e8844132';
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;
const ICON_URL = `https://openweathermap.org/img/wn/`;
const DEFAULT_CITY = 'chandpur,bd';

// Onload Work
window.onload = function () {
    navigator.geolocation.getCurrentPosition(
        allow => {
            // console.log(allow);
            getWeatherData(null, allow.coords);
        },
        block => {
            // console.log(block);
            getWeatherData()
        }
    )

    axios.get('/api/history')
        .then(({
            data
        }) => {
            if (data.length > 0) {
                updateHistory(data);
            } else {
                historyElm.innerHTML = 'There is no history found. '
            }
        })
        .catch(e => {
            console.log(e.message);
            alert('Error Occured');
        })

    cityInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            if (e.target.value) {
                getWeatherData(e.target.value, null, weather => {
                    e.target.value = '';
                    axios.post('/api/history', weather)
                        .then(({
                            data
                        }) => {

                            updateHistory(data)


                        })
                        .catch(e => {
                            console.log(e.message);
                            alert('Error Occured');
                        })
                });
                e.target.value = '';
            } else {
                alert('Please Provde A Valid City Name');
            }
        }
    })


}


//getWeatherData Function
function getWeatherData(city = DEFAULT_CITY, coords, cb) {
    let url = BASE_URL;
    city === null ?
        url = `${url}&lat=${coords.latitude}&lon=${coords.longitude}` :
        url = `${url}&q=${city}`

    // console.log(url);
    axios.get(url)
        .then(({
            data
        }) => {
            // console.log(data);

            let weather = {
                icon: data.weather[0].icon,
                cityName: data.name,
                countryName: data.sys.country,
                main: data.weather[0].main,
                description: data.weather[0].description,
                temp: data.main.temp,
                pressure: data.main.pressure,
                humidity: data.main.humidity
            }
            setWeather(weather);
            // console.log(weather)

            if (cb) cb(weather);
        })
        .catch(err => {
            console.log(err);
            alert('Your Provided City Name Is Not Found. Please Check Your City Name Spellings.');
        })
}


//setWeather Function 
function setWeather(weather) {
    condition.src = `${ICON_URL}${weather.icon}.png`;
    city.innerHTML = weather.cityName;
    country.innerHTML = weather.countryName;
    mainText.innerHTML = weather.main;
    description.innerHTML = weather.description;
    temp.innerHTML = weather.temp;
    pressure.innerHTML = weather.pressure;
    humidity.innerHTML = weather.humidity;

}

function updateHistory(history) {
    historyElm.innerHTML = '';
    history = history.reverse();

    history.forEach((h, index) => {
        let tempHistory = masterHistory.cloneNode(true);
        for (let i = 3; i > index; i--) {
            tempHistory.id = '';
        }

        tempHistory.getElementsByClassName('condition')[0].src = `${ICON_URL}${h.icon}.png`
        tempHistory.getElementsByClassName('city')[0].innerHTML = h.cityName;
        tempHistory.getElementsByClassName('country')[0].innerHTML = h.countryName;
        tempHistory.getElementsByClassName('main')[0].innerHTML = h.main;
        tempHistory.getElementsByClassName('description')[0].innerHTML = h.description;
        tempHistory.getElementsByClassName('temp')[0].innerHTML = h.temp;
        tempHistory.getElementsByClassName('pressure')[0].innerHTML = h.pressure;
        tempHistory.getElementsByClassName('humidity')[0].innerHTML = h.humidity;


        historyElm.appendChild(tempHistory);



    })




}