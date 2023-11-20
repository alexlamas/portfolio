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
          <div className="group">
            <Moon
              className="group-hover:hidden text-foreground/50 transition-all"
              weight="light"
              size={20}
            />
            <MoonStars
              className="translate-x-[2px] translate-y-[-0.8px] hidden group-hover:block text-foreground/50 transition-all"
              weight="light"
              size={22}
            />
          </div>
        )}
      </button>
      <button onClick={() => setTheme("light")} className="p-2 group">
        {currentTheme === "light" ? (
          <>
            <Sun
              size={20}
              className="text-foreground transition-all"
              weight="fill"
            />
          </>
        ) : (
          <div className="group">
            <SunDim
              size={20}
              className="group-hover:hidden text-foreground/50 transition-all"
              weight="light"
            />
            <Sun
              size={20}
              className="hidden group-hover:block text-foreground/50 transition-all"
              weight="light"
            />
          </div>
        )}
      </button>
    </div>
  );
}

export default ThemeToggle;
