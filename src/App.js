import React from "react";
import "./styles.css";
import "./fonts/fonts.css";
import { Analytics } from "@vercel/analytics/react";
import { motion } from "framer-motion";

import Nav from "./components/Nav";
import Row from "./components/Row";
import Projects from "./components/Projects";
import SkillsTicker from "./components/SkillsTicker.js";

function App() {


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

  // Animation variants
  const lineVariants = {
    hidden: { height: 0 },
    visible: {
      height: "100vh",
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 1.2 + (custom * 0.15), // Start after lines finish (0.8s) + small buffer
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="neutral text-foreground bg-background min-h-screen">
      <div>
          {/* Animated vertical lines */}
          <motion.div
            className="fixed left-[calc(4.16vw-1px)] sm:left-[calc(12.5vw-1px)] xl:left-[calc(50vw-513px)] top-0 w-px bg-border"
            variants={lineVariants}
            initial="hidden"
            animate="visible"
          />
          <motion.div
            className="fixed right-[calc(4.16vw-1px)] sm:right-[calc(12.5vw-1px)] xl:left-[calc(50vw+512px)] top-0 w-px bg-border"
            variants={lineVariants}
            initial="hidden"
            animate="visible"
          />

          {/* Nav - fades in first */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <Nav />
          </motion.div>

          <div className="flex flex-col sm:justify-center">
            {/* Hero section - name */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <Row>
                <div className="hidden sm:block mx-6 text-[7vw] xl:text-[100px] leading-normal ">
                  Alex Lama-Noujaim
                </div>
                <div className="sm:hidden pt-1 mx-6 text-[13vw] xl:text-[100px] leading-normal ">
                  Alex Lama
                </div>
              </Row>
            </motion.div>

            {/* Bio section */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              custom={2}
            >
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
            </motion.div>

            {/* Skills ticker */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              custom={3}
            >
              <Row>
                <SkillsTicker />
              </Row>
            </motion.div>
          </div>

          {/* Projects section */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            custom={4}
          >
            <Projects />
          </motion.div>
        </div>
      <Analytics />
    </div>
  );
}

export default App;
