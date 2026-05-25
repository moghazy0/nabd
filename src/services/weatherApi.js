const API_KEY = import.meta.env.VITE_WEATHER_KEY;

// 🔥 بالمدينة
export async function getWeather(city) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ar`
  );

  if (!res.ok) {
    throw new Error("City not found");
  }

  return await res.json();
}

// 📍 بالإحداثيات
export async function getWeatherByCoords(lat, lon) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ar`
  );

  return await res.json();
}