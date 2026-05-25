import { useEffect, useState } from "react";
import { getWeather, getWeatherByCoords } from "../services/weatherApi";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  // 🔥 تحويل العربي لإنجليزي
  const cityMap = {
    القاهرة: "Cairo",
    الجيزة: "Giza",
    اسيوط: "Asyut",
    الإسكندرية: "Alexandria",
    الاقصر: "Luxor",
    المنيا: "Minya",
    سوهاج: "Sohag",
    قنا: "Qena",
    بورسعيد: "Port Said",
    السويس: "Suez",
  };

  useEffect(() => {
    const saved = localStorage.getItem("city");

    if (saved) {
      fetchWeather(saved);
    }
  }, []);

  const fetchWeather = async (cityName) => {
    try {
      setError("");

      let searchName = cityName.trim();

      // دعم العربي
      if (cityMap[searchName]) {
        searchName = cityMap[searchName];
      }

      const data = await getWeather(searchName);

      setWeather(data);

      localStorage.setItem("city", cityName);

    } catch {
      setError("❌ المدينة غير موجودة");
    }
  };

  // 📍 موقعي
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const data = await getWeatherByCoords(
        pos.coords.latitude,
        pos.coords.longitude
      );

      setWeather(data);
      setCity(data.name);
    });
  };

  return (
    <div>

      {/* SEARCH */}
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="اكتب المدينة عربي أو English"

        // 🔥 Enter search
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            fetchWeather(city);
          }
        }}
      />

      <button onClick={() => fetchWeather(city)}>
        🔎 بحث
      </button>

      <button onClick={getLocation}>
        📍 موقعي
      </button>

      {error && <p>{error}</p>}

      {/* WEATHER */}
      {weather && (
        <div className="weather-box">

          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt=""
          />

          <h2>{weather.name}</h2>

          <h1>
            {Math.round(weather.main.temp)}°
          </h1>

          <p>
            {weather.weather[0].description}
          </p>

          <div className="weather-details">

            <div className="weather-item">
              💧 الرطوبة
              <span>{weather.main.humidity}%</span>
            </div>

            <div className="weather-item">
              🌡 المحسوسة
              <span>{Math.round(weather.main.feels_like)}°</span>
            </div>

            <div className="weather-item">
              🌬 الرياح
              <span>{weather.wind.speed} m/s</span>
            </div>

            <div className="weather-item">
              📊 الضغط
              <span>{weather.main.pressure}</span>
            </div>

            <div className="weather-item">
              👁 الرؤية
              <span>{weather.visibility / 1000} km</span>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}