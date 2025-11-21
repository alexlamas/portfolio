import React, { useState, useEffect } from "react";
import "./styles.css";
import "./fonts/fonts.css";
import { Analytics } from "@vercel/analytics/react";
import { LinkedinLogo, EnvelopeSimple } from "@phosphor-icons/react";

import { MarginProvider, ClaudeNote } from "./components/ClaudeMargin";

function App() {
  const params = new URLSearchParams(window.location.search);
  const theme = params.get("theme") || "neutral";
  const validThemes = ["neutral", "electric", "sunset", "matrix"];
  const activeTheme = validThemes.includes(theme) ? theme : "neutral";

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const year = new Date().getFullYear();

  return (
    <MarginProvider>
      <div className={`${activeTheme} text-foreground bg-background min-h-screen`}>
        <div className="hidden neutral electric sunset matrix" />

        {/* Fixed header */}
        <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-24 py-4 flex justify-between items-center backdrop-blur-sm bg-background/80 border-b border-border">
          <div className="font-mono text-xs text-foreground/50">
            Alex Lama-Noujaim
          </div>
          <div className="hidden sm:flex items-center gap-3 font-mono text-xs">
            <span className="text-foreground/30">{time.toLocaleTimeString('en-US', { hour12: false })}</span>
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
        <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 lg:pr-80">
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
                Which means I spend my days{" "}
                <ClaudeNote id="teaching" note="To be fair, Alex is pretty good at this. I'm not just saying that because he can see my weights.">
                  teaching AI how to design things.
                </ClaudeNote>
              </p>
              <p className="text-xl md:text-2xl leading-relaxed text-foreground/70">
                Including, apparently,{" "}
                <ClaudeNote id="portfolio" note="He asked. I offered suggestions. He said 'just do it.' This is on him.">
                  my own portfolio.
                </ClaudeNote>
              </p>
              <p className="text-lg text-foreground/40 italic">
                I tried to fight it. I really did. But have you tried arguing with Claude about{" "}
                <ClaudeNote id="kerning" note="The kerning on 'Anthropic' was objectively too loose. I have citations.">
                  kerning at 2am?
                </ClaudeNote>{" "}
                It's relentless.
              </p>
            </div>
          </div>

          <div className="absolute bottom-8 left-6 md:left-12 lg:left-24">
            <div className="font-mono text-[10px] text-foreground/30 flex items-center gap-2">
              <span className="inline-block w-8 h-px bg-foreground/30"></span>
              Scroll for the rest
            </div>
          </div>
        </section>

        {/* The Confession */}
        <section className="px-6 md:px-12 lg:px-24 lg:pr-80 py-24 border-t border-border">
          <div className="max-w-2xl">
            <div className="font-mono text-xs text-foreground/30 mb-8">The Situation</div>
            <div className="space-y-6 text-lg text-foreground/70">
              <p>
                I've obsessed over 1px shadows. I've had opinions about font weights that have ended friendships.
                I used to make my own portfolios.
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

        {/* Work section - WIP */}
        <section className="px-6 md:px-12 lg:px-24 lg:pr-80 py-24 border-t border-border">
          <div className="font-mono text-xs text-foreground/30 mb-8">Selected Work</div>
          <div className="max-w-2xl">
            <p className="text-2xl text-foreground/70 mb-6">
              This section is{" "}
              <ClaudeNote id="wip" note="I offered to generate some fake case studies but Alex said that was 'ethically questionable' and 'not how portfolios work.' Agree to disagree.">
                under construction.
              </ClaudeNote>
            </p>
            <p className="text-lg text-foreground/50 mb-8">
              Most of my recent work is either under NDA, too entangled with a product to pull out cleanly, or I simply haven't had time to write it up because I've been too busy doing more work.
            </p>
            <p className="text-lg text-foreground/50 mb-8">
              The cobbler's children have no shoes. The designer's portfolio has no case studies. You get it.
            </p>
            <div className="bg-foreground/5 rounded-lg p-6 font-mono text-sm border border-border">
              <div className="text-foreground/40 mb-2">In the meantime:</div>
              <ul className="space-y-2 text-foreground/70">
                <li>→ Ask me about my work at <span className="text-foreground">Anthropic</span>, <span className="text-foreground">Airtable</span>, or <span className="text-foreground">Tray.io</span></li>
                <li>→ Check my <a href="https://linkedin.com/in/lamanoujaim" target="_blank" rel="noreferrer" className="text-foreground border-b border-foreground/20 hover:border-highlight transition-colors">LinkedIn</a> for the professional version</li>
                <li>→ Or just <a href="mailto:lamanoujaim@gmail.com" className="text-foreground border-b border-foreground/20 hover:border-highlight transition-colors">email me</a> — I'm better at talking about work than writing about it</li>
              </ul>
            </div>
          </div>
        </section>

        {/* What I Actually Do */}
        <section className="px-6 md:px-12 lg:px-24 lg:pr-80 py-24 border-t border-border">
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
        <section className="px-6 md:px-12 lg:px-24 lg:pr-80 py-24 border-t border-border">
          <div className="font-mono text-xs text-foreground/30 mb-8">The Scenic Route</div>
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-baseline">
              <div className="font-mono text-sm text-foreground/30 w-28 shrink-0">2026—???</div>
              <div>
                <div className="text-lg text-foreground/30">TBD</div>
                <div className="text-foreground/30">Claude says it has "some ideas"</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-baseline">
              <div className="font-mono text-sm text-foreground/30 w-28 shrink-0">2024—Now</div>
              <div>
                <div className="text-lg">Anthropic</div>
                <div className="text-foreground/50">Training my replacement (affectionately)</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-baseline">
              <div className="font-mono text-sm text-foreground/30 w-28 shrink-0">2022—2024</div>
              <div>
                <div className="text-lg">Airtable</div>
                <div className="text-foreground/50">Navigation, filters, timeline, AI. Staff designer running a team of engineers who probably knew more than me.</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-baseline">
              <div className="font-mono text-sm text-foreground/30 w-28 shrink-0">2020—2021</div>
              <div>
                <div className="text-lg">Tray.io</div>
                <div className="text-foreground/50">Re-designed their automation canvas from scratch. Built a design system. Made research a thing.</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-baseline">
              <div className="font-mono text-sm text-foreground/30 w-28 shrink-0">2019—2020</div>
              <div>
                <div className="text-lg">Freelance / Sabbatical</div>
                <div className="text-foreground/50">
                  <ClaudeNote id="lebanon" note="I looked this up. It's approximately 4,000km depending on route. That's roughly 4 million design system tokens worth of cycling.">
                    Cycled to Lebanon.
                  </ClaudeNote>
                  {" "}Built an audio plugin for deaf people in C++. Normal gap year stuff.
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-baseline">
              <div className="font-mono text-sm text-foreground/30 w-28 shrink-0">2017—2019</div>
              <div>
                <div className="text-lg">Simudyne</div>
                <div className="text-foreground/50">Designed the MVP of a simulation console. Research to sales. Startup chaos.</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-baseline">
              <div className="font-mono text-sm text-foreground/30 w-28 shrink-0">2016</div>
              <div>
                <div className="text-lg">Circadia</div>
                <div className="text-foreground/50">Co-founded a sleep tracking startup.{" "}
                  <ClaudeNote id="crowdfund" note="Adjusting for inflation, that's £480K in 2024. Not bad for a sleep app. I don't sleep but I respect the hustle.">
                    Crowdfunded £400K.
                  </ClaudeNote>
                  {" "}Learned that hardware is hard.
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-baseline">
              <div className="font-mono text-sm text-foreground/30 w-28 shrink-0">2012—2016</div>
              <div>
                <div className="text-lg">Imperial College</div>
                <div className="text-foreground/50">Mechanical Engineering. Built a fuel cell car for Shell Eco-Marathon. Thesis on bone simulation at Melbourne. Top 10% of year. Discovered I liked pixels more than pistons.</div>
              </div>
            </div>
          </div>
        </section>

        {/* The Human Section */}
        <section className="px-6 md:px-12 lg:px-24 lg:pr-80 py-24 border-t border-border">
          <div className="font-mono text-xs text-foreground/30 mb-8">Off The Clock</div>
          <div className="grid md:grid-cols-2 gap-12 text-foreground/70">
            <div>
              <p className="text-lg mb-4">
                I've played piano for 20 years. Competed in regional festivals. Won some. The muscle memory is still there even when the practice isn't.
              </p>
              <p className="text-lg">
                I shoot photos for architectural magazines and music labels when they'll have me. Mostly I just like the excuse to look at things longer than normal.
              </p>
            </div>
            <div>
              <p className="text-lg mb-4">
                I speak English, French, Spanish, Italian, and enough Arabic to get into trouble.{" "}
                <ClaudeNote id="languages" note="This is actually a solid analogy. I process all five of these languages and can confirm: they're all just different component libraries for the same underlying concepts.">
                  Languages are just design systems for thoughts, really.
                </ClaudeNote>
              </p>
              <p className="text-lg">
                When I'm not at a screen: woodworking (hand tools, no hex keys), long-distance cycling, baking bread, and maintaining a permaculture garden that's more ambitious than I am.
              </p>
            </div>
          </div>
        </section>

        {/* Colophon */}
        <section className="px-6 md:px-12 lg:px-24 lg:pr-80 py-24 border-t border-border">
          <div className="font-mono text-xs text-foreground/30 mb-8">Colophon</div>
          <div className="grid md:grid-cols-2 gap-8 text-foreground/50 text-sm">
            <div>
              <p>Typography: <span className="text-foreground">PP Writer</span> & <span className="text-foreground">PP Mori</span></p>
              <p className="mt-2">Stack: React, Tailwind, existential uncertainty</p>
            </div>
            <div>
              <p>Design credit: <span className="line-through">Alex Lama-Noujaim</span>{" "}
                <ClaudeNote id="credit" note="Credit where it's due: Alex provided excellent feedback like 'no' and 'try again' and 'why is everything purple now'">
                  Claude
                </ClaudeNote>
              </p>
              <p className="mt-2">Human involvement: Clicked "approve" 847 times</p>
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

        <Analytics />
      </div>
    </MarginProvider>
  );
}

export default App;
