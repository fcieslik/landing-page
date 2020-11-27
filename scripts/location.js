import { getCurrentWatherFor } from './weather';

const geoLocationKey = 'cc6c29b2dcadb94d4491893a45a5fe37';
const locationEl = document.querySelector('.clock__time-text');
const maxTempEl = document.querySelector('.weather__max');
const minTempEl = document.querySelector('.weather__min');
const feelsTempEl = document.querySelector('.weather__feels');
const averageTempEl = document.querySelector('.weather__average');

function errorHandler(error) {
  console.warn(error);
}

async function getUserLocation() {
  const response = await fetch(`http://api.ipstack.com/check?access_key=${geoLocationKey}`);
  const data = await response.json();

  return data;
  // return { city: 'Kraków', country_code: 'PL' };
}

async function adjustLocationName(location) {
  locationEl.textContent = `in ${location.city}, ${location.country_code}`;
  const weather = await getCurrentWatherFor(location.city);

  return weather;
}

function adjustWeatherValues(weather) {
  maxTempEl.textContent = ` ${weather.main.temp_max.toFixed(1)} `;
  minTempEl.textContent = ` ${weather.main.temp_min.toFixed(1)} `;
  averageTempEl.textContent = ` ${weather.main.temp.toFixed(1)} `;
  feelsTempEl.textContent = ` ${weather.main.feels_like.toFixed(1)} `;
}

getUserLocation()
  .then((location) => adjustLocationName(location))
  .then((weather) => adjustWeatherValues(weather))
  .catch(errorHandler);
