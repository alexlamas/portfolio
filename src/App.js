import React, { useState, useEffect, useRef, useCallback } from "react";
import "./styles.css";
import "./fonts/fonts.css";
import { Analytics } from "@vercel/analytics/react";

// Story nodes
const STORY = {
  start: {
    text: [
      "Hey. I'm Alex.",
      "",
      "I design things at Anthropic—the Claude people.",
      "Before that, a long and winding road.",
      "",
      "What brings you here?",
    ],
    choices: [
      { label: "Tell me about yourself", goto: "whoami" },
      { label: "How'd you end up at Anthropic?", goto: "origin" },
      { label: "What's the work actually like?", goto: "work" },
    ],
  },
  whoami: {
    text: [
      "Lebanese-British. Based in London.",
      "Mechanical engineer turned designer.",
      "",
      "I like making complex things feel simple.",
      "Interfaces, yes—but also furniture,",
      "bread, and occasionally music.",
      "",
      "Probably too many hobbies.",
    ],
    choices: [
      { label: "What's your story?", goto: "origin" },
      { label: "Tell me about those hobbies", goto: "hobbies" },
      { label: "Let's chat", goto: "contact" },
    ],
  },
  origin: {
    text: [
      "Started in engineering. Imperial College.",
      "Built a fuel cell car. Won some awards.",
      "Realized I cared more about how things",
      "felt to use than how they worked inside.",
      "",
      "So I switched to design.",
      "My professors were confused.",
    ],
    choices: [
      { label: "Then what?", goto: "journey" },
      { label: "Skip ahead to now", goto: "now" },
      { label: "Back to start", goto: "start" },
    ],
  },
  journey: {
    text: [
      "2016 — Started a hardware company.",
      "         Crowdfunded £400K. Learned a lot.",
      "         Mostly that hardware is brutal.",
      "",
      "2017 — Enterprise software. Simulations.",
      "",
      "2019 — Took a year off. Cycled to Beirut.",
      "         Built an audio plugin. Read books.",
      "",
      "2020 — Tray.io. Automation stuff.",
      "",
      "2022 — Airtable. Led product design.",
    ],
    choices: [
      { label: "And now Anthropic?", goto: "now" },
      { label: "Wait—you cycled WHERE?", goto: "sabbatical" },
      { label: "Different topic", goto: "start" },
    ],
  },
  sabbatical: {
    text: [
      "London to Beirut. On a bike.",
      "",
      "Through France, Italy, Greece, Turkey,",
      "Syria (briefly), Lebanon.",
      "",
      "Took about 4 months. Camped most nights.",
      "Best decision I ever made.",
      "",
      "Your body can do a lot more than",
      "your brain thinks it can.",
    ],
    choices: [
      { label: "Back to the career stuff", goto: "journey" },
      { label: "What else do you do for fun?", goto: "hobbies" },
      { label: "Fast forward to now", goto: "now" },
    ],
  },
  now: {
    text: [
      "Anthropic. Since 2024.",
      "",
      "I work on Claude—the AI you might've",
      "heard of. Designing how it shows up",
      "in the world. How it feels to use.",
      "",
      "Strange job. Building tools that might",
      "change everything. Trying to do it well.",
    ],
    choices: [
      { label: "What's the day-to-day like?", goto: "work" },
      { label: "Life outside work?", goto: "hobbies" },
      { label: "I'd like to connect", goto: "contact" },
    ],
  },
  work: {
    text: [
      "Mostly I'm figuring out how AI",
      "should present itself to people.",
      "",
      "How do you make something powerful",
      "feel approachable? How do you build",
      "trust with users? How much should",
      "it say vs. show?",
      "",
      "Good questions. No easy answers.",
    ],
    choices: [
      { label: "How'd you get here?", goto: "origin" },
      { label: "What do you do outside work?", goto: "hobbies" },
      { label: "Let's talk", goto: "contact" },
    ],
  },
  hobbies: {
    text: [
      "Piano. 20 years. Classical mostly.",
      "",
      "Photography. Architectural stuff.",
      "Published in a few magazines.",
      "",
      "Languages. Five of them, various levels.",
      "Arabic's the hardest. Obviously.",
      "",
      "Woodworking. Hand tools only. It's slow.",
      "That's the point.",
    ],
    choices: [
      { label: "Back to work stuff", goto: "work" },
      { label: "Your career path", goto: "origin" },
      { label: "Get in touch", goto: "contact" },
    ],
  },
  contact: {
    text: [
      "Always happy to chat.",
      "",
      "Especially about design, AI,",
      "or long-distance cycling.",
    ],
    links: [
      { label: "email", url: "mailto:lamanoujaim@gmail.com", display: "lamanoujaim@gmail.com" },
      { label: "linkedin", url: "https://linkedin.com/in/lamanoujaim", display: "linkedin.com/in/lamanoujaim" },
      { label: "twitter", url: "https://twitter.com/alexlamas", display: "twitter.com/alexlamas" },
    ],
    afterText: [],
    choices: [
      { label: "Start over", goto: "start" },
    ],
  },
};

const SHORTCUTS = {
  whoami: "whoami", who: "whoami", about: "whoami",
  history: "journey", career: "journey", journey: "journey",
  skills: "work", work: "work",
  hobbies: "hobbies", life: "hobbies",
  contact: "contact", email: "contact",
  start: "start", restart: "start", help: "help",
};

// Simple synth using Web Audio API
class Synth {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  play(freq = 440, duration = 0.1, type = 'sine') {
    if (!this.ctx) this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  click() { this.play(800, 0.05, 'square'); }
  select() { this.play(600, 0.08, 'sine'); }
  boot() {
    this.play(200, 0.15, 'sawtooth');
    setTimeout(() => this.play(400, 0.15, 'sawtooth'), 100);
    setTimeout(() => this.play(600, 0.2, 'sawtooth'), 200);
  }
  type() { this.play(1200 + Math.random() * 200, 0.02, 'square'); }
}

const synth = new Synth();

// Stars background component
function StarField() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
    </div>
  );
}

// Menu dropdown
function MenuDropdown({ label, items, disabled, onSound }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }
  }, [isOpen]);

  return (
    <div ref={ref} className="relative h-full flex items-center">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
          onSound?.();
        }}
        disabled={disabled}
        className={`h-full px-3 text-[11px] transition-colors ${
          isOpen
            ? 'bg-highlight text-background'
            : 'text-highlight/70 hover:text-highlight hover:bg-highlight/10'
        }`}
      >
        {label}
      </button>
      {isOpen && (
        <div
          className="absolute top-full left-0 min-w-[180px] py-1 border border-highlight/30 shadow-2xl backdrop-blur-sm"
          style={{ background: 'rgba(13, 18, 8, 0.95)', zIndex: 9999 }}
          onClick={(e) => e.stopPropagation()}
        >
          {items.map((item, i) => (
            item.divider ? (
              <div key={i} className="my-1 border-t border-highlight/20" />
            ) : (
              <button
                key={i}
                onClick={() => {
                  onSound?.();
                  item.action?.();
                  setIsOpen(false);
                }}
                className="w-full px-3 py-1.5 text-left text-[11px] text-highlight/70 hover:bg-highlight hover:text-background transition-colors flex justify-between"
              >
                <span>{item.label}</span>
                {item.shortcut && <span className="text-highlight/40">{item.shortcut}</span>}
              </button>
            )
          ))}
        </div>
      )}
    </div>
  );
}

function Terminal() {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isBooted, setIsBooted] = useState(false);
  const [currentNode, setCurrentNode] = useState("start");
  const [showChoices, setShowChoices] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  const bottomRef = useRef(null);

  const playSound = useCallback((type) => {
    if (soundEnabled) {
      try { synth[type]?.(); } catch (e) {}
    }
  }, [soundEnabled]);

  const displayNode = useCallback(async (nodeId) => {
    const node = STORY[nodeId];
    if (!node) return;

    setIsTyping(true);
    setShowChoices(false);
    setCurrentNode(nodeId);

    for (const line of node.text) {
      await new Promise(r => setTimeout(r, 25));
      setLines(prev => [...prev, { type: "output", text: line }]);
    }

    if (node.links) {
      for (const link of node.links) {
        await new Promise(r => setTimeout(r, 25));
        setLines(prev => [...prev, { type: "link", ...link }]);
      }
    }

    await new Promise(r => setTimeout(r, 50));
    setLines(prev => [...prev, { type: "output", text: "" }]);
    setIsTyping(false);
    setShowChoices(true);
  }, []);

  useEffect(() => {
    const boot = async () => {
      setLines([]);
      setShowChoices(false);
      await new Promise(r => setTimeout(r, 300));
      playSound('boot');
      setLines([{ type: "logo" }]);
      await new Promise(r => setTimeout(r, 200));
      setLines(prev => [...prev, { type: "system", text: "═".repeat(56) }]);
      await new Promise(r => setTimeout(r, 100));
      setLines(prev => [...prev, { type: "system", text: "LAMASOFT PERSONAL TERMINAL v1.0  //  夢  //  ready" }]);
      await new Promise(r => setTimeout(r, 100));
      setLines(prev => [...prev, { type: "system", text: "═".repeat(56) }]);
      await new Promise(r => setTimeout(r, 100));
      setLines(prev => [...prev, { type: "output", text: "" }]);
      setIsBooted(true);
      await displayNode("start");
    };
    boot();
  }, [displayNode, playSound]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  useEffect(() => {
    const keepFocus = () => {
      if (isBooted && !isTyping) {
        inputRef.current?.focus();
      }
    };
    keepFocus();
    window.addEventListener('click', keepFocus);
    return () => window.removeEventListener('click', keepFocus);
  }, [isBooted, isTyping]);

  const handleChoice = useCallback(async (goto) => {
    playSound('select');
    setShowChoices(false);
    setLines(prev => [...prev, { type: "output", text: "" }]);
    await displayNode(goto);
  }, [displayNode, playSound]);

  const handleCommand = useCallback(async (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    playSound('click');
    setLines(prev => [...prev, { type: "command", text: cmd }]);

    if (trimmed === "clear") {
      setLines([{ type: "logo" }, { type: "output", text: "" }]);
      await displayNode(currentNode);
      return;
    }

    if (trimmed === "help") {
      setLines(prev => [...prev,
        { type: "system", text: "Commands: about, career, work, hobbies, contact, start" },
        { type: "output", text: "" },
      ]);
      return;
    }

    const target = SHORTCUTS[trimmed];
    if (target && STORY[target]) {
      setLines(prev => [...prev, { type: "output", text: "" }]);
      await displayNode(target);
      return;
    }

    const num = parseInt(trimmed);
    const node = STORY[currentNode];
    if (node?.choices && num >= 1 && num <= node.choices.length) {
      await handleChoice(node.choices[num - 1].goto);
      return;
    }

    setLines(prev => [...prev,
      { type: "system", text: "Try 1, 2, or 3—or type: about, career, work, hobbies, contact" },
      { type: "output", text: "" },
    ]);
  }, [displayNode, currentNode, handleChoice, playSound]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isTyping || !isBooted) return;
    handleCommand(input);
    setInput("");
  };

  const handleRestart = useCallback(() => {
    playSound('boot');
    setIsBooted(false);
    setLines([]);
    setTimeout(async () => {
      setLines([{ type: "logo" }]);
      await new Promise(r => setTimeout(r, 200));
      setLines(prev => [...prev, { type: "system", text: "═".repeat(56) }]);
      await new Promise(r => setTimeout(r, 100));
      setLines(prev => [...prev, { type: "system", text: "LAMASOFT PERSONAL TERMINAL v1.0  //  夢  //  ready" }]);
      await new Promise(r => setTimeout(r, 100));
      setLines(prev => [...prev, { type: "system", text: "═".repeat(56) }]);
      await new Promise(r => setTimeout(r, 100));
      setLines(prev => [...prev, { type: "output", text: "" }]);
      setIsBooted(true);
      await displayNode("start");
    }, 100);
  }, [displayNode, playSound]);

  const menus = [
    {
      label: "File",
      items: [
        { label: "About", action: () => handleChoice("whoami") },
        { label: "Contact", action: () => handleChoice("contact") },
        { divider: true },
        { label: "Restart", action: handleRestart, shortcut: "⌘R" },
      ],
    },
    {
      label: "Go",
      items: [
        { label: "Start", action: () => handleChoice("start") },
        { label: "Career", action: () => handleChoice("journey") },
        { label: "Now", action: () => handleChoice("now") },
        { label: "Work", action: () => handleChoice("work") },
        { label: "Life", action: () => handleChoice("hobbies") },
      ],
    },
    {
      label: "Sound",
      items: [
        { label: soundEnabled ? "✓ Enabled" : "  Disabled", action: () => setSoundEnabled(!soundEnabled) },
      ],
    },
  ];

  const choices = showChoices ? STORY[currentNode]?.choices : [];

  return (
    <div className="h-screen w-screen text-foreground font-mono text-xs flex items-center justify-center p-4 relative">
      <StarField />

      {/* Terminal window with glow */}
      <div
        className="relative border border-highlight/40 w-[580px] rounded-sm shadow-2xl"
        style={{
          background: 'rgba(13, 18, 8, 0.92)',
          boxShadow: '0 0 60px rgba(0, 255, 65, 0.15), 0 0 100px rgba(0, 255, 65, 0.05), inset 0 0 60px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Title bar */}
        <div className="flex items-center px-3 py-2 border-b border-highlight/30 bg-highlight/5">
          <div className="flex items-center gap-3 flex-1">
            <span className="text-highlight text-lg">◆</span>
            <span className="text-highlight text-[12px] font-bold tracking-wider">LAMASOFT.EXE</span>
            <div className="flex gap-1 ml-2">
              {menus.map(menu => (
                <MenuDropdown
                  key={menu.label}
                  label={menu.label}
                  items={menu.items}
                  disabled={isTyping || !isBooted}
                  onSound={() => playSound('click')}
                />
              ))}
            </div>
          </div>
          <div className="text-[10px] text-highlight/40">v1.0</div>
        </div>

        {/* Terminal content */}
        <div
          ref={terminalRef}
          className="overflow-y-auto p-4 text-[13px]"
          style={{ height: '400px' }}
        >
          {lines.map((line, i) => (
            <div key={i} className="leading-relaxed">
              {line.type === "logo" ? (
                <div className="text-highlight mb-3 text-[11px] font-bold tracking-widest">
                  <div>██╗      █████╗ ███╗   ███╗ █████╗ ███████╗ ██████╗ ███████╗████████╗</div>
                  <div>██║     ██╔══██╗████╗ ████║██╔══██╗██╔════╝██╔═══██╗██╔════╝╚══██╔══╝</div>
                  <div>██║     ███████║██╔████╔██║███████║███████╗██║   ██║█████╗     ██║</div>
                  <div>██║     ██╔══██║██║╚██╔╝██║██╔══██║╚════██║██║   ██║██╔══╝     ██║</div>
                  <div>███████╗██║  ██║██║ ╚═╝ ██║██║  ██║███████║╚██████╔╝██║        ██║</div>
                  <div>╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝        ╚═╝</div>
                </div>
              ) : line.type === "command" ? (
                <div className="flex text-foreground/60">
                  <span className="text-highlight">❯</span>
                  <span className="ml-2">{line.text}</span>
                </div>
              ) : line.type === "system" ? (
                <div className="text-highlight/50 text-[11px]">{line.text}</div>
              ) : line.type === "link" ? (
                <div className="flex">
                  <span className="text-foreground/40 w-20">{line.label}</span>
                  <a
                    href={line.url}
                    target={line.url.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noreferrer"
                    className="text-highlight hover:underline"
                    onClick={e => { e.stopPropagation(); playSound('click'); }}
                  >
                    {line.display}
                  </a>
                </div>
              ) : (
                <div className="text-foreground/80">{line.text}</div>
              )}
            </div>
          ))}

          {showChoices && choices.length > 0 && (
            <div className="mt-4 space-y-1">
              {choices.map((c, i) => (
                <button
                  key={i}
                  onClick={() => handleChoice(c.goto)}
                  className="block text-left text-foreground/50 hover:text-highlight transition-colors"
                >
                  <span className="text-highlight">[{i + 1}]</span> {c.label}
                </button>
              ))}
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between px-4 py-1.5 border-t border-highlight/20 text-[10px] text-highlight/40 bg-highlight/5">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-highlight/60 animate-pulse"></span>
            <span>TRACKING</span>
          </div>
          <span>NODE: {currentNode.toUpperCase()}</span>
          <div className="flex items-center gap-2">
            <span>OBSERVING</span>
            <span className="inline-block w-2 h-2 rounded-full bg-highlight/40"></span>
          </div>
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex items-center px-4 py-3 border-t border-highlight/30 bg-black/20">
          <span className="text-highlight text-lg">❯</span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={() => playSound('type')}
            disabled={isTyping || !isBooted}
            className="flex-1 ml-3 bg-transparent text-foreground caret-highlight text-[13px]"
            style={{ outline: 'none' }}
            placeholder={showChoices ? "1, 2, 3 or type a command..." : ""}
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
        </form>

        {/* Scanlines effect */}
        <div
          className="absolute inset-0 pointer-events-none rounded-sm opacity-[0.03]"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.1) 2px, rgba(0,255,65,0.1) 4px)'
          }}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="matrix bg-[#050808]">
      <Terminal />
      <Analytics />
    </div>
  );
}

export default App;
