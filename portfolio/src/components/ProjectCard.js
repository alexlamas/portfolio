import { ArrowRight, Clock, LockSimple } from "@phosphor-icons/react/dist/ssr";

function ProjectCard({ project, clickProject }) {
  const addNoise = () => {
    return "url(assets/noise.png), " + project.color;
  };

  return (
    <>
      <div className="hover:bg-[#00000004] transition h-full">
        <button
          className={` group relative flex flex-col border border-transparent h-full w-full `}
          onClick={() => clickProject(project)}
        >
          <div className="p-5 pb-0 flex justify-items-center h-full w-full ">
            {!project.gif && (
              <div
                data-tilt
                style={{
                  background: addNoise(),
                  transformStyle: "preserve-3d",
                }}
                className=" rounded-sm p-8 h-full w-full items-center justify-center flex group-hover:shadow-lg "
              >
                <img
                  style={{
                    mixBlendMode: project.luminosity && "luminosity",
                    transform: "translateZ(20px)",
                  }}
                  className={` w-100 rounded drop-shadow-sm group-hover:drop-shadow-md group-hover:scale-[1.005] items-center justify-center transition `}
                  src={project.image}
                  alt={project.alt}
                />
              </div>
            )}
            {project.gif && <></>}
          </div>
          <div className="pt-6 pb-6 px-6 group-hover:pt-3 group-hover:pb-9 transition-all">
            <p className="px-[1px] text-xs lg:text-sm mb-2 group-hover:mb-1 text-neutral-500 dark:text-neutral-400 group-hover:dark:text-neutral-300 flex gap-2 transition-all">
              <span className="">{project.company}</span>
              <span className="">·</span>
              <span className="flex items-center gap-1">
                <Clock weight="duotone" />
                {project.year}
              </span>
              {project.type === "case" && (
                <>
                  <span className="">·</span>{" "}
                  <span className="flex items-center gap-1">
                    <LockSimple weight="duotone" />
                    <span>Case study</span>
                  </span>
                </>
              )}
            </p>

            <p className="font-bold text-left text-xl lg:text-2xl leading-normal group-hover:mb-1 transition-all">
              {project.title}
            </p>

            <p
              style={{ color: project.color }}
              className={`px-[1px] font-bold flex items-center gap-[6px] opacity-0 group-hover:opacity-100 hover:gap-2 text-left text-sm absolute bottom-0 group-hover:bottom-4 transition-all]`}
            >
              {project.cta && (
                <>
                  {project.cta}{" "}
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
export default ProjectCard;
