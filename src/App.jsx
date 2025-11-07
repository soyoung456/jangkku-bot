import { Routes, Route } from "react-router-dom";
import CartPage from "./cart.jsx";
import PayPage from "./pay.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CartPage />} />
      <Route path="/pay" element={<PayPage />} />
    </Routes>
  );
}
