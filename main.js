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

const addToFav = function (city) {
  localStorage.setItem("favCity", city);
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

const getFavCity = async function () {
  const city = localStorage.getItem("favCity");
  if (city) {
    const weather = await getWeather(city);
    renderWeather(weather)
  }
};


btn.addEventListener("click", async function () {
  const city = input.value;
  const weather = await getWeather(city);
  input.value = "";
  renderWeather(weather);
});

getFavCity()