import React from "react";
import "./styles.css";
import "./fonts/fonts.css";
import { Analytics } from "@vercel/analytics/react";
import { ArrowUpRight } from "@phosphor-icons/react";

function App() {
  const year = new Date().getFullYear();

  return (
    <div className="mondrian text-mondrian-black bg-mondrian-cream min-h-screen">

      {/* Mondrian Grid Hero */}
      <section className="min-h-screen grid grid-cols-12 grid-rows-6 border-b-4 border-mondrian-black">

        {/* Main title block */}
        <div className="col-span-12 lg:col-span-8 row-span-4 border-b-4 lg:border-b-0 lg:border-r-4 border-mondrian-black p-8 md:p-12 flex flex-col justify-end">
          <h1 className="text-[14vw] md:text-[10vw] lg:text-[8vw] font-serif leading-[0.85] tracking-tight">
            Alex<br />Lama-Noujaim
          </h1>
          <p className="text-xl md:text-2xl mt-6 max-w-lg">
            Product designer at Anthropic, where I help shape how people interact with AI.
          </p>
        </div>

        {/* Red block */}
        <div className="col-span-6 lg:col-span-4 row-span-2 bg-mondrian-red border-b-4 border-mondrian-black"></div>

        {/* Yellow block */}
        <div className="col-span-6 lg:col-span-4 row-span-2 bg-mondrian-yellow border-l-4 lg:border-l-0 border-mondrian-black"></div>

        {/* Bottom nav strip */}
        <div className="col-span-12 row-span-2 grid grid-cols-3 border-t-4 border-mondrian-black">
          <a href="#work" className="border-r-4 border-mondrian-black p-6 flex items-end hover:bg-mondrian-black hover:text-mondrian-cream transition-colors">
            <span className="font-mono text-sm">Work</span>
          </a>
          <a href="#about" className="border-r-4 border-mondrian-black p-6 flex items-end hover:bg-mondrian-black hover:text-mondrian-cream transition-colors">
            <span className="font-mono text-sm">About</span>
          </a>
          <a href="mailto:lamanoujaim@gmail.com" className="p-6 flex items-end hover:bg-mondrian-black hover:text-mondrian-cream transition-colors">
            <span className="font-mono text-sm">Contact</span>
          </a>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="border-b-4 border-mondrian-black">
        <div className="grid grid-cols-12">

          {/* Section label */}
          <div className="col-span-12 lg:col-span-2 bg-mondrian-blue p-6 border-b-4 lg:border-b-0 lg:border-r-4 border-mondrian-black">
            <span className="font-mono text-sm text-mondrian-cream">Selected Work</span>
          </div>

          {/* Work content */}
          <div className="col-span-12 lg:col-span-10 p-8 md:p-12">
            <div className="max-w-3xl">
              <p className="text-2xl md:text-3xl mb-8 leading-relaxed">
                Most of my work lives behind NDAs or is too product-entangled to excerpt cleanly.
                The curse of shipping, not presenting.
              </p>

              <div className="space-y-8">
                <div className="border-l-4 border-mondrian-black pl-6">
                  <h3 className="text-xl font-serif mb-2">Anthropic</h3>
                  <p className="text-mondrian-black/70">Designing Claude's interfaces. Making AI feel less like software and more like a conversation worth having.</p>
                </div>

                <div className="border-l-4 border-mondrian-black pl-6">
                  <h3 className="text-xl font-serif mb-2">Airtable</h3>
                  <p className="text-mondrian-black/70">Led design for navigation, timeline views, and AI features. Staff designer stewarding a team of engineers.</p>
                </div>

                <div className="border-l-4 border-mondrian-black pl-6">
                  <h3 className="text-xl font-serif mb-2">Tray.io</h3>
                  <p className="text-mondrian-black/70">Rebuilt their automation canvas from scratch. Introduced research as a practice. Made complexity feel manageable.</p>
                </div>
              </div>

              <div className="mt-12 p-6 bg-mondrian-yellow/30 border-4 border-mondrian-black">
                <p className="font-mono text-sm">
                  Want the full picture? <a href="mailto:lamanoujaim@gmail.com" className="underline hover:text-mondrian-red">Let's talk</a>. I'm better at explaining work than writing about it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What I Do Grid */}
      <section className="border-b-4 border-mondrian-black">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 md:p-12 border-b-4 md:border-b-0 md:border-r-4 border-mondrian-black">
            <h3 className="text-2xl font-serif mb-4">Product thinking</h3>
            <p className="text-mondrian-black/70">
              Connecting user needs to business outcomes. Not just pixels — the whole system.
            </p>
          </div>
          <div className="p-8 md:p-12 border-b-4 border-mondrian-black bg-mondrian-red text-mondrian-cream">
            <h3 className="text-2xl font-serif mb-4">AI interfaces</h3>
            <p className="text-mondrian-cream/80">
              Making AI interactions feel intuitive. The hard part isn't the model — it's the conversation.
            </p>
          </div>
          <div className="p-8 md:p-12 border-b-4 md:border-b-0 md:border-r-4 border-mondrian-black bg-mondrian-blue text-mondrian-cream">
            <h3 className="text-2xl font-serif mb-4">Design systems</h3>
            <p className="text-mondrian-cream/80">
              Components, tokens, documentation. The infrastructure that lets teams move fast without breaking things.
            </p>
          </div>
          <div className="p-8 md:p-12">
            <h3 className="text-2xl font-serif mb-4">Research to ship</h3>
            <p className="text-mondrian-black/70">
              From user interviews to production. I like being involved in the full arc.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section id="about" className="border-b-4 border-mondrian-black">
        <div className="grid grid-cols-12">

          {/* Yellow sidebar */}
          <div className="col-span-12 lg:col-span-1 bg-mondrian-yellow border-b-4 lg:border-b-0 lg:border-r-4 border-mondrian-black min-h-[60px]"></div>

          <div className="col-span-12 lg:col-span-11 p-8 md:p-12">
            <h2 className="font-mono text-sm mb-12">The Scenic Route</h2>

            <div className="space-y-6 max-w-3xl">
              {[
                { year: "2024—", place: "Anthropic", note: "Product design for Claude" },
                { year: "2022—24", place: "Airtable", note: "Staff designer. Navigation, AI, timeline views" },
                { year: "2020—21", place: "Tray.io", note: "Senior designer. Canvas redesign, design system" },
                { year: "2019—20", place: "Sabbatical", note: "Cycled London to Beirut. Built audio software in C++" },
                { year: "2017—19", place: "Simudyne", note: "First design hire. Simulation platform from 0→1" },
                { year: "2016", place: "Circadia", note: "Co-founded. Crowdfunded £400K for sleep hardware" },
                { year: "2012—16", place: "Imperial College", note: "Mechanical Engineering. Top 10%. Discovered I prefer pixels to pistons" },
              ].map((item, i) => (
                <div key={i} className="flex gap-8 items-baseline border-b border-mondrian-black/20 pb-4">
                  <span className="font-mono text-sm text-mondrian-black/50 w-20 shrink-0">{item.year}</span>
                  <span className="font-serif text-lg w-32 shrink-0">{item.place}</span>
                  <span className="text-mondrian-black/70">{item.note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Personal / Off the clock */}
      <section className="border-b-4 border-mondrian-black">
        <div className="grid grid-cols-12">
          <div className="col-span-12 lg:col-span-8 p-8 md:p-12 border-b-4 lg:border-b-0 lg:border-r-4 border-mondrian-black">
            <h2 className="font-mono text-sm mb-8">Off The Clock</h2>
            <div className="grid md:grid-cols-2 gap-8 text-mondrian-black/80">
              <div>
                <p className="mb-4">
                  20 years of piano. Regional competitions, the works. The muscle memory outlasts the practice.
                </p>
                <p>
                  Photography for architecture magazines and music labels. An excuse to look at things longer than normal.
                </p>
              </div>
              <div>
                <p className="mb-4">
                  Five languages: English, French, Spanish, Italian, Arabic. Languages are design systems for thoughts.
                </p>
                <p>
                  Woodworking with hand tools. Long-distance cycling. Bread baking. A permaculture garden more ambitious than I am.
                </p>
              </div>
            </div>
          </div>

          {/* Blue block */}
          <div className="col-span-12 lg:col-span-4 bg-mondrian-blue min-h-[200px]"></div>
        </div>
      </section>

      {/* Contact Footer */}
      <footer className="grid grid-cols-12">
        <div className="col-span-12 lg:col-span-8 p-8 md:p-12 border-r-0 lg:border-r-4 border-mondrian-black">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Let's talk</h2>
          <a
            href="mailto:lamanoujaim@gmail.com"
            className="inline-flex items-center gap-2 text-xl hover:text-mondrian-red transition-colors"
          >
            lamanoujaim@gmail.com
            <ArrowUpRight size={24} />
          </a>
          <div className="flex gap-6 mt-8 font-mono text-sm">
            <a href="https://linkedin.com/in/lamanoujaim" target="_blank" rel="noreferrer" className="hover:text-mondrian-red transition-colors">LinkedIn</a>
            <a href="https://twitter.com/alexlamas" target="_blank" rel="noreferrer" className="hover:text-mondrian-red transition-colors">Twitter</a>
          </div>
        </div>

        {/* Red corner */}
        <div className="col-span-12 lg:col-span-4 bg-mondrian-red p-8 flex items-end">
          <span className="font-mono text-xs text-mondrian-cream/70">© {year}</span>
        </div>
      </footer>

      <Analytics />
    </div>
  );
}

export default App;
