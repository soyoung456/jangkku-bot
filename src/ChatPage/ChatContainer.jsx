import { useState } from "react";
import ProductCard from "./ProductCard";
import botImg from "./bot.png";
import { HiOutlineShoppingCart } from "react-icons/hi";

export default function ChatPage() {
  // ✅ 대화 상태
  const [messages, setMessages] = useState([
    { sender: "bot", text: "안녕하세요! jangkku-bot입니다👋" },
  ]);

  // ✅ 입력 상태
  const [input, setInput] = useState("");

  // ✅ 임시 상품 데이터 (mock data)
  const mockProducts = [
    { name: "프리미엄 유기농 사과 5kg", price: "₩15,000", img: "apple.jpg" },
    { name: "신선한 제주 감귤 3kg", price: "₩9,800", img: "orange.jpg" },
    { name: "달콤한 배 4입 세트", price: "₩13,500", img: "pear.jpg" },
  ];

  // ✅ 메시지 전송 함수
  const handleSend = async () => {
    if (!input.trim()) return;

    // 1. 사용자 메시지 추가
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    // 2. “사과” 키워드에 따라 봇 응답 분기
    if (input.includes("사과")) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "이런 상품은 어떠신가요? 🍎" },
        { type: "productList", products: mockProducts }, // ✅ 묶어서 한 번에 추가
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "죄송해요, 아직 그건 잘 모르겠어요 😅" },
      ]);
    }

    setInput(""); // 입력창 초기화
  };

  // ✅ 렌더링 부분
  return (
    <div className="chat-container">
      {/* 상단 헤더 */}
      <div className="chat-header">
        <button className="back-button" onClick={() => window.history.back()}>
          ←
        </button>

        <div className="chat-title">jangkku-bot</div>

        <button className="cart-button" onClick={() => alert("장바구니로 이동!")}>
          <HiOutlineShoppingCart />
        </button>
      </div>

      {/* 메시지 영역 */}
      <div className="chat-messages">
        {messages.map((msg, i) => {
          if (msg.type === "productList") {
            // ✅ 여러 상품 한꺼번에 렌더링
            return (
              <div key={i} className="product-list">
                {msg.products.map((product, j) => (
                  <ProductCard key={j} product={product} />
                ))}
              </div>
            );
          } else {
            // ✅ 일반 텍스트 메시지
            return (
              <div key={i} className={`chat-message ${msg.sender}`}>
                {msg.sender === "bot" && (
                  <img src={botImg} alt="봇" className="message-avatar" />
                )}
                <div className="bubble">{msg.text}</div>
              </div>
            );
          }
        })}
      </div>

      {/* 입력창 */}
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지 입력"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>보내기</button>
      </div>
    </div>
  );
}
