import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import NavLink from "./NavLink";
import {
  List,
  X,
  LinkedinLogo,
  ReadCvLogo,
  EnvelopeSimple,
  ArrowUpRight,
} from "@phosphor-icons/react";

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
        <div className="flex">
        <a
          href="https://www.linkedin.com/in/lamanoujaim/"
          className="px-6 py-2 flex items-center gap-2 hover:bg-foreground/5 transition hidden lg:flex group "
        >
          <LinkedinLogo size={16} className="opacity-50 group-hover:invisible group-hover:scale-90 transition" />
          <ArrowUpRight size={16} className="opacity-50 invisible group-hover:visible fixed transition" />
          <p className="text-foreground/50 font-mono group-hover:text-foreground/70 transition">LinkedIn</p>
        </a>
        <a
          href="https://www.read.cv/lamanoujaim"
          className="px-6 py-2 flex items-center gap-2 hover:bg-foreground/5 transition hidden lg:flex group "
        >
          <ReadCvLogo size={16} className="opacity-50 group-hover:invisible group-hover:scale-90 transition" />
          <ArrowUpRight size={16} className="opacity-50 invisible group-hover:visible fixed transition" />
          <p className=" text-foreground/50 font-mono group-hover:text-foreground/70 transition">ReadCv</p>
        </a>
        <a
          href="mailto:lamanoujaim@gmail.com"
          className="px-6 py-2 flex items-center gap-2 hover:bg-foreground/5 transition hidden lg:flex group "
        >
          <EnvelopeSimple size={16} className="opacity-50 group-hover:invisible group-hover:scale-90 transition" />
          <ArrowUpRight size={16} className="opacity-50 invisible group-hover:visible fixed transition" />
          <p className="text-foreground/50 font-mono group-hover:text-foreground/70 transition">lamanoujaim@gmail.com</p>
        </a>
        </div>

        {isOpen && (
          <div className="flex flex-col gap-2 w-full">
            <a
              href="https://www.linkedin.com/in/lamanoujaim/"
              className="px-6 py-4 flex items-center gap-2 hover:bg-foreground/5 transition lg:hidden "
            >
              <LinkedinLogo size={16} className="opacity-50 group-hover:invisible group-hover:scale-90 transition" />
              <ArrowUpRight size={16} className="opacity-50 invisible group-hover:visible fixed transition" />
              <p className="text-foreground/50 font-mono">LinkedIn</p>
            </a>
            <a
              href="https://www.read.cv/lamanoujaim"
              className="px-6 py-4 flex items-center gap-2 hover:bg-foreground/5 transition lg:hidden "
            >
              <ReadCvLogo size={16} className="opacity-50 group-hover:invisible group-hover:scale-90 transition" />
              <ArrowUpRight size={16} className="opacity-50 invisible group-hover:visible fixed transition" />
              <p className=" text-foreground/50 font-mono">ReadCv</p>
            </a>
            <a
              href="mailto:lamanoujaim@gmail.com"
              className="px-6 py-4 flex items-center gap-2 hover:bg-foreground/5 transition lg:hidden "
            >
              <EnvelopeSimple size={16} className="opacity-50 group-hover:invisible group-hover:scale-90 transition" />
              <ArrowUpRight size={16} className="opacity-50 invisible group-hover:visible fixed transition" />
              <p className="text-foreground/50 font-mono">
                lamanoujaim@gmail.com
              </p>
            </a>
          </div>
        )}
        {/* <NavLink href="#" text="about" shortcut="A" hidden={!isOpen} /> */}
        {/* <NavLink href="#" text="curriculum" shortcut="C" hidden={!isOpen} /> */}
        {/* <NavLink
          href="mailto:lamanoujaim@gmail.com"
          text="lamanoujaim@gmail.com"
          hidden={!isOpen}
        /> */}
        <ThemeToggle setTheme={setTheme} currentTheme={currentTheme} />
      </nav>
    </div>
  );
}

export default Nav;
