import { Moon, MoonStars, SunDim, Sun } from "@phosphor-icons/react";

function ThemeToggle({ setTheme, currentTheme }) {
  return (
    <div className="flex flex-row px-4 py-2 justify-center items-center">
      <button onClick={() => setTheme("dark")} className="p-2 group">
        {currentTheme === "dark" ? (
          <MoonStars
            className="text-foreground transition-all"
            weight="fill"
            size={20}
          />
        ) : (
          <Moon
            className="text-foreground/50 transition-all"
            weight="light"
            size={20}
          />
        )}
      </button>
      <button onClick={() => setTheme("light")} className="p-2 group">
        {currentTheme === "light" ? (
          <Sun
            size={20}
            className="text-foreground transition-all"
            weight="fill"
          />
        ) : (
          <SunDim
            size={20}
            className="text-foreground/50 transition-all"
            weight="light"
          />
        )}
      </button>
    </div>
  );
}

export default ThemeToggle;
