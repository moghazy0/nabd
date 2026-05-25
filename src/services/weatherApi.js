const API_KEY = import.meta.env.VITE_WEATHER_KEY;

export const getWeather = async (city) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ar`
  );

  if (!res.ok) throw new Error("Weather error");
  return res.json();
};

export const getWeatherByCoords = async (lat, lon) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ar`
  );

  if (!res.ok) throw new Error("Geo error");
  return res.json();
};