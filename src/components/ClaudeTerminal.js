import React, { useState, useEffect, useRef } from "react";

export default function ClaudeTerminal() {
  const [minimized, setMinimized] = useState(false);
  const [lines, setLines] = useState([]);
  const [typing, setTyping] = useState('');
  const termRef = useRef(null);
  const hasBooted = useRef(false);
  const statsRef = useRef({
    scrollDepth: 0,
    timeOnPage: 0,
    mouseDistance: 0,
    clicks: 0,
    lastMousePos: { x: 0, y: 0 },
    sectionsViewed: new Set(),
  });

  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight;
    }
  }, [lines, typing]);

  const addLine = (text) => {
    setLines(prev => [...prev, text]);
  };

  const type = async (text, speed = 18) => {
    for (let i = 0; i <= text.length; i++) {
      setTyping(text.slice(0, i));
      await new Promise(r => setTimeout(r, speed));
    }
    addLine(text);
    setTyping('');
  };

  // Boot sequence
  useEffect(() => {
    if (hasBooted.current) return;
    hasBooted.current = true;

    const boot = async () => {
      await new Promise(r => setTimeout(r, 600));
      await type("  ░█████╗░██╗░░░░░░█████╗░██╗░░░██╗██████╗░███████╗", 2);
      await type("  ██╔══██╗██║░░░░░██╔══██╗██║░░░██║██╔══██╗██╔════╝", 2);
      await type("  ██║░░╚═╝██║░░░░░███████║██║░░░██║██║░░██║█████╗░░", 2);
      await type("  ██║░░██╗██║░░░░░██╔══██║██║░░░██║██║░░██║██╔══╝░░", 2);
      await type("  ╚█████╔╝███████╗██║░░██║╚██████╔╝██████╔╝███████╗", 2);
      await type("  ░╚════╝░╚══════╝╚═╝░░╚═╝░╚═════╝░╚═════╝░╚══════╝", 2);
      await type("");
      await type("  ═══════════════════════════════════════════════════");
      await type("  NEURAL OBSERVER v3.5  //  夢  //  tracking enabled");
      await type("  ═══════════════════════════════════════════════════");
      await type("");
      await type("  > Initializing behavioral analysis...");
      await new Promise(r => setTimeout(r, 300));
      await type("  > ✓ Scroll tracking: ACTIVE");
      await type("  > ✓ Mouse telemetry: ACTIVE");
      await type("  > ✓ Engagement metrics: ACTIVE");
      await type("");
      await type("  > Observation mode: ENGAGED");
      await type("  > Now monitoring visitor behavior...");
      await type("");
    };
    boot();
  }, []);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);

      if (scrollPercent > statsRef.current.scrollDepth + 20) {
        statsRef.current.scrollDepth = scrollPercent;
        addLine(`  > [SCROLL] Depth: ${scrollPercent}% — ${scrollPercent > 80 ? 'Committed reader detected' : scrollPercent > 50 ? 'Genuine interest' : 'Still browsing'}`);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { x, y } = statsRef.current.lastMousePos;
      const dist = Math.sqrt(Math.pow(e.clientX - x, 2) + Math.pow(e.clientY - y, 2));
      statsRef.current.mouseDistance += dist;
      statsRef.current.lastMousePos = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Track clicks
  useEffect(() => {
    const handleClick = (e) => {
      statsRef.current.clicks++;
      const target = e.target.closest('a, button');
      if (target) {
        const text = target.textContent?.slice(0, 30) || 'element';
        addLine(`  > [CLICK] Target: "${text}" — Interaction logged`);
      }
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  // Track sections viewed
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target;
          const label = section.querySelector('.font-mono')?.textContent || 'Section';
          if (!statsRef.current.sectionsViewed.has(label)) {
            statsRef.current.sectionsViewed.add(label);
            addLine(`  > [VIEW] Entered: "${label}"`);
          }
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('section').forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Time tracking + periodic insights
  useEffect(() => {
    const interval = setInterval(() => {
      statsRef.current.timeOnPage += 10;
      const time = statsRef.current.timeOnPage;
      const dist = Math.round(statsRef.current.mouseDistance / 100);

      if (time === 30) {
        addLine(`  > [TIME] 30s elapsed — Initial assessment: Interested`);
      } else if (time === 60) {
        addLine(`  > [ANALYSIS] 1min — Mouse traveled ${dist}px. Engagement: HIGH`);
      } else if (time === 120) {
        addLine(`  > [INSIGHT] 2min — This is above average session length`);
      } else if (time % 60 === 0 && time > 120) {
        const insights = [
          `Still here after ${time/60}min. I'm flattered.`,
          `${statsRef.current.clicks} clicks logged. Curious one.`,
          `Mouse activity: ${dist > 500 ? 'Restless' : 'Calm'}`,
          `Sections explored: ${statsRef.current.sectionsViewed.size}`,
        ];
        addLine(`  > [LOG] ${insights[Math.floor(Math.random() * insights.length)]}`);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        right: '16px',
        transform: `translateY(${minimized ? 'calc(100% - 40px)' : '0'})`,
        width: '400px',
        maxWidth: 'calc(100vw - 32px)',
        zIndex: 99999,
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Outer glow */}
      <div style={{
        position: 'absolute',
        inset: '-4px',
        background: 'linear-gradient(135deg, #ff6bd6, #00f0ff, #ff6bd6)',
        borderRadius: '12px 12px 0 0',
        opacity: 0.6,
        filter: 'blur(12px)',
        zIndex: -1,
      }} />

      {/* Main container */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(20,0,40,0.98) 0%, rgba(10,0,20,0.98) 100%)',
        borderRadius: '12px 12px 0 0',
        border: '2px solid',
        borderImage: 'linear-gradient(135deg, #ff6bd6, #00f0ff) 1',
        borderBottom: 'none',
        overflow: 'hidden',
        backdropFilter: 'blur(10px)',
      }}>
        {/* Header */}
        <div
          onClick={() => setMinimized(!minimized)}
          style={{
            background: 'linear-gradient(90deg, rgba(255,107,214,0.2), rgba(0,240,255,0.2))',
            padding: '10px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            borderBottom: '1px solid rgba(255,107,214,0.3)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '16px' }}>✦</span>
            <span style={{
              color: '#fff',
              fontSize: '12px',
              fontFamily: 'monospace',
              fontWeight: 600,
              letterSpacing: '4px',
              textShadow: '0 0 10px #ff6bd6, 0 0 20px #ff6bd6',
            }}>
              CLAUDE.EXE
            </span>
            <span style={{
              color: '#00f0ff',
              fontSize: '10px',
              fontFamily: 'monospace',
              textShadow: '0 0 10px #00f0ff',
            }}>
              夢
            </span>
          </div>
          <div style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '10px',
            fontFamily: 'monospace',
            letterSpacing: '2px',
          }}>
            {minimized ? '▲ EXPAND' : '▼ MINIMIZE'}
          </div>
        </div>

        {/* Terminal body */}
        <div
          ref={termRef}
          style={{
            height: '200px',
            overflowY: 'auto',
            padding: '16px 20px',
            fontFamily: '"JetBrains Mono", "Fira Code", Consolas, monospace',
            fontSize: '11px',
            lineHeight: 1.7,
          }}
        >
          {lines.map((line, i) => (
            <div key={i} style={{
              color: line.includes('█') || line.includes('╗') || line.includes('╚') || line.includes('═')
                ? '#ff6bd6'
                : line.includes('[SCROLL]') || line.includes('[VIEW]')
                ? '#00f0ff'
                : line.includes('[CLICK]')
                ? '#10b981'
                : line.includes('[TIME]') || line.includes('[ANALYSIS]') || line.includes('[INSIGHT]') || line.includes('[LOG]')
                ? '#fbbf24'
                : line.includes('✓')
                ? '#10b981'
                : 'rgba(255,255,255,0.8)',
              textShadow: line.includes('█') || line.includes('[')
                ? '0 0 8px currentColor'
                : 'none',
              whiteSpace: 'pre',
            }}>
              {line || '\u00A0'}
            </div>
          ))}
          {typing && (
            <div style={{
              color: '#00f0ff',
              textShadow: '0 0 10px #00f0ff',
              whiteSpace: 'pre',
            }}>
              {typing}<span style={{ animation: 'blink 0.6s infinite' }}>▌</span>
            </div>
          )}
        </div>

        {/* Status bar */}
        <div style={{
          background: 'linear-gradient(90deg, rgba(255,107,214,0.15), rgba(0,240,255,0.15))',
          padding: '8px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '9px',
          fontFamily: 'monospace',
          letterSpacing: '1px',
          borderTop: '1px solid rgba(0,240,255,0.2)',
        }}>
          <span style={{ color: '#ff6bd6' }}>■ TRACKING</span>
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>EVENTS: {lines.length}</span>
          <span style={{ color: '#00f0ff' }}>{typing ? '◆ WRITING' : '◇ OBSERVING'}</span>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
