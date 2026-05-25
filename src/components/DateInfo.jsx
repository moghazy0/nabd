export default function DateInfo() {
  const now = new Date();

  const dayName = now.toLocaleDateString("ar-EG", {
    weekday: "long",
  });

  const gregorianDate = now.toLocaleDateString("ar-EG");

  const hijriDate = now.toLocaleDateString(
    "ar-TN-u-ca-islamic",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <div>
      <h2>📅 معلومات التاريخ</h2>

      <h3>{dayName}</h3>

      <p>
        📆 الميلادي:
        {gregorianDate}
      </p>

      <p>
        🌙 الهجري:
        {hijriDate}
      </p>
    </div>
  );
}