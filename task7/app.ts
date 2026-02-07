const input = document.getElementById("cityInput") as HTMLInputElement;
const button = document.getElementById("searchBtn") as HTMLButtonElement;
const weatherBox = document.getElementById("weatherBox") as HTMLDivElement;

button.addEventListener("click", async () => {
  const city = input.value.trim();
  if (!city) return;

  weatherBox.innerHTML = "Loading...";

  const coords = await getCoordinates(city);

  if (!coords) {
    weatherBox.innerHTML = "City not found";
    return;
  }

  const weather = await getWeather(coords.lat, coords.lon);
  showWeather(city, weather);
});

interface Coordinates {
  lat: number;
  lon: number;
}

async function getCoordinates(city: string): Promise<Coordinates | null> {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`,
  );

  const data = await res.json();

  if (!data.results) return null;

  return {
    lat: data.results[0].latitude,
    lon: data.results[0].longitude,
  };
}

interface Weather {
  temperature: number;
  windspeed: number;
}

async function getWeather(lat: number, lon: number): Promise<Weather> {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`,
  );

  const data = await res.json();
  return data.current_weather;
}

function showWeather(city: string, weather: Weather): void {
  weatherBox.innerHTML = `
    <h3>${city}</h3>
    <p>Temperature: ${weather.temperature}°C</p>
    <p>Wind Speed: ${weather.windspeed} km/h</p>
  `;
}
