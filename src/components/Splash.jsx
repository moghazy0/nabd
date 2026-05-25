import { useEffect, useState } from "react";

export default function Splash() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHide(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`splash ${hide ? "hide" : ""}`}>
      <div className="splash-emoji">🌙</div>
      <h2>نبض</h2>
      <p>جاري التحميل...</p>
    </div>
  );
}