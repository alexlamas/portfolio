import { ArrowRight, Clock, LockSimple } from "@phosphor-icons/react/dist/ssr";

function Project(props, { toggleModal }) {
  const colorArray = [
    "#8175EC",
    "#8175EC",
    "#CF71E7",
    "#CF71E7",
    "#48A2CF",
    "#48A2CF",
    "#31a685",
    "#31a685",
  ];

  const fetchGradient = (projectID, compatibility) => {
    if (compatibility === "1") return colorArray[projectID - 1];
    else if (compatibility === "2")
      return (
        "-webkit-linear-gradient(to left, " +
        colorArray[projectID * 2] +
        ", " +
        colorArray[projectID * 2 + 1] +
        ")"
      );
    else if (compatibility === "3")
      return (
        "url(assets/noise.png), linear-gradient(to left, " +
        colorArray[projectID * 2] +
        ", " +
        colorArray[projectID * 2 + 1] +
        ")"
      );
  };

  return (
    <>
      <div className="hover:bg-[#00000004] transition h-full">
        <button
          href={props.link}
          className={` group relative flex flex-col border border-transparent h-full w-full `}
          onClick={toggleModal}
        >
          <div className="p-5 pb-0 flex justify-items-center h-full w-full ">
            {!props.gif && (
              <div
                data-tilt
                style={{
                  background: fetchGradient(props.projectID, "1"), // eslint-disable-next-line
                  background: fetchGradient(props.projectID, "2"), // eslint-disable-next-line
                  background: fetchGradient(props.projectID, "3"),
                  transformStyle: "preserve-3d",
                }}
                className=" rounded-sm p-8 h-full w-full items-center justify-center flex group-hover:shadow-lg "
              >
                <img
                  style={{
                    mixBlendMode: props.luminosity && "luminosity",
                    transform: "translateZ(20px)",
                  }}
                  className={` w-100 h-fit rounded drop-shadow-sm group-hover:drop-shadow-lg group-hover:scale-[1.005] items-center justify-center transition `}
                  src={props.image}
                  alt={props.alt}
                />
              </div>
            )}
            {props.gif && <></>}
          </div>
          <div className="pt-6 pb-6 px-6 group-hover:pt-3 group-hover:pb-9 transition-all">
            <p className="px-[1px] text-xs lg:text-sm mb-2 group-hover:mb-1 text-neutral-500 dark:text-neutral-400 group-hover:dark:text-neutral-300 flex gap-2 transition-all">
              <span className="">{props.company}</span>
              <span className="">·</span>
              <span className="flex items-center gap-1">
                <Clock weight="duotone" />
                {props.year}
              </span>
              {props.type === "case" && (
                <>
                  <span className="">·</span>{" "}
                  <span className="flex items-center gap-1">
                    <LockSimple weight="duotone" />
                    <span>Case study</span>
                  </span>
                </>
              )}
            </p>
            <p className="font-bold text-left text-xl lg:text-2xl leading-normal group-hover:mb-1 transition-all ">
              {props.title}
            </p>

            <p
              style={{ color: colorArray[props.projectID*2] }}
              className={`px-[1px] font-bold flex items-center gap-[6px] opacity-0 group-hover:opacity-100 hover:gap-2 text-left text-sm absolute bottom-0 group-hover:bottom-4 transition-all`}
            >
              {props.cta && (
                <>
                  {props.cta}{" "}
                  <ArrowRight weight="bold" className="mt-[1.5px]" />
                </>
              )}
            </p>
          </div>
        </button>
      </div>
    </>
  );
}
export default Project;
