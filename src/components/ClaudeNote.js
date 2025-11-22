import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

export default function ClaudeNote({ children, note }) {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ top: 0 });
  const ref = useRef(null);

  useEffect(() => {
    if (show && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPos({ top: rect.top });
    }
  }, [show]);

  return (
    <>
      <span
        ref={ref}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        style={{
          borderBottom: '2px dotted rgba(167, 139, 250, 0.6)',
          cursor: 'help',
          transition: 'all 0.2s',
          background: show ? 'rgba(167, 139, 250, 0.15)' : 'transparent',
          borderColor: show ? '#a78bfa' : 'rgba(167, 139, 250, 0.6)',
        }}
      >
        {children}
      </span>

      {show && ReactDOM.createPortal(
        <div
          style={{
            position: 'fixed',
            left: '24px',
            top: pos.top,
            width: '260px',
            zIndex: 99999,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              background: 'rgba(15, 15, 15, 0.95)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(167, 139, 250, 0.3)',
              borderLeft: '3px solid #a78bfa',
              padding: '14px 16px',
              fontSize: '13px',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.85)',
              fontFamily: 'Georgia, Times, serif',
            }}
          >
            <div style={{
              fontSize: '9px',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: '#a78bfa',
              marginBottom: '8px',
              fontFamily: 'monospace',
            }}>
              Editor's Note
            </div>
            <div style={{ fontStyle: 'italic' }}>
              {note}
            </div>
            <div style={{
              marginTop: '10px',
              fontSize: '10px',
              color: 'rgba(255,255,255,0.3)',
              textAlign: 'right',
              fontFamily: 'monospace',
            }}>
              — Claude
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
