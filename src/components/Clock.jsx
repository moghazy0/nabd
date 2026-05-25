import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());
  const [hijri, setHijri] = useState("...");

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // 🔥 API هجري مضمون
  useEffect(() => {
    const getHijriDate = async () => {
      try {
        const today = new Date();
        const formatted = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

        const res = await fetch(
          `https://api.aladhan.com/v1/gToH?date=${formatted}`
        );

        const json = await res.json();

        if (json?.data?.hijri) {
          const h = json.data.hijri;
          setHijri(`${h.day} ${h.month.ar} ${h.year}`);
        } else {
          throw new Error("No hijri data");
        }
      } catch (err) {
        console.log("Hijri API failed:", err);

        // 🔥 fallback قوي (لو API وقع)
        const fallback = new Intl.DateTimeFormat("ar-SA-u-ca-islamic", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(new Date());

        setHijri(fallback);
      }
    };

    getHijriDate();
  }, []);

  return (
    <div>

      <div className="clock-time">
        {time.toLocaleTimeString()}
      </div>

      <div className="clock-day">
        {time.toLocaleDateString("ar-EG", { weekday: "long" })}
      </div>

      <div className="clock-date">
        {time.toLocaleDateString("ar-EG")}
      </div>

      <div className="clock-hijri">
        🕌 هجري: {hijri}
      </div>

    </div>
  );
}