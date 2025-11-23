import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

export default function ClaudeNote({ children, context }) {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ top: 0 });
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (show && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPos({ top: rect.top + rect.height / 2 });
    }
  }, [show]);

  useEffect(() => {
    if (show && !note && !loading && !fetchedRef.current) {
      fetchedRef.current = true;
      setLoading(true);
      const text = ref.current?.innerText || "";
      fetch("/api/note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, context }),
      })
        .then((res) => res.json())
        .then((data) => {
          setNote(data.note);
          setLoading(false);
        })
        .catch(() => {
          setNote("I had something witty to say, but the words escaped me.");
          setLoading(false);
        });
    }
  }, [show, note, loading, context]);

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
            transform: 'translateY(-50%)',
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
              {loading ? (
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>Thinking...</span>
              ) : (
                note
              )}
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
