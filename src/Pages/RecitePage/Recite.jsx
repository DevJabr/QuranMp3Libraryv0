import React, { useEffect, useState, Suspense, lazy } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./Recite.css";

// استيراد مشغل الصوت بشكل كسول (Lazy Loading)
const LazyAudioPlayer = lazy(() => import("react-h5-audio-player"));

const Recite = () => {
  const [surahTitle, setSurahTitle] = useState([]);
  const [reciter, setReciter] = useState({ url: "", number: "" });
  const [activeSurah, setActiveSurah] = useState(null);
  const [loadingSurah, setLoadingSurah] = useState(null);

  // هنا إضافة الحالة الخاصة بالعرض الجزئي
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    fetch("https://quranapi.pages.dev/api/surah.json")
      .then((response) => response.json())
      .then((data) => setSurahTitle(data))
      .catch(console.error);
  }, []);

  const handleReciterChange = (e) => {
    const selected = e.target.options[e.target.selectedIndex];
    setReciter({
      url: e.target.value,
      number: selected.getAttribute("number") || "8",
    });
    setActiveSurah(null); // إعادة تعيين عند تغيير القارئ
  };

  const handleSurahClick = (index) => {
    setActiveSurah(index);
    setLoadingSurah(index);
  };

  // دالة لزيادة عدد العناصر المعروضة
  const showMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  return (
    <div className="page-container">
      <div className="recitations">
        <h1>قائمة التلاوات المسجلة</h1>

        <div className="select-reciter">
          <label>اختر القارئ</label>
          <select value={reciter.url} onChange={handleReciterChange}>
            <option value="" number="">
              -- اختر قارئا --
            </option>
            <option value="yasser" number="11">
              ياسر الدوسري
            </option>
            <option value="hani" number="8">
              هاني الرفاعي
            </option>
            <option value="shatri" number="11">
              أبو بكر الشاطري
            </option>
            <option value="qtm" number="6">
              ناصر القطامي
            </option>
          </select>
        </div>

        <div className="tilawat-audio">
          <ul>
            {surahTitle.slice(0, visibleCount).map((surah, index) => (
              <li key={index}>
                <button
                  onClick={() => handleSurahClick(index)}
                  className={`surah-button ${
                    activeSurah === index ? "active" : ""
                  }`}
                >
                  {`${index + 1}: ${surah.surahNameArabic}`}
                </button>

                {activeSurah === index && reciter.url && (
                  <div className="audio-container">
                    {loadingSurah === index && (
                      <div className="loading-placeholder">
                        جار تشغيل التلاوة....
                      </div>
                    )}

                    <Suspense fallback={null}>
                      <LazyAudioPlayer
                        src={`https://server${reciter.number}.mp3quran.net/${
                          reciter.url
                        }/${String(index + 1).padStart(3, "0")}.mp3`}
                        onPlay={() => setLoadingSurah(null)}
                        onCanPlay={() => setLoadingSurah(null)}
                        onError={() => setLoadingSurah(null)}
                        style={{
                          display: loadingSurah === index ? "none" : "block",
                          borderRadius: 10,
                          padding: 20,
                          width: 300,
                          height: 100,
                          backgroundColor: "#e8e6deff",
                          marginTop: 16,
                        }}
                      />
                    </Suspense>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* زر المزيد يظهر فقط لو ما زال هناك المزيد للعرض */}
          {visibleCount < surahTitle.length && (
            <button
              className="morebtn"
              onClick={showMore}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                fontSize: "1.8rem",
                cursor: "pointer",
                borderRadius: 1,
                backgroundColor: "#1a120b",
                color: "white",
              }}
            >
              باقي القائمة
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recite;
