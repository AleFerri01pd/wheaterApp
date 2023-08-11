const API_TOKEN = "13c0306aa8msh048613e1615a9fdp169149jsnb96b13c6cc0e"
const BASE_URL = 'https://open-weather13.p.rapidapi.com/city/';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': API_TOKEN,
        'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
    }
}
let isLoading = false

const getWeatherInfo = async (city, spinner) => {
    try {
        const weatherCard = document.getElementById('weather-card')
        checkSpinner(isLoading, spinner, weatherCard)

        const response = await fetch(BASE_URL + city, options);
        const result = await response.json();
        // console.log(result);

        isLoading = false
        
        showWeatherData(result, spinner, weatherCard)
    } catch (error) {
        console.error(error);
        isLoading = false
        checkSpinner(isLoading, spinner)

        alert('No weather info found for this country. Check and rewrite')
    }
}

const searchCity = () => {
    const spinner = document.getElementById('loading-spinner')
    const cityInput = document.getElementById('city-input')
    const city = cityInput.value.toLowerCase()
    isLoading = true

    getWeatherInfo(city, spinner)
}

const showWeatherData = ({name, main, weather}, spinner, card) => {
    document.getElementById('city-name').innerText = name
    document.getElementById('weather-type').innerText = weather[0].main
    document.getElementById('temp').innerText = Math.floor(toCelcius(main.temp))
    document.getElementById('min-temp').innerText = Math.floor(toCelcius(main.temp_min))
    document.getElementById('max-temp').innerText = Math.floor(toCelcius(main.temp_max))

    checkSpinner(isLoading, spinner, card)
}

const toCelcius = (a) => (a - 32) * (5/9)

const checkSpinner = (flag, spinner, card) => {
    console.log(card)
    if(flag) {
        card.style.display = 'none'
        spinner.style.display = 'block'
    } else {
        spinner.style.display = 'none'
        card.style.display = 'block'
    }
}

