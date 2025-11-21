import React, { useState, useEffect, useRef } from "react";

export default function ClaudeTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const logsEndRef = useRef(null);
  const hasInitRef = useRef(false);

  // Scroll to bottom when logs update
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Type out a message character by character
  const typeMessage = async (text, type = 'log') => {
    return new Promise((resolve) => {
      setIsTyping(true);
      let i = 0;
      const id = Date.now();

      setLogs(prev => [...prev, { id, text: '', type, typing: true }]);

      const interval = setInterval(() => {
        i++;
        setLogs(prev => prev.map(log =>
          log.id === id ? { ...log, text: text.slice(0, i) } : log
        ));

        if (i >= text.length) {
          clearInterval(interval);
          setLogs(prev => prev.map(log =>
            log.id === id ? { ...log, typing: false } : log
          ));
          setIsTyping(false);
          resolve();
        }
      }, 20);
    });
  };

  // Initialize with messages when opened
  useEffect(() => {
    if (isOpen && !hasInitRef.current) {
      hasInitRef.current = true;
      const init = async () => {
        await typeMessage("Initializing UX observation protocol...", 'system');
        await new Promise(r => setTimeout(r, 300));
        await typeMessage("✓ Mouse tracking: enabled", 'success');
        await typeMessage("✓ Scroll analysis: enabled", 'success');
        await typeMessage("✓ Attention heatmap: enabled", 'success');
        await new Promise(r => setTimeout(r, 500));
        await typeMessage("Ready. I see everything. No pressure.", 'log');
      };
      init();
    }
  }, [isOpen]);

  // Track scroll
  useEffect(() => {
    if (!isOpen) return;

    let lastY = window.scrollY;
    let timeout;

    const handleScroll = () => {
      clearTimeout(timeout);
      const direction = window.scrollY > lastY ? 'down' : 'up';
      const speed = Math.abs(window.scrollY - lastY);
      lastY = window.scrollY;

      timeout = setTimeout(() => {
        if (speed > 100 && !isTyping) {
          typeMessage(`Fast scroll ${direction}. Subject appears impatient.`, 'observation');
        }
      }, 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, [isOpen, isTyping]);

  // Track mouse idle
  useEffect(() => {
    if (!isOpen) return;

    let idleTimeout;

    const handleMove = () => {
      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        if (!isTyping) {
          const messages = [
            "Mouse idle. Subject thinking or zoned out.",
            "No movement detected. Engagement uncertain.",
            "Subject paused. Possibly reading. Possibly judging.",
          ];
          typeMessage(messages[Math.floor(Math.random() * messages.length)], 'observation');
        }
      }, 8000);
    };

    window.addEventListener('mousemove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      clearTimeout(idleTimeout);
    };
  }, [isOpen, isTyping]);

  const getLogColor = (type) => {
    switch(type) {
      case 'system': return 'text-blue-400';
      case 'success': return 'text-green-400';
      case 'observation': return 'text-yellow-300';
      case 'error': return 'text-red-400';
      default: return 'text-gray-300';
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-[9999] group"
      >
        <div className="bg-black text-green-400 px-4 py-2 rounded-lg font-mono text-sm shadow-2xl border border-green-500/30 flex items-center gap-3 hover:border-green-400 transition-all hover:shadow-green-500/20 hover:shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOpen ? 'bg-green-400' : 'bg-yellow-400'}`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isOpen ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
          </span>
          <span>{isOpen ? '> observing_' : '> claude_ux'}</span>
        </div>
      </button>

      {/* Terminal window */}
      {isOpen && (
        <div className="fixed bottom-20 left-6 w-[calc(100vw-3rem)] md:w-[480px] z-[9998] font-mono text-sm animate-in slide-in-from-bottom-4 duration-200">
          {/* Window chrome */}
          <div className="bg-[#1e1e1e] rounded-t-lg border border-b-0 border-white/10 px-4 py-2 flex items-center gap-2">
            <div className="flex gap-1.5">
              <button
                onClick={() => setIsOpen(false)}
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
              />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 text-center text-[10px] text-white/40">
              claude@alex-portfolio — ux-research
            </div>
          </div>

          {/* Terminal body */}
          <div className="bg-[#0d0d0d] rounded-b-lg border border-t-0 border-white/10 h-64 overflow-hidden flex flex-col">
            {/* Output area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              {logs.map((log) => (
                <div key={log.id} className="flex gap-2">
                  <span className="text-white/30 select-none">{'>'}</span>
                  <span className={getLogColor(log.type)}>
                    {log.text}
                    {log.typing && <span className="inline-block w-2 h-4 bg-green-400 ml-0.5 animate-pulse" />}
                  </span>
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>

            {/* Status bar */}
            <div className="border-t border-white/5 px-4 py-1.5 flex justify-between text-[10px] text-white/30 bg-white/5">
              <span>logs: {logs.length}</span>
              <span className="flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${isTyping ? 'bg-yellow-400' : 'bg-green-400'}`} />
                {isTyping ? 'processing' : 'watching'}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
