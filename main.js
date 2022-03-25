const weatherContainer = document.getElementById("weatherContainer");
const input = document.getElementById("input");
const btn = document.getElementById("searchBtn");

const url = `https://rami-weather.herokuapp.com/weather/`;

const getWeather = async function (city) {
  console.log("loading data.....");
  try {
    const weather = await $.get(url + city);
    return weather;
  } catch (error) {
    alert("Please enter a valid country");
    return error;
  }
};
const getFavCities = () => JSON.parse(localStorage.getItem("favCities"));

const addToFav = function (city) {
  const favCities = getFavCities() || [];
  console.log(typeof favCities);
  favCities.push(city);
  localStorage.setItem("favCities", JSON.stringify(favCities));
};

const renderWeather = function (weather) {
  const mainContainer = document.createElement("div");
  mainContainer.id = "mainContainer";
  const temp = document.createElement("div");
  temp.id = "temp";
  temp.innerText = `${weather.temprature}`;
  const weatherStatusImg = document.createElement("img");
  weatherStatusImg.id = "weatherStatusImg";
  weatherStatusImg.src = `https://rami-weather.herokuapp.com/${weather.conditionPic}`;
  const weatherCondition = document.createElement("div");
  weatherCondition.id = "weatherCondition";
  weatherCondition.innerText = `${weather.condition}`;
  const cityName = document.createElement("div");
  cityName.id = "cityName";
  cityName.innerText = `${weather.name}`;
  const favBtn = document.createElement("button");
  favBtn.innerText = "add";
  favBtn.addEventListener("click", function () {
    addToFav(weather.name);
  });
  mainContainer.append(
    temp,
    weatherStatusImg,
    weatherCondition,
    cityName,
    favBtn
  );
  weatherContainer.prepend(mainContainer);
};

const loadFavCities = async function () {
  const cities = getFavCities();
  for (let i = 0; cities[i]; i++) {
    const weather = await getWeather(cities[i]);
    renderWeather(weather);
  }
};

btn.addEventListener("click", async function () {
  const city = input.value;
  const weather = await getWeather(city);
  input.value = "";
  renderWeather(weather);
});

loadFavCities();
