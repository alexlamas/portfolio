import React from "react";

const skills = [
  "Design systems (all the cool kids are doing it)",
  "Research (making stuff up with confidence)",
  "Product strategy (explaining why we're doing what we're doing)",
  "Woodworking (quietly judging IKEA furniture)",
  "Coding (typing aggressively and hoping for the best)",
  "Agent-based modeling (Sims, but boring)",
  "Permaculture (using plants to solve all our problems)",
  "Fourier transforms (you know, for fun)",
  "Languages (English, French, Arabic, Italian, Spanish)",
];

function SkillsTicker() {
  return (
    <div className="relative overflow-hidden whitespace-nowrap h-[3rem]">
      <div className="inline-block animate-ticker font-mono py-3 opacity-75">
        <span className="inline-block">{skills.join(" · ")}</span>
        <span className="inline-block">{" . "}</span>
        <span className="inline-block">{skills.join(" · ")}</span>
      </div>
      <div className="absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
    </div>
  );
}

export default SkillsTicker;
