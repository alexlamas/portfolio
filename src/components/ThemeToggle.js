import { Palette } from "@phosphor-icons/react";

const themes = [
  "light",
  "dark",
  "ivory",
  "ink",
  "champagne",
  "midnight",
  "peach",
  "forest",
  "rose",
  "graphite"
];

const themeLabels = {
  light: "Lavender",
  dark: "Navy",
  ivory: "Ivory",
  ink: "Ink",
  champagne: "Champagne",
  midnight: "Midnight",
  peach: "Peach",
  forest: "Forest",
  rose: "Rose",
  graphite: "Graphite"
};

function ThemeToggle({ setTheme, currentTheme }) {
  const cycleTheme = () => {
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <div className="flex flex-row px-4 py-2 justify-center items-center gap-2">
      <button onClick={cycleTheme} className="p-2 group flex items-center gap-2 hover:bg-foreground/5 rounded-lg transition-all">
        <Palette size={18} className="text-highlight" weight="fill" />
        <span className="text-xs font-mono text-foreground/60 group-hover:text-foreground/100 transition-all">
          {themeLabels[currentTheme]}
        </span>
      </button>
    </div>
  );
}

export default ThemeToggle;
