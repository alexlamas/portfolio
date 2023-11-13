import ThemeToggle from "./ThemeToggle";
import NavLink from "./NavLink";

function Nav({ toggleDarkMode }) {
  return (
    <div>
      <nav className="flex-wrap hover:bg-zinc-200/20 dark:hover:bg-zinc-800/20 border-y border-zinc-300 dark:border-zinc-200/20 text-base flex flex-row w-full justify-between ">
        <NavLink href="#" text="Projects" shortcut="P" />
        <NavLink href="#" text="Moi" shortcut="M" />
        <NavLink href="#" text="Curriculum" shortcut="C" />
        <NavLink
          href="mailto:lamanoujaim@gmail.com"
          text="lamanoujaim@gmail.com"
        />
        <ThemeToggle toggleDarkMode={toggleDarkMode} />
      </nav>
    </div>
  );
}

export default Nav;
