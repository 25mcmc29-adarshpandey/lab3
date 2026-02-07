"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const input = document.getElementById("cityInput");
const button = document.getElementById("searchBtn");
const weatherBox = document.getElementById("weatherBox");
button.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const city = input.value.trim();
    if (!city)
        return;
    weatherBox.innerHTML = "Loading...";
    const coords = yield getCoordinates(city);
    if (!coords) {
        weatherBox.innerHTML = "City not found";
        return;
    }
    const weather = yield getWeather(coords.lat, coords.lon);
    showWeather(city, weather);
}));
function getCoordinates(city) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
        const data = yield res.json();
        if (!data.results)
            return null;
        return {
            lat: data.results[0].latitude,
            lon: data.results[0].longitude,
        };
    });
}
function getWeather(lat, lon) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const data = yield res.json();
        return data.current_weather;
    });
}
function showWeather(city, weather) {
    weatherBox.innerHTML = `
    <h3>${city}</h3>
    <p>Temperature: ${weather.temperature}°C</p>
    <p>Wind Speed: ${weather.windspeed} km/h</p>
  `;
}
//# sourceMappingURL=app.js.map