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
          <div className="fixed left-[calc(12.5vw-1px)] xl:left-[calc(50vw-513px)] h-screen w-px bg-zinc-300 dark:bg-zinc-200/20 "></div>
          <div className="fixed right-[calc(12.5vw-1px)] xl:left-[calc(50vw+512px)] h-screen w-px bg-zinc-300 dark:bg-zinc-200/20 "></div>

          <header className=" h-screen">
            <div className="sm:h-screen flex flex-col sm:justify-center">
              <div className="sm:h-full"></div>
              <Nav toggleDarkMode={toggleDarkMode} />
              <div className="hover:bg-zinc-200/20 dark:hover:bg-zinc-800/20">
                <div className="w-9/12 xl:w-[1024px] mx-auto hidden sm:block mx-4 text-[7.2vw] leading-normal xl:text-[100px] xl:leading-normal  font-serif">
                  <div className="mx-4">Alex Lama-Noujaim</div>
                </div>
                <div className="w-9/12 xl:w-[1024px] mx-auto  sm:hidden mx-4 text-[16vw] leading-normal xl:text-[100px] xl:leading-normal  font-serif">
                  <div className="mx-4">Alex</div>
                </div>
              </div>
              <div className="hover:bg-zinc-200/20 dark:hover:bg-zinc-800/20 border-y border-zinc-300 dark:border-zinc-200/20">
                <div className="w-9/12 xl:w-[1024px] mx-auto  ">
                  <p className="mx-4 my-4 text-2xl leading-normal">
                    Product designer at{" "}
                    <span className=" decoration-[3px] group text-pink-700 dark:text-yellow-500 underline underline-offset-[6px] decoration-pink-700/20 dark:decoration-yellow-400/30 dark:hover:decoration-yellow-400 hover:decoration-pink-700 leading-tight ">
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
                    . Former <em>mechanical engineer</em> specializing in
                    simulation, and subsequent <i>designer and tinkerer</i> of
                    modelling tools, Fourier transform music plugins, and low
                    code creation platforms.
                  </p>
                </div>
              </div>
              <div className="w-9/12 xl:w-[1024px] mx-auto h-full flex items-center">
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
                  scroll or use keys to continue{" "}
                  <ArrowDown className="inline animate-bounce" />
                </a>
              </div>
            </div>
          </header>
          <div className="mt-24 pb-24">
            <div data-tilt className="bg-black w-48 h-48 ">
              box
            </div>
            <div className="border-y border-zinc-300">
              <a
                href="https://www.figma.com/proto/1YSUL5Qxkgdhxr4YLzVGaH/Portfolio-2023?page-id=12702%3A7241&type=design&node-id=12702-7242&t=IN3fOnuhDr1eqgAh-0&scaling=min-zoom"
                className="rounded data-tilt z-40 w-9/12 xl:w-[1024px] mx-auto flex flex-col relative bg-zinc-100/5 hover:bg-zinc-100/50 hover:shadow-2xl  dark:border-zinc-200/20"
              >
                <div>
                  <img src="/assets/timeline.png" alt="Airtable app" />
                </div>
                <div className="bg-white py-6 px-8 border-t" id="projects">
                  <p className="text-base mb-2 text-zinc-500 font-mono">
                    2023<span className="mx-2 text-zinc-200">·</span>Airtable
                  </p>
                  <p className="text-2xl font-serif leading-normal">
                    App platform for teams
                  </p>
                </div>
              </a>
            </div>
            <div className="border-y border-zinc-300 my-24 relative">
              <div className="absolute top-[-98px] left-[calc(50vw-48px)] h-[calc(100%+98px)] w-px bg-zinc-300 dark:bg-zinc-200/20 "></div>
              <div className="absolute top-[-98px] right-[calc(50vw-48px)] h-[calc(100%+98px)] w-px bg-zinc-300 dark:bg-zinc-200/20 "></div>
              <div className="fixed right-[calc(12.5vw-1px)] xl:left-[calc(50vw+48px)] h-screen w-px bg-zinc-300 dark:bg-zinc-200/20 "></div>
              <div className="w-9/12 xl:w-[1024px] mx-auto flex gap-24  ">
                <a
                  href="https://www.figma.com/proto/1YSUL5Qxkgdhxr4YLzVGaH/Portfolio-2023?page-id=12702%3A7241&type=design&node-id=12702-7242&t=IN3fOnuhDr1eqgAh-0&scaling=min-zoom"
                  className=" flex flex-col  relative bg-zinc-100/5 hover:bg-zinc-100/50 hover:shadow-2xl  dark:border-zinc-200/20"
                >
                  <div>
                    <img src="/assets/timeline.png" alt="Airtable app" />
                  </div>
                  <div className="bg-white py-6 px-8 border-t" id="projects">
                    <p className="text-base mb-2 text-zinc-500 font-mono">
                      2023<span className="mx-2 text-zinc-200">·</span>
                      Airtable
                    </p>
                    <p className="text-2xl font-serif leading-normal">
                      App platform for teams
                    </p>
                  </div>
                </a>
                <a
                  href="https://www.figma.com/proto/1YSUL5Qxkgdhxr4YLzVGaH/Portfolio-2023?page-id=12702%3A7241&type=design&node-id=12702-7242&t=IN3fOnuhDr1eqgAh-0&scaling=min-zoom"
                  className=" flex flex-col relative bg-zinc-100/5 hover:bg-zinc-100/50 hover:shadow-2xl  dark:border-zinc-200/20"
                >
                  <div>
                    <img src="/assets/timeline.png" alt="Airtable app" />
                  </div>
                  <div className="bg-white py-6 px-8 border-t" id="projects">
                    <p className="text-base mb-2 text-zinc-500 font-mono">
                      2023<span className="mx-2 text-zinc-200">·</span>
                      Airtable
                    </p>
                    <p className="text-2xl font-serif leading-normal">
                      App platform for teams
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
