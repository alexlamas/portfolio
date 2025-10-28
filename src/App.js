import React, { useEffect, useState } from "react";
import "./styles.css";
import "./fonts/fonts.css";
import { HandWaving } from "@phosphor-icons/react";
import { Analytics } from "@vercel/analytics/react";

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

  const Link = ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center group underline decoration-[2px] underline-offset-[6px] decoration-foreground/25 hover:!decoration-highlight transition "
    >
      {children}
    </a>
  );

  return (
    <div
      className={`${currentTheme} text-foreground bg-background min-h-screen`}
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentTheme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "spring", damping: 50, stiffness: 200 }}
        >
          <div className="fixed left-[calc(4.16vw-1px)] sm:left-[calc(12.5vw-1px)] xl:left-[calc(50vw-513px)] h-screen w-px bg-border "></div>
          <div className="fixed right-[calc(4.16vw-1px)] sm:right-[calc(12.5vw-1px)] xl:left-[calc(50vw+512px)] h-screen w-px bg-border "></div>
          <Nav setTheme={setTheme} currentTheme={currentTheme} />
          <div className=" flex flex-col sm:justify-center">
            <Row>
              <div className="hidden sm:block mx-6 text-[7vw] xl:text-[100px] leading-normal ">
                Alex Lama-Noujaim
              </div>
              <div className="sm:hidden pt-1 mx-6 text-[13vw] xl:text-[100px] leading-normal ">
                Alex Lama
              </div>
            </Row>

            <Row>
              <p className="mx-6 my-4 text-xl md:text-xl leading-normal md:leading-8 text-foreground/75  font-normal">
                Currently designing new things at{" "}
                <Link href="https://www.anthropic.com/claude">
                  <div>Anthropic</div>
                </Link>{" "}
                formerly at{" "}
                <Link href="https://www.airtable.com/">Airtable</Link>. In
                previous lives I studied mechanical engineering and worked in
                simulations and audio engineering.
              </p>
            </Row>
            <Row>
              <SkillsTicker />
            </Row>
          </div>
          <Projects />
          <Row borderBottom={false}>
            <div className="p-6 text-foreground opacity-50 flex-row flex items-center gap-2">
              <HandWaving></HandWaving>
              More details about my work available on request.
            </div>
            <div className="flex pt-24"></div>
          </Row>
        </motion.div>
      </AnimatePresence>
      <Analytics />
    </div>
  );
}

export default App;
