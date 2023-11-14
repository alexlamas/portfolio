import React, { useState } from "react";
// import Blur from "./Blur";

function Project(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCardClick = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div >
      {/* {isModalOpen && <Blur handleCardClick={handleCardClick} />} */}
      <button
        data-tilt
        href={props.link}
        className="rounded overflow-hidden z-20 flex flex-col dark:bg-zinc-800 bg-white hover:bg-zinc-100 shadow hover:shadow-2xl group"
        onClick={handleCardClick}
      >
        <div className="p-1">
          <img
            className="rounded shadow border border-black/10"
            src={props.image}
            alt="Airtable app"
          />
        </div>
        <div className="py-6 px-8">
          <p className="text-sm lg:text-base mb-2 text-zinc-400 flex ">
            {props.company}
            <span className="mx-2 text-zinc-300">·</span>
            {props.year}
          </p>
          <p className="text-left text-xl lg:text-2xl font-serif leading-normal">
            {props.title}
          </p>
        </div>
      </button>
    </div>
  );
}
export default Project;
