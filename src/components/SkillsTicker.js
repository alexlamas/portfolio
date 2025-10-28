import React from "react";

const skills = [
  "Design systems (because chaos never scales)",
  "Research (turning hunches into evidence)",
  "Product strategy (so we ship on purpose)",
  "Woodworking (hand tools beat hex keys)",
  "Coding (turning coffee into prototypes)",
  "Agent-based modeling (Sims with equations)",
  "Permaculture (gardens that pay rent)",
  "Fourier transforms (party tricks for data)",
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
