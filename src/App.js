import React, { useState, useEffect } from "react";
import "./styles.css";
import "./fonts/fonts.css";
import { Analytics } from "@vercel/analytics/react";

import Nav from "./components/Nav";
import Row from "./components/Row";
import Projects from "./components/Projects";
import SkillsTicker from "./components/SkillsTicker.js";

const taglines = [
  "Teaching AI to be helpful. It's going well, I think.",
  "10 years in, still surprised pixels pay rent.",
  "Previously mass-produced at Airtable.",
  "Making Claude less weird, more helpful.",
  "Mass Dropout",
];

function App() {
  // Get theme from URL: ?theme=electric, ?theme=sunset, ?theme=matrix
  const params = new URLSearchParams(window.location.search);
  const theme = params.get("theme") || "neutral";
  const validThemes = ["neutral", "electric", "sunset", "matrix"];
  const activeTheme = validThemes.includes(theme) ? theme : "neutral";

  const [taglineIndex, setTaglineIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setTaglineIndex((prev) => (prev + 1) % taglines.length);
        setIsVisible(true);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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
    <div className={`${activeTheme} text-foreground bg-background min-h-screen`}>
      {/* Hidden element to ensure theme classes are included in build */}
      <div className="hidden neutral electric sunset matrix" />
      <div>
          <div className="fixed left-[calc(4.16vw-1px)] sm:left-[calc(12.5vw-1px)] xl:left-[calc(50vw-513px)] h-screen w-px bg-border "></div>
          <div className="fixed right-[calc(4.16vw-1px)] sm:right-[calc(12.5vw-1px)] xl:left-[calc(50vw+512px)] h-screen w-px bg-border "></div>
          <Nav />
          <div className=" flex flex-col sm:justify-center">
            <Row>
              <div className="hidden sm:block mx-6 text-[7vw] xl:text-[100px] leading-normal group cursor-default">
                <span className="inline-block transition-all duration-300 hover:tracking-tight hover:text-highlight">Alex</span>{" "}
                <span className="inline-block transition-all duration-300 hover:tracking-tight hover:text-highlight">Lama-Noujaim</span>
              </div>
              <div className="sm:hidden pt-1 mx-6 text-[13vw] xl:text-[100px] leading-normal ">
                Alex Lama
              </div>
            </Row>

            <Row>
              <div
                className={`mx-6 mb-2 font-mono text-sm text-foreground/50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              >
                {taglines[taglineIndex]}
              </div>
            </Row>

            <Row>
              <p className="mx-6 my-4 text-xl md:text-xl leading-normal md:leading-8 text-foreground/75 font-normal">
                Product designer at{" "}
                <Link href="https://www.anthropic.com/claude">
                  <div>Anthropic</div>
                </Link>
                , where I help Claude be the kind of AI you'd actually want to talk to.
                Before that, I helped{" "}
                <Link href="https://www.airtable.com/">Airtable</Link>{" "}
                ship things people use to ship things. Mechanical engineer turned designer—I still think in systems, I just make them prettier now.
              </p>
            </Row>
            <Row>
              <SkillsTicker />
            </Row>
          </div>
          <Projects />
        </div>
      <Analytics />
    </div>
  );
}

export default App;
