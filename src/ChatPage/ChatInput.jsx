import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="메시지 입력"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">보내기</button>
    </form>
  );
}
