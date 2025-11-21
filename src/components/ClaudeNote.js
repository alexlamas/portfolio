import React, { useState } from "react";

export default function ClaudeNote({ children, note }) {
  const [show, setShow] = useState(false);

  return (
    <span className="relative inline">
      <span
        className="border-b border-dashed border-highlight/50 hover:border-highlight hover:text-highlight transition-colors cursor-help"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </span>

      {show && (
        <span className="absolute left-0 top-full mt-2 z-50 w-72 p-3 bg-foreground text-background text-sm rounded-lg shadow-2xl font-mono">
          <span className="block text-[10px] text-highlight mb-1">claude's note:</span>
          {note}
          <span className="absolute -top-1 left-4 w-2 h-2 bg-foreground rotate-45" />
        </span>
      )}
    </span>
  );
}
