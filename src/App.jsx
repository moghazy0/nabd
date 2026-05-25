import { useState, useEffect } from "react";
import Splash from "./components/Splash";
import Clock from "./components/Clock";
import Weather from "./components/Weather";
import PrayerCard from "./components/PrayerCard";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  // 📌 حفظ الصفحة المختارة
  const [page, setPage] = useState(
    localStorage.getItem("page") || "home"
  );

  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const h = new Date().getHours();
    setTheme(h >= 18 || h < 6 ? "dark" : "light");
  }, []);

  // 💾 حفظ الصفحة
  useEffect(() => {
    localStorage.setItem("page", page);
  }, [page]);

  if (loading) return <Splash onDone={() => setLoading(false)} />;

  return (
    <div className={`app ${theme}`}>

      {/* 🧭 SIDEBAR */}
      <aside className="sidebar">

        <div className="logo">🌙 نبض</div>

        <button className={page==="home" ? "active" : ""} onClick={() => setPage("home")}>
          🏠 الرئيسية
        </button>

        <button className={page==="clock" ? "active" : ""} onClick={() => setPage("clock")}>
          🕒 الوقت
        </button>

        <button className={page==="weather" ? "active" : ""} onClick={() => setPage("weather")}>
          🌤 الطقس
        </button>

        <button className={page==="prayer" ? "active" : ""} onClick={() => setPage("prayer")}>
          🕌 الأذان
        </button>

      </aside>

      {/* 📦 CONTENT */}
      <main className="content">

        {page === "home" && (
          <div className="grid">
            <div className="card">🕒 <Clock /></div>
            <div className="card">🌤 <Weather /></div>
            <div className="card">🕌 <PrayerCard /></div>
          </div>
        )}

        {page === "clock" && <div className="card big"><Clock /></div>}
        {page === "weather" && <div className="card big"><Weather /></div>}
        {page === "prayer" && <div className="card big"><PrayerCard /></div>}

      </main>

    </div>
  );
}

export default App;