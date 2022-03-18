const body = document.getElementsByTagName('body')[0]
const input = document.getElementById('cityName')
const btn = document.getElementById('searchBtn')

const getWeather = async function(city) {
    console.log('loading data.....');
    const weather = await $.get(`https://rami-weather.herokuapp.com/weather/${city}`)
    console.log(weather);
    return weather
}

btn.addEventListener('click', async function() {
    const city = input.value

    try {
        const weather = await getWeather(city)
        input.value = ''
        const img = document.createElement('img')
        img.src = 'https://rami-weather.herokuapp.com/' + weather.conditionPic
        const weatherContainer = document.createElement('div')
        weatherContainer.classList.add(weatherContainer)
        body.append(weatherContainer)
    } catch (error) {
        alert('error')
    }
})