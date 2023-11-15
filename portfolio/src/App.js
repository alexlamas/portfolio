import React, { useState, useEffect } from "react";
import "./styles.css";
import "./fonts/fonts.css";
import Nav from "./components/Nav";
import Row from "./components/Row";
import Border from "./components/Border";
import Projects from "./components/Projects";
import { Cube } from "@phosphor-icons/react";
import VanillaTilt from "vanilla-tilt";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
      max: 10,
      perspective: 3000,
      speed: 1000,
    });
  });

  return (
    <div className={isDarkMode ? "dark " : ""}>
      <div className="text-zinc-900 dark:text-white dark:bg-zinc-900 bg-zinc-100">
        <div className="fixed left-[calc(12.5vw-1px)] xl:left-[calc(50vw-513px)] h-screen w-px bg-zinc-300 dark:bg-zinc-200/20 "></div>
        <div className="fixed right-[calc(12.5vw-1px)] xl:left-[calc(50vw+512px)] h-screen w-px bg-zinc-300 dark:bg-zinc-200/20 "></div>

        <Nav toggleDarkMode={toggleDarkMode} />
        <div className=" flex flex-col sm:justify-center">
          <Row>
            <div className="hidden sm:block pt-4 mx-4 text-[7.2vw] xl:text-[100px] leading-normal font-serif">
              Alex Lama-Noujaim
            </div>
            <div className="sm:hidden pt-4 mx-4 text-[16vw] xl:text-[100px] leading-normal font-serif">
              Alex
            </div>
          </Row>
          <Border />
          <Row>
            <p className="mx-4 my-4 text-2xl leading-normal">
              Product designer at{" "}
              <span className="decoration-[3px] group text-pink-700 dark:text-yellow-500 underline underline-offset-[6px] decoration-pink-700/20 dark:decoration-yellow-400/30 dark:hover:decoration-yellow-400 hover:decoration-pink-700">
                <a
                  href="https://www.airtable.com"
                  className="whitespace-nowrap"
                >
                  <Cube
                    weight="duotone"
                    className="group-hover:animate-spin inline mb-1"
                  ></Cube>
                  Airtable
                </a>
              </span>
              . Former <em>mechanical engineer</em> specializing in simulation,
              and subsequent <i>designer and tinkerer</i> of modelling tools,
              Fourier transform music plugins, and low code creation platforms.
            </p>
          </Row>
        </div>
        <Projects />
      </div>
    </div>
  );
}

export default App;
