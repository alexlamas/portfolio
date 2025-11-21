import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

let noteCounter = 0;

export default function ClaudeNote({ children, note }) {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ top: 0 });
  const [num] = useState(() => ++noteCounter);
  const ref = useRef(null);

  useEffect(() => {
    if (show && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPos({ top: rect.top + window.scrollY - 10 });
    }
  }, [show]);

  return (
    <>
      <span
        ref={ref}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        style={{ position: 'relative', cursor: 'help' }}
      >
        {children}
        <sup
          style={{
            color: '#a78bfa',
            fontSize: '10px',
            fontWeight: 600,
            marginLeft: '1px',
            fontFamily: 'Georgia, serif',
          }}
        >
          {num}
        </sup>
      </span>

      {show && ReactDOM.createPortal(
        <div
          style={{
            position: 'fixed',
            right: '24px',
            top: pos.top,
            width: '280px',
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
              padding: '16px',
              fontSize: '13px',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.8)',
              fontFamily: 'Georgia, Times, serif',
            }}
          >
            <div style={{
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: '#a78bfa',
              marginBottom: '8px',
              fontFamily: 'monospace',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <span style={{
                width: '16px',
                height: '16px',
                border: '1px solid #a78bfa',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '9px',
              }}>{num}</span>
              Editor's Note
            </div>
            <div style={{ fontStyle: 'italic' }}>
              "{note}"
            </div>
            <div style={{
              marginTop: '10px',
              fontSize: '10px',
              color: 'rgba(255,255,255,0.4)',
              textAlign: 'right',
              fontFamily: 'monospace',
            }}>
              — Claude, 2024
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
