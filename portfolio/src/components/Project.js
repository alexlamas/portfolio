import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import React, { useState } from "react";
// import Blur from "./Blur";

function Project(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCardClick = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div>
      {/* {isModalOpen && <Blur handleCardClick={handleCardClick} />} */}
      <button
        data-tilt
        href={props.link}
        className="group rounded overflow-hidden z-20 flex flex-col dark:bg-white/5 dark:hover:bg-white/10 bg-white hover:bg-zinc-50 shadow hover:shadow-2xl group"
        onClick={handleCardClick}
      >
        <div className="p-2">
          <img
            className="rounded group-hover:shadow border border-black/10 transition"
            src={props.image}
            alt="Airtable app"
          />
        </div>
        <div className="pt-7 pb-5 px-6 group-hover:pt-2 group-hover:pb-10 transition-all">
          <p className="text-xs lg:text-sm mb-2 group-hover:mb-1 text-zinc-400 flex transition-all">
            {props.company}
            <span className="font-mono mx-2 text-zinc-300">·</span>
            {props.year}
          </p>
          <p className="text-left text-xl lg:text-2xl leading-normal group-hover:mb-1 transition-all">
            {props.title}
          </p>
          <p className=" flex items-center gap-[6px] hover:gap-2 text-left text-pink-700 dark:text-yellow-400 text-sm absolute bottom-[-40px] group-hover:bottom-4 transition-all">
            Learn more <ArrowRight className="mt-[1.5px]" />
          </p>
        </div>
      </button>
    </div>
  );
}
export default Project;
