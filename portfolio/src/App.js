import React, { useState } from "react";
import "./styles.css";
import "./fonts/fonts.css";
import Nav from "./components/Nav";
import { Cube, ArrowDown } from "@phosphor-icons/react";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = (value) => {
    setIsDarkMode(value);
  };

  return (
    <div className="app">
      <div className={isDarkMode ? "dark " : ""}>
        <div className="text-zinc-900 dark:text-white dark:bg-zinc-900 bg-zinc-100 ">
          <header className="w-9/12 xl:w-[1024px] mx-auto h-screen relative">
            <div className="fixed left-[calc(12.5vw-1px)] xl:left-[calc(50vw-512px)] h-screen w-px bg-zinc-300 dark:bg-zinc-200/20 "></div>
            <div className="fixed right-[calc(12.5vw-1px)] xl:left-[calc(50vw+511px)] h-screen w-px bg-zinc-300 dark:bg-zinc-200/20 "></div>
            <div className="h-screen flex flex-col justify-center">
              <div className="h-full"></div>
              <Nav toggleDarkMode={toggleDarkMode} />
              <div className="hover:bg-zinc-200/20 dark:hover:bg-zinc-800/20">
                <div className="hidden sm:block mx-4 text-[7.2vw] leading-normal xl:text-[100px] xl:leading-normal  font-serif">
                  Alex Lama-Noujaim
                </div>
                <div className=" sm:hidden mx-4 text-[16vw] leading-normal xl:text-[100px] xl:leading-normal  font-serif">
                  Alex
                </div>
              </div>
              <div className="hover:bg-zinc-200/20 dark:hover:bg-zinc-800/20 border-y border-zinc-300 dark:border-zinc-200/20 ">
                <p className="mx-4 my-4 text-2xl leading-normal">
                  Product designer at{" "}
                  <span className=" decoration-[3px] group text-pink-700 dark:text-yellow-500 underline underline-offset-[6px] decoration-pink-700/20 dark:decoration-yellow-400/30 dark:hover:decoration-yellow-400 hover:decoration-pink-700 leading-tight ">
                    <a href="https://www.airtable.com">
                      <Cube
                        weight="duotone"
                        className="group-hover:animate-spin inline mb-1"
                      ></Cube>
                      Airtable
                    </a>
                  </span>
                  . Former <em>mechanical engineer</em> specializing in
                  simulation, and subsequent <i>designer and tinkerer</i> of
                  modelling tools, Fourier transform music plugins, and low code
                  creation platforms.
                </p>
              </div>
              <div className="h-full flex items-center">
                <a
                  href="#projects"
                  className="sm:hidden hover:text-zinc-600 my-4 mx-4 text-base leading-normal font-mono text-zinc-500 transition"
                >
                  Scroll to continue{" "}
                  <ArrowDown className="inline animate-bounce" />
                </a>
                <a
                  href="#projects"
                  className="hidden sm:block hover:text-zinc-600 my-4 mx-4 text-base leading-normal font-mono text-zinc-500 transition"
                >
                  Use keys or scroll to continue{" "}
                  <ArrowDown className="inline animate-bounce" />
                </a>
              </div>
            </div>
          </header>
          <div className="w-9/12 xl:w-[1022px] mx-auto relative bg-zinc-100 shadow border-y border-zinc-300 dark:border-zinc-200/20">
            <div>
              <img src="/assets/timeline.png" alt="Airtable app" />
            </div>
            <div className="bg-white py-6 px-8" id="projects">
              <p className="text-base">
                2023<span className="mx-2">·</span>Airtable
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
