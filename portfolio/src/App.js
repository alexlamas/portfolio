import React, { useState, useEffect } from "react";
import "./styles.css";
import "./fonts/fonts.css";
import Nav from "./components/Nav";
import Project from "./components/Project";
import { Cube, ArrowDown } from "@phosphor-icons/react";
import VanillaTilt from "vanilla-tilt";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = (value) => {
    setIsDarkMode(value);
  };

  useEffect(() => {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
      max: 10,
      perspective: 2000,
      speed: 2000,
      glare: false,
    });
  });

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
            <div className="border-y border-zinc-300 dark:border-zinc-200/20 ">
              <div className="w-9/12 xl:w-[1024px] mx-auto p-2">
                <Project
                  title="App platform for teams"
                  year="2023"
                  company="Airtable"
                  image="/assets/timeline.png"
                  link="https://www.figma.com/proto/1YSUL5Qxkgdhxr4YLzVGaH/Portfolio-2023?page-id=12702%3A7241&type=design&node-id=12702-7242&viewport=734%2C397%2C0.02&t=JebLpjCz96onc8hH-8&scaling=scale-down&hotspot-hints=0&hide-ui=1"
                />
              </div>
            </div>
            <div className="border-y border-zinc-300 dark:border-zinc-200/20 my-24 relative">
              <div className="absolute top-[-98px] left-[calc(50vw-48px)] h-[calc(100%+98px)] w-px bg-zinc-300 dark:bg-zinc-200/20 "></div>
              <div className="absolute top-[-98px] right-[calc(50vw-48px)] h-[calc(100%+98px)] w-px bg-zinc-300 dark:bg-zinc-200/20 "></div>
              <div className="fixed right-[calc(12.5vw-1px)] xl:left-[calc(50vw+48px)] h-screen w-px bg-zinc-300 dark:bg-zinc-200/20 "></div>
              <div className="w-9/12 xl:w-[1024px] mx-auto flex gap-24  ">
                <div className="p-4">
                  <Project
                    title="Simulation platform"
                    year="2018"
                    company="Simudyne"
                    image="/assets/simudyne.png"
                  />
                </div>
                <div className="p-4">
                  <Project
                    title="Low code automation platform"
                    year="2020"
                    company="Tray.io"
                    image="/assets/tray.png"
                  />
                </div>
              </div>
            </div>
            {/* <iframe
              width="800"
              height="450"
              title="Airtable app"
              src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2F1YSUL5Qxkgdhxr4YLzVGaH%2FPortfolio-2023%3Fpage-id%3D12702%253A7241%26type%3Ddesign%26node-id%3D12702-7242%26viewport%3D734%252C397%252C0.02%26t%3DJebLpjCz96onc8hH-1%26scaling%3Dscale-down%26hotspot-hints%3D0%26mode%3Ddesign"
              allowfullscreen
            ></iframe> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
