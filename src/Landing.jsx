import { motion } from "framer-motion";

export default function Landing({ onEnter }) {
  return (
    <div className="landing">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>🌟 نبض</h1>
        <p>كل يومك في مكان واحد</p>

        <div className="features">
          <p>🌤 طقس لحظي</p>
          <p>📰 أخبار مباشرة</p>
          <p>🕌 مواقيت الصلاة</p>
          <p>⏰ وقت وتاريخ</p>
        </div>

        <button onClick={onEnter}>
          🚀 دخول التطبيق
        </button>
      </motion.div>

    </div>
  );
}