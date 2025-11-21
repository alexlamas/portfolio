import React, { useState } from "react";

export default function ClaudeNote({ children, note }) {
  const [show, setShow] = useState(false);

  return (
    <span className="relative inline">
      <span
        className="relative border-b-2 border-red-400/60 hover:border-red-400 transition-colors cursor-help"
        style={{
          textDecorationStyle: 'wavy',
          textUnderlineOffset: '3px'
        }}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
        {/* Red editorial caret */}
        <span className="absolute -top-1 -right-2 text-red-400 text-xs font-bold select-none">^</span>
      </span>

      {show && (
        <span
          className="absolute left-0 top-full mt-3 z-50 w-64 p-3 bg-amber-50 text-slate-800 text-sm rounded shadow-lg border border-amber-200/50"
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: '16px',
            lineHeight: '1.3',
            transform: 'rotate(-1deg)',
          }}
        >
          {/* Scribble effect top */}
          <span
            className="absolute -top-2 left-3 text-red-400 text-lg select-none"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            ~
          </span>

          <span className="block text-red-500 text-xs mb-1 font-mono" style={{ fontFamily: 'monospace', fontSize: '10px' }}>
            [Claude's note]
          </span>
          <span style={{ fontFamily: "'Caveat', cursive" }}>
            {note}
          </span>

          {/* Little doodle */}
          <span className="block text-right text-red-400 mt-1 select-none">— c.</span>
        </span>
      )}
    </span>
  );
}
