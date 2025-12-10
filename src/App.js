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

const INITIAL_LINES = [
  { type: "system", text: "Last login: " + new Date().toLocaleString() },
  { type: "system", text: "" },
  { type: "output", text: "Welcome. This is not my portfolio." },
  { type: "output", text: "It's more of an... intermediate page." },
  { type: "output", text: "" },
  { type: "output", text: "Type 'help' to see available commands." },
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

  return (
    <div
      className="h-screen w-screen bg-background text-foreground font-mono text-sm flex flex-col overflow-hidden cursor-text"
      onClick={focusInput}
    >
      {/* Terminal header */}
      <div className="flex-none border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-foreground/20"></div>
            <div className="w-3 h-3 rounded-full bg-foreground/20"></div>
            <div className="w-3 h-3 rounded-full bg-foreground/20"></div>
          </div>
          <span className="ml-4 text-foreground/50">alex@lama ~ </span>
        </div>
        <div className="text-foreground/30 text-xs">
          {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Terminal content */}
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8"
      >
        <div className="max-w-2xl">
          {lines.map((line, i) => (
            <div key={i} className="leading-relaxed">
              {line.type === "command" ? (
                <div className="flex">
                  <span className="text-highlight">❯</span>
                  <span className="ml-2">{line.text}</span>
                </div>
              ) : line.type === "system" ? (
                <div className="text-foreground/30">{line.text}</div>
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
      </div>

      {/* Input area */}
      <div className="flex-none border-t border-border">
        {/* Suggestions */}
        <div className="px-4 py-3 border-b border-border flex flex-wrap gap-2">
          <span className="text-foreground/30 text-xs mr-2">Try:</span>
          {suggestions.map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleSuggestionClick(cmd)}
              disabled={isTyping}
              className="px-3 py-1 text-xs border border-border rounded hover:border-highlight hover:text-highlight transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="px-4 py-3 flex items-center">
          <span className="text-highlight">❯</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
            className="flex-1 ml-2 bg-transparent outline-none text-foreground placeholder:text-foreground/30"
            placeholder={isTyping ? "..." : "Type a command..."}
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </form>
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
