import React, { useEffect } from "react";
import { X } from "@phosphor-icons/react";
const Modal = ({ isOpen, closeModal, projectData }) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        closeModal(false);
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyPress);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen, closeModal]);

  const handleClick = (event) => {
    event.stopPropagation();
  };

  const checkPassword = () => {
    console.log("checking password");
    var password = document.getElementById("password").value;
    if (password === "bomba") {
      document.getElementById("password").value = "";
      document.getElementById("figma").classList.remove("hidden");
      document.getElementById("form").classList.add("hidden");
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <>
      <div
        onClick={() => closeModal(false)}
        style={{
          backdropFilter: "blur(10px)",
        }}
        className={
          isOpen
            ? "visible transition-all duration-300 h-screen opacity-100 fixed group cursor-pointer inset-0 bg-black/10 flex items-center justify-center z-50 "
            : "invisible transition-all duration-300 fixed items-center justify-center z-50 inset-0 flex opacity-0"
        }
      >
        <div
          onClick={handleClick}
          className={
            isOpen
              ? "cursor-default transition-all duration-500 peer shadow-2xl scale-100 rounded dark:bg-zinc-800 bg-white border dark:border-zinc-700 border-zinc-300 p-6"
              : "cursor-default transition-all duration-300 scale-75"
          }
        >
          <div
          id="form"
            onClick={handleClick}
            className="flex flex-col gap-4 align-start"
          >
            <h1 className="text-left text-md leading-normal dark:text-white">
              Enter the magic word to continue
            </h1>
            <input
              className="w-full dark:text-white dark:bg-zinc-700 hover:dark:bg-zinc-600 p-2 bg-zinc-100 hover:bg-zinc-200 focus:bg-white rounded"
              type="password"
              id="password"
              required
              autocomplete="new-password"
            />
            <button
              className="rounded bg-pink-700 px-4 py-2 font-bold text-white w-full"
              onClick={checkPassword}
            >
              Submit
            </button>
          </div>
          <div id="figma" className="rounded overflow-hidden shadow-2xl hidden">
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
          onClick={closeModal}
        >
          <X size={24} />
        </button>
      </div>
    </>
  );
};

export default Modal;
