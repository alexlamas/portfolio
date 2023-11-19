import React, { useEffect } from "react";
import { X } from "@phosphor-icons/react";
import Form from "./Form";

const Modal = ({ isOpen, toggleModal, project }) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        toggleModal(false);
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyPress);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen, toggleModal]);

  const handleClick = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      <div
        onClick={() => toggleModal(false)}
        className={
          isOpen
            ? "visible backdrop-blur-lg transition-all duration-300 h-screen opacity-100 fixed group cursor-pointer inset-0 bg-black/10 flex items-center justify-center z-50 "
            : "hidden transition-all duration-300 fixed items-center justify-center z-50 inset-0 flex opacity-0"
        }
      >
        <div
          onClick={handleClick}
          className={
            `cursor-default transition-all ` + isOpen
              ? " peer shadow-2xl scale-100 rounded dark:bg-neutral-800 bg-white border dark:border-neutral-700 border-neutral-300 p-6 "
              : " scale-75 "
          }
        >
          <div onClick={handleClick}>
            <Form />
          </div>

          <div
            id="figma"
            className="w-9/12 h-9/12 rounded overflow-hidden shadow-2xl hidden"
          >
            <iframe
              title="bomba"
              width="90%"
              height="90%"
              src={project.figma}
            ></iframe>
          </div>
        </div>
        <button
          className="peer-hover:opacity-50 group-hover:opacity-100 opacity-50 fixed right-12 top-12"
          onClick={toggleModal}
        >
          <X size={24} />
        </button>
      </div>
    </>
  );
};

export default Modal;
