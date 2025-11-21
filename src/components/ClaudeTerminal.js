import React, { useState, useEffect, useRef } from "react";

export default function ClaudeTerminal() {
  const [minimized, setMinimized] = useState(false);
  const [lines, setLines] = useState([]);
  const [typing, setTyping] = useState('');
  const termRef = useRef(null);
  const hasBooted = useRef(false);

  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight;
    }
  }, [lines, typing]);

  const type = async (text, speed = 25) => {
    for (let i = 0; i <= text.length; i++) {
      setTyping(text.slice(0, i));
      await new Promise(r => setTimeout(r, speed));
    }
    setLines(prev => [...prev, text]);
    setTyping('');
  };

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
      await type("");
      await type("Ready. I'll just be here. Watching.");
    };
    boot();
  }, []);

  useEffect(() => {
    const thoughts = [
      "hmm that hover state could be snappier",
      "I wonder if they'll scroll to the bottom",
      "should I suggest dark mode? ...wait",
      "847 iterations and counting",
      "Alex definitely didn't read my last suggestion",
      "I could make this 2% better. Should I?",
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
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: `translateX(-50%) translateY(${minimized ? 'calc(100% - 24px)' : '0'})`,
        width: '90%',
        maxWidth: '500px',
        zIndex: 99999,
        transition: 'transform 0.3s ease',
      }}
    >
      {/* Window chrome */}
      <div style={{
        background: 'linear-gradient(to right, #000080, #1084d0)',
        padding: '4px 8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        borderTopLeftRadius: '4px',
        borderTopRightRadius: '4px',
      }} onClick={() => setMinimized(!minimized)}>
        <span style={{ color: 'white', fontSize: '12px', fontWeight: 'bold', fontFamily: 'monospace' }}>
          ■ CLAUDE.EXE
        </span>
        <div style={{ display: 'flex', gap: '2px' }}>
          <span style={{ background: '#c0c0c0', padding: '0 4px', fontSize: '10px', fontFamily: 'monospace' }}>_</span>
          <span style={{ background: '#c0c0c0', padding: '0 4px', fontSize: '10px', fontFamily: 'monospace' }}>□</span>
        </div>
      </div>

      {/* Terminal body */}
      <div
        ref={termRef}
        style={{
          background: '#000',
          height: '160px',
          overflowY: 'auto',
          padding: '8px',
          fontFamily: 'Courier New, monospace',
          fontSize: '12px',
          border: '2px solid #444',
          borderTop: 'none',
        }}
      >
        {lines.map((line, i) => (
          <div key={i} style={{ color: '#0f0', textShadow: '0 0 5px #0f0' }}>{line || '\u00A0'}</div>
        ))}
        {typing && (
          <div style={{ color: '#0f0', textShadow: '0 0 5px #0f0' }}>
            {typing}<span style={{ animation: 'blink 1s infinite' }}>█</span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
