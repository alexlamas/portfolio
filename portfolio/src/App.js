import React, { useEffect, useState } from "react";
import "./styles.css";
import "./fonts/fonts.css";
import Nav from "./components/Nav";
import Row from "./components/Row";
import Projects from "./components/Projects";
import VanillaTilt from "vanilla-tilt";
import { Cube } from "@phosphor-icons/react/dist/ssr";

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
      <div className="text-foreground bg-background transition">
        <div className="fixed left-[calc(4.16vw-1px)] sm:left-[calc(12.5vw-1px)] xl:left-[calc(50vw-513px)] h-screen w-px bg-border "></div>
        <div className="fixed right-[calc(4.16vw-1px)] sm:right-[calc(12.5vw-1px)] xl:left-[calc(50vw+512px)] h-screen w-px bg-border "></div>
        <Nav setTheme={setTheme} currentTheme={currentTheme} />
        <div className=" flex flex-col sm:justify-center">
          <Row>
            <div className="hidden sm:block pt-2 mx-6 text-[7vw] xl:text-[100px] leading-normal font-serif">
              Alex Lama-Noujaim
            </div>
            <div className="sm:hidden pt-1 mx-6 text-[13vw] xl:text-[100px] leading-normal font-serif">
              Alex Lama
            </div>
          </Row>

          <Row>
            <p className="mx-6 my-4 text-xl md:text-2xl leading-normal md:leading-normal text-foreground/90">
              Staff product designer at{" "}
              <span className=" decoration-[3px] group underline underline-offset-[6px] decoration-foreground/30 hover:decoration-highlight">
                <a
                  href="https://www.airtable.com"
                  className="whitespace-nowrap"
                >
                  <Cube
                    weight="duotone"
                    className="group-hover:animate-spin inline mb-1 mr-[1px] "
                  ></Cube>
                  Airtable
                </a>
              </span>
              . Formerly an engineer specialised in simulation and algorithms, I
              now design tools that simplify and democratize software.
            </p>
          </Row>
          <Row>
            <p className="font-mono px-6 my-4 text-md leading-normal overflow-scroll w-full whitespace-nowrap">
              Design systems · Research · Product strategy · Data visualization · Algorithms · Coding ·
              Agent-based modelling · Spanish · Permaculture · Fourier transforms · French · Italian · Arabic
            </p>
          </Row>
        </div>
        <Projects />
        <Row>
          <div className="flex pt-24"></div>
        </Row>
      </div>
    </div>
  );
}

export default App;
