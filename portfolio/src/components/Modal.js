import React, { useEffect, useState } from "react";
import { X } from "@phosphor-icons/react";
const Modal = ({ isOpen, handleCardClick, projectData }) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        handleCardClick(false);
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyPress);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen, handleCardClick]);

  const [visible, setVisible] = useState(isOpen);
  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => {
        setVisible(true);
      }, 300);
      return () => clearTimeout(timeout);
    } else {
      // Delay hiding the modal to allow the transition effect
      const timeout = setTimeout(() => {
        setVisible(false);
      }, 300); // Adjust the duration to match your transition duration
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  return (
    <>
      {visible && (
        <div
          onClick={() => handleCardClick(false)}
          style={{ backdropFilter: "blur(10px)" }}
          className={
            isOpen
              ? "h-screen opacity-100 fixed group cursor-pointer inset-0 bg-white/10 flex items-center justify-center z-50 transition-all"
              : "fixed items-center justify-center z-50 inset-0 flex transition-all duration-300 opacity-0"
          }
        >
          <div
            onClick={() => handleCardClick(true)}
            className={
              isOpen
                ? "absolute peer shadow-2xl bg-white/10 rounded-lg p-2 transition-all duration-300 opacity-100 translate-y-0"
                : "absolute transition-all duration-300 opacity-0 translate-y-48"
            }
          >
            <div className={isOpen ? "w-96 h-96" : ""}>
              <h1>Can I trust you?</h1>
              <label for="password">Password:</label>
              <input type="password" id="password" required />
              <button onclick="checkPassword()">Submit</button>
            </div>
            <div className="rounded overflow-hidden shadow-2xl hidden">
              <iframe
                title="bomba"
                width="1000"
                height="806"
                src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2F1YSUL5Qxkgdhxr4YLzVGaH%2FPortfolio-2023%3Fpage-id%3D12702%253A7241%26type%3Ddesign%26node-id%3D12702-7242%26viewport%3D734%252C397%252C0.02%26t%3DJebLpjCz96onc8hH-1%26scaling%3Dscale-down%26hotspot-hints%3D0%26mode%3Ddesign"
                allowfullscreen
              ></iframe>
            </div>
          </div>
          <button
            className="peer-hover:opacity-50 group-hover:opacity-100 opacity-50 fixed right-12 top-12"
            onClick={handleCardClick}
          >
            <X size={24} />
          </button>
        </div>
      )}
    </>
  );
};

export default Modal;
