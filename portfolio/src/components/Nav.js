import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import NavLink from "./NavLink";
import { List, X } from "@phosphor-icons/react";

function Nav({ setTheme, currentTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sticky z-40 top-0 hover:bg-neutral-200/20 dark:hover:bg-neutral-900/20 border-b border-border">
      <nav
        className={` backdrop-blur-sm	 bg-background/90 w-9/12 xl:w-[1024px] mx-auto flex-wrap text-base flex flex-row justify-between ${
          isOpen && "flex-col lg:flex-row items-start"
        }`}
      >
        <button
          className={` m-2 p-2 lg:hidden ${isOpen && "hidden"}`}
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
        {/* <NavLink href="#" text="about" shortcut="A" hidden={!isOpen} /> */}
        {/* <NavLink href="#" text="curriculum" shortcut="C" hidden={!isOpen} /> */}
        <NavLink
          href="mailto:lamanoujaim@gmail.com"
          text="lamanoujaim@gmail.com"
          hidden={!isOpen}
        />
        <ThemeToggle setTheme={setTheme} currentTheme={currentTheme} />
      </nav>
    </div>
  );
}

export default Nav;
