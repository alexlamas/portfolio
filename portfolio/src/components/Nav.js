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
    <div className="sticky z-40 top-0 border-b border-border">
      <nav
        className={`backdrop-blur-sm bg-background/90 sm:w-9/12 w-11/12 xl:w-[1024px] mx-auto flex-wrap text-base flex flex-row justify-between transition-all ${
          isOpen ? "flex-col lg:flex-row items-start" : "items-center"
        }`}
      >
        <button
          className={`opacity-50 m-2 p-2 lg:hidden ${isOpen && "hidden"}`}
          onClick={toggleNav}
        >
          <List size={20} />
        </button>
        <button
          className={`opacity-50 p-5 lg:hidden ${!isOpen && "hidden"}`}
          onClick={toggleNav}
        >
          <X size={20} />
        </button>

        <div className={`flex ${isOpen ? "lg:flex-row flex-col" : ""}`}>
          <NavLink
            href="https://www.linkedin.com/in/lamanoujaim/"
            text="LinkedIn"
            iconName="LinkedinLogo"
            hidden={!isOpen}
          ></NavLink>
          <NavLink
            href="https://read.cv/lamanoujaim"
            text="ReadCv"
            iconName="ReadCvLogo"
            hidden={!isOpen}
          ></NavLink>
          <NavLink
            href="mailto:lamanoujaim@gmail.com"
            text="lamanoujaim@gmail.com"
            iconName="EnvelopeSimple"
            hidden={!isOpen}
          ></NavLink>
        </div>

        <ThemeToggle setTheme={setTheme} currentTheme={currentTheme} />
      </nav>
    </div>
  );
}

export default Nav;
