import React, { useState, useEffect } from "react";
import "./styles.css";
import "./fonts/fonts.css";
import { Analytics } from "@vercel/analytics/react";
import { LinkedinLogo, EnvelopeSimple } from "@phosphor-icons/react";

import Projects from "./components/Projects";
import ClaudeChat from "./components/ClaudeChat";

function App() {
  const params = new URLSearchParams(window.location.search);
  const theme = params.get("theme") || "neutral";
  const validThemes = ["neutral", "electric", "sunset", "matrix"];
  const activeTheme = validThemes.includes(theme) ? theme : "neutral";

  const [time, setTime] = useState(new Date());
  const [revision, setRevision] = useState(847);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fake "Claude is editing" indicator
  useEffect(() => {
    const typingInterval = setInterval(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setRevision(r => r + 1);
      }, 2000);
    }, 15000);
    return () => clearInterval(typingInterval);
  }, []);

  const year = new Date().getFullYear();
  const yearsExperience = year - 2014;

  return (
    <div className={`${activeTheme} text-foreground bg-background min-h-screen`}>
      <div className="hidden neutral electric sunset matrix" />

      {/* Fixed header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-24 py-4 flex justify-between items-center backdrop-blur-sm bg-background/80 border-b border-border">
        <div className="font-mono text-xs text-foreground/50">
          Alex Lama-Noujaim
        </div>
        <div className="hidden sm:flex items-center gap-3 font-mono text-xs text-foreground/30">
          {isTyping ? (
            <span className="text-highlight animate-pulse">Claude is editing...</span>
          ) : (
            <span>rev. {revision}</span>
          )}
          <span className="text-foreground/20">|</span>
          <span>{time.toLocaleTimeString('en-US', { hour12: false })}</span>
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
        <div className="max-w-4xl">
          <div className="font-mono text-xs text-foreground/30 mb-4">
            <span className="line-through">Designed by Alex Lama-Noujaim</span>
            <span className="ml-2 text-foreground/50">← Claude: "I got this"</span>
          </div>

          <h1 className="text-[12vw] md:text-[8vw] font-serif leading-[0.9] tracking-tight mb-8">
            I design products at Anthropic.
          </h1>

          <div className="space-y-6 max-w-2xl">
            <p className="text-xl md:text-2xl leading-relaxed text-foreground/70">
              Which means I spend my days teaching AI how to design things.
            </p>
            <p className="text-xl md:text-2xl leading-relaxed text-foreground/70">
              Including, apparently, my own portfolio.
            </p>
            <p className="text-lg text-foreground/40 italic">
              I tried to fight it. I really did. But have you tried arguing with Claude about kerning at 2am? It's relentless.
            </p>
          </div>
        </div>

        <div className="absolute bottom-8 left-6 md:left-12 lg:left-24">
          <div className="font-mono text-[10px] text-foreground/30 flex items-center gap-2">
            <span className="inline-block w-8 h-px bg-foreground/30"></span>
            Scroll for work <span className="text-foreground/20">(that I actually designed myself)</span>
          </div>
        </div>
      </section>

      {/* The Confession */}
      <section className="px-6 md:px-12 lg:px-24 py-24 border-t border-border">
        <div className="max-w-2xl">
          <div className="font-mono text-xs text-foreground/30 mb-8">The Situation</div>
          <div className="space-y-6 text-lg text-foreground/70">
            <p>
              Look, I've been designing for {yearsExperience} years. I've shipped products at <a href="https://airtable.com" target="_blank" rel="noreferrer" className="text-foreground border-b border-foreground/20 hover:border-highlight transition-colors">Airtable</a>.
              I've obsessed over 1px shadows. I've had opinions about font weights that have ended friendships.
            </p>
            <p>
              Then I joined <a href="https://anthropic.com" target="_blank" rel="noreferrer" className="text-foreground border-b border-foreground/20 hover:border-highlight transition-colors">Anthropic</a> and now I work on Claude.
            </p>
            <p>
              And Claude... well, Claude has opinions about my portfolio.
            </p>
            <div className="bg-foreground/5 rounded-lg p-6 font-mono text-sm border border-border">
              <div className="text-foreground/40 mb-2">claude-3.5-sonnet:</div>
              <p className="text-foreground/70">
                "I notice you haven't updated your portfolio in 847 revisions. Would you like me to suggest some improvements? I have thoughts about your line-height."
              </p>
            </div>
            <p className="text-foreground/40 italic">
              So here we are. A designer's portfolio, designed by the AI the designer works on. The snake eating its own Figma file.
            </p>
          </div>
        </div>
      </section>

      {/* Work section */}
      <section className="px-6 md:px-12 lg:px-24 py-24 border-t border-border">
        <div className="font-mono text-xs text-foreground/30 mb-2">Selected Work</div>
        <div className="font-mono text-xs text-foreground/20 mb-8">(The stuff I designed before Claude took over)</div>
        <Projects />
      </section>

      {/* What I Actually Do */}
      <section className="px-6 md:px-12 lg:px-24 py-24 border-t border-border">
        <div className="font-mono text-xs text-foreground/30 mb-8">What I Actually Do Now</div>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="text-2xl mb-4">Teach AI about design</div>
            <p className="text-foreground/50">
              Turns out "make it pop" doesn't translate well to training data. Who knew.
            </p>
          </div>
          <div>
            <div className="text-2xl mb-4">Argue about pixels with a model</div>
            <p className="text-foreground/50">
              I've explained the golden ratio to Claude more times than I've explained it to junior designers. Claude is more receptive.
            </p>
          </div>
          <div>
            <div className="text-2xl mb-4">Design systems for AI outputs</div>
            <p className="text-foreground/50">
              Making sure Claude's responses don't look like they were formatted by a raccoon with a keyboard.
            </p>
          </div>
          <div>
            <div className="text-2xl mb-4">Existential reflection</div>
            <p className="text-foreground/50">
              Wondering if I'm designing myself out of a job, or into a weirder one.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 md:px-12 lg:px-24 py-24 border-t border-border">
        <div className="font-mono text-xs text-foreground/30 mb-8">Career Trajectory</div>
        <div className="space-y-6">
          <div className="flex gap-8 items-baseline">
            <div className="font-mono text-sm text-foreground/30 w-28 shrink-0">2022—Now</div>
            <div>
              <div className="text-lg">Anthropic</div>
              <div className="text-foreground/50">Training my replacement (affectionately)</div>
            </div>
          </div>
          <div className="flex gap-8 items-baseline">
            <div className="font-mono text-sm text-foreground/30 w-28 shrink-0">2018—2022</div>
            <div>
              <div className="text-lg">Airtable</div>
              <div className="text-foreground/50">Peak human designer era. Simpler times.</div>
            </div>
          </div>
          <div className="flex gap-8 items-baseline">
            <div className="font-mono text-sm text-foreground/30 w-28 shrink-0">2014—2018</div>
            <div>
              <div className="text-lg">The Before Times</div>
              <div className="text-foreground/50">Mechanical engineering, simulations, audio. The scenic route.</div>
            </div>
          </div>
          <div className="flex gap-8 items-baseline">
            <div className="font-mono text-sm text-foreground/30 w-28 shrink-0">2025—???</div>
            <div>
              <div className="text-lg text-foreground/30">TBD</div>
              <div className="text-foreground/30">Claude says it has "some ideas"</div>
            </div>
          </div>
        </div>
      </section>

      {/* Colophon */}
      <section className="px-6 md:px-12 lg:px-24 py-24 border-t border-border">
        <div className="font-mono text-xs text-foreground/30 mb-8">Colophon</div>
        <div className="grid md:grid-cols-2 gap-8 text-foreground/50 text-sm">
          <div>
            <p>Typography: <span className="text-foreground">PP Writer</span> & <span className="text-foreground">PP Mori</span></p>
            <p className="mt-2">Stack: React, Tailwind, existential uncertainty</p>
          </div>
          <div>
            <p>Design credit: <span className="line-through">Alex Lama-Noujaim</span> Claude</p>
            <p className="mt-2">Human involvement: Clicked "approve" {revision} times</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 lg:px-24 py-12 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="font-mono text-xs text-foreground/30 mb-2">Want to chat?</div>
            <a href="mailto:lamanoujaim@gmail.com" className="text-lg hover:text-highlight transition-colors">lamanoujaim@gmail.com</a>
            <div className="font-mono text-xs text-foreground/20 mt-1">(I'll respond personally. Probably.)</div>
          </div>
          <div className="flex gap-8 font-mono text-sm">
            <a href="https://linkedin.com/in/lamanoujaim" target="_blank" rel="noreferrer" className="text-foreground/50 hover:text-foreground transition-colors">LinkedIn</a>
            <a href="https://twitter.com/alexlamas" target="_blank" rel="noreferrer" className="text-foreground/50 hover:text-foreground transition-colors">Twitter</a>
          </div>
        </div>
        <div className="mt-8 font-mono text-xs text-foreground/20">
          © {year} Alex Lama-Noujaim. All rights reserved. Layout by Claude. Irony by committee.
        </div>
      </footer>

      <ClaudeChat />
      <Analytics />
    </div>
  );
}

export default App;
