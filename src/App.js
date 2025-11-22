import React, { useState } from "react";
import "./styles.css";
import "./fonts/fonts.css";
import { Analytics } from "@vercel/analytics/react";
import { ArrowUpRight, Circle } from "@phosphor-icons/react";

// Theme data
const themes = [
  { id: "mondrian", name: "Mondrian", color: "#D40920" },
  { id: "editorial", name: "Editorial", color: "#1a1a1a" },
  { id: "terminal", name: "Terminal", color: "#00FF41" },
  { id: "cards", name: "Cards", color: "#6366f1" },
  { id: "brutalist", name: "Brutalist", color: "#FF5722" },
  { id: "vaporwave", name: "Vaporwave", color: "#FF71CE" },
];

// Shared data
const timeline = [
  { year: "2024—", place: "Anthropic", note: "Product design for Claude" },
  { year: "2022—24", place: "Airtable", note: "Staff designer. Navigation, AI, timeline views" },
  { year: "2020—21", place: "Tray.io", note: "Senior designer. Canvas redesign, design system" },
  { year: "2019—20", place: "Sabbatical", note: "Cycled London to Beirut. Built audio software in C++" },
  { year: "2017—19", place: "Simudyne", note: "First design hire. Simulation platform from 0→1" },
  { year: "2016", place: "Circadia", note: "Co-founded. Crowdfunded £400K for sleep hardware" },
  { year: "2012—16", place: "Imperial College", note: "Mechanical Engineering. Discovered I prefer pixels to pistons" },
];

function ThemeSwitcher({ current, onChange }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2 p-2 rounded-lg bg-white/90 backdrop-blur shadow-lg border border-black/10">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${current === t.id ? 'ring-2 ring-offset-2 ring-black' : ''}`}
          style={{ backgroundColor: t.color, borderColor: t.color }}
          title={t.name}
        />
      ))}
    </div>
  );
}

// ============================================
// DESIGN 1: MONDRIAN
// ============================================
function Mondrian() {
  const year = new Date().getFullYear();
  return (
    <div className="text-mondrian-black bg-mondrian-cream min-h-screen">
      <section className="min-h-screen grid grid-cols-12 grid-rows-6 border-b-4 border-mondrian-black">
        <div className="col-span-12 lg:col-span-8 row-span-4 border-b-4 lg:border-b-0 lg:border-r-4 border-mondrian-black p-8 md:p-12 flex flex-col justify-end">
          <h1 className="text-[14vw] md:text-[10vw] lg:text-[8vw] font-serif leading-[0.85] tracking-tight">
            Alex<br />Lama-Noujaim
          </h1>
          <p className="text-xl md:text-2xl mt-6 max-w-lg">
            Product designer at Anthropic, where I help shape how people interact with AI.
          </p>
        </div>
        <div className="col-span-6 lg:col-span-4 row-span-2 bg-mondrian-red border-b-4 border-mondrian-black"></div>
        <div className="col-span-6 lg:col-span-4 row-span-2 bg-mondrian-yellow border-l-4 lg:border-l-0 border-mondrian-black"></div>
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

      <section id="work" className="border-b-4 border-mondrian-black">
        <div className="grid grid-cols-12">
          <div className="col-span-12 lg:col-span-2 bg-mondrian-blue p-6 border-b-4 lg:border-b-0 lg:border-r-4 border-mondrian-black">
            <span className="font-mono text-sm text-mondrian-cream">Selected Work</span>
          </div>
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
                  <p className="text-mondrian-black/70">Rebuilt their automation canvas from scratch. Introduced research as a practice.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-4 border-mondrian-black">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 md:p-12 border-b-4 md:border-b-0 md:border-r-4 border-mondrian-black">
            <h3 className="text-2xl font-serif mb-4">Product thinking</h3>
            <p className="text-mondrian-black/70">Connecting user needs to business outcomes. Not just pixels — the whole system.</p>
          </div>
          <div className="p-8 md:p-12 border-b-4 border-mondrian-black bg-mondrian-red text-mondrian-cream">
            <h3 className="text-2xl font-serif mb-4">AI interfaces</h3>
            <p className="text-mondrian-cream/80">Making AI interactions feel intuitive. The hard part isn't the model — it's the conversation.</p>
          </div>
          <div className="p-8 md:p-12 border-b-4 md:border-b-0 md:border-r-4 border-mondrian-black bg-mondrian-blue text-mondrian-cream">
            <h3 className="text-2xl font-serif mb-4">Design systems</h3>
            <p className="text-mondrian-cream/80">Components, tokens, documentation. Infrastructure that lets teams move fast.</p>
          </div>
          <div className="p-8 md:p-12">
            <h3 className="text-2xl font-serif mb-4">Research to ship</h3>
            <p className="text-mondrian-black/70">From user interviews to production. I like being involved in the full arc.</p>
          </div>
        </div>
      </section>

      <section id="about" className="border-b-4 border-mondrian-black">
        <div className="grid grid-cols-12">
          <div className="col-span-12 lg:col-span-1 bg-mondrian-yellow border-b-4 lg:border-b-0 lg:border-r-4 border-mondrian-black min-h-[60px]"></div>
          <div className="col-span-12 lg:col-span-11 p-8 md:p-12">
            <h2 className="font-mono text-sm mb-12">The Scenic Route</h2>
            <div className="space-y-6 max-w-3xl">
              {timeline.map((item, i) => (
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

      <footer className="grid grid-cols-12">
        <div className="col-span-12 lg:col-span-8 p-8 md:p-12 border-r-0 lg:border-r-4 border-mondrian-black">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Let's talk</h2>
          <a href="mailto:lamanoujaim@gmail.com" className="inline-flex items-center gap-2 text-xl hover:text-mondrian-red transition-colors">
            lamanoujaim@gmail.com <ArrowUpRight size={24} />
          </a>
        </div>
        <div className="col-span-12 lg:col-span-4 bg-mondrian-red p-8 flex items-end">
          <span className="font-mono text-xs text-mondrian-cream/70">© {year}</span>
        </div>
      </footer>
    </div>
  );
}

// ============================================
// DESIGN 2: EDITORIAL (Newspaper style)
// ============================================
function Editorial() {
  const year = new Date().getFullYear();
  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#1a1a1a]">
      {/* Masthead */}
      <header className="border-b-2 border-black">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-baseline">
          <div className="font-mono text-xs tracking-widest uppercase">Est. 2012</div>
          <div className="font-mono text-xs">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div>
      </header>

      {/* Title */}
      <div className="border-b border-black py-8">
        <h1 className="text-center font-serif text-6xl md:text-8xl tracking-tight">Alex Lama-Noujaim</h1>
        <p className="text-center font-mono text-sm mt-4 tracking-widest uppercase">Product Designer • San Francisco</p>
      </div>

      {/* Main content in columns */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-12 gap-8">
          {/* Lead story */}
          <div className="md:col-span-8 border-r-0 md:border-r border-black md:pr-8">
            <p className="font-mono text-xs uppercase tracking-widest mb-2">Lead Story</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6">
              Designer Joins Anthropic, Helps Teach AI the Difference Between "Make It Pop" and Actual Feedback
            </h2>
            <div className="columns-1 md:columns-2 gap-8 text-lg leading-relaxed">
              <p className="mb-4">
                <span className="font-serif text-5xl float-left mr-2 leading-none">I</span>
                n an industry obsessed with disruption, Alex Lama-Noujaim has taken a decidedly different approach: teaching machines to be thoughtful conversationalists.
              </p>
              <p className="mb-4">
                At Anthropic, he shapes how millions of people interact with Claude, the AI assistant that's somehow both incredibly capable and refreshingly humble about it.
              </p>
              <p className="mb-4">
                "The hardest part isn't the model," he explains from his San Francisco office. "It's designing for a conversation that could go anywhere. Every interaction is a new blank page."
              </p>
              <p>
                Before Anthropic, his path wound through Airtable, where he led design for navigation and AI features, and Tray.io, where he rebuilt an entire automation canvas. There was also that time he cycled from London to Beirut, but that's another story for the travel section.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="md:col-span-4">
            <div className="mb-8">
              <p className="font-mono text-xs uppercase tracking-widest mb-4 pb-2 border-b border-black">Previously</p>
              {timeline.slice(1, 5).map((item, i) => (
                <div key={i} className="mb-4 pb-4 border-b border-black/10">
                  <div className="font-mono text-xs text-black/50">{item.year}</div>
                  <div className="font-serif text-lg">{item.place}</div>
                  <div className="text-sm text-black/60">{item.note}</div>
                </div>
              ))}
            </div>

            <div className="bg-black text-white p-6">
              <p className="font-mono text-xs uppercase tracking-widest mb-2">Contact the Editor</p>
              <a href="mailto:lamanoujaim@gmail.com" className="font-serif text-xl hover:underline">lamanoujaim@gmail.com</a>
            </div>
          </aside>
        </div>

        {/* Bottom section */}
        <div className="grid md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-black">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest mb-2">Capabilities</p>
            <h3 className="font-serif text-2xl mb-2">Product Design</h3>
            <p className="text-black/70">Full-stack design from research to shipped pixels. Design systems, prototyping, and the occasional strongly-worded Slack message about consistency.</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest mb-2">Special Interest</p>
            <h3 className="font-serif text-2xl mb-2">AI Interfaces</h3>
            <p className="text-black/70">Making machine intelligence feel like a conversation with a thoughtful friend, not a command-line interface from 1983.</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest mb-2">Off-Duty</p>
            <h3 className="font-serif text-2xl mb-2">Renaissance Tendencies</h3>
            <p className="text-black/70">20 years of piano. Photography. Woodworking with hand tools only. Five languages. A permaculture garden more ambitious than practical.</p>
          </div>
        </div>
      </main>

      <footer className="border-t-2 border-black mt-12">
        <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="font-mono text-xs">© {year} All Rights Reserved</div>
          <div className="flex gap-6 font-mono text-xs">
            <a href="https://linkedin.com/in/lamanoujaim" className="hover:underline">LinkedIn</a>
            <a href="https://twitter.com/alexlamas" className="hover:underline">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ============================================
// DESIGN 3: TERMINAL (Hacker aesthetic)
// ============================================
function Terminal() {
  const year = new Date().getFullYear();
  const [input, setInput] = useState('');

  return (
    <div className="min-h-screen bg-[#0D1208] text-[#00FF41] font-mono p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Terminal header */}
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#00FF41]/30">
          <Circle size={12} weight="fill" className="text-[#FF5F56]" />
          <Circle size={12} weight="fill" className="text-[#FFBD2E]" />
          <Circle size={12} weight="fill" className="text-[#27CA40]" />
          <span className="ml-4 text-[#00FF41]/50 text-sm">alex@portfolio ~ </span>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div>
            <span className="text-[#00FF41]/50">$</span> cat about.txt
          </div>

          <pre className="text-[#00FF41] leading-relaxed whitespace-pre-wrap">
{`
   ___   __    ____  _  _
  / __) / _\\  (  _ \\( \\/ )
 ( (__ /    \\  )   / )  (
  \\___)\\__/\\_/(__\\_)(_/\\_)

  ALEX LAMA-NOUJAIM
  Product Designer @ Anthropic
  ---------------------------

  > Building interfaces for AI that don't feel like talking to a robot
  > Previously: Airtable, Tray.io, startups, one very long bike ride
  > Skills: design systems, research, making engineers happy

`}
          </pre>

          <div>
            <span className="text-[#00FF41]/50">$</span> ls -la ./experience
          </div>

          <div className="border border-[#00FF41]/30 p-4">
            <div className="grid grid-cols-12 gap-4 text-sm mb-2 text-[#00FF41]/50 border-b border-[#00FF41]/20 pb-2">
              <div className="col-span-3">DATES</div>
              <div className="col-span-3">COMPANY</div>
              <div className="col-span-6">DESCRIPTION</div>
            </div>
            {timeline.map((item, i) => (
              <div key={i} className="grid grid-cols-12 gap-4 text-sm py-2 border-b border-[#00FF41]/10 hover:bg-[#00FF41]/5">
                <div className="col-span-3 text-[#00FF41]/70">{item.year}</div>
                <div className="col-span-3">{item.place}</div>
                <div className="col-span-6 text-[#00FF41]/70">{item.note}</div>
              </div>
            ))}
          </div>

          <div>
            <span className="text-[#00FF41]/50">$</span> cat skills.json
          </div>

          <pre className="text-sm bg-[#00FF41]/5 p-4 border border-[#00FF41]/20">
{`{
  "design": ["product", "systems", "research", "prototyping"],
  "domains": ["AI/ML interfaces", "B2B SaaS", "data tools"],
  "languages": ["en", "fr", "es", "it", "ar"],
  "hobbies": ["piano", "woodworking", "cycling", "photography"]
}`}
          </pre>

          <div>
            <span className="text-[#00FF41]/50">$</span> ./contact --help
          </div>

          <div className="text-sm">
            <p className="mb-2">USAGE: contact [OPTIONS]</p>
            <p className="mb-4 text-[#00FF41]/70">Initiate communication with Alex Lama-Noujaim</p>
            <p>OPTIONS:</p>
            <p className="ml-4">--email    <a href="mailto:lamanoujaim@gmail.com" className="hover:underline">lamanoujaim@gmail.com</a></p>
            <p className="ml-4">--linkedin <a href="https://linkedin.com/in/lamanoujaim" className="hover:underline">linkedin.com/in/lamanoujaim</a></p>
            <p className="ml-4">--twitter  <a href="https://twitter.com/alexlamas" className="hover:underline">@alexlamas</a></p>
          </div>

          <div className="flex items-center gap-2 pt-8">
            <span className="text-[#00FF41]/50">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-[#00FF41]"
              placeholder="type 'hire alex' and press enter..."
            />
            <span className="animate-pulse">▋</span>
          </div>
        </div>

        <div className="mt-12 pt-4 border-t border-[#00FF41]/20 text-[#00FF41]/30 text-xs">
          © {year} // built with caffeine and mass // no AI was harmed in the making of this portfolio
        </div>
      </div>
    </div>
  );
}

// ============================================
// DESIGN 4: CARDS (Clean, modern)
// ============================================
function Cards() {
  const year = new Date().getFullYear();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero */}
      <div className="min-h-[70vh] flex items-center justify-center p-8">
        <div className="text-center max-w-2xl">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mx-auto mb-8 flex items-center justify-center text-white text-3xl font-serif">
            A
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-slate-900 mb-4">Alex Lama-Noujaim</h1>
          <p className="text-xl text-slate-600 mb-8">Product Designer at Anthropic</p>
          <p className="text-lg text-slate-500 max-w-lg mx-auto">
            I design AI interfaces that feel like conversations, not command lines. Currently teaching Claude how to be helpful without being annoying.
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <a href="mailto:lamanoujaim@gmail.com" className="px-6 py-3 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors">
              Get in touch
            </a>
            <a href="#work" className="px-6 py-3 border border-slate-300 rounded-full hover:border-slate-400 transition-colors">
              See work
            </a>
          </div>
        </div>
      </div>

      {/* Work cards */}
      <section id="work" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-sm font-mono uppercase tracking-widest text-slate-400 mb-8">Experience</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { company: "Anthropic", role: "Product Designer", period: "2024—", color: "from-orange-400 to-pink-500", desc: "Designing Claude's conversational interfaces" },
            { company: "Airtable", role: "Staff Designer", period: "2022—24", color: "from-blue-400 to-indigo-500", desc: "Navigation, timeline views, AI features" },
            { company: "Tray.io", role: "Senior Designer", period: "2020—21", color: "from-emerald-400 to-teal-500", desc: "Rebuilt automation canvas from scratch" },
            { company: "Sabbatical", role: "Explorer", period: "2019—20", color: "from-amber-400 to-orange-500", desc: "London→Beirut by bike. Audio software in C++" },
            { company: "Simudyne", role: "Product Designer", period: "2017—19", color: "from-purple-400 to-indigo-500", desc: "First design hire. 0→1 simulation platform" },
            { company: "Circadia", role: "Co-founder", period: "2016", color: "from-pink-400 to-rose-500", desc: "Sleep hardware. £400K crowdfunded" },
          ].map((job, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-slate-100">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${job.color} mb-4`}></div>
              <div className="text-xs text-slate-400 font-mono mb-1">{job.period}</div>
              <h3 className="text-xl font-serif text-slate-900 mb-1">{job.company}</h3>
              <div className="text-sm text-indigo-600 mb-3">{job.role}</div>
              <p className="text-slate-600 text-sm">{job.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-sm font-mono uppercase tracking-widest text-slate-400 mb-8">What I Do</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {["Product Design", "Design Systems", "User Research", "AI Interfaces", "Prototyping", "Strategy", "Team Leadership", "Frontend"].map((skill, i) => (
            <div key={i} className="bg-white rounded-xl p-4 text-center border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50 transition-colors">
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* Personal */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-sm font-mono uppercase tracking-widest text-slate-400 mb-8">Beyond Work</h2>
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-slate-700 mb-4">
                20 years of piano and regional competitions. Photography for architecture magazines and music labels — an excuse to look at things longer than normal.
              </p>
              <p className="text-slate-700">
                Five languages: English, French, Spanish, Italian, Arabic. Languages are design systems for thoughts.
              </p>
            </div>
            <div>
              <p className="text-slate-700">
                Woodworking with hand tools only (no hex keys allowed). Long-distance cycling. Bread baking. A permaculture garden that's more vision board than vegetable patch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-serif text-slate-900 mb-4">Let's work together</h2>
        <a href="mailto:lamanoujaim@gmail.com" className="text-xl text-indigo-600 hover:underline">lamanoujaim@gmail.com</a>
        <div className="flex gap-6 justify-center mt-8 text-slate-400">
          <a href="https://linkedin.com/in/lamanoujaim" className="hover:text-slate-600">LinkedIn</a>
          <a href="https://twitter.com/alexlamas" className="hover:text-slate-600">Twitter</a>
        </div>
        <div className="mt-8 text-slate-400 text-sm">© {year} Alex Lama-Noujaim</div>
      </footer>
    </div>
  );
}

// ============================================
// DESIGN 5: BRUTALIST
// ============================================
function Brutalist() {
  const year = new Date().getFullYear();
  return (
    <div className="min-h-screen bg-[#FFFEF5]">
      {/* Massive hero */}
      <section className="min-h-screen flex flex-col justify-between p-4 md:p-8 border-b-8 border-black">
        <div className="flex justify-between items-start">
          <div className="text-xs font-mono uppercase">Portfolio / 2024</div>
          <div className="text-xs font-mono uppercase">San Francisco, CA</div>
        </div>

        <div>
          <h1 className="text-[20vw] md:text-[15vw] font-serif leading-[0.8] tracking-tighter uppercase">
            ALEX
          </h1>
          <h1 className="text-[20vw] md:text-[15vw] font-serif leading-[0.8] tracking-tighter uppercase -mt-4">
            LAMA
          </h1>
          <div className="flex flex-wrap gap-4 mt-8">
            <span className="px-4 py-2 border-2 border-black text-sm font-mono uppercase">Product Designer</span>
            <span className="px-4 py-2 border-2 border-black text-sm font-mono uppercase bg-[#FF5722] text-white">@ Anthropic</span>
            <span className="px-4 py-2 border-2 border-black text-sm font-mono uppercase">AI Interfaces</span>
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div className="max-w-md text-lg">
            I make AI feel less like a command line and more like talking to someone who actually listens.
          </div>
          <div className="text-8xl md:text-9xl font-serif">↓</div>
        </div>
      </section>

      {/* Work section */}
      <section className="border-b-8 border-black">
        <div className="grid md:grid-cols-2">
          <div className="p-8 md:p-12 border-b-8 md:border-b-0 md:border-r-8 border-black bg-[#FF5722]">
            <h2 className="text-6xl md:text-8xl font-serif uppercase text-white mb-8">Work</h2>
            <p className="text-white/80 text-xl max-w-md">
              A decade of designing products that people actually use. From startups to scale-ups to whatever Anthropic is.
            </p>
          </div>
          <div className="divide-y-4 divide-black">
            {timeline.slice(0, 4).map((item, i) => (
              <div key={i} className="p-6 hover:bg-black hover:text-white transition-colors group">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-2xl font-serif">{item.place}</span>
                  <span className="font-mono text-sm">{item.year}</span>
                </div>
                <p className="text-sm opacity-70 group-hover:opacity-100">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="p-8 md:p-16 border-b-8 border-black">
        <p className="text-4xl md:text-6xl font-serif leading-tight max-w-5xl">
          "THE HARD PART ISN'T THE MODEL.
          <span className="bg-[#FFEB3B] px-2">IT'S THE CONVERSATION.</span>"
        </p>
      </section>

      {/* Skills grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 border-b-8 border-black">
        {["PRODUCT DESIGN", "DESIGN SYSTEMS", "USER RESEARCH", "AI/ML", "PROTOTYPING", "STRATEGY", "FRONTEND", "LEADERSHIP"].map((skill, i) => (
          <div key={i} className={`p-8 border-r-4 border-b-4 border-black font-mono text-sm uppercase hover:bg-black hover:text-white transition-colors ${i % 3 === 0 ? 'bg-[#FFEB3B]' : ''}`}>
            {skill}
          </div>
        ))}
      </section>

      {/* Personal */}
      <section className="p-8 md:p-12 border-b-8 border-black bg-black text-white">
        <h2 className="text-4xl font-serif uppercase mb-8">Not Just Pixels</h2>
        <div className="grid md:grid-cols-3 gap-8 text-lg">
          <div>20 years piano. Regional competitions. Muscle memory outlasts practice.</div>
          <div>5 languages. Photography. Architecture magazines and music labels.</div>
          <div>Woodworking. Cycling. Bread. A garden more ambitious than me.</div>
        </div>
      </section>

      {/* Contact */}
      <footer className="p-8 md:p-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <h2 className="text-6xl md:text-8xl font-serif uppercase mb-4">Say Hi</h2>
            <a href="mailto:lamanoujaim@gmail.com" className="text-2xl hover:bg-[#FF5722] hover:text-white px-2 transition-colors">
              lamanoujaim@gmail.com
            </a>
          </div>
          <div className="flex gap-8 font-mono uppercase text-sm">
            <a href="https://linkedin.com/in/lamanoujaim" className="hover:line-through">LinkedIn</a>
            <a href="https://twitter.com/alexlamas" className="hover:line-through">Twitter</a>
            <span className="opacity-50">© {year}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ============================================
// DESIGN 6: VAPORWAVE
// ============================================
function Vaporwave() {
  const year = new Date().getFullYear();
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0D0221] via-[#261447] to-[#0D0221] text-white overflow-hidden">
      {/* Grid overlay */}
      <div className="fixed inset-0 opacity-20 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(#FF71CE 1px, transparent 1px), linear-gradient(90deg, #FF71CE 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        transform: 'perspective(500px) rotateX(60deg)',
        transformOrigin: 'center top'
      }}></div>

      {/* Sun */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full opacity-80"
        style={{
          background: 'linear-gradient(180deg, #FF71CE 0%, #B967FF 50%, #05FFA1 100%)',
          boxShadow: '0 0 100px #FF71CE, 0 0 200px #B967FF'
        }}></div>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <p className="font-mono text-sm tracking-[0.5em] text-[#05FFA1] mb-4 uppercase">Welcome to the grid</p>
        <h1 className="text-6xl md:text-8xl font-serif mb-4" style={{
          background: 'linear-gradient(180deg, #FF71CE, #B967FF, #01CDFE)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          ALEX LAMA
        </h1>
        <h2 className="text-4xl md:text-6xl font-serif mb-8" style={{
          background: 'linear-gradient(180deg, #01CDFE, #05FFA1)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          ラマヌジェイム
        </h2>
        <p className="text-xl text-[#FF71CE] max-w-lg mb-8">
          Product Designer @ Anthropic // Crafting AI interfaces in the digital realm
        </p>
        <div className="flex gap-4">
          <a href="mailto:lamanoujaim@gmail.com" className="px-6 py-3 border-2 border-[#FF71CE] text-[#FF71CE] hover:bg-[#FF71CE] hover:text-[#0D0221] transition-colors font-mono">
            CONNECT.exe
          </a>
          <a href="#work" className="px-6 py-3 border-2 border-[#05FFA1] text-[#05FFA1] hover:bg-[#05FFA1] hover:text-[#0D0221] transition-colors font-mono">
            EXPLORE.sys
          </a>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="relative max-w-4xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-serif text-center mb-12" style={{
          background: 'linear-gradient(90deg, #FF71CE, #01CDFE)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          // EXPERIENCE.log
        </h2>
        <div className="space-y-6">
          {timeline.map((item, i) => (
            <div key={i} className="border border-[#B967FF]/50 p-6 hover:border-[#FF71CE] hover:bg-[#FF71CE]/10 transition-colors"
              style={{ boxShadow: '0 0 20px rgba(185, 103, 255, 0.2)' }}>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-xl text-[#05FFA1]">{item.place}</span>
                <span className="font-mono text-sm text-[#01CDFE]">{item.year}</span>
              </div>
              <p className="text-white/70">{item.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="relative max-w-4xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-serif text-center mb-12" style={{
          background: 'linear-gradient(90deg, #01CDFE, #05FFA1)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          // SKILLS.dat
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Product Design", "AI Interfaces", "Design Systems", "Research", "Prototyping", "Strategy", "Frontend", "Leadership"].map((skill, i) => (
            <div key={i} className="border border-[#01CDFE]/50 p-4 text-center font-mono text-sm text-[#01CDFE] hover:bg-[#01CDFE]/20 hover:border-[#01CDFE] transition-colors">
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* Personal */}
      <section className="relative max-w-4xl mx-auto px-6 py-24 text-center">
        <h2 className="text-4xl font-serif mb-8" style={{
          background: 'linear-gradient(90deg, #FF71CE, #B967FF)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          // HUMAN.exe
        </h2>
        <p className="text-lg text-white/80 max-w-2xl mx-auto mb-4">
          20 years piano // 5 languages // Photography for architecture mags // Woodworking with hand tools // Long-distance cycling // A permaculture garden that exists mostly in my imagination
        </p>
        <p className="text-[#05FFA1] font-mono text-sm">
          Languages are design systems for thoughts // 言語は思考のためのデザインシステムです
        </p>
      </section>

      {/* Footer */}
      <footer className="relative text-center py-16 border-t border-[#B967FF]/30">
        <h2 className="text-5xl font-serif mb-6" style={{
          background: 'linear-gradient(180deg, #FF71CE, #01CDFE)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          接続する
        </h2>
        <a href="mailto:lamanoujaim@gmail.com" className="text-xl text-[#FF71CE] hover:text-[#05FFA1] transition-colors font-mono">
          lamanoujaim@gmail.com
        </a>
        <div className="flex justify-center gap-8 mt-8 font-mono text-sm">
          <a href="https://linkedin.com/in/lamanoujaim" className="text-[#01CDFE] hover:text-[#FF71CE] transition-colors">LinkedIn</a>
          <a href="https://twitter.com/alexlamas" className="text-[#01CDFE] hover:text-[#FF71CE] transition-colors">Twitter</a>
        </div>
        <div className="mt-8 font-mono text-xs text-[#B967FF]/50">
          © {year} // A E S T H E T I C S
        </div>
      </footer>
    </div>
  );
}

// ============================================
// MAIN APP
// ============================================
function App() {
  const [theme, setTheme] = useState("mondrian");

  const renderTheme = () => {
    switch (theme) {
      case "editorial": return <Editorial />;
      case "terminal": return <Terminal />;
      case "cards": return <Cards />;
      case "brutalist": return <Brutalist />;
      case "vaporwave": return <Vaporwave />;
      default: return <Mondrian />;
    }
  };

  return (
    <>
      <ThemeSwitcher current={theme} onChange={setTheme} />
      {renderTheme()}
      <Analytics />
    </>
  );
}

export default App;
