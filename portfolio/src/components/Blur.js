import { X } from "@phosphor-icons/react";

function Blur({ handleCardClick }) {
  return (
    <div
      style={{ backdropFilter: "blur(10px)" }}
      className="fixed z-40 left-0 top-0 w-screen h-screen bg-white/50"
    >
      <button className="fixed right-8 top-8" onClick={handleCardClick()}>
        <X size={24} />
      </button>
    </div>
  );
}

export default Blur;
