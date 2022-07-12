const API_KEY = "ff8a01f9e04db2dc9bcfe794cf6fbfa4";

export default async function getWeatherData(
  cityName,
  stateCode = "",
  countryCode = ""
) {
  try {
    const coords = await getCoordsData(cityName, stateCode, countryCode);
    let response = await fetch(getWeatherURL(coords[0], coords[1]), {
      mode: "cors",
    });
    return await response.json();
  } catch {
    return null;
  }
}

function getWeatherURL(lat, lon) {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
}

function getCoordsURL(cityName, stateCode = "", countryCode = "") {
  const stateCodeString = stateCode ? "," + stateCode : stateCode;
  const countryCodeString = countryCode ? "," + countryCode : countryCode;

  const limit = 5;

  return `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}${stateCodeString},${countryCodeString}&limit=${limit}&appid=${API_KEY}`;
}

async function getCoordsData(cityName, stateCode = "", countryCode = "") {
  const response = await fetch(getCoordsURL(cityName, stateCode, countryCode), {
    mode: "cors",
  });
  const matches = await response.json();
  const firstMatch = await matches[0];
  return [await firstMatch.lat, await firstMatch.lon];
}
