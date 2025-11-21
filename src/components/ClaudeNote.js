import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

export default function ClaudeNote({ children, note }) {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ top: 0 });
  const ref = useRef(null);

  useEffect(() => {
    if (show && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPos({ top: rect.top + window.scrollY });
    }
  }, [show]);

  return (
    <>
      <span
        ref={ref}
        style={{
          borderBottom: '2px dashed #f87171',
          cursor: 'help',
          transition: 'background 0.2s',
          background: show ? 'rgba(248,113,113,0.2)' : 'transparent',
        }}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </span>

      {show && ReactDOM.createPortal(
        <div
          style={{
            position: 'fixed',
            right: '16px',
            top: pos.top,
            width: '220px',
            zIndex: 99999,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              background: '#fef3c7',
              color: '#78350f',
              padding: '12px',
              borderRadius: '4px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              borderLeft: '4px solid #f87171',
              transform: 'rotate(-1deg)',
              fontFamily: 'Caveat, cursive',
              fontSize: '18px',
              lineHeight: 1.3,
            }}
          >
            <div style={{ fontFamily: 'monospace', fontSize: '10px', color: '#dc2626', marginBottom: '4px' }}>
              ✎ Claude:
            </div>
            {note}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
