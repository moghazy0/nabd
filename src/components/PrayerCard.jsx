import { useEffect, useState } from "react";
import { getPrayerTimes } from "../services/prayerApi";

export default function PrayerCard() {
  const [prayer, setPrayer] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      const data = await getPrayerTimes(latitude, longitude);
      setPrayer(data);
    });
  }, []);

  return (
    <div className="card">
      <div style={{ fontSize: "28px" }}>🕌</div>

      <h2>مواقيت الصلاة</h2>

      {!prayer && <p>جاري تحديد الموقع...</p>}

      {prayer && (
        <div>
          <p>الفجر: {prayer.Fajr}</p>
          <p>الظهر: {prayer.Dhuhr}</p>
          <p>العصر: {prayer.Asr}</p>
          <p>المغرب: {prayer.Maghrib}</p>
          <p>العشاء: {prayer.Isha}</p>
        </div>
      )}
    </div>
  );
}