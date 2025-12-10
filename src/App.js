import React, { useState, useEffect, useRef, useCallback } from "react";
import "./styles.css";
import "./fonts/fonts.css";
import { Analytics } from "@vercel/analytics/react";

const COMMANDS = {
  help: {
    output: [
      "Available commands:",
      "",
      "  whoami     Who is this person?",
      "  history    Career timeline",
      "  skills     What I actually do",
      "  hobbies    Life outside work",
      "  contact    Get in touch",
      "  clear      Clear terminal",
      "",
      "Click a command or type it below.",
    ],
  },
  whoami: {
    output: [
      "Alex Lama-Noujaim",
      "Product Designer at Anthropic",
      "",
      "I design products that help humans work with AI.",
      "Which means I spend my days teaching AI how to design things.",
      "Including, apparently, this portfolio.",
      "",
      "Type 'history' to see how I got here.",
    ],
  },
  history: {
    output: [
      "Career history:",
      "",
      "  2024—now   Anthropic        Training my replacement (affectionately)",
      "  2022—2024  Airtable         Staff designer. Navigation, filters, AI.",
      "  2020—2021  Tray.io          Automation canvas redesign",
      "  2019—2020  Sabbatical       Cycled to Lebanon. Built audio plugin in C++.",
      "  2017—2019  Simudyne         Simulation console MVP",
      "  2016       Circadia         Co-founded. £400K crowdfunded. Hardware is hard.",
      "  2012—2016  Imperial College MEng Mechanical. Fuel cell car. Top 10%.",
      "",
      "Discovered I liked pixels more than pistons.",
    ],
  },
  skills: {
    output: [
      "What I actually do:",
      "",
      "  → Teach AI about design",
      "    'Make it pop' doesn't translate to training data.",
      "",
      "  → Design systems for AI outputs",
      "    Making sure Claude doesn't format like a raccoon.",
      "",
      "  → Argue about pixels with a model",
      "    Claude is more receptive than junior designers.",
      "",
      "  → Existential reflection",
      "    Designing myself out of a job, or into a weirder one.",
    ],
  },
  hobbies: {
    output: [
      "Off the clock:",
      "",
      "  Piano       20 years. Regional competitions. Muscle memory persists.",
      "  Photography Architectural magazines, music labels.",
      "  Languages   English, French, Spanish, Italian, Arabic.",
      "  Hands       Woodworking (hand tools only), bread baking.",
      "  Outdoors    Long-distance cycling, permaculture garden.",
      "",
      "Type 'contact' to reach me.",
    ],
  },
  contact: {
    output: [
      "Get in touch:",
      "",
    ],
    links: [
      { label: "email", url: "mailto:lamanoujaim@gmail.com", display: "lamanoujaim@gmail.com" },
      { label: "linkedin", url: "https://linkedin.com/in/lamanoujaim", display: "linkedin.com/in/lamanoujaim" },
      { label: "twitter", url: "https://twitter.com/alexlamas", display: "twitter.com/alexlamas" },
    ],
    afterLinks: [
      "",
      "I'll respond personally. Probably.",
    ],
  },
};

const ASCII_ART = `
   ▄▀█ █   █▀▀ ▀▄▀
   █▀█ █▄▄ ██▄ █ █
`.trim();

const INITIAL_LINES = [
  { type: "ascii", text: ASCII_ART },
  { type: "output", text: "" },
  { type: "output", text: "Product Designer at Anthropic" },
  { type: "output", text: "" },
  { type: "system", text: "Type a command or click one below." },
  { type: "output", text: "" },
];

function Terminal() {
  const [lines, setLines] = useState(INITIAL_LINES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  const bottomRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  const typeOutput = useCallback(async (command) => {
    setIsTyping(true);
    const { output, links, afterLinks } = command;

    // Type regular output lines
    for (let i = 0; i < output.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 30));
      setLines((prev) => [...prev, { type: "output", text: output[i] }]);
    }

    // Type links if present
    if (links) {
      for (let i = 0; i < links.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 30));
        setLines((prev) => [...prev, { type: "link", ...links[i] }]);
      }
    }

    // Type after-links content if present
    if (afterLinks) {
      for (let i = 0; i < afterLinks.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 30));
        setLines((prev) => [...prev, { type: "output", text: afterLinks[i] }]);
      }
    }

    setIsTyping(false);
  }, []);

  const handleCommand = useCallback(
    async (cmd) => {
      const trimmed = cmd.trim().toLowerCase();

      // Add the command line
      setLines((prev) => [...prev, { type: "command", text: cmd }]);

      if (trimmed === "clear") {
        setTimeout(() => {
          setLines([
            { type: "output", text: "Terminal cleared. Type 'help' for commands." },
            { type: "output", text: "" },
          ]);
        }, 100);
        return;
      }

      if (trimmed === "") {
        return;
      }

      const command = COMMANDS[trimmed];
      if (command) {
        await typeOutput(command);
      } else {
        await typeOutput({
          output: [
            `Command not found: ${trimmed}`,
            "Type 'help' to see available commands.",
          ],
        });
      }
    },
    [typeOutput]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isTyping) return;
    handleCommand(input);
    setInput("");
  };

  const handleSuggestionClick = (cmd) => {
    if (isTyping) return;
    handleCommand(cmd);
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const suggestions = ["whoami", "history", "skills", "contact"];

  const menuItems = [
    { label: "About", cmd: "whoami" },
    { label: "History", cmd: "history" },
    { label: "Skills", cmd: "skills" },
    { label: "Hobbies", cmd: "hobbies" },
    { label: "Contact", cmd: "contact" },
    { label: "Clear", cmd: "clear" },
  ];

  return (
    <div
      className="h-screen w-screen bg-background text-foreground font-mono text-sm flex items-center justify-center"
      onClick={focusInput}
    >
      {/* Computer case */}
      <div
        className="relative flex-shrink-0"
        style={{
          width: '500px',
          height: '460px',
        }}
      >
        {/* Outer case */}
        <div
          className="absolute inset-0 rounded-[32px]"
          style={{
            background: 'linear-gradient(145deg, #3d3d3d 0%, #2a2a2a 50%, #1f1f1f 100%)',
            boxShadow: `
              inset 0 2px 0 rgba(255,255,255,0.15),
              inset 0 -2px 0 rgba(0,0,0,0.3),
              0 30px 60px rgba(0,0,0,0.4)
            `,
          }}
        />

        {/* Inner case edge */}
        <div
          className="absolute rounded-[28px]"
          style={{
            top: '8px',
            left: '8px',
            right: '8px',
            bottom: '60px',
            background: 'linear-gradient(180deg, #333 0%, #252525 100%)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        />

        {/* Screen area */}
        <div
          className="absolute rounded-[8px]"
          style={{
            top: '24px',
            left: '24px',
            right: '24px',
            bottom: '76px',
            background: '#0a0a0a',
            boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.9)',
          }}
        >
          {/* Actual screen */}
          <div
            className="absolute overflow-hidden flex flex-col bg-background rounded-[4px]"
            style={{
              top: '8px',
              left: '8px',
              right: '8px',
              bottom: '8px',
            }}
          >
            {/* Menu bar */}
            <div
              className="flex-none flex items-center text-[11px]"
              style={{
                height: '22px',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)',
                borderBottom: '1px solid rgba(0,255,65,0.2)',
              }}
            >
              <div className="px-2 text-highlight">◆</div>
              {menuItems.map((item) => (
                <button
                  key={item.cmd}
                  onClick={() => handleSuggestionClick(item.cmd)}
                  disabled={isTyping}
                  className="h-full px-2 text-foreground/70 hover:bg-white/10 hover:text-highlight transition-colors disabled:opacity-50"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div
              ref={terminalRef}
              className="flex-1 overflow-y-auto p-3 cursor-text"
              style={{ minHeight: 0 }}
            >
              {lines.map((line, i) => (
                <div key={i} className="leading-relaxed">
                  {line.type === "ascii" ? (
                    <pre className="text-highlight leading-tight">{line.text}</pre>
                  ) : line.type === "command" ? (
                    <div className="flex">
                      <span className="text-highlight">λ</span>
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
                    <div className="text-foreground/70 whitespace-pre">
                      {line.text}
                    </div>
                  )}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex-none px-3 py-2 flex items-center border-t border-highlight/20">
              <span className="text-highlight text-xs">›</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isTyping}
                style={{ outline: 'none', boxShadow: 'none' }}
                className="flex-1 ml-2 bg-transparent border-none text-foreground caret-highlight"
                autoFocus
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
            </form>
          </div>
        </div>

        {/* Chin area with details */}
        <div className="absolute bottom-0 left-0 right-0 h-[52px] flex items-center justify-center gap-4">
          {/* Vent lines */}
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-8 h-1 rounded-full bg-black/30" />
            ))}
          </div>
          {/* Power light */}
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: '#00FF41',
              boxShadow: '0 0 8px rgba(0,255,65,0.8), 0 0 16px rgba(0,255,65,0.4)',
            }}
          />
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
