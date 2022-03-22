const body = document.getElementsByTagName("body")[0];
const input = document.getElementById("input");
const btn = document.getElementById("searchBtn");

const getWeather = async function (city) {
  console.log("loading data.....");
  const weather = await $.get(
    `https://rami-weather.herokuapp.com/weather/${city}`
  );
  console.log(weather);
  return weather;
};
//https://rami-weather.herokuapp.com/
btn.addEventListener("click", async function () {
  const city = input.value;

  try {
    const weather = await getWeather(city);
    input.value = "";
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
    cityName.innerText = `${city}`;
    mainContainer.append(temp, weatherStatusImg, weatherCondition, cityName);
    body.append(mainContainer);
  } catch (error) {
    alert("Please enter a valid country");
  }
});
