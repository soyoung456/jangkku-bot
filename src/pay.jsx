import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./pay.css";

export default function PayPage() {
  const nav = useNavigate();
  const { state } = useLocation();

  const items = state?.items ?? [];
  // 총 결제 금액
const total = useMemo(
  () => items.reduce((s, it) => s + it.price * it.qty, 0),
  [items]
);

// 총 아이템 개수 (qty 합산)
const totalCount = useMemo(
  () => items.reduce((s, it) => s + it.qty, 0),
  [items]
);

  const now = new Date();
  const ts = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
    now.getDate()
  ).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}`;

  return (
    <div className="viewport-center">
      <div className="cart-mobile pay-fixed-layout">
        {/* ===== 상단 고정 ===== */}
        <div className="ios-statusbar clean">
          <div className="left">11:25</div>
          <div className="right" aria-hidden>
            <svg className="icon" viewBox="0 0 26 24">
              <g fill="#0b0f18">
                <rect x="2" y="16" width="2" height="4" rx="1" />
                <rect x="7" y="14" width="2" height="6" rx="1" />
                <rect x="12" y="12" width="2" height="8" rx="1" />
                <rect x="17" y="10" width="2" height="10" rx="1" />
              </g>
            </svg>
            <svg className="icon wifi" viewBox="0 0 24 24">
              <g
                fill="none"
                stroke="#0b0f18"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 10.5c2.4-2 5.1-3 8-3s5.6 1 8 3" />
                <path d="M7.5 14c1.3-1.1 2.9-1.7 4.5-1.7S15.2 12.9 16.5 14" />
                <circle cx="12" cy="18" r="1.5" fill="#0b0f18" stroke="none" />
              </g>
            </svg>
            <div className="battery">
              <div className="fill" style={{ width: "60%" }} />
              <span className="cap" />
            </div>
          </div>
        </div>

        <div className="ios-navbar clean">
          <button className="back" aria-label="뒤로" onClick={() => nav(-1)}>
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="title">결제</span>
        </div>

        <div className="divider-line" />

        {/* ===== 본문 ===== */}
        <div className="ps-body">
          <div className="ps-header">
            <h2 className="ps-title">주문이 완료되었습니다.</h2>
            <div className="ps-sub">{ts}</div>
          </div>

          <div className="ps-hero">
            <img src="/image2.png" alt="주문 완료 이미지" />
          </div>

          <div className="ps-list-header">
            결제된 상품 · <span className="ps-count">{totalCount} items</span>
          </div>

          <div className="ps-list-wrap">
            <ul className="ps-list">
              {items.map((it) => (
                <li className="ps-row" key={it.id}>
                  <div className="ps-name">{it.name}</div>
                  <div className="ps-qty">x {it.qty}</div>
                  <div className="ps-price">
                    ₩ {(it.price * it.qty).toLocaleString()}
                  </div>
                </li>
              ))}
              {items.length === 0 && (
                <li className="ps-empty">결제된 항목이 없습니다.</li>
              )}
            </ul>
          </div>

          <div className="ps-total-block">
            <span className="ps-total-label">총 결제 금액</span>
            <span className="ps-total-price">₩ {total.toLocaleString()}</span>
          </div>

          <button className="ps-home-btn" onClick={() => nav("/")}>
            홈 화면 가기
          </button>
        </div>
      </div>
    </div>
  );
}


