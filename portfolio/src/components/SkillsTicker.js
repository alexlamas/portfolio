import React from "react";

const skills = [
  "Design systems (digital LEGO for adults)",
  "Research (professional Googler)",
  "Product strategy (glorified guesswork)",
  "Making data look pretty",
  "Algorithms (math, but spicier)",
  "Coding (typing aggressively and hoping for the best)",
  "Agent-based modeling (The Sims, but boring)",
  "Permaculture (fancy way of saying I keep cacti alive)",
  "Fourier transforms",
  "Polyglot (I can order beer in 4 languages)",
];

function SkillsTicker() {
  return (
    <div className="relative overflow-hidden whitespace-nowrap">
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
