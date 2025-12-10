import React, { useState, useEffect, useRef, useCallback } from "react";
import "./styles.css";
import "./fonts/fonts.css";
import { Analytics } from "@vercel/analytics/react";

// Story nodes for the adventure
const STORY = {
  start: {
    text: [
      "You find yourself at a terminal.",
      "The cursor blinks expectantly.",
      "",
      "A name glows on screen: ALEX LAMA-NOUJAIM",
      "Product Designer at Anthropic.",
      "",
      "What would you like to know?",
    ],
    choices: [
      { label: "Who is this person?", goto: "whoami" },
      { label: "How did they end up here?", goto: "origin" },
      { label: "What do they actually do?", goto: "work" },
    ],
  },
  whoami: {
    text: [
      "Alex designs products at Anthropic.",
      "",
      "This means spending days teaching AI",
      "how to design things. Including,",
      "apparently, this portfolio.",
      "",
      "The irony is not lost on anyone.",
    ],
    choices: [
      { label: "Tell me about the journey here", goto: "origin" },
      { label: "What's life like outside work?", goto: "hobbies" },
      { label: "I want to get in touch", goto: "contact" },
    ],
  },
  origin: {
    text: [
      "It started with engineering.",
      "",
      "Imperial College, 2012. Fuel cell cars.",
      "Shell Eco-Marathon. Top 10% of the year.",
      "",
      "But somewhere between the pistons",
      "and the combustion chambers, there",
      "was a realization: pixels were more",
      "interesting than pressure valves.",
    ],
    choices: [
      { label: "What happened next?", goto: "journey" },
      { label: "Skip to the present day", goto: "now" },
      { label: "Start over", goto: "start" },
    ],
  },
  journey: {
    text: [
      "2016 — Co-founded Circadia.",
      "         Sleep tracking. £400K crowdfunded.",
      "         Learned that hardware is hard.",
      "",
      "2017 — Simudyne. Simulation consoles.",
      "         Research to sales. Startup chaos.",
      "",
      "2019 — Sabbatical. Cycled to Lebanon.",
      "         Built an audio plugin in C++.",
      "         Normal gap year stuff.",
      "",
      "2020 — Tray.io. Automation canvas.",
      "",
      "2022 — Airtable. Staff designer.",
      "         Navigation, filters, timeline, AI.",
    ],
    choices: [
      { label: "And then... Anthropic?", goto: "now" },
      { label: "Wait, cycled to Lebanon?", goto: "sabbatical" },
      { label: "Let's talk about something else", goto: "start" },
    ],
  },
  sabbatical: {
    text: [
      "Yes. Cycled. To Lebanon.",
      "",
      "Started in London. Ended in Beirut.",
      "Somewhere in the middle, learned that",
      "the human body is surprisingly capable",
      "when you remove the option to quit.",
      "",
      "Also built an audio plugin for deaf",
      "people. In C++. Because apparently",
      "cycling across continents wasn't",
      "enough of a challenge.",
    ],
    choices: [
      { label: "Continue the journey", goto: "journey" },
      { label: "Tell me more about hobbies", goto: "hobbies" },
      { label: "Let's get to the present", goto: "now" },
    ],
  },
  now: {
    text: [
      "2024 — Anthropic.",
      "",
      "Training the replacement.",
      "(Affectionately.)",
      "",
      "Designing products that help humans",
      "work with AI. Teaching AI to design.",
      "Wondering if this is designing",
      "oneself out of a job, or into",
      "a weirder one.",
    ],
    choices: [
      { label: "What does that actually mean?", goto: "work" },
      { label: "What's life outside of work?", goto: "hobbies" },
      { label: "I've seen enough. Let's talk.", goto: "contact" },
    ],
  },
  work: {
    text: [
      "The actual job:",
      "",
      "→ Teach AI about design",
      "  'Make it pop' doesn't translate",
      "  well to training data.",
      "",
      "→ Design systems for AI outputs",
      "  Making sure Claude doesn't format",
      "  responses like a caffeinated raccoon.",
      "",
      "→ Argue about pixels with a model",
      "  Claude is more receptive than most",
      "  junior designers, honestly.",
    ],
    choices: [
      { label: "How did you get here?", goto: "origin" },
      { label: "What about life outside work?", goto: "hobbies" },
      { label: "I want to connect", goto: "contact" },
    ],
  },
  hobbies: {
    text: [
      "When not at a screen:",
      "",
      "♪ Piano — 20 years. Competed regionally.",
      "  The muscle memory persists even",
      "  when the practice doesn't.",
      "",
      "📷 Photography — Architectural magazines,",
      "  music labels. An excuse to look at",
      "  things longer than normal.",
      "",
      "🌍 Languages — English, French, Spanish,",
      "  Italian, Arabic. Languages are just",
      "  design systems for thoughts.",
      "",
      "🪵 Woodworking — Hand tools only.",
      "🚴 Long-distance cycling.",
      "🌱 Permaculture garden.",
    ],
    choices: [
      { label: "Back to the work stuff", goto: "work" },
      { label: "Tell me about the journey", goto: "origin" },
      { label: "Let's connect", goto: "contact" },
    ],
  },
  contact: {
    text: [
      "You've reached the end.",
      "(Or is it the beginning?)",
      "",
      "Get in touch:",
    ],
    links: [
      { label: "email", url: "mailto:lamanoujaim@gmail.com", display: "lamanoujaim@gmail.com" },
      { label: "linkedin", url: "https://linkedin.com/in/lamanoujaim", display: "linkedin.com/in/lamanoujaim" },
      { label: "twitter", url: "https://twitter.com/alexlamas", display: "twitter.com/alexlamas" },
    ],
    afterText: [
      "",
      "I'll respond personally. Probably.",
    ],
    choices: [
      { label: "Start over", goto: "start" },
    ],
  },
};

// Command shortcuts that map to story nodes
const SHORTCUTS = {
  whoami: "whoami",
  who: "whoami",
  about: "whoami",
  history: "journey",
  career: "journey",
  timeline: "journey",
  skills: "work",
  work: "work",
  job: "work",
  hobbies: "hobbies",
  life: "hobbies",
  fun: "hobbies",
  contact: "contact",
  email: "contact",
  connect: "contact",
  start: "start",
  restart: "start",
  help: "help",
};

const ASCII_ART = `
   ▄▀█ █   █▀▀ ▀▄▀
   █▀█ █▄▄ ██▄ █ █
`.trim();

const BOOT_SEQUENCE = [
  { text: "AlexOS v1.0", delay: 100 },
  { text: "Checking memory... 640K OK", delay: 80 },
  { text: "Loading personality drivers...", delay: 120 },
  { text: "Mounting career history...", delay: 100 },
  { text: "Starting adventure.exe...", delay: 150 },
  { text: "", delay: 50 },
];

// Dropdown Menu Component
function MenuDropdown({ label, items, onSelect, disabled }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className="h-[22px] px-3 text-[11px] text-foreground/80 hover:bg-highlight/20 hover:text-highlight transition-colors disabled:opacity-50"
      >
        {label}
      </button>
      {isOpen && (
        <div
          className="absolute top-full left-0 mt-px min-w-[160px] py-1 rounded shadow-lg z-50 border border-highlight/30"
          style={{
            background: 'rgba(20, 30, 20, 0.95)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {items.map((item, i) => (
            item.divider ? (
              <div key={i} className="my-1 border-t border-highlight/20" />
            ) : (
              <button
                key={i}
                onClick={() => {
                  if (item.action) item.action();
                  if (item.cmd) onSelect(item.cmd);
                  setIsOpen(false);
                }}
                className="w-full px-3 py-1 text-left text-[11px] text-foreground/70 hover:bg-highlight/20 hover:text-highlight transition-colors flex justify-between items-center"
              >
                <span>{item.label}</span>
                {item.shortcut && (
                  <span className="text-foreground/30 ml-4">{item.shortcut}</span>
                )}
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
  const [isPoweredOn, setIsPoweredOn] = useState(true);
  const [currentNode, setCurrentNode] = useState("start");
  const [showChoices, setShowChoices] = useState(false);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  const bottomRef = useRef(null);

  // Display a story node
  const displayNode = useCallback(async (nodeId) => {
    const node = STORY[nodeId];
    if (!node) return;

    setIsTyping(true);
    setShowChoices(false);
    setCurrentNode(nodeId);

    // Type out the text
    for (const line of node.text) {
      await new Promise(r => setTimeout(r, 30));
      setLines(prev => [...prev, { type: "output", text: line }]);
    }

    // Show links if present
    if (node.links) {
      await new Promise(r => setTimeout(r, 30));
      for (const link of node.links) {
        await new Promise(r => setTimeout(r, 30));
        setLines(prev => [...prev, { type: "link", ...link }]);
      }
    }

    // Show after text if present
    if (node.afterText) {
      for (const line of node.afterText) {
        await new Promise(r => setTimeout(r, 30));
        setLines(prev => [...prev, { type: "output", text: line }]);
      }
    }

    // Add spacing before choices
    await new Promise(r => setTimeout(r, 50));
    setLines(prev => [...prev, { type: "output", text: "" }]);

    setIsTyping(false);
    setShowChoices(true);
  }, []);

  // Boot sequence
  useEffect(() => {
    if (!isPoweredOn) return;

    const runBootSequence = async () => {
      setLines([]);
      setShowChoices(false);
      for (const step of BOOT_SEQUENCE) {
        await new Promise(r => setTimeout(r, step.delay));
        if (step.text) {
          setLines(prev => [...prev, { type: "system", text: step.text }]);
        }
      }
      await new Promise(r => setTimeout(r, 300));
      setLines([{ type: "ascii", text: ASCII_ART }, { type: "output", text: "" }]);
      setIsBooted(true);
      await displayNode("start");
    };

    runBootSequence();
  }, [isPoweredOn, displayNode]);

  const scrollToBottom = useCallback(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  const handleChoice = useCallback(async (goto) => {
    setShowChoices(false);
    setLines(prev => [...prev, { type: "output", text: "" }]);
    await displayNode(goto);
  }, [displayNode]);

  const handleCommand = useCallback(
    async (cmd) => {
      const trimmed = cmd.trim().toLowerCase();
      if (trimmed === "") return;

      setLines(prev => [...prev, { type: "command", text: cmd }]);

      if (trimmed === "clear") {
        setTimeout(async () => {
          setLines([{ type: "ascii", text: ASCII_ART }, { type: "output", text: "" }]);
          await displayNode(currentNode);
        }, 100);
        return;
      }

      // Check if it's a shortcut
      const targetNode = SHORTCUTS[trimmed];
      if (targetNode === "help") {
        setLines(prev => [...prev,
          { type: "output", text: "" },
          { type: "system", text: "Shortcuts: whoami, history, skills, hobbies, contact, start" },
          { type: "output", text: "" },
        ]);
        return;
      }

      if (targetNode && STORY[targetNode]) {
        setLines(prev => [...prev, { type: "output", text: "" }]);
        await displayNode(targetNode);
      } else {
        // Try to match a choice by number
        const choiceNum = parseInt(trimmed);
        const node = STORY[currentNode];
        if (node?.choices && choiceNum >= 1 && choiceNum <= node.choices.length) {
          await handleChoice(node.choices[choiceNum - 1].goto);
        } else {
          setLines(prev => [...prev,
            { type: "system", text: `Unknown command. Try a number (1-3) or: whoami, history, skills, hobbies, contact` },
            { type: "output", text: "" },
          ]);
        }
      }
    },
    [displayNode, currentNode, handleChoice]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isTyping || !isBooted) return;
    handleCommand(input);
    setInput("");
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleRestart = () => {
    setIsBooted(false);
    setIsPoweredOn(false);
    setTimeout(() => setIsPoweredOn(true), 500);
  };

  // Menu structure - shortcuts to story nodes
  const menus = [
    {
      label: "File",
      items: [
        { label: "About Alex", action: () => handleChoice("whoami") },
        { divider: true },
        { label: "Contact...", action: () => handleChoice("contact"), shortcut: "⌘C" },
        { divider: true },
        { label: "Restart", action: handleRestart, shortcut: "⌘R" },
      ],
    },
    {
      label: "Navigate",
      items: [
        { label: "The Beginning", action: () => handleChoice("start") },
        { label: "The Journey", action: () => handleChoice("journey"), shortcut: "⌘J" },
        { label: "The Present", action: () => handleChoice("now") },
        { divider: true },
        { label: "Work", action: () => handleChoice("work"), shortcut: "⌘W" },
        { label: "Life", action: () => handleChoice("hobbies"), shortcut: "⌘L" },
      ],
    },
    {
      label: "Help",
      items: [
        { label: "Shortcuts", action: () => handleCommand("help"), shortcut: "⌘?" },
      ],
    },
  ];

  const currentChoices = showChoices ? STORY[currentNode]?.choices : [];

  return (
    <div
      className="h-screen w-screen bg-background text-foreground font-mono text-sm flex items-center justify-center"
      onClick={focusInput}
    >
      {/* Computer case - creamy white retro Mac style */}
      <div
        className="relative flex-shrink-0"
        style={{ width: '520px', height: '480px' }}
      >
        {/* Main case body */}
        <div
          className="absolute inset-0 rounded-[20px]"
          style={{
            background: 'linear-gradient(160deg, #f5f5f0 0%, #e8e8e0 30%, #d8d8d0 100%)',
            boxShadow: `
              inset 0 2px 0 rgba(255,255,255,0.8),
              inset 0 -3px 0 rgba(0,0,0,0.1),
              0 25px 50px rgba(0,0,0,0.3),
              0 10px 20px rgba(0,0,0,0.2)
            `,
          }}
        />

        {/* Top ventilation slots */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-2">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-6 h-1 rounded-full bg-black/10" />
          ))}
        </div>

        {/* Screen recessed area */}
        <div
          className="absolute rounded-[4px]"
          style={{
            top: '28px',
            left: '28px',
            right: '28px',
            bottom: '100px',
            background: '#1a1a1a',
            boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.9), inset 0 0 0 3px #2a2a2a',
          }}
        >
          {/* CRT screen with scanlines */}
          <div
            className="absolute overflow-hidden flex flex-col rounded-[2px]"
            style={{
              top: '10px',
              left: '10px',
              right: '10px',
              bottom: '10px',
              background: '#0D1208',
              opacity: isPoweredOn ? 1 : 0,
            }}
          >
            {/* Scanline overlay */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)',
                opacity: 0.5,
              }}
            />

            {/* Screen glare */}
            <div
              className="absolute inset-0 pointer-events-none z-20"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%)',
              }}
            />

            {/* Menu bar */}
            <div
              className="flex-none flex items-center relative z-30"
              style={{
                height: '22px',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                borderBottom: '1px solid rgba(0,255,65,0.3)',
              }}
            >
              <div className="px-2 text-highlight font-bold">◆</div>
              {menus.map((menu) => (
                <MenuDropdown
                  key={menu.label}
                  label={menu.label}
                  items={menu.items}
                  onSelect={handleCommand}
                  disabled={isTyping || !isBooted}
                />
              ))}
              <div className="ml-auto pr-2 text-[10px] text-foreground/30">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

            {/* Content */}
            <div
              ref={terminalRef}
              className="flex-1 overflow-y-auto p-3 cursor-text relative z-30"
              style={{ minHeight: 0 }}
            >
              {lines.map((line, i) => (
                <div key={i} className="leading-relaxed">
                  {line.type === "ascii" ? (
                    <pre className="text-highlight leading-tight">{line.text}</pre>
                  ) : line.type === "command" ? (
                    <div className="flex">
                      <span className="text-highlight">›</span>
                      <span className="ml-2">{line.text}</span>
                    </div>
                  ) : line.type === "system" ? (
                    <div className="text-foreground/40">{line.text}</div>
                  ) : line.type === "link" ? (
                    <div className="whitespace-pre">
                      <span className="text-foreground/50">  {line.label.padEnd(10)}</span>
                      <a
                        href={line.url}
                        target={line.url.startsWith("mailto:") ? undefined : "_blank"}
                        rel="noreferrer"
                        className="text-highlight hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {line.display}
                      </a>
                    </div>
                  ) : (
                    <div className="text-foreground/70 whitespace-pre">{line.text}</div>
                  )}
                </div>
              ))}

              {/* Adventure choices */}
              {showChoices && currentChoices && currentChoices.length > 0 && (
                <div className="mt-2 space-y-1">
                  {currentChoices.map((choice, i) => (
                    <button
                      key={i}
                      onClick={() => handleChoice(choice.goto)}
                      className="block w-full text-left px-2 py-1 text-foreground/60 hover:text-highlight hover:bg-highlight/10 transition-colors rounded text-[12px]"
                    >
                      <span className="text-highlight mr-2">[{i + 1}]</span>
                      {choice.label}
                    </button>
                  ))}
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex-none px-3 py-2 flex items-center border-t border-highlight/20 relative z-30">
              <span className="text-highlight text-xs">›</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isTyping || !isBooted}
                style={{ outline: 'none', boxShadow: 'none' }}
                className="flex-1 ml-2 bg-transparent border-none text-foreground caret-highlight text-[12px]"
                placeholder={showChoices ? "Type 1-3 or a shortcut..." : ""}
                autoFocus
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
            </form>
          </div>
        </div>

        {/* Chin area */}
        <div
          className="absolute bottom-0 left-0 right-0 rounded-b-[20px]"
          style={{ height: '92px' }}
        >
          {/* Brand emboss */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2">
            <div
              className="text-[10px] tracking-[0.3em] font-bold"
              style={{ color: 'rgba(0,0,0,0.15)' }}
            >
              ALEX
            </div>
          </div>

          {/* Speaker grilles */}
          <div className="absolute bottom-6 left-10 right-10 flex justify-between items-center">
            {/* Left speaker */}
            <div className="flex flex-col gap-[3px]">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex gap-[3px]">
                  {[...Array(8)].map((_, j) => (
                    <div
                      key={j}
                      className="w-[3px] h-[3px] rounded-full"
                      style={{ background: 'rgba(0,0,0,0.2)' }}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Center - Floppy slot */}
            <div
              className="w-24 h-3 rounded-sm"
              style={{
                background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 100%)',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)',
              }}
            />

            {/* Right speaker */}
            <div className="flex flex-col gap-[3px]">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex gap-[3px]">
                  {[...Array(8)].map((_, j) => (
                    <div
                      key={j}
                      className="w-[3px] h-[3px] rounded-full"
                      style={{ background: 'rgba(0,0,0,0.2)' }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Power LED - bottom right */}
          <div
            className="absolute bottom-4 right-8 w-2 h-2 rounded-full"
            style={{
              background: isPoweredOn ? '#00FF41' : '#333',
              boxShadow: isPoweredOn ? '0 0 8px rgba(0,255,65,0.8), 0 0 16px rgba(0,255,65,0.4)' : 'none',
              transition: 'all 0.3s',
            }}
          />
        </div>

        {/* Side grooves for grip */}
        <div className="absolute left-1 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-8 rounded-full"
              style={{ background: 'rgba(0,0,0,0.1)' }}
            />
          ))}
        </div>
        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-8 rounded-full"
              style={{ background: 'rgba(0,0,0,0.1)' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  const params = new URLSearchParams(window.location.search);
  const theme = params.get("theme") || "matrix";
  const validThemes = ["neutral", "electric", "sunset", "matrix"];
  const activeTheme = validThemes.includes(theme) ? theme : "matrix";

  return (
    <div className={`${activeTheme}`}>
      <div className="hidden neutral electric sunset matrix" />
      <Terminal />
      <Analytics />
    </div>
  );
}

export default App;
