import { MoonStars, SunDim } from "@phosphor-icons/react";

const ThemeToggle = ({ isDarkMode, toggleDarkMode }) => {
  const enableDarkMode = () => {
    toggleDarkMode(true);
  };

  const disableDarkMode = () => {
    toggleDarkMode(false);
  };

  return (
    <div className="flex flex-row px-4 py-2 justify-center items-center">
      <button onClick={enableDarkMode} className="p-2 group">
        <MoonStars
          className="dark:text-yellow-500 text-zinc-300 group-hover:text-zinc-400 dark:group-hover:text-yellow-500 transition-all"
          weight="duotone"
          size={20}
        />
      </button>
      <button onClick={disableDarkMode} className="p-2 group">
        <SunDim
          size={20}
          className="text-pink-700 dark:text-white/40 dark:group-hover:text-white/80 transition-all"
          weight="duotone"
        />
      </button>
    </div>
  );
};

export default ThemeToggle;
