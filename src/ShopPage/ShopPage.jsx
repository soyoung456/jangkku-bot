import { useNavigate } from "react-router-dom";
import "./ShopPage.css";

// ✅ 이미지 import (src/assets 안에 넣기)
import buldakImg from "./buldak.png";
import maximImg from "./maxim.png";
import milkImg from "./milk.jpg";
import chatIcon from "./chat-icon.png"; // 챗봇 아이콘

export default function ShopPage() {
  const navigate = useNavigate();

  // 🧡 챗 아이콘 클릭 → 사전 정보 입력 페이지로 이동
  const handleChatClick = () => {
    navigate("/survey");
  };

  return (
    <div className="shop-container">
      {/* ===== 헤더 ===== */}
      <header className="shop-header">
        <h1>shop 🛒</h1>
        <p>신선하고, 건강한 상품을 만나보세요</p>
      </header>

      {/* ===== 상품 목록 (직접 지정) ===== */}
      <div className="product-list">
        <div className="product-card">
          <img src={buldakImg} alt="불닭볶음면" className="product-img" />
          <div className="product-info">
            <h3>불닭볶음면 140g</h3>
            <p>₩9,780</p>
          </div>
          <button className="buy-btn">장바구니 담기</button>
        </div>

        <div className="product-card">
          <img src={maximImg} alt="맥심 커피 믹스" className="product-img" />
          <div className="product-info">
            <h3>맥심 커피 믹스</h3>
            <p>₩9,300</p>
          </div>
          <button className="buy-btn">장바구니 담기</button>
        </div>

        <div className="product-card">
          <img src={milkImg} alt="서울 우유" className="product-img" />
          <div className="product-info">
            <h3>서울우유 2.3L</h3>
            <p>₩7,580</p>
          </div>
          <button className="buy-btn">장바구니 담기</button>
        </div>
      </div>

      {/* ===== 하단 챗봇 아이콘 ===== */}
      <img
        src={chatIcon}
        alt="Chatbot Icon"
        className="chat-floating"
        onClick={handleChatClick}
      />
    </div>
  );
}
