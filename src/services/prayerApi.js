export async function getPrayerTimes() {
  const res = await fetch(
    "https://api.aladhan.com/v1/timingsByCity?city=Cairo&country=EG&method=5"
  );

  const json = await res.json();
  const t = json.data.timings;

  return {
    fajr: t.Fajr,
    dhuhr: t.Dhuhr,
    asr: t.Asr,
    maghrib: t.Maghrib,
    isha: t.Isha,
    nextPrayer: "قريباً",
  };
}