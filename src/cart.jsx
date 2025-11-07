import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";


export default function CartPage({ initialItems }) {
  const nav = useNavigate();
  const [items, setItems] = useState(
    initialItems ?? [
      { id: "p1", name: "사과", price: 5000, qty: 1, img: "/vite.svg" },
      { id: "p2", name: "닭가슴살", price: 8500, qty: 1, img: "/vite.svg" },
      { id: "p3", name: "양파 1kg", price: 15000, qty: 1, img: "/vite.svg" },
      { id: "p4", name: "당근 1kg", price: 18000, qty: 1, img: "/vite.svg" },
      { id: "p5", name: "코카콜라", price: 3000, qty: 1, img: "/vite.svg" },
      { id: "p6", name: "오뚜기 카레", price: 5000, qty: 1, img: "/vite.svg" },
      { id: "p7", name: "목살 1kg", price: 20000, qty: 1, img: "/vite.svg" },
      { id: "p8", name: "카레 여왕", price: 7000, qty: 1, img: "/vite.svg" },
      { id: "p9", name: "바나나", price: 4000, qty: 1, img: "/vite.svg" },
      { id: "p10", name: "딸기", price: 17900, qty: 1, img: "/vite.svg" }
    ]
  );

  // 합계
  const total = useMemo(
    () => items.reduce((s, it) => s + it.price * it.qty, 0),
    [items]
  );

  const inc = (id) =>
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x)));
  const dec = (id) =>
    setItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, qty: Math.max(1, x.qty - 1) } : x))
    );
    
  const remove = (id) => {
  setItems((prev) => prev.filter((x) => x.id !== id));
};


  const checkout = () => {
    if (!items.length) {
      alert("장바구니가 비어 있어요.");
      return;
    }
    nav("/pay", { state: { items, total } });
  };

  return (
  <div className="viewport-center">
    <div className="cart-mobile">
      {/* === iOS 상태바 (왼쪽 시간 / 오른쪽 아이콘) === */}
<div className="ios-statusbar clean">
  <div className="left">11:25</div>
  <div className="right" aria-hidden>
    {/* 신호 막대 */}
    <svg className="icon" viewBox="0 0 26 24">
      <g fill="#0b0f18">
        <rect x="2"  y="16" width="2" height="4"  rx="1"/>
        <rect x="7"  y="14" width="2" height="6"  rx="1"/>
        <rect x="12" y="12" width="2" height="8"  rx="1"/>
        <rect x="17" y="10" width="2" height="10" rx="1"/>
      </g>
    </svg>

    {/* Wi-Fi (선형) */}
    <svg className="icon wifi" viewBox="0 0 24 24">
      <g fill="none" stroke="#0b0f18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 10.5c2.4-2 5.1-3 8-3s5.6 1 8 3"/>
        <path d="M7.5 14c1.3-1.1 2.9-1.7 4.5-1.7S15.2 12.9 16.5 14"/>
        <circle cx="12" cy="18" r="1.5" fill="#0b0f18" stroke="none"/>
      </g>
    </svg>

    {/* 배터리 */}
    <div className="battery">
      <div className="fill" style={{ width: '60%' }} /> {/* 잔량 % 조절 */}
      <span className="cap" />
    </div>
  </div>
</div>

{/* === iOS 네비게이션 바 (가운데 제목, 왼쪽 뒤로가기) === */}
<div className="ios-navbar clean">
  <button className="back" aria-label="back">
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 19l-7-7 7-7" />
    </svg>
  </button>
  <span className="title">장꾸봇</span>
</div>

    {/* 본문 영역 래퍼 */}
    <div className="cm-shell"></div>
      {/* 아이템 카드 리스트 */}
      <div className="cm-list">
        {items.map((it) => (
          <div className="cm-card" key={it.id} data-id={it.id}>
            <div className="cm-thumb">
              <img src={it.img || "/vite.svg"} alt={it.name} />
            </div>

            <div className="cm-meta">
              <div className="cm-name" title={it.name}>
                {it.name}
              </div>

              {/* 항목 최종 금액만 표시 */}
              <div className="cm-price-final">
                ₩{(it.price * it.qty).toLocaleString()}
              </div>

              {/* 수량 조절 + 삭제(아이콘만) */}
              <div className="cm-controls">
                <button
                  className="cm-circle"
                  aria-label="decrease"
                  onClick={() => dec(it.id)}
                  disabled={it.qty === 1}
                >
                  −
                </button>

                <span className="cm-qty">{it.qty}</span>

                <button
                  className="cm-circle"
                  aria-label="increase"
                  onClick={() => inc(it.id)}
                >
                  +
                </button>

                <button
                  className="cm-remove"
                  onClick={() => remove(it.id)}
                  aria-label="remove"
                >
                  <span className="cm-trash" aria-hidden>
                    🗑️
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {!items.length && (
          <div className="cm-empty">아직 담긴 상품이 없어요.</div>
        )}
      </div>

      {/* 총합 + 결제 버튼을 한 박스로 묶기 */}
      <div className="cm-summary">
        <div className="cm-row cm-total">
          <span>총합</span>
          <b>₩{total.toLocaleString()}</b>
        </div>

        <button className="cm-cta" onClick={checkout}>
          결제 진행
        </button>
      </div>
    </div>
  </div>
);
}
