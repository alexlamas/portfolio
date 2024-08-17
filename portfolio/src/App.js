import React, { useEffect, useState } from "react";
import "./styles.css";
import "./fonts/fonts.css";
import Nav from "./components/Nav";
import Row from "./components/Row";
import Projects from "./components/Projects";
import SkillsTicker from "./components/SkillsTicker.js";
import VanillaTilt from "vanilla-tilt";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  useEffect(() => {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
      max: 10,
      perspective: 3000,
      speed: 500,
      glare: true,
      "max-glare": 0.2,
      scale: 1.01,
    });
  });

  const [currentTheme, setCurrentTheme] = useState("light");
  const setTheme = (theme) => {
    setCurrentTheme(theme);
  };

  return (
    <div className={currentTheme}>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentTheme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "spring", damping: 50, stiffness: 200 }}
          className="text-foreground bg-background"
        >
          <div className="fixed left-[calc(4.16vw-1px)] sm:left-[calc(12.5vw-1px)] xl:left-[calc(50vw-513px)] h-screen w-px bg-border "></div>
          <div className="fixed right-[calc(4.16vw-1px)] sm:right-[calc(12.5vw-1px)] xl:left-[calc(50vw+512px)] h-screen w-px bg-border "></div>
          <Nav setTheme={setTheme} currentTheme={currentTheme} />
          <div className=" flex flex-col sm:justify-center">
            <Row>
              <div className="hidden sm:block pt-2 mx-6 text-[7vw] xl:text-[100px] leading-normal font-serif ">
                Alex Lama-Noujaim
              </div>
              <div className="sm:hidden pt-1 mx-6 text-[13vw] xl:text-[100px] leading-normal font-serif">
                Alex Lama
              </div>
            </Row>

            <Row className="transition-background-image hover:bg-gradient-to-r hover:from-transparent hover:via-claude/10 hover:to-transparent pointer-events-none">
              <p className="mx-6 my-4 text-xl md:text-xl leading-normal md:leading-normal text-foreground/75  font-normal">
                Currently designing new things at{" "}
                <a
                  href="https://www.anthropic.com/claude"
                  className="pointer-events-auto whitespace-nowrap underline decoration-[2px] underline-offset-[7px] decoration-foreground/25 hover:!decoration-claude transition-all"
                  target="_blank"
                  rel="noreferrer"
                >
                  Anthropic
                </a>
                . Previously an engineer working with simulation and algorithms,
                I now design tools that simplify and democratize software.
              </p>
            </Row>
            <Row>
              <SkillsTicker />
            </Row>
          </div>
          <Projects />
          <Row>
            <div className="flex pt-24"></div>
          </Row>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
