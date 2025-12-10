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
      "Lebanese-British, based in London.",
      "Mechanical engineer turned designer.",
      "",
      "I like making complex things feel simple.",
      "Interfaces mostly. Though I also make",
      "furniture, bread, and noise.",
      "",
      "I don't sit still well.",
    ],
    choices: [
      { label: "What's your story?", goto: "origin" },
      { label: "Tell me about those hobbies", goto: "hobbies" },
      { label: "Let's chat", goto: "contact" },
    ],
  },
  origin: {
    text: [
      "I started in engineering at Imperial College.",
      "Worked on a passive hybrid fuel cell car—spent",
      "months obsessing over hydrogen flow paths",
      "and plate geometry.",
      "",
      "Somewhere in there I realised I cared more",
      "about how things felt to use than how they",
      "worked inside. So I switched to design.",
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
      "         Crowdfunded it, learned a lot.",
      "         Mostly that hardware is brutal.",
      "",
      "2017 — Enterprise software. Simulations.",
      "",
      "2019 — Took a year off. Cycled to Beirut,",
      "         built an audio plugin, read books.",
      "",
      "2020 — Tray.io. Early designer, working",
      "         on automations.",
      "",
      "2022 — Airtable. Staff designer, working on",
      "         app building blocks and systems.",
    ],
    choices: [
      { label: "And now Anthropic?", goto: "now" },
      { label: "Wait—you cycled WHERE?", goto: "sabbatical" },
      { label: "Different topic", goto: "start" },
    ],
  },
  sabbatical: {
    text: [
      "London to Beirut, on a bike.",
      "Through France, Italy, Greece, Turkey,",
      "and Lebanon.",
      "",
      "> 4,583 km | 3.5 months | mostly camping",
      "",
      "Still not sure why I did it. Glad I did.",
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
      "I've been at Anthropic since 2024.",
      "I work on Claude—the AI you might've",
      "heard of. Designing how it shows up",
      "in the world, how it feels to use.",
      "",
      "Strange job. Some days exciting,",
      "some days terrifying.",
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
      "Most days I feel like I'm guessing.",
    ],
    choices: [
      { label: "How'd you get here?", goto: "origin" },
      { label: "What do you do outside work?", goto: "hobbies" },
      { label: "Let's talk", goto: "contact" },
    ],
  },
  hobbies: {
    text: [
      "Piano—twenty years now, classical mostly.",
      "",
      "Photography, architectural stuff.",
      "Been published a few times.",
      "",
      "Languages—I speak five at various levels.",
      "Arabic's the hardest, obviously.",
      "",
      "Woodworking with hand tools only.",
      "It's slow. That's the point.",
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
  shutdown() {
    this.play(600, 0.3, 'sine');
    setTimeout(() => this.play(400, 0.3, 'sine'), 200);
    setTimeout(() => this.play(200, 0.5, 'sine'), 400);
  }
  zenChime() {
    if (!this.ctx) this.init();
    // Gentle meditation bell
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 528; // Solfeggio frequency
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 2);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 2);
  }
  type() { this.play(1200 + Math.random() * 200, 0.02, 'square'); }
}

const synth = new Synth();

// Stars background component (Space theme) with moon
function StarField({ onToggle }) {
  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: 'linear-gradient(to bottom, #0a0a1a 0%, #1a1a2e 100%)' }}>
      <div className="stars pointer-events-none"></div>
      <div className="stars2 pointer-events-none"></div>
      <div className="stars3 pointer-events-none"></div>
      {/* Clickable Moon */}
      <button
        onClick={onToggle}
        className="cursor-pointer transition-transform duration-300 hover:scale-110"
        style={{
          position: 'fixed',
          top: '60px',
          right: '60px',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          border: 'none',
          background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 50%, #d0d0d0 100%)',
          boxShadow: '0 0 50px rgba(255,255,255,0.5), 0 0 100px rgba(255,255,255,0.3), inset -15px -15px 30px rgba(0,0,0,0.15)',
          zIndex: 10,
          animation: 'moonRise 1.5s ease-out forwards',
        }}
        title="Click to switch to day"
      >
        {/* Moon craters */}
        <div style={{ position: 'absolute', top: '20px', left: '24px', width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(180,180,180,0.4)' }}></div>
        <div style={{ position: 'absolute', top: '56px', left: '56px', width: '16px', height: '16px', borderRadius: '50%', background: 'rgba(180,180,180,0.3)' }}></div>
        <div style={{ position: 'absolute', top: '36px', right: '24px', width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(180,180,180,0.35)' }}></div>
      </button>
    </div>
  );
}

// Clouds background component (Sky theme) with sun
function SkyField({ onToggle }) {
  return (
    <div className="fixed inset-0 overflow-hidden sky-gradient">
      <div className="cloud x1 pointer-events-none"></div>
      <div className="cloud x2 pointer-events-none"></div>
      <div className="cloud x3 pointer-events-none"></div>
      <div className="cloud x4 pointer-events-none"></div>
      <div className="cloud x5 pointer-events-none"></div>
      {/* Clickable Sun */}
      <button
        onClick={onToggle}
        className="sun-rise cursor-pointer transition-transform duration-300 hover:scale-110"
        style={{
          position: 'fixed',
          top: '50px',
          right: '50px',
          width: '140px',
          height: '140px',
          borderRadius: '50%',
          border: 'none',
          background: 'radial-gradient(circle, #FFF9C4 0%, #FFE082 30%, #FFB300 100%)',
          boxShadow: '0 0 80px rgba(255,200,0,0.8), 0 0 150px rgba(255,180,0,0.5), 0 0 200px rgba(255,150,0,0.3)',
          zIndex: 10,
          animation: 'sunRise 1.5s ease-out forwards',
        }}
        title="Click to switch to night"
      />
    </div>
  );
}

// Zen meditation screen when computer is "off"
function ZenScreen({ onWakeUp, soundEnabled }) {
  const [breathPhase, setBreathPhase] = useState('inhale');
  const [meditationIndex, setMeditationIndex] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const [breathCount, setBreathCount] = useState(0);

  const meditations = [
    "breathe",
    "be here now",
    "let go",
    "just be",
    "stillness",
    "peace",
    "presence",
    "rest",
  ];

  const breathingGuide = {
    inhale: { text: "breathe in", duration: 4000 },
    hold: { text: "hold", duration: 4000 },
    exhale: { text: "breathe out", duration: 6000 },
  };

  // Breathing cycle
  useEffect(() => {
    const cycle = () => {
      setBreathPhase('inhale');
      setTimeout(() => setBreathPhase('hold'), 4000);
      setTimeout(() => setBreathPhase('exhale'), 8000);
    };
    cycle();
    const interval = setInterval(cycle, 14000);
    return () => clearInterval(interval);
  }, []);

  // Count breaths
  useEffect(() => {
    if (breathPhase === 'inhale') {
      setBreathCount(c => c + 1);
    }
  }, [breathPhase]);

  // Rotate meditation words
  useEffect(() => {
    const interval = setInterval(() => {
      setMeditationIndex(i => (i + 1) % meditations.length);
    }, 20000);
    return () => clearInterval(interval);
  }, [meditations.length]);

  // Show wake prompt after a moment
  useEffect(() => {
    const timer = setTimeout(() => setShowPrompt(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Play gentle chime occasionally
  useEffect(() => {
    if (!soundEnabled) return;
    const chime = () => {
      try { synth.zenChime(); } catch (e) {}
    };
    chime(); // Initial chime
    const interval = setInterval(chime, 30000);
    return () => clearInterval(interval);
  }, [soundEnabled]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center cursor-pointer zen-background"
      onClick={onWakeUp}
      style={{
        background: 'linear-gradient(180deg, #0a0a0f 0%, #141420 50%, #0a0a0f 100%)',
      }}
    >
      {/* Subtle ambient particles */}
      <div className="zen-particles"></div>

      {/* Main content */}
      <div className="relative z-10 text-center px-8">
        {/* Breathing circle */}
        <div
          className="mx-auto mb-12 rounded-full zen-breath-circle"
          style={{
            width: '160px',
            height: '160px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 50%, transparent 70%)',
            boxShadow: '0 0 60px rgba(255,255,255,0.05)',
            animation: breathPhase === 'inhale'
              ? 'zenExpand 4s ease-in-out forwards'
              : breathPhase === 'hold'
              ? 'none'
              : 'zenContract 6s ease-in-out forwards',
          }}
        />

        {/* Breathing guide text */}
        <div
          className="text-white/40 text-lg tracking-[0.3em] uppercase mb-8 transition-opacity duration-1000"
          style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 300 }}
        >
          {breathingGuide[breathPhase].text}
        </div>

        {/* Meditation word */}
        <div
          className="text-white/20 text-sm tracking-[0.5em] uppercase zen-fade-text"
          style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 200 }}
        >
          {meditations[meditationIndex]}
        </div>

        {/* Breath counter */}
        {breathCount > 1 && (
          <div
            className="mt-16 text-white/10 text-xs tracking-widest"
            style={{ fontFamily: 'monospace' }}
          >
            {breathCount - 1} breath{breathCount > 2 ? 's' : ''}
          </div>
        )}

        {/* Wake up prompt */}
        <div
          className={`fixed bottom-12 left-0 right-0 text-center transition-opacity duration-2000 ${
            showPrompt ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="text-white/15 text-xs tracking-[0.2em] uppercase">
            click anywhere to wake
          </div>
        </div>
      </div>
    </div>
  );
}

// Music Maker Game Component
function MusicMaker({ onClose, playSound }) {
  const [sequence, setSequence] = useState(Array(16).fill(null).map(() => Array(8).fill(false)));
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const audioCtxRef = useRef(null);
  const intervalRef = useRef(null);
  const sequenceRef = useRef(sequence);
  const stepRef = useRef(0);

  // Keep ref in sync with state
  useEffect(() => {
    sequenceRef.current = sequence;
  }, [sequence]);

  const notes = [523.25, 493.88, 440, 392, 349.23, 329.63, 293.66, 261.63]; // C5 to C4
  const noteNames = ['C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4'];

  const playNote = useCallback((freq) => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {
      console.error('Audio error:', e);
    }
  }, []);

  const toggleCell = (step, note) => {
    playSound?.('click');
    playNote(notes[note]);
    setSequence(prev => prev.map((s, i) =>
      i === step ? s.map((n, j) => j === note ? !n : n) : s
    ));
  };

  const togglePlay = () => {
    if (isPlaying) {
      clearInterval(intervalRef.current);
      setIsPlaying(false);
      setCurrentStep(-1);
    } else {
      // Initialize audio context on user interaction
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      setIsPlaying(true);
      stepRef.current = 0;
      intervalRef.current = setInterval(() => {
        const step = stepRef.current;
        setCurrentStep(step);
        sequenceRef.current[step].forEach((active, noteIdx) => {
          if (active) playNote(notes[noteIdx]);
        });
        stepRef.current = (step + 1) % 16;
      }, 150);
    }
  };

  const clearAll = () => {
    setSequence(Array(16).fill(null).map(() => Array(8).fill(false)));
    playSound?.('click');
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="space-y-3 relative" style={{ zIndex: 100 }}>
      <div className="flex justify-between items-center text-[11px]">
        <span className="text-highlight">MUSIC MAKER</span>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); togglePlay(); }}
            className="text-highlight hover:text-foreground cursor-pointer px-2 py-1 bg-highlight/10 rounded"
          >
            {isPlaying ? '■ Stop' : '▶ Play'}
          </button>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); clearAll(); }}
            className="text-highlight/50 hover:text-highlight cursor-pointer px-2 py-1"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClose(); }}
            className="text-highlight/50 hover:text-highlight cursor-pointer px-2 py-1"
          >
            X
          </button>
        </div>
      </div>
      <div className="flex gap-1 overflow-x-auto flex-nowrap">
        <div className="flex flex-col gap-[3px] text-[9px] text-highlight/60 pr-1 shrink-0">
          {noteNames.map(n => <div key={n} className="h-[20px] flex items-center">{n}</div>)}
        </div>
        <div className="flex gap-[3px] flex-nowrap shrink-0">
          {sequence.map((step, stepIdx) => (
            <div key={stepIdx} className="flex flex-col gap-[3px]">
              {step.map((active, noteIdx) => (
                <button
                  type="button"
                  key={noteIdx}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleCell(stepIdx, noteIdx);
                  }}
                  style={{
                    width: '20px',
                    height: '20px',
                    minWidth: '20px',
                    minHeight: '20px',
                    pointerEvents: 'auto',
                    border: active ? '2px solid' : '1px solid',
                    borderColor: active ? 'hsl(var(--twc-highlight))' : 'hsla(var(--twc-highlight), 0.3)',
                    background: active
                      ? 'hsl(var(--twc-highlight))'
                      : currentStep === stepIdx
                        ? 'hsla(var(--twc-highlight), 0.3)'
                        : 'hsla(var(--twc-highlight), 0.1)',
                    boxShadow: active ? '0 0 8px hsla(var(--twc-highlight), 0.6)' : 'none'
                  }}
                  className="rounded-sm transition-all cursor-pointer hover:opacity-80"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="text-[10px] text-foreground/40">Click cells to add notes. Press Play to hear your tune!</div>
    </div>
  );
}

// Menu dropdown - controlled component
function MenuDropdown({ label, items, disabled, isOpen, onToggle, onSound, theme }) {
  const ref = useRef(null);
  const isDark = theme === "space";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
          onSound?.();
        }}
        disabled={disabled}
        className={`px-3 py-1 text-[11px] transition-colors ${
          isOpen
            ? 'bg-highlight/20 text-highlight'
            : 'text-highlight/70 hover:text-highlight hover:bg-highlight/10'
        }`}
      >
        {label}
      </button>
      {isOpen && (
        <div
          className="absolute left-0 min-w-[160px] py-1 border border-highlight/30 shadow-2xl backdrop-blur-md"
          style={{
            background: isDark ? 'rgba(13, 18, 8, 0.98)' : 'rgba(255, 255, 255, 0.95)',
            zIndex: 9999,
            top: '100%',
            marginTop: '2px'
          }}
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
                }}
                className="w-full px-3 py-1.5 text-left text-[11px] transition-colors flex justify-between whitespace-nowrap text-highlight hover:bg-highlight/30"
              >
                <span>{item.label}</span>
                {item.shortcut && <span className="opacity-50 ml-4">{item.shortcut}</span>}
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
  const [openMenu, setOpenMenu] = useState(null);
  const [theme, setTheme] = useState("sky");
  const [showMusicMaker, setShowMusicMaker] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isShutdown, setIsShutdown] = useState(false);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  const bottomRef = useRef(null);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

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

      // Boot sequence
      await new Promise(r => setTimeout(r, 200));
      setIsBooted(true); // Show terminal

      await new Promise(r => setTimeout(r, 300));
      setLines([{ type: "system", text: "BIOS v2.4.1 ... OK" }]);
      await new Promise(r => setTimeout(r, 150));
      setLines(prev => [...prev, { type: "system", text: "Memory check ... 64KB OK" }]);
      await new Promise(r => setTimeout(r, 150));
      setLines(prev => [...prev, { type: "system", text: "Loading LAMASOFT.EXE ..." }]);
      await new Promise(r => setTimeout(r, 400));
      playSound('boot');

      setLines(prev => [...prev, { type: "output", text: "" }]);
      setLines(prev => [...prev, { type: "logo" }]);
      await new Promise(r => setTimeout(r, 200));
      setLines(prev => [...prev, { type: "system", text: "─".repeat(50) }]);
      await new Promise(r => setTimeout(r, 100));
      setLines(prev => [...prev, { type: "system", text: "LAMASOFT PERSONAL TERMINAL v1.0  //  夢  //  ready" }]);
      await new Promise(r => setTimeout(r, 100));
      setLines(prev => [...prev, { type: "system", text: "─".repeat(50) }]);
      await new Promise(r => setTimeout(r, 100));
      setLines(prev => [...prev, { type: "output", text: "" }]);

      await displayNode("start");
    };
    boot();
  }, [displayNode, playSound]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  useEffect(() => {
    const keepFocus = (e) => {
      // Don't steal focus if clicking on buttons or interactive elements
      if (e?.target?.tagName === 'BUTTON' || e?.target?.closest?.('button')) {
        return;
      }
      if (isBooted && !isTyping && !showMusicMaker) {
        inputRef.current?.focus();
      }
    };
    keepFocus();
    window.addEventListener('click', keepFocus);
    return () => window.removeEventListener('click', keepFocus);
  }, [isBooted, isTyping, showMusicMaker]);

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

  const handleShutdown = useCallback(() => {
    playSound('shutdown');
    setOpenMenu(null);
    setIsBooted(false);
    setTimeout(() => {
      setIsShutdown(true);
    }, 800);
  }, [playSound]);

  const handleWakeUp = useCallback(() => {
    setIsShutdown(false);
    playSound('boot');
    setTimeout(async () => {
      setLines([{ type: "logo" }]);
      await new Promise(r => setTimeout(r, 200));
      setLines(prev => [...prev, { type: "system", text: "═".repeat(56) }]);
      await new Promise(r => setTimeout(r, 100));
      setLines(prev => [...prev, { type: "system", text: "Waking from sleep..." }]);
      await new Promise(r => setTimeout(r, 300));
      setLines(prev => [...prev, { type: "system", text: "═".repeat(56) }]);
      await new Promise(r => setTimeout(r, 100));
      setLines(prev => [...prev, { type: "output", text: "" }]);
      setIsBooted(true);
      await displayNode("start");
    }, 100);
  }, [displayNode, playSound]);

  const menus = [
    {
      id: "file",
      label: "File",
      items: [
        { label: "About", action: () => handleChoice("whoami") },
        { label: "Contact", action: () => handleChoice("contact") },
        { divider: true },
        { label: "Music Maker", action: () => setShowMusicMaker(true) },
        { divider: true },
        { label: "Restart", action: handleRestart, shortcut: "⌘R" },
        { label: "Shut Down", action: handleShutdown, shortcut: "⌘Q" },
      ],
    },
    {
      id: "go",
      label: "Go",
      items: [
        { label: "Start", action: () => handleChoice("start") },
        { label: "Career", action: () => handleChoice("journey") },
        { label: "Now", action: () => handleChoice("now") },
        { label: "Work", action: () => handleChoice("work") },
        { label: "Life", action: () => handleChoice("hobbies") },
      ],
    },
  ];

  const choices = showChoices ? STORY[currentNode]?.choices : [];

  // Show zen meditation screen when shutdown
  if (isShutdown) {
    return <ZenScreen onWakeUp={handleWakeUp} soundEnabled={soundEnabled} />;
  }

  return (
    <div className={`${theme} h-screen w-screen text-foreground font-mono text-xs flex items-center justify-center p-2 sm:p-4 relative`}>
      {theme === "sky" ? (
        <SkyField onToggle={() => { setTheme("space"); playSound('click'); }} />
      ) : (
        <StarField onToggle={() => { setTheme("sky"); playSound('click'); }} />
      )}

      {/* Terminal window with glow */}
      <div
        className={`relative border border-highlight/40 rounded-sm shadow-2xl transition-all duration-700 ease-out ${
          isBooted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
        style={{
          width: '100%',
          maxWidth: '580px',
          background: theme === "sky" ? 'rgba(255, 255, 255, 0.85)' : 'rgba(13, 18, 8, 0.92)',
          boxShadow: theme === "sky"
            ? '0 0 60px rgba(135, 206, 235, 0.3), 0 0 100px rgba(135, 206, 235, 0.1), inset 0 0 60px rgba(255, 255, 255, 0.3)'
            : '0 0 60px rgba(0, 255, 65, 0.15), 0 0 100px rgba(0, 255, 65, 0.05), inset 0 0 60px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Title bar */}
        <div className="flex items-center px-2 sm:px-3 py-2 border-b border-highlight/30 bg-highlight/5">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <span className="text-highlight text-lg shrink-0">◆</span>
            <span className="text-highlight text-[10px] sm:text-[12px] font-bold tracking-wider truncate">LAMASOFT.EXE</span>
            <div ref={menuRef} className="flex gap-0.5 sm:gap-1 ml-1 sm:ml-2">
              {menus.map(menu => (
                <MenuDropdown
                  key={menu.id}
                  label={menu.label}
                  items={menu.items}
                  disabled={isTyping || !isBooted}
                  isOpen={openMenu === menu.id}
                  onToggle={() => setOpenMenu(openMenu === menu.id ? null : menu.id)}
                  onSound={() => playSound('click')}
                  theme={theme}
                />
              ))}
            </div>
          </div>
          <button
            onClick={() => { setSoundEnabled(!soundEnabled); playSound('click'); }}
            className={`px-3 py-1.5 text-[12px] sm:text-[13px] transition-colors flex items-center gap-2 rounded ${
              soundEnabled
                ? 'text-highlight bg-highlight/15'
                : 'text-highlight/60 hover:text-highlight hover:bg-highlight/10'
            }`}
            title={soundEnabled ? "Sound On" : "Sound Off"}
          >
            <span className="text-[14px]">{soundEnabled ? '♪' : '♪'}</span>
            <span>{soundEnabled ? 'Sound' : 'Muted'}</span>
          </button>
        </div>

        {/* Terminal content */}
        <div
          ref={terminalRef}
          className="overflow-y-auto p-3 sm:p-4 text-[12px] sm:text-[13px]"
          style={{ height: 'min(400px, 60vh)' }}
        >
          {lines.map((line, i) => (
            <div key={i} className="leading-relaxed">
              {line.type === "logo" ? (
                <div className="mb-4">
                  <div
                    className="text-highlight font-serif tracking-tight"
                    style={{
                      fontSize: 'clamp(36px, 12vw, 64px)',
                      lineHeight: 1,
                      letterSpacing: '-0.02em'
                    }}
                  >
                    LAMASOFT
                  </div>
                  <div className="text-highlight/50 text-[11px] sm:text-[12px] tracking-widest mt-2 font-mono">
                    PERSONAL TERMINAL
                  </div>
                </div>
              ) : line.type === "command" ? (
                <div className="flex text-foreground/60">
                  <span className="text-highlight">❯</span>
                  <span className="ml-2">{line.text}</span>
                </div>
              ) : line.type === "system" ? (
                <div className="text-highlight/50 text-[11px]">{line.text}</div>
              ) : line.type === "link" ? (
                <div className="flex flex-col sm:flex-row">
                  <span className="text-foreground/40 w-16 sm:w-20 text-[10px] sm:text-[12px]">{line.label}</span>
                  <a
                    href={line.url}
                    target={line.url.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noreferrer"
                    className="text-highlight hover:underline text-[11px] sm:text-[13px] break-all"
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

          {showChoices && choices.length > 0 && !showMusicMaker && (
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

          {showMusicMaker && (
            <div
              className="mt-4 p-3 border border-highlight/30 rounded bg-background/50"
              onClick={(e) => e.stopPropagation()}
              style={{ position: 'relative', zIndex: 50 }}
            >
              <MusicMaker onClose={() => setShowMusicMaker(false)} playSound={playSound} />
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between px-2 sm:px-4 py-1.5 border-t border-highlight/20 text-[9px] sm:text-[10px] text-highlight/40 bg-highlight/5">
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-highlight/60 animate-pulse"></span>
            <span>{currentTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <span>{currentNode.toUpperCase()}</span>
          <div className="flex items-center gap-1 sm:gap-2">
            <span>London, UK</span>
            <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-highlight/40"></span>
          </div>
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex items-center px-2 sm:px-4 py-2 sm:py-3 border-t border-highlight/30 bg-black/20">
          <span className="text-highlight text-base sm:text-lg">❯</span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={() => playSound('type')}
            disabled={isTyping || !isBooted}
            className="flex-1 ml-2 sm:ml-3 bg-transparent text-foreground caret-highlight text-[12px] sm:text-[13px]"
            style={{ outline: 'none' }}
            placeholder={showChoices ? "1, 2, 3 or type..." : ""}
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
    <>
      <Terminal />
      <Analytics />
    </>
  );
}

export default App;
