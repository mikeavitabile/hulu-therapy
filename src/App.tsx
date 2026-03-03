import { useEffect, useRef, useState } from "react";
import { NODES } from "./dialogue";
import "./App.css";

type From = "therapist" | "hulu";

type ChatMessage = {
  id: string;
  from: From;
  text: string;
  kind?: "normal" | "thinking"; // thinking = ellipsis bubble
};

function TypingDots() {
  return (
    <div className="typingDots" aria-label="Typing">
      <span />
      <span />
      <span />
    </div>
  );
}

export default function App() {
  const [currentId, setCurrentId] = useState<string>("start");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: crypto.randomUUID(),
      from: NODES["start"].from as From,
      text: NODES["start"].text,
    },
  ]);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const thinkTimeoutRef = useRef<number | null>(null);
  // (typewriter removed)

  const currentNode = NODES[currentId];

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

useEffect(() => {
  return () => {
    if (thinkTimeoutRef.current) window.clearTimeout(thinkTimeoutRef.current);
  };
}, []);

  function handleChoice(choice: { label: string; nextId: string; say?: string }) {
  // clear any in-flight timers
  if (thinkTimeoutRef.current) window.clearTimeout(thinkTimeoutRef.current);

  // 🔁 If choice routes to start, hard reset the session
  if (choice.nextId === "start") {
    restart();
    return;
  }

  const nextNode = NODES[choice.nextId];

  // 1) Therapist "says" the prompt the user clicked (spoken line)
  const therapistMsg: ChatMessage = {
    id: crypto.randomUUID(),
    from: "therapist",
    text: choice.say ?? choice.label,
    kind: "normal",
  };

  // 2) Add a thinking bubble for Hulu (reserve final bubble height up-front)
  const thinkingId = crypto.randomUUID();
  const thinkingMsg: ChatMessage = {
    id: thinkingId,
    from: "hulu",
    text: "",
    kind: "thinking",
  };

  setMessages((prev) => [...prev, therapistMsg, thinkingMsg]);

  // Dynamic "thinking" delay based on message length
  const base = 400; // minimum delay
  const perChar = 12; // extra ms per character
  const maxDelay = 1800; // cap so long messages don't feel broken

  const lengthFactor = nextNode.text.length * perChar;
  const jitter = Math.random() * 250; // slight unpredictability

  const delay = Math.min(base + lengthFactor + jitter, maxDelay);

  thinkTimeoutRef.current = window.setTimeout(() => {
    updateMessage(thinkingId, {
      kind: "normal",
      text: nextNode.text,
    });

    setCurrentId(choice.nextId);
    thinkTimeoutRef.current = null;
  }, delay);
}

  function restart() {
    setCurrentId("start");
    setMessages([
      {
        id: crypto.randomUUID(),
        from: NODES["start"].from as From,
        text: NODES["start"].text,
      },
    ]);
  }

function updateMessage(id: string, patch: Partial<ChatMessage>) {
  setMessages((prev) =>
    prev.map((m) => (m.id === id ? { ...m, ...patch } : m))
  );
}

function removeMessage(id: string) {
  setMessages((prev) => prev.filter((m) => m.id !== id));
}

  return (
    <div className="app">
      <header className="header">
        <h1>Hulu Turns 18</h1>
        <p>An interactive therapy session.</p>
      </header>

      <div className="chatContainer" ref={containerRef}>
        {messages.map((m) => {
          return (
            <div
              key={m.id}
              className={`bubbleRow ${m.from === "hulu" ? "right" : "left"}`}
            >
              <div
                className={`bubble ${
                  m.from === "hulu" ? "huluBubble" : "therapistBubble"
                }`}
              >
                {m.kind === "thinking" ? (
  <TypingDots />
) : (
  m.text.split("\n").map((line, idx) => <div key={idx}>{line}</div>)
)}
              </div>
            </div>
          );
        })}
      </div>

      <div className="choices">
        {currentNode?.choices?.map((choice) => (
          <button key={choice.nextId} onClick={() => handleChoice(choice)}>
            {choice.label}
          </button>
        ))}
       
      </div>

      <footer className="footer">
        Not affiliated with Hulu or Disney.
      </footer>

    </div>
  );
}