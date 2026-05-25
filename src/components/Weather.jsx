import { useState, useEffect } from "react";
import { getWeather, getWeatherByCoords } from "../services/weatherApi";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("city");
    if (saved) fetchWeather(saved);
  }, []);

  const fetchWeather = async (cityName) => {
    if (!cityName.trim()) return;

    try {
      setError("");
      setLoading(true);

      const data = await getWeather(cityName);

      setWeather(data);
      localStorage.setItem("city", cityName);

      setLoading(false);
    } catch {
      setError("❌ المدينة غير موجودة");
      setLoading(false);
    }
  };

  const getLocation = () => {
    if (!navigator.geolocation) return;

    setLoading(true);

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      const data = await getWeatherByCoords(latitude, longitude);

      setWeather(data);
      setCity(data.name);

      localStorage.setItem("city", data.name);
      setLoading(false);
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") fetchWeather(city);
  };

  return (
    <div className="card">

      <h2>🌤 الطقس اليوم</h2>

      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="اكتب المدينة (عربي أو إنجليزي)"
      />

      <button onClick={() => fetchWeather(city)}>🔎 بحث</button>
      <button onClick={getLocation}>📍 موقعي</button>

      {loading && <p>⏳ جاري التحميل...</p>}
      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-box">

          <h3>📍 {weather.name}</h3>

          <h1>{Math.round(weather.main.temp)}°</h1>

          <p>🌤 {weather.weather[0].description}</p>

          <div className="weather-details">
            <p>💧 {weather.main.humidity}%</p>
            <p>🌬 {weather.wind.speed} m/s</p>
            <p>📊 {weather.main.pressure} hPa</p>
            <p>👁 {weather.visibility / 1000} km</p>
          </div>

          <div className="ai-tip">
            <h4>🧠 نصيحة ذكية</h4>
            <p>
              {weather.main.temp > 35
                ? "🔥 حر شديد — اشرب مياه كتير"
                : weather.main.temp > 25
                ? "🌤 طقس مناسب"
                : weather.main.temp > 15
                ? "🧥 جو معتدل"
                : "❄️ برد — خد جاكيت"}
            </p>
          </div>

        </div>
      )}

    </div>
  );
}