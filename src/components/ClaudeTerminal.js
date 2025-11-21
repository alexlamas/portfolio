import React, { useState, useEffect, useRef, useCallback } from "react";

export default function ClaudeTerminal({ onStyleChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [styles, setStyles] = useState({});
  const messagesEndRef = useRef(null);
  const lastActionRef = useRef(null);
  const hoverTimeRef = useRef({});
  const scrollSpeedRef = useRef([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Add message with typewriter effect
  const addMessage = useCallback(async (text, style = null) => {
    if (isTyping) return;
    setIsTyping(true);

    let displayed = '';
    for (let i = 0; i < text.length; i++) {
      await new Promise(r => setTimeout(r, 12));
      displayed = text.slice(0, i + 1);
      setMessages(prev => {
        const newMsgs = [...prev];
        if (newMsgs.length > 0 && newMsgs[newMsgs.length - 1].typing) {
          newMsgs[newMsgs.length - 1] = { text: displayed, typing: true };
        } else {
          newMsgs.push({ text: displayed, typing: true });
        }
        return newMsgs;
      });
    }

    setMessages(prev => {
      const newMsgs = [...prev];
      newMsgs[newMsgs.length - 1] = { text, typing: false, style };
      return newMsgs;
    });

    if (style) {
      setStyles(prev => ({ ...prev, ...style }));
    }

    setIsTyping(false);
  }, [isTyping]);

  // Track scroll behavior
  useEffect(() => {
    if (!isOpen) return;

    let lastScroll = window.scrollY;
    let lastTime = Date.now();

    const handleScroll = () => {
      const now = Date.now();
      const delta = Math.abs(window.scrollY - lastScroll);
      const timeDelta = now - lastTime;
      const speed = delta / timeDelta;

      scrollSpeedRef.current.push(speed);
      if (scrollSpeedRef.current.length > 10) scrollSpeedRef.current.shift();

      const avgSpeed = scrollSpeedRef.current.reduce((a, b) => a + b, 0) / scrollSpeedRef.current.length;

      if (avgSpeed > 3 && lastActionRef.current !== 'fastScroll') {
        lastActionRef.current = 'fastScroll';
        addMessage("Subject scrolling rapidly. Either bored or searching. Increasing content density.", { lineHeight: '1.4' });
      } else if (avgSpeed < 0.3 && avgSpeed > 0 && lastActionRef.current !== 'slowScroll') {
        lastActionRef.current = 'slowScroll';
        addMessage("Subject reading carefully. Good sign. Maintaining current layout.");
      }

      lastScroll = window.scrollY;
      lastTime = now;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen, addMessage]);

  // Track mouse position and hovers
  useEffect(() => {
    if (!isOpen) return;

    let idleTimer = null;
    let lastX = 0, lastY = 0;

    const handleMouseMove = (e) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;

      // Clear idle timer
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (lastActionRef.current !== 'idle') {
          lastActionRef.current = 'idle';
          addMessage(`Mouse idle at (${e.clientX}, ${e.clientY}). Subject may be reading or distracted.`);
        }
      }, 5000);
    };

    const handleClick = (e) => {
      const target = e.target.closest('a, button');
      if (target) {
        const text = target.textContent?.slice(0, 20) || 'element';
        if (lastActionRef.current !== 'click') {
          lastActionRef.current = 'click';
          addMessage(`Click detected on "${text}". Logging interaction pattern.`);
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
      clearTimeout(idleTimer);
    };
  }, [isOpen, addMessage]);

  // Track hover on specific elements
  useEffect(() => {
    if (!isOpen) return;

    const handleMouseEnter = (e) => {
      const section = e.target.closest('section');
      if (section) {
        const sectionName = section.querySelector('[class*="font-mono"]')?.textContent || 'unnamed section';
        hoverTimeRef.current[sectionName] = Date.now();
      }
    };

    const handleMouseLeave = (e) => {
      const section = e.target.closest('section');
      if (section) {
        const sectionName = section.querySelector('[class*="font-mono"]')?.textContent || 'unnamed section';
        const startTime = hoverTimeRef.current[sectionName];
        if (startTime) {
          const duration = ((Date.now() - startTime) / 1000).toFixed(1);
          if (duration > 3 && lastActionRef.current !== sectionName) {
            lastActionRef.current = sectionName;
            addMessage(`Subject spent ${duration}s on "${sectionName}". Noted for optimization.`);
          }
        }
      }
    };

    document.querySelectorAll('section').forEach(section => {
      section.addEventListener('mouseenter', handleMouseEnter);
      section.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.querySelectorAll('section').forEach(section => {
        section.removeEventListener('mouseenter', handleMouseEnter);
        section.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [isOpen, addMessage]);

  // Initial messages when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const init = async () => {
        await addMessage("UX observation session started. Tracking mouse, scroll, and attention patterns.");
        await new Promise(r => setTimeout(r, 1000));
        await addMessage("Note: All data stays local. I'm judging, not selling.");
      };
      init();
    }
  }, [isOpen, messages.length, addMessage]);

  // Apply styles to document
  useEffect(() => {
    if (styles.lineHeight) {
      document.body.style.lineHeight = styles.lineHeight;
    }
    if (styles.fontSize) {
      document.body.style.fontSize = styles.fontSize;
    }
  }, [styles]);

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-[9999] bg-white text-black px-4 py-3 rounded-lg font-mono text-sm hover:bg-yellow-300 transition-colors shadow-2xl flex items-center gap-2 border-2 border-black"
      >
        <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`} />
        {isOpen ? 'Claude observing...' : '⌘ Claude UX Lab'}
      </button>

      {/* Terminal panel */}
      {isOpen && (
        <div className="fixed bottom-20 left-6 right-6 md:right-auto md:w-[500px] h-72 z-[9998] bg-[#0a0a0a] rounded-lg shadow-2xl border border-white/20 flex flex-col overflow-hidden font-mono">
          {/* Header */}
          <div className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border-b border-white/10">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-white/50 text-xs">claude --ux-research --subject=visitor</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 text-xs">
            {messages.map((msg, i) => (
              <div key={i} className="mb-2 flex">
                <span className="text-green-400 shrink-0">[{new Date().toLocaleTimeString('en-US', { hour12: false })}]</span>
                <span className="text-white/80 ml-2">{msg.text}</span>
                {msg.typing && <span className="inline-block w-1.5 h-3 bg-green-400 ml-1 animate-pulse" />}
                {msg.style && <span className="text-yellow-400 ml-2">→ applied</span>}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Status bar */}
          <div className="px-4 py-1.5 bg-[#1a1a1a] border-t border-white/10 text-[10px] text-white/30 flex justify-between">
            <span>observations: {messages.length}</span>
            <span className="text-green-400/50">{isTyping ? '● recording' : '○ watching'}</span>
          </div>
        </div>
      )}
    </>
  );
}
