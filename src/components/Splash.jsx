import { useEffect } from "react";

export default function Splash({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDone();
    }, 1200); // سريع

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="splash">
      <div className="splash-emoji">🌟</div>
      <h1>لوحة نبض</h1>
      <p>جاري التحميل...</p>
    </div>
  );
}