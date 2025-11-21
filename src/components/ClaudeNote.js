import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

export default function ClaudeNote({ children, note }) {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState({ top: 0 });
  const ref = useRef(null);

  useEffect(() => {
    if (show && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPosition({ top: rect.top + window.scrollY });
    }
  }, [show]);

  return (
    <>
      <span
        ref={ref}
        className="border-b-2 border-red-400 border-dashed cursor-help hover:bg-red-400/10 transition-colors"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </span>

      {/* Margin note - rendered in a portal */}
      {show && ReactDOM.createPortal(
        <div
          className="fixed right-4 md:right-8 w-48 md:w-56 z-[9999] pointer-events-none"
          style={{ top: position.top }}
        >
          <div
            className="bg-amber-100 text-amber-900 p-3 rounded shadow-lg border-l-4 border-red-400 transform -rotate-1"
            style={{ fontFamily: 'Caveat, cursive', fontSize: '18px', lineHeight: 1.3 }}
          >
            <div className="text-red-500 text-xs font-mono mb-1" style={{ fontFamily: 'monospace', fontSize: '10px' }}>
              ✎ Claude:
            </div>
            {note}
          </div>
          {/* Line connecting to text */}
          <div className="absolute left-0 top-4 w-8 h-px bg-red-400/50 -translate-x-full" />
        </div>,
        document.body
      )}
    </>
  );
}
