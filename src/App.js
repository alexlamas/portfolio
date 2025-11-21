import React, { useState, useEffect } from "react";
import "./styles.css";
import "./fonts/fonts.css";
import { Analytics } from "@vercel/analytics/react";

import Nav from "./components/Nav";
import Projects from "./components/Projects";

function App() {
  const params = new URLSearchParams(window.location.search);
  const theme = params.get("theme") || "neutral";
  const validThemes = ["neutral", "electric", "sunset", "matrix"];
  const activeTheme = validThemes.includes(theme) ? theme : "neutral";

  const [time, setTime] = useState(new Date());
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const year = new Date().getFullYear();
  const yearsExperience = year - 2014;

  return (
    <div className={`${activeTheme} text-foreground bg-background min-h-screen`}>
      <div className="hidden neutral electric sunset matrix" />

      {/* Minimal top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center font-mono text-xs text-foreground/40">
        <div>Alex Lama-Noujaim</div>
        <div className="hidden sm:block">{time.toLocaleTimeString('en-US', { hour12: false })}</div>
        <Nav />
      </div>

      {/* Hero */}
      <div className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24">

        {/* Big editorial name */}
        <div className="relative">
          <div
            className="text-[15vw] md:text-[12vw] font-serif leading-[0.85] tracking-tight cursor-default"
            onMouseEnter={() => setHovered('name')}
            onMouseLeave={() => setHovered(null)}
          >
            <div className={`transition-all duration-500 ${hovered === 'name' ? 'translate-x-2' : ''}`}>
              Alex
            </div>
            <div className={`transition-all duration-500 ${hovered === 'name' ? '-translate-x-2' : ''}`}>
              Lama-
            </div>
            <div className={`transition-all duration-500 ${hovered === 'name' ? 'translate-x-4' : ''}`}>
              Noujaim
            </div>
          </div>

          {/* Floating label */}
          <div className="absolute -right-2 top-0 md:right-0 md:top-4">
            <div className="font-mono text-[10px] text-foreground/30 writing-mode-vertical hidden md:block" style={{ writingMode: 'vertical-rl' }}>
              Vol. {yearsExperience} — {year} Edition
            </div>
          </div>
        </div>

        {/* Statement */}
        <div className="mt-12 md:mt-16 max-w-2xl">
          <p className="text-xl md:text-2xl leading-relaxed text-foreground/70">
            I design products at <a href="https://anthropic.com/claude" target="_blank" rel="noreferrer" className="text-foreground hover:text-highlight transition-colors border-b border-foreground/20 hover:border-highlight">Anthropic</a>.
            Before that, <a href="https://airtable.com" target="_blank" rel="noreferrer" className="text-foreground hover:text-highlight transition-colors border-b border-foreground/20 hover:border-highlight">Airtable</a>.
          </p>
          <p className="mt-4 text-lg text-foreground/40">
            {yearsExperience} years of making software feel less like software.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-6 md:left-12 lg:left-24">
          <div className="font-mono text-[10px] text-foreground/30 flex items-center gap-2">
            <span className="inline-block w-8 h-px bg-foreground/30"></span>
            Scroll for work
          </div>
        </div>
      </div>

      {/* Work section */}
      <div className="px-6 md:px-12 lg:px-24 pb-24">
        <div className="font-mono text-xs text-foreground/30 mb-8">Selected Work</div>
        <Projects />
      </div>

      {/* Footer */}
      <div className="px-6 md:px-12 lg:px-24 py-12 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="font-mono text-xs text-foreground/30 mb-2">Get in touch</div>
            <a href="mailto:alex@lama.dev" className="text-lg hover:text-highlight transition-colors">alex@lama.dev</a>
          </div>
          <div className="flex gap-8 font-mono text-sm">
            <a href="https://linkedin.com/in/lamanoujaim" target="_blank" rel="noreferrer" className="text-foreground/50 hover:text-foreground transition-colors">LinkedIn</a>
            <a href="https://twitter.com/alexlamas" target="_blank" rel="noreferrer" className="text-foreground/50 hover:text-foreground transition-colors">Twitter</a>
          </div>
        </div>
      </div>

      <Analytics />
    </div>
  );
}

export default App;
