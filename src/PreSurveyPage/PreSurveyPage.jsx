import { useState } from "react";
import "./PreSurveyPage.css";

export default function SurveyPage() {
  const [selectedMeds, setSelectedMeds] = useState([]);
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const [selectedPrefs, setSelectedPrefs] = useState([]); // ✅ 배열로 변경
  const [allergy, setAllergy] = useState("");

  const meds = ["혈압약", "이뇨제", "항응고제", "항생제", "당뇨약"];
  const diseases = ["고혈압", "당뇨병", "고지혈증", "신장질환", "간질환"];
  const prefs = ["건강 중시", "환경 중시", "가격 중시"];

  // ✅ 공통 토글 함수
  const toggleSelect = (item, list, setList) => {
    setList((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  // ✅ 제출 시 로컬스토리지 저장
  const handleSubmit = () => {
    const userInfo = {
      meds: selectedMeds,
      diseases: selectedDiseases,
      allergy,
      preferences: selectedPrefs, // ✅ 변경
    };
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    window.location.href = "/chat";
  };

  return (
    <div className="survey-container">
      <h1>jangjju-bot 🛒</h1>
      <p>채팅을 시작하기 전 정보 입력하기~!</p>

      {/* 복용 중인 약 */}
      <h3>복용 중인 약</h3>
      <div className="option-group">
        {meds.map((med) => (
          <button
            key={med}
            className={`option-btn ${selectedMeds.includes(med) ? "active" : ""}`}
            onClick={() => toggleSelect(med, selectedMeds, setSelectedMeds)}
          >
            {med}
          </button>
        ))}
      </div>

      {/* 진단받은 질병 */}
      <h3>진단받은 질병</h3>
      <div className="option-group">
        {diseases.map((d) => (
          <button
            key={d}
            className={`option-btn ${selectedDiseases.includes(d) ? "active" : ""}`}
            onClick={() => toggleSelect(d, selectedDiseases, setSelectedDiseases)}
          >
            {d}
          </button>
        ))}
      </div>

      {/* 알레르기 */}
      <h3>알레르기</h3>
      <input
        type="text"
        placeholder="예: 땅콩, 갑각류 (쉼표로 구분)"
        value={allergy}
        onChange={(e) => setAllergy(e.target.value)}
        className="allergy-input"
      />

      {/* ✅ 선호 옵션 (중복 선택 가능) */}
      <h3>어떤 점을 가장 중요하게 생각하시나요?</h3>
      <div className="option-group">
        {prefs.map((p) => (
          <button
            key={p}
            className={`option-btn ${selectedPrefs.includes(p) ? "active" : ""}`}
            onClick={() => toggleSelect(p, selectedPrefs, setSelectedPrefs)}
          >
            {p}
          </button>
        ))}
      </div>

      <button className="submit-btn" onClick={handleSubmit}>
        시작하기 🚀
      </button>
    </div>
  );
}
