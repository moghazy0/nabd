import { useEffect, useState } from "react";
import { getPrayerTimes } from "../services/prayerApi";

export default function PrayerCard() {
  const [data, setData] = useState(null);
  const [nextPrayer, setNextPrayer] = useState("");
  const [remaining, setRemaining] = useState("");

  // 🔥 تحديد الصلاة القادمة
  const calculateNextPrayer = (times) => {
    const now = new Date();

    const prayers = [
      { name: "الفجر", time: times.fajr },
      { name: "الظهر", time: times.dhuhr },
      { name: "العصر", time: times.asr },
      { name: "المغرب", time: times.maghrib },
      { name: "العشاء", time: times.isha },
    ];

    for (let prayer of prayers) {
      const [h, m] = prayer.time.split(":");

      const prayerDate = new Date();

      prayerDate.setHours(h);
      prayerDate.setMinutes(m);
      prayerDate.setSeconds(0);

      if (prayerDate > now) {
        const diff = prayerDate - now;

        const hours = Math.floor(diff / (1000 * 60 * 60));

        const minutes = Math.floor(
          (diff % (1000 * 60 * 60)) / (1000 * 60)
        );

        setNextPrayer(prayer.name);

        setRemaining(
          `${hours} ساعة و ${minutes} دقيقة`
        );

        return;
      }
    }

    // لو العشاء خلص
    setNextPrayer("الفجر");
    setRemaining("غداً");
  };

  useEffect(() => {
    const load = async () => {
      const res = await getPrayerTimes();

      setData(res);

      calculateNextPrayer(res);
    };

    load();

    // تحديث كل دقيقة
    const interval = setInterval(() => {
      if (data) {
        calculateNextPrayer(data);
      }
    }, 60000);

    return () => clearInterval(interval);

  }, [data]);

  if (!data) {
    return <div className="card">⏳ جاري تحميل مواقيت الصلاة...</div>;
  }

  return (
    <div>

      {/* HEADER */}
      <div className="prayer-header">

        <h3>🕌 مواقيت الصلاة</h3>

        <div className="next-prayer">
          <div>
            ⏰ القادمة: {nextPrayer}
          </div>

          <small>
            بعد {remaining}
          </small>
        </div>

      </div>

      {/* PRAYERS */}
      <div className="prayer-list">

        <div className="prayer-item">
          <span>الفجر</span>
          <strong>{data.fajr}</strong>
        </div>

        <div className="prayer-item">
          <span>الظهر</span>
          <strong>{data.dhuhr}</strong>
        </div>

        <div className="prayer-item">
          <span>العصر</span>
          <strong>{data.asr}</strong>
        </div>

        <div className="prayer-item">
          <span>المغرب</span>
          <strong>{data.maghrib}</strong>
        </div>

        <div className="prayer-item">
          <span>العشاء</span>
          <strong>{data.isha}</strong>
        </div>

      </div>

    </div>
  );
}