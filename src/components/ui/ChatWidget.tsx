"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const STARTER: Message = {
  role: "assistant",
  content:
    "Hi — I'm a placeholder assistant. Wire me up to an LLM API to answer questions about Dhanashree's experience automatically.",
};

/**
 * Floating chat assistant. The UI and conversation state are fully
 * functional; only the response generation is a stub. Replace
 * `getReply` with a real call to /api/chat (which should call the
 * Anthropic API server-side with your API key) to make it live.
 */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([STARTER]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

const getReply = async (_history: Message[]): Promise<string> => {
  //TODO: replace this stub with a real call, e.g.:
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: _history }),
  });
  const data = await res.json();
  return data.reply;
  await new Promise((r) => setTimeout(r, 600));
  return "This is a placeholder reply. Connect /api/chat to a real model to enable live answers.";
};

  const send = async () => {
    if (!input.trim() || sending) return;
    const next = [...messages, { role: "user" as const, content: input.trim() }];
    setMessages(next);
    setInput("");
    setSending(true);
    const reply = await getReply(next);
    setMessages([...next, { role: "assistant", content: reply }]);
    setSending(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close assistant" : "Open assistant"}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent-blue text-white shadow-glow transition-transform hover:scale-105 hover:shadow-glow-cyan"
      >
        {open ? <X size={20} /> : <Bot size={20} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="glass-panel fixed bottom-24 right-6 z-40 flex h-[440px] w-[min(360px,calc(100vw-3rem))] flex-col rounded-lg shadow-2xl"
          >
            <div className="flex items-center gap-2 border-b border-base-line px-4 py-3">
              <Bot size={16} className="text-accent-cyan" />
              <p className="font-mono text-xs text-ink">Ask about my work</p>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-md px-3 py-2 text-xs leading-relaxed ${
                    m.role === "user"
                      ? "ml-auto bg-accent-blue/20 text-ink"
                      : "bg-base-raised text-ink-dim"
                  }`}
                >
                  {m.content}
                </div>
              ))}
              {sending && (
                <div className="max-w-[85%] rounded-md bg-base-raised px-3 py-2 text-xs text-ink-faint">
                  Thinking…
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 border-t border-base-line p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask a question…"
                className="flex-1 rounded-md border border-base-line bg-base-panel/60 px-3 py-2 text-xs text-ink placeholder:text-ink-faint focus:border-accent-cyan/60 focus:outline-none"
              />
              <button
                onClick={send}
                aria-label="Send"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent-blue text-white hover:bg-accent-blue/90"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
