import { useState } from "react";
import Splash from "./components/Splash";
import Weather from "./components/Weather";
import Clock from "./components/Clock";
import PrayerCard from "./components/PrayerCard";
import "./App.css";

export default function App() {
  const [view, setView] = useState("home");

  return (
    <>
      <Splash />

      <div className="layout">

        <div className="sidebar">
          <h2>🌙 نبض</h2>

          <button onClick={() => setView("home")}>🏠 الرئيسية</button>
          <button onClick={() => setView("weather")}>🌤 الطقس</button>
          <button onClick={() => setView("clock")}>⏰ الوقت</button>
          <button onClick={() => setView("prayer")}>🕌 الأذان</button>
        </div>

        <div className="app">

          {view === "home" && (
            <div className="dashboard">

              <div className="card clock-card">
                <Clock />
              </div>

              <div className="card">
                <PrayerCard />
              </div>

              <div className="card">
                <Weather />
              </div>

            </div>
          )}

          {view === "clock" && <div className="card clock-card"><Clock /></div>}
          {view === "prayer" && <div className="card"><PrayerCard /></div>}
          {view === "weather" && <div className="card"><Weather /></div>}

        </div>
<footer className="mini-footer">

  <div className="footer-right">
    Eng_Moghazy
  </div>

  <div className="footer-left">

    <a
      href="https://linkedin.com/in/moghazy000"
      target="_blank"
    >
      LinkedIn
    </a>

    <a
      href="https://github.com/moghazy0"
      target="_blank"
    >
      GitHub
    </a>

    <a
      href="https://facebook.com/mghazy.khedr"
      target="_blank"
    >
      Facebook
    </a>

    <a
      href="https://wa.me/201067623668"
      target="_blank"
    >
      WhatsApp
    </a>

  </div>

</footer>

      </div>
    </>
  );
}