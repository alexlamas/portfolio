import { ArrowDown } from "@phosphor-icons/react";
import React from "react";

function ScrollIndicator() {
  return (
    <div className="w-9/12 xl:w-[1024px] mx-auto h-full flex items-center">
      <a
        href="#projects"
        className="sm:hidden hover:text-zinc-600 my-4 mx-4 text-base leading-normal font-mono text-zinc-500 transition"
      >
        Scroll to continue <ArrowDown className="inline animate-bounce" />
      </a>
      <a
        href="#projects"
        className="hidden sm:block hover:text-zinc-600 my-4 mx-4 text-base leading-normal font-mono text-zinc-500 transition"
      >
        scroll or use keys to continue{" "}
        <ArrowDown className="inline animate-bounce z-0" />
      </a>
    </div>
  );
}

export default ScrollIndicator;
