import React, { useState, useRef, useEffect } from "react";
import { ChatCircle, X, PaperPlaneTilt } from "@phosphor-icons/react";

const STARTER_PROMPTS = [
  "What's it like working with Alex?",
  "Tell me about Alex's background",
  "Did you really design this portfolio?",
];

function ClaudeChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim() || isLoading) return;

    const userMessage = { role: "user", content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();

      if (data.error) {
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content: "I'm having trouble connecting right now. Try again later, or just email Alex directly at lamanoujaim@gmail.com",
          },
        ]);
      } else {
        setMessages([
          ...newMessages,
          { role: "assistant", content: data.response },
        ]);
      }
    } catch (error) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Something went wrong. The irony of Claude failing on a portfolio about Claude is not lost on me.",
        },
      ]);
    }

    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-foreground text-background rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        aria-label="Chat with Claude"
      >
        {isOpen ? <X size={24} /> : <ChatCircle size={24} />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-background border border-border rounded-lg shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-border bg-foreground/5">
            <div className="font-mono text-xs text-foreground/50">Ask Claude</div>
            <div className="text-sm text-foreground/70">
              Yes, the actual Claude. About Alex. It's very meta.
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className="text-sm text-foreground/50">
                  I'm Claude — the AI Alex works on at Anthropic. Ask me anything about Alex, this portfolio, or the existential nature of an AI discussing its designer.
                </p>
                <div className="space-y-2">
                  {STARTER_PROMPTS.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(prompt)}
                      className="block w-full text-left text-sm px-3 py-2 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors text-foreground/70"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`text-sm ${
                  msg.role === "user"
                    ? "text-foreground ml-8"
                    : "text-foreground/70 mr-8"
                }`}
              >
                <div
                  className={`inline-block px-3 py-2 rounded-lg ${
                    msg.role === "user"
                      ? "bg-foreground text-background"
                      : "bg-foreground/10"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="text-sm text-foreground/50 mr-8">
                <div className="inline-block px-3 py-2 rounded-lg bg-foreground/10">
                  <span className="animate-pulse">thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Claude something..."
                className="flex-1 bg-foreground/5 text-foreground text-sm px-3 py-2 rounded-lg border border-border focus:outline-none focus:border-foreground/30"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-3 py-2 bg-foreground text-background rounded-lg disabled:opacity-50 hover:bg-foreground/90 transition-colors"
              >
                <PaperPlaneTilt size={18} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default ClaudeChat;
