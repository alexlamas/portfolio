import React, { useState, useEffect } from "react";
import "./styles.css";
import "./fonts/fonts.css";
import { Analytics } from "@vercel/analytics/react";
import { LinkedinLogo, EnvelopeSimple } from "@phosphor-icons/react";

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

      {/* Fixed header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-24 py-4 flex justify-between items-center backdrop-blur-sm bg-background/80">
        <div className="font-mono text-xs text-foreground/50">
          Alex Lama-Noujaim
        </div>
        <div className="hidden sm:block font-mono text-xs text-foreground/30">
          {time.toLocaleTimeString('en-US', { hour12: false })}
        </div>
        <div className="flex gap-4">
          <a href="https://www.linkedin.com/in/lamanoujaim/" target="_blank" rel="noreferrer" className="text-foreground/50 hover:text-foreground transition-colors">
            <LinkedinLogo size={18} />
          </a>
          <a href="mailto:lamanoujaim@gmail.com" className="text-foreground/50 hover:text-foreground transition-colors">
            <EnvelopeSimple size={18} />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24">
        <div className="relative">
          <div
            className="text-[15vw] md:text-[12vw] font-serif leading-[0.85] tracking-tight cursor-default select-none"
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

          <div className="absolute -right-2 top-0 md:right-0 md:top-4">
            <div className="font-mono text-[10px] text-foreground/30 hidden md:block" style={{ writingMode: 'vertical-rl' }}>
              Vol. {yearsExperience} — {year} Edition
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 max-w-2xl">
          <p className="text-xl md:text-2xl leading-relaxed text-foreground/70">
            I design products at <a href="https://anthropic.com/claude" target="_blank" rel="noreferrer" className="text-foreground hover:text-highlight transition-colors border-b border-foreground/20 hover:border-highlight">Anthropic</a>.
            Before that, <a href="https://airtable.com" target="_blank" rel="noreferrer" className="text-foreground hover:text-highlight transition-colors border-b border-foreground/20 hover:border-highlight">Airtable</a>.
          </p>
          <p className="mt-4 text-lg text-foreground/40">
            {yearsExperience} years of making software feel less like software.
          </p>
        </div>

        <div className="absolute bottom-8 left-6 md:left-12 lg:left-24">
          <div className="font-mono text-[10px] text-foreground/30 flex items-center gap-2">
            <span className="inline-block w-8 h-px bg-foreground/30"></span>
            Scroll for work
          </div>
        </div>
      </section>

      {/* Work section */}
      <section className="px-6 md:px-12 lg:px-24 pb-24">
        <div className="font-mono text-xs text-foreground/30 mb-8">Selected Work</div>
        <Projects />
      </section>

      {/* Currently section */}
      <section className="px-6 md:px-12 lg:px-24 py-24 border-t border-border">
        <div className="font-mono text-xs text-foreground/30 mb-8">Currently</div>
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          <div>
            <div className="text-foreground/40 text-sm mb-2">Reading</div>
            <div className="text-lg">The Design of Everyday Things</div>
            <div className="text-foreground/50 text-sm">Don Norman</div>
          </div>
          <div>
            <div className="text-foreground/40 text-sm mb-2">Listening</div>
            <div className="text-lg">Kaytranada</div>
            <div className="text-foreground/50 text-sm">99.9%</div>
          </div>
          <div>
            <div className="text-foreground/40 text-sm mb-2">Thinking about</div>
            <div className="text-lg">How to make AI interactions feel natural</div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 md:px-12 lg:px-24 py-24 border-t border-border">
        <div className="font-mono text-xs text-foreground/30 mb-8">Previously</div>
        <div className="space-y-6">
          <div className="flex gap-8 items-baseline">
            <div className="font-mono text-sm text-foreground/30 w-24 shrink-0">2022—Now</div>
            <div>
              <div className="text-lg">Anthropic</div>
              <div className="text-foreground/50">Making Claude feel like someone you'd want to talk to</div>
            </div>
          </div>
          <div className="flex gap-8 items-baseline">
            <div className="font-mono text-sm text-foreground/30 w-24 shrink-0">2018—2022</div>
            <div>
              <div className="text-lg">Airtable</div>
              <div className="text-foreground/50">Shipped blocks, interfaces, and way too many spreadsheets</div>
            </div>
          </div>
          <div className="flex gap-8 items-baseline">
            <div className="font-mono text-sm text-foreground/30 w-24 shrink-0">2014—2018</div>
            <div>
              <div className="text-lg">The Before Times</div>
              <div className="text-foreground/50">Mechanical engineering, simulations, audio — the scenic route to design</div>
            </div>
          </div>
        </div>
      </section>

      {/* Colophon */}
      <section className="px-6 md:px-12 lg:px-24 py-24 border-t border-border">
        <div className="font-mono text-xs text-foreground/30 mb-8">Colophon</div>
        <div className="grid md:grid-cols-2 gap-8 text-foreground/50 text-sm">
          <div>
            <p>Set in <span className="text-foreground">PP Writer</span> and <span className="text-foreground">PP Mori</span> by Pangram Pangram.</p>
            <p className="mt-2">Built with React, Tailwind, and questionable amounts of coffee.</p>
          </div>
          <div>
            <p>No AI was harmed in the making of this portfolio.</p>
            <p className="mt-2 text-foreground/30">(Claude helped a little.)</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 lg:px-24 py-12 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="font-mono text-xs text-foreground/30 mb-2">Get in touch</div>
            <a href="mailto:lamanoujaim@gmail.com" className="text-lg hover:text-highlight transition-colors">lamanoujaim@gmail.com</a>
          </div>
          <div className="flex gap-8 font-mono text-sm">
            <a href="https://linkedin.com/in/lamanoujaim" target="_blank" rel="noreferrer" className="text-foreground/50 hover:text-foreground transition-colors">LinkedIn</a>
            <a href="https://twitter.com/alexlamas" target="_blank" rel="noreferrer" className="text-foreground/50 hover:text-foreground transition-colors">Twitter</a>
          </div>
        </div>
        <div className="mt-8 font-mono text-xs text-foreground/20">
          © {year} Alex Lama-Noujaim. All rights reserved. Or not. It's just a portfolio.
        </div>
      </footer>

      <Analytics />
    </div>
  );
}

export default App;
