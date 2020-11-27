import { getCurrentWatherFor } from './weather';

const geoLocationKey = 'at_BMpJ9wB423aAcvoUwkiVbMxnLBGOo';
const locationEl = document.querySelector('.clock__time-text');
const maxTempEl = document.querySelector('.weather__max');
const minTempEl = document.querySelector('.weather__min');
const feelsTempEl = document.querySelector('.weather__feels');
const averageTempEl = document.querySelector('.weather__average');

function errorHandler(error) {
  console.warn(error);
}

async function getUserLocation() {
  const ipv4Regex = /^(?:ip)=(.*)$/gm;

  const ipInformation = await fetch('https://www.cloudflare.com/cdn-cgi/trace');
  const ipAdress = (await ipInformation.text()).match(ipv4Regex)[0].slice(3);

  const locationResponse = await fetch(`https://ip-geolocation.whoisxmlapi.com/api/v1?apiKey=${geoLocationKey}&ipAddress=${ipAdress}`);
  const locationData = await locationResponse.json();

  return locationData.location;
}

async function adjustLocationName(location) {
  locationEl.textContent = `in ${location.city}, ${location.country}`;
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
