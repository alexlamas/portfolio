import { ArrowRight, Clock } from "@phosphor-icons/react/dist/ssr";
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
        className="group rounded flex flex-col dark:hover:bg-zinc-800 hover:z-50 hover:bg-white border border-transparent dark:hover:border-zinc-700 hover:border-zinc-300 hover:shadow-2xl"
        onClick={handleCardClick}
      >
        <div className="p-4 pb-0 flex items-center justify-center">
          {!props.gif && (
            <img
              className="rounded-lg group-hover:shadow border border-black/10 transition"
              src={props.image}
              alt="A screenshot of the project"
            />
          )}
          {props.gif && (
            <>
              <img
                className="rounded-xl group-hover:hidden border border-black/10 transition"
                src={props.image}
                alt="A screenshot of the project"
              />
              <img
                className="hidden rounded-xl group-hover:block border border-black/10 transition"
                src={props.gif}
                alt="A screenshot of the project"
              />
            </>
          )}
        </div>
        <div className="pt-6 pb-6 px-6 group-hover:pt-3 group-hover:pb-9 transition-all">
          <p className="px-[1px] text-xs lg:text-sm mb-2 group-hover:mb-1 text-zinc-500 flex gap-2 transition-all">
            <span className="">{props.company}</span>
            <span className="">·</span>
            <span className="flex items-center gap-1">
              <Clock className="text-zinc-400" />
              {props.year}
            </span>
          </p>
          <p className="font-bold text-zinc-700 text-left text-xl lg:text-2xl leading-normal group-hover:mb-1 transition-all dark:text-white">
            {props.title}
          </p>
          <p className="px-[1px] flex items-center gap-[6px] opacity-0 group-hover:opacity-100 hover:gap-2 text-left text-pink-700 dark:text-yellow-400 text-sm absolute bottom-0 group-hover:bottom-4 transition-all">
            Read <ArrowRight className="mt-[1.5px]" />
          </p>
        </div>
      </button>
    </div>
  );
}
export default Project;
