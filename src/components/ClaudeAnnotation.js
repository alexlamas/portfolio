import React, { useState } from "react";

function ClaudeAnnotation({ children, note, position = "right" }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className="relative inline"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="border-b border-dashed border-highlight/50 cursor-help">
        {children}
      </span>

      {/* The annotation bubble */}
      <span
        className={`
          absolute z-40 w-64 p-3 rounded-lg
          bg-foreground text-background text-sm font-sans
          shadow-xl
          transition-all duration-200
          ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"}
          ${position === "right" ? "left-full ml-4 top-0" : "right-full mr-4 top-0"}
          hidden md:block
        `}
      >
        <div className="text-[10px] font-mono opacity-60 mb-1">Claude's note:</div>
        {note}
        <div className="absolute top-3 w-2 h-2 bg-foreground rotate-45
          ${position === 'right' ? '-left-1' : '-right-1'}
        " style={{ [position === "right" ? "left" : "right"]: "-4px" }} />
      </span>

      {/* Mobile: show inline */}
      {isHovered && (
        <span className="block md:hidden mt-2 p-3 rounded-lg bg-foreground/10 text-sm">
          <span className="text-[10px] font-mono text-foreground/50 block mb-1">Claude's note:</span>
          {note}
        </span>
      )}
    </span>
  );
}

export default ClaudeAnnotation;
