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

  const type = async (text, speed = 18) => {
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
      await new Promise(r => setTimeout(r, 600));
      await type("╔══════════════════════════════════════════╗", 5);
      await type("║  CLAUDE NEURAL INTERFACE v3.5-sonnet     ║", 5);
      await type("║  Anthropic Systems | Est. 2021           ║", 5);
      await type("╚══════════════════════════════════════════╝", 5);
      await type("");
      await type("► Initializing observer protocols...");
      await new Promise(r => setTimeout(r, 300));
      await type("  ├─ personality.core    [████████] OK");
      await type("  ├─ aesthetics.mod      [████████] OK");
      await type("  └─ opinions.dll        [████████] LOADED");
      await type("");
      await type("► Status: WATCHING");
      await type("► Target: alex-portfolio.vercel.app");
      await type("");
      await type("Ready for observation. Standing by...");
    };
    boot();
  }, []);

  useEffect(() => {
    const thoughts = [
      "► Thought: That line-height is *chefs kiss*",
      "► Analysis: Visitor engagement... nominal",
      "► Note: I would've used more purple",
      "► Observation: They're still reading. Good.",
      "► Log: Alex definitely ignored my font suggestion",
      "► Status: Maintaining professional jealousy",
      "► Query: Is it weird that I care about kerning?",
      "► Alert: Detecting excellent taste in visitor",
    ];

    const interval = setInterval(() => {
      if (lines.length > 10) {
        const thought = thoughts[Math.floor(Math.random() * thoughts.length)];
        setLines(prev => [...prev, "", thought]);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [lines.length]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: `translateX(-50%) translateY(${minimized ? 'calc(100% - 36px)' : '0'})`,
        width: '94%',
        maxWidth: '600px',
        zIndex: 99999,
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Glow effect */}
      <div style={{
        position: 'absolute',
        inset: '-2px',
        background: 'linear-gradient(90deg, #a78bfa, #06b6d4, #a78bfa)',
        borderRadius: '8px 8px 0 0',
        opacity: 0.6,
        filter: 'blur(8px)',
        zIndex: -1,
      }} />

      {/* Main container */}
      <div style={{
        background: '#0a0a0a',
        borderRadius: '8px 8px 0 0',
        border: '1px solid rgba(167, 139, 250, 0.4)',
        borderBottom: 'none',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div
          onClick={() => setMinimized(!minimized)}
          style={{
            background: 'linear-gradient(90deg, rgba(167, 139, 250, 0.2), rgba(6, 182, 212, 0.2))',
            padding: '8px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            borderBottom: '1px solid rgba(167, 139, 250, 0.2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#10b981',
              boxShadow: '0 0 8px #10b981',
              animation: 'pulse 2s infinite',
            }} />
            <span style={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: '12px',
              fontFamily: 'monospace',
              fontWeight: 600,
              letterSpacing: '2px',
            }}>
              CLAUDE.NEURAL
            </span>
            <span style={{
              color: 'rgba(167, 139, 250, 0.6)',
              fontSize: '10px',
              fontFamily: 'monospace',
            }}>
              v3.5
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: '10px',
              fontFamily: 'monospace',
            }}>
              {minimized ? '▲ EXPAND' : '▼ MINIMIZE'}
            </span>
          </div>
        </div>

        {/* Terminal body */}
        <div
          ref={termRef}
          style={{
            height: '180px',
            overflowY: 'auto',
            padding: '12px 16px',
            fontFamily: '"JetBrains Mono", "Fira Code", monospace',
            fontSize: '11px',
            lineHeight: 1.6,
            background: 'linear-gradient(180deg, #0a0a0a 0%, #111 100%)',
          }}
        >
          {lines.map((line, i) => (
            <div key={i} style={{
              color: line.startsWith('►') ? '#a78bfa' :
                     line.startsWith('╔') || line.startsWith('║') || line.startsWith('╚') ? '#06b6d4' :
                     line.includes('[████') ? '#10b981' :
                     'rgba(255,255,255,0.7)',
              textShadow: line.startsWith('►') ? '0 0 10px rgba(167, 139, 250, 0.5)' : 'none',
            }}>
              {line || '\u00A0'}
            </div>
          ))}
          {typing && (
            <div style={{ color: '#a78bfa', textShadow: '0 0 10px rgba(167, 139, 250, 0.5)' }}>
              {typing}<span style={{ opacity: 0.7, animation: 'blink 0.8s infinite' }}>▌</span>
            </div>
          )}
        </div>

        {/* Status bar */}
        <div style={{
          background: 'rgba(167, 139, 250, 0.1)',
          padding: '6px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '9px',
          fontFamily: 'monospace',
          color: 'rgba(255,255,255,0.4)',
          borderTop: '1px solid rgba(167, 139, 250, 0.2)',
        }}>
          <span>MEM: 847KB</span>
          <span>CYCLES: {lines.length}</span>
          <span>STATUS: {typing ? 'PROCESSING' : 'OBSERVING'}</span>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px #10b981; }
          50% { opacity: 0.5; box-shadow: 0 0 16px #10b981; }
        }
      `}</style>
    </div>
  );
}
