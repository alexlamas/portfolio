import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import NavLink from "./NavLink";
import { List, X } from "@phosphor-icons/react";

function Nav({ toggleDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  return (
    <div className="hover:bg-zinc-200/20 dark:hover:bg-zinc-800/20 sm:border-y border-b border-zinc-300 dark:border-zinc-200/20">
      <nav
        className={`w-9/12 xl:w-[1024px] mx-auto flex-wrap   text-base flex flex-row justify-between ${
          isOpen && "flex-col items-start"
        }`}
      >
        <button
          className={` m-3 p-2 lg:hidden ${isOpen && "hidden"}`}
          onClick={toggleNav}
        >
          <List size={24} />
        </button>
        <button
          className={`p-5 lg:hidden ${!isOpen && "hidden"}`}
          onClick={toggleNav}
        >
          <X size={24} />
        </button>
        <NavLink href="#" text="work" shortcut="W" hidden={!isOpen} />
        <NavLink href="#" text="about" shortcut="A" hidden={!isOpen} />
        <NavLink href="#" text="curriculum" shortcut="C" hidden={!isOpen} />
        <NavLink
          href="mailto:lamanoujaim@gmail.com"
          text="lamanoujaim@gmail.com"
          hidden={!isOpen}
        />
        <ThemeToggle toggleDarkMode={toggleDarkMode} />
      </nav>
    </div>
  );
}

export default Nav;
