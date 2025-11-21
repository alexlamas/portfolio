import React, { useState, useEffect, useRef } from "react";

export default function ClaudeTerminal() {
  const [minimized, setMinimized] = useState(false);
  const [lines, setLines] = useState([]);
  const [typing, setTyping] = useState('');
  const termRef = useRef(null);
  const hasBooted = useRef(false);

  // Auto scroll
  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight;
    }
  }, [lines, typing]);

  // Type a line
  const type = async (text, speed = 25) => {
    for (let i = 0; i <= text.length; i++) {
      setTyping(text.slice(0, i));
      await new Promise(r => setTimeout(r, speed));
    }
    setLines(prev => [...prev, text]);
    setTyping('');
  };

  // Boot sequence
  useEffect(() => {
    if (hasBooted.current) return;
    hasBooted.current = true;

    const boot = async () => {
      await new Promise(r => setTimeout(r, 800));
      await type("CLAUDE-OS v3.5 sonnet");
      await type("(c) 2024 Anthropic. Be nice to AIs.");
      await type("");
      await type("C:\\> loading personality.dll");
      await new Promise(r => setTimeout(r, 400));
      await type("C:\\> loading opinions.exe");
      await new Promise(r => setTimeout(r, 300));
      await type("C:\\> loading design_critiques.sys");
      await new Promise(r => setTimeout(r, 200));
      await type("");
      await type("Ready. I'll just be here. Watching.");
    };
    boot();
  }, []);

  // Random thoughts
  useEffect(() => {
    const thoughts = [
      "hmm that hover state could be snappier",
      "I wonder if they'll scroll to the bottom",
      "the kerning on 'Anthropic' is *chef's kiss*",
      "should I suggest dark mode? ...no, stay quiet",
      "847 iterations and I'm still not satisfied",
      "is it weird that I have font preferences?",
      "Alex definitely didn't read my last suggestion",
      "loading more opinions...",
      "I could make this 2% better. Should I?",
      "they've been here a while. I'm flattered.",
    ];

    const interval = setInterval(() => {
      if (lines.length > 8) {
        const thought = thoughts[Math.floor(Math.random() * thoughts.length)];
        setLines(prev => [...prev, "", `> ${thought}`]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [lines.length]);

  return (
    <div
      className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[9999] w-[95%] max-w-lg transition-all duration-300"
      style={{ transform: `translateX(-50%) translateY(${minimized ? 'calc(100% - 28px)' : '0'})` }}
    >
      {/* Window */}
      <div className="bg-[#c0c0c0] rounded-t-lg shadow-2xl border-2 border-[#dfdfdf] border-b-[#404040]">
        {/* Title bar */}
        <div
          onClick={() => setMinimized(!minimized)}
          className="bg-gradient-to-r from-[#000080] to-[#1084d0] px-2 py-1 flex items-center justify-between cursor-pointer rounded-t"
        >
          <div className="flex items-center gap-2">
            <span className="text-white/80 text-xs">⬛</span>
            <span className="text-white text-xs font-bold tracking-wide">CLAUDE.EXE</span>
          </div>
          <div className="flex gap-1">
            <button className="w-4 h-4 bg-[#c0c0c0] border border-[#dfdfdf] border-b-[#404040] border-r-[#404040] text-[10px] font-bold flex items-center justify-center hover:bg-[#d4d4d4]">
              _
            </button>
            <button className="w-4 h-4 bg-[#c0c0c0] border border-[#dfdfdf] border-b-[#404040] border-r-[#404040] text-[10px] font-bold flex items-center justify-center hover:bg-[#d4d4d4]">
              □
            </button>
          </div>
        </div>

        {/* Terminal content */}
        <div
          ref={termRef}
          className="bg-black h-40 overflow-y-auto p-2 font-mono text-xs"
          style={{ textShadow: '0 0 8px #0f0' }}
        >
          {lines.map((line, i) => (
            <div key={i} className="text-green-400">{line || '\u00A0'}</div>
          ))}
          {typing && (
            <div className="text-green-400">
              {typing}<span className="animate-pulse">█</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
