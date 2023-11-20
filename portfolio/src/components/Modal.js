import React, { useState, useEffect } from "react";
import { X, Spinner } from "@phosphor-icons/react";
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
          onClick={() => setModalState()}
          className="transition-all items-center fixed justify-center z-50 inset-0 visible backdrop-blur-lg h-screen opacity-100 flex group cursor-pointer bg-background/50 "
        >
          {!isAuthenticated && (
            <div
              onClick={handleClick}
              className="peer shadow-2xl rounded bg-background border dark:border-neutral-700 border-neutral-300 p-6"
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
              <Spinner
                size={32}
                className=" text-foreground/50 z-30 animate-spin-slow fixed left-2/4 top-2/4 justify-center"
              />
              <div className=" z-50 max-w-[1200px] max-h-[900px] w-[80vw] h-[62vw] rounded overflow-hidden">
                <iframe
                  title="bomba"
                  width="100%"
                  height="100%"
                  src={project.figma}
                ></iframe>
              </div>
            </>
          )}
          <X
            className="peer-hover:opacity-50 group-hover:opacity-100 opacity-50 fixed right-12 top-12"
            size={24}
          />
        </div>
      )}
    </>
  );
};

export default Modal;
