import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import NavLink from "./NavLink";
import { List, X } from "@phosphor-icons/react";

function Nav({ setTheme, currentTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants = {
    closed: {
      y: -20,
      height: 0,
      opacity: 0,
      transition: { type: "spring", damping: 40, stiffness: 300 },
    },
    open: {
      y: 0,
      height: "auto",
      opacity: 1,
      transition: { type: "spring", damping: 40, stiffness: 300 },
    },
  };

  return (
    <div className="sticky z-40 top-0 border-b border-border">
      <nav className="backdrop-blur-sm bg-background/90 sm:w-9/12 w-11/12 xl:w-[1024px] mx-auto flex-wrap text-base flex flex-row justify-between transition-all">
        <div className="flex lg:items-center items-baseline justify-between w-full">
          <div className="flex flex-col lg:hidden">
            <button className="opacity-50 m-2 p-2 px-3.5" onClick={toggleNav}>
              {isOpen ? <X size={20} /> : <List size={20} />}
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={menuVariants}
                  className="w-full lg:hidden"
                >
                  <div className="flex flex-col mb-2">
                    <NavLink
                      href="https://www.linkedin.com/in/lamanoujaim/"
                      text="LinkedIn"
                      iconName="LinkedinLogo"
                    />
                    <NavLink
                      href="https://read.cv/lamanoujaim"
                      text="ReadCv"
                      iconName="ReadCvLogo"
                    />
                    <NavLink
                      href="mailto:lamanoujaim@gmail.com"
                      text="Email"
                      iconName="EnvelopeSimple"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="hidden lg:flex-row lg:flex">
            <NavLink
              href="https://www.linkedin.com/in/lamanoujaim/"
              text="LinkedIn"
              iconName="LinkedinLogo"
            />
            <NavLink
              href="https://read.cv/lamanoujaim"
              text="ReadCv"
              iconName="ReadCvLogo"
            />
            <NavLink
              href="mailto:lamanoujaim@gmail.com"
              text="Email"
              iconName="EnvelopeSimple"
            />
          </div>
          <ThemeToggle setTheme={setTheme} currentTheme={currentTheme} />
        </div>
      </nav>
    </div>
  );
}

export default Nav;
