import React, { useState, useEffect, useRef, useCallback } from "react";
import "./styles.css";
import "./fonts/fonts.css";
import { Analytics } from "@vercel/analytics/react";

// Story nodes - more personal, less cringe
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

const LOGO = `
█    ▄▀▄ █▄ ▄█ ▄▀▄ ▄▀▀ ▄▀▄ █▀ ▀█▀
█▄▄ █▀█ █ ▀ █ █▀█ ▄██ ▀▄▀ █▀  █`.trim();

const BOOT_SEQUENCE = [
  { text: "LAMASOFT v1.0", delay: 150 },
  { text: "LOADING...", delay: 300 },
];

// Menu dropdown with proper z-index
function MenuDropdown({ label, items, disabled, onClose }) {
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
        }}
        disabled={disabled}
        className={`h-full px-3 text-[11px] transition-colors ${
          isOpen
            ? 'bg-highlight text-background'
            : 'text-foreground/80 hover:bg-highlight/20'
        }`}
      >
        {label}
      </button>
      {isOpen && (
        <div
          className="absolute top-full left-0 min-w-[180px] py-1 border border-highlight/50 shadow-xl"
          style={{ background: '#0D1208', zIndex: 9999 }}
          onClick={(e) => e.stopPropagation()}
        >
          {items.map((item, i) => (
            item.divider ? (
              <div key={i} className="my-1 border-t border-highlight/30" />
            ) : (
              <button
                key={i}
                onClick={() => {
                  item.action?.();
                  setIsOpen(false);
                }}
                className="w-full px-3 py-1.5 text-left text-[11px] text-foreground/80 hover:bg-highlight hover:text-background transition-colors flex justify-between"
              >
                <span>{item.label}</span>
                {item.shortcut && <span className="text-foreground/40">{item.shortcut}</span>}
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
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  const bottomRef = useRef(null);

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

    if (node.afterText) {
      for (const line of node.afterText) {
        await new Promise(r => setTimeout(r, 25));
        setLines(prev => [...prev, { type: "output", text: line }]);
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
      for (const step of BOOT_SEQUENCE) {
        await new Promise(r => setTimeout(r, step.delay));
        if (step.text) setLines(prev => [...prev, { type: "system", text: step.text }]);
      }
      await new Promise(r => setTimeout(r, 400));
      setLines([{ type: "logo", text: LOGO }, { type: "output", text: "" }]);
      setIsBooted(true);
      await displayNode("start");
    };
    boot();
  }, [displayNode]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const handleChoice = useCallback(async (goto) => {
    setShowChoices(false);
    setLines(prev => [...prev, { type: "output", text: "" }]);
    await displayNode(goto);
  }, [displayNode]);

  const handleCommand = useCallback(async (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setLines(prev => [...prev, { type: "command", text: cmd }]);

    if (trimmed === "clear") {
      setLines([{ type: "logo", text: LOGO }, { type: "output", text: "" }]);
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
  }, [displayNode, currentNode, handleChoice]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isTyping || !isBooted) return;
    handleCommand(input);
    setInput("");
  };

  const focusInput = () => inputRef.current?.focus();

  const handleRestart = useCallback(() => {
    setIsBooted(false);
    setLines([]);
    setTimeout(async () => {
      for (const step of BOOT_SEQUENCE) {
        await new Promise(r => setTimeout(r, step.delay));
        if (step.text) setLines(prev => [...prev, { type: "system", text: step.text }]);
      }
      await new Promise(r => setTimeout(r, 400));
      setLines([{ type: "logo", text: LOGO }, { type: "output", text: "" }]);
      setIsBooted(true);
      await displayNode("start");
    }, 100);
  }, [displayNode]);

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
  ];

  const choices = showChoices ? STORY[currentNode]?.choices : [];

  return (
    <div
      className="h-screen w-screen bg-background text-foreground font-mono text-xs flex items-center justify-center p-4"
      onClick={focusInput}
    >
      {/* Simple window */}
      <div className="border border-highlight/50 w-[520px]" style={{ background: '#0D1208' }}>
        {/* Title bar */}
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-highlight/30">
          <div className="flex items-center gap-2">
            <span className="text-highlight">◆</span>
            <span className="text-highlight text-[11px] font-bold tracking-wide">LAMASOFT.EXE</span>
          </div>
          <div className="flex gap-1">
            {menus.map(menu => (
              <MenuDropdown
                key={menu.label}
                label={menu.label}
                items={menu.items}
                disabled={isTyping || !isBooted}
              />
            ))}
          </div>
        </div>

        {/* Terminal content */}
        <div
          ref={terminalRef}
          className="overflow-y-auto p-4 text-[12px]"
          style={{ height: '380px' }}
        >
          {lines.map((line, i) => (
            <div key={i} className="leading-relaxed">
              {line.type === "logo" ? (
                <pre className="text-highlight text-[11px] leading-tight mb-4">{line.text}</pre>
              ) : line.type === "command" ? (
                <div className="flex text-foreground/60">
                  <span className="text-highlight">›</span>
                  <span className="ml-2">{line.text}</span>
                </div>
              ) : line.type === "system" ? (
                <div className="text-foreground/50 text-[11px]">{line.text}</div>
              ) : line.type === "link" ? (
                <div>
                  <span className="text-foreground/40">{line.label.padEnd(10)}</span>
                  <a
                    href={line.url}
                    target={line.url.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noreferrer"
                    className="text-highlight hover:underline"
                    onClick={e => e.stopPropagation()}
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

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex items-center px-4 py-2 border-t border-highlight/30">
          <span className="text-highlight">›</span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={isTyping || !isBooted}
            className="flex-1 ml-2 bg-transparent text-foreground caret-highlight text-[12px]"
            style={{ outline: 'none' }}
            placeholder={showChoices ? "1, 2, 3 or type a command..." : ""}
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
        </form>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="matrix">
      <Terminal />
      <Analytics />
    </div>
  );
}

export default App;
