const weatherApiKey = 'e6c8bc2a98cfc7cb0edda4ac2b46d064';
const weatherEndpoint = 'https://api.openweathermap.org/data/2.5/weather';
const unitSystem = 'metric';

export async function getCurrentWatherFor(city) {
  const response = await fetch(`${weatherEndpoint}?q=${city}&units=${unitSystem}&appid=${weatherApiKey}`).then((data) =>
    data.json()
  );

  return response;
}
