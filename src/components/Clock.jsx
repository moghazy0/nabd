import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const getHijriDate = () => {
    return new Intl.DateTimeFormat("ar-SA-u-ca-islamic", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());
  };

  return (
    <div>

      <h2>🕒 الوقت والتاريخ</h2>

      {/* ⏰ الوقت */}
      <div style={{ fontSize: "32px", fontWeight: "bold" }}>
        {time.toLocaleTimeString()}
      </div>

      {/* 📅 الميلادي */}
      <p>📅 {time.toLocaleDateString("ar-EG")}</p>

      {/* 🕌 الهجري */}
      <p>🕌 {getHijriDate()}</p>

    </div>
  );
}