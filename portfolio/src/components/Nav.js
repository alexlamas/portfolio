import ThemeToggle from "./ThemeToggle";
import NavLink from "./NavLink";
import { List } from "@phosphor-icons/react";

function Nav({ toggleDarkMode }) {
  return (
    <div>
      <nav className="flex-wrap hover:bg-zinc-200/20 dark:hover:bg-zinc-800/20 sm:border-y border-b border-zinc-300 dark:border-zinc-200/20 text-base flex flex-row w-full justify-between ">
        <NavLink href="#" text="Projects" shortcut="P" hidden />
        <NavLink href="#" text="Moi" shortcut="M" hidden />
        <NavLink href="#" text="Curriculum" shortcut="C" hidden />
        <NavLink
          href="mailto:lamanoujaim@gmail.com"
          text="lamanoujaim@gmail.com"
          email
        />
        <ThemeToggle toggleDarkMode={toggleDarkMode} />
      </nav>
    </div>
  );
}

export default Nav;
