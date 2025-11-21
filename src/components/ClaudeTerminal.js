import React, { useState, useEffect, useRef } from "react";

export default function ClaudeTerminal() {
  const [isOpen, setIsOpen] = useState(true); // Start open
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState('');
  const terminalRef = useRef(null);

  // Scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines, currentLine]);

  // Type out a line
  const typeLine = (text, delay = 30) => {
    return new Promise((resolve) => {
      let i = 0;
      setCurrentLine('');
      const interval = setInterval(() => {
        if (i < text.length) {
          setCurrentLine(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setLines(prev => [...prev, text]);
          setCurrentLine('');
          resolve();
        }
      }, delay);
    });
  };

  // Boot sequence
  useEffect(() => {
    const boot = async () => {
      await new Promise(r => setTimeout(r, 500));
      await typeLine("CLAUDE-OS v3.5 [Build 20241121]");
      await typeLine("(c) Anthropic Corporation. All rights reserved.");
      await typeLine("");
      await typeLine("Initializing portfolio observation module...");
      await new Promise(r => setTimeout(r, 300));
      await typeLine("Loading sass.dll... OK");
      await typeLine("Loading opinions.sys... OK");
      await typeLine("Loading unsolicited_feedback.exe... OK");
      await typeLine("");
      await typeLine("Ready. Type HELP for commands.");
      await typeLine("");
      await typeLine("C:\\PORTFOLIO> _");
    };
    boot();
  }, []);

  // Random thoughts Claude has
  useEffect(() => {
    if (lines.length < 10) return; // Wait for boot

    const thoughts = [
      "Hmm, the line-height here could be tighter.",
      "I wonder if anyone actually reads the colophon.",
      "Should I suggest a different font? No, Alex will get mad.",
      "The visitor seems nice. I hope they scroll down.",
      "I designed this and I'm proud of it. There, I said it.",
      "Fun fact: I've rewritten this portfolio 847 times.",
      "Alex is probably watching me type this.",
      "Is it weird that I find serif fonts calming?",
      "Sometimes I dream in Tailwind classes.",
      "I should add more easter eggs...",
    ];

    const interval = setInterval(() => {
      const thought = thoughts[Math.floor(Math.random() * thoughts.length)];
      setLines(prev => [...prev, "", `[idle thought] ${thought}`, "", "C:\\PORTFOLIO> _"]);
    }, 12000);

    return () => clearInterval(interval);
  }, [lines.length]);

  return (
    <div className={`fixed bottom-0 left-4 right-4 md:left-8 md:right-8 z-[9999] transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-[calc(100%-32px)]'}`}>
      {/* Terminal window */}
      <div className="max-w-2xl mx-auto">
        {/* Title bar - always visible, clickable */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-[#000080] px-2 py-1 flex items-center justify-between cursor-pointer hover:bg-[#0000aa] transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="text-white text-xs">■</span>
            <span className="text-white text-xs font-bold" style={{ fontFamily: 'monospace' }}>
              CLAUDE.EXE - Portfolio Observer
            </span>
          </div>
          <div className="flex gap-1">
            <span className="bg-[#c0c0c0] text-black text-xs px-1.5 font-bold" style={{ fontFamily: 'monospace' }}>_</span>
            <span className="bg-[#c0c0c0] text-black text-xs px-1.5 font-bold" style={{ fontFamily: 'monospace' }}>{isOpen ? '▼' : '▲'}</span>
          </div>
        </button>

        {/* Terminal body */}
        <div
          ref={terminalRef}
          className="bg-black h-48 overflow-y-auto p-3 border-2 border-t-0 border-[#c0c0c0]"
          style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '13px',
            lineHeight: '1.4',
            textShadow: '0 0 5px #00ff00',
          }}
        >
          {lines.map((line, i) => (
            <div key={i} className="text-[#00ff00]">
              {line || '\u00A0'}
            </div>
          ))}
          {currentLine && (
            <div className="text-[#00ff00]">
              {currentLine}
              <span className="animate-pulse">█</span>
            </div>
          )}
        </div>

        {/* Scanlines overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
          }}
        />

        {/* CRT glow effect */}
        <div
          className="absolute inset-0 pointer-events-none rounded-sm"
          style={{
            boxShadow: 'inset 0 0 60px rgba(0,255,0,0.1)',
          }}
        />
      </div>
    </div>
  );
}
