import React, { useState, useEffect } from "react";
import { X, Cube } from "@phosphor-icons/react";
import Form from "./Form";

const Modal = ({ isModalOpen, setModalState, project }) => {
  const [isAuthenticated, setAuthentication] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        setModalState(false);
      }
    };
    if (isModalOpen) {
      document.addEventListener("keydown", handleKeyPress);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isModalOpen, setModalState]);

  const handleClick = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      {isModalOpen && (
        <div
          onClick={() => setModalState(false)}
          className="transition-all items-center fixed justify-center z-50 inset-0 backdrop-blur-lg h-screen opacity-100 flex group cursor-pointer bg-background/50 "
        >
          {!isAuthenticated && (
            <div
              onClick={handleClick}
              className={
                (isModalOpen ? "visible" : "invisible") +
                ` peer shadow-2xl rounded bg-background border dark:border-foreground/10 transition-all duration-1000`
              }
            >
              <div onClick={handleClick}>
                <Form
                  isAuthenticated={isAuthenticated}
                  setAuthentication={setAuthentication}
                />
              </div>{" "}
            </div>
          )}

          {isAuthenticated && (
            <>
              <Cube
                size={32}
                className=" text-foreground/50 z-30 animate-spin fixed left-2/4 top-2/4 justify-center"
              />
              <div className=" z-50 max-w-[1200px] max-h-[900px] w-[80vw] h-[60vw] rounded overflow-hidden drop-shadow-2xl peer cursor-default ">
                <iframe
                  allowFullScreen
                  title="bomba"
                  width="100%"
                  height="100%"
                  src={project.figma}
                ></iframe>
              </div>
            </>
          )}
          <button onClick={() => setModalState(false)}>
            <X
              className="group-hover:opacity-100 opacity-40 fixed right-12 top-12 peer-hover:opacity-40 transition"
              size={24}
            />
          </button>
        </div>
      )}
    </>
  );
};

export default Modal;
