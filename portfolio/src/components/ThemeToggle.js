import { Moon, MoonStars, SunDim, Sun } from "@phosphor-icons/react";

function ThemeToggle({ setTheme, currentTheme }) {
  return (
    <div className="flex flex-row px-4 py-2 justify-center items-center">
      <button onClick={() => setTheme("dark")} className="p-2 group">
        {currentTheme === "dark" ? (
          <MoonStars
            className="text-purple-400 transition-all"
            weight="fill"
            size={18}
          />
        ) : (
          <div className="group ">
            <Moon
              className="group-hover:opacity-0 text-foreground/30 transition-all "
              weight="light"
              size={18}
            />
            <MoonStars
              className="fixed translate-x-[0px] translate-y-[-100%] opacity-0 group-hover:opacity-100 text-foreground/60 transition-all "
              weight="light"
              size={18}
            />
          </div>
        )}
      </button>
      <button onClick={() => setTheme("light")} className="p-2 group">
        {currentTheme === "light" ? (
          <>
            <Sun size={18} className="text-amber-500 transition-all" weight="fill" />
          </>
        ) : (
          <div className="group">
            <SunDim size={18} className="hover:invisible text-foreground/50" />
            <Sun
              size={18}
              className="fixed translate-y-[-100%] opacity-0 group-hover:opacity-100 text-foreground/80 transition-all "
            />
          </div>
        )}
      </button>
    </div>
  );
}

export default ThemeToggle;
