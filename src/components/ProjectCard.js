

function ProjectCard({ project }) {
  if (project.type === "placeholder") {
    return (
      <div className="h-full">
        <div className="cursor-default relative flex flex-col border border-transparent h-full w-full">
          <div className="p-5 pb-0 flex justify-items-center h-full w-full">
            <div className="w-full aspect-[4/3]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="h-full">
        <button
          className={`cursor-default group relative flex flex-col border border-transparent h-full w-full `}
        >
          <div className="p-5 pb-0 flex justify-items-center h-full w-full ">
            {project.gif && project.image ? (
              <div className="relative h-full w-full flex items-center group/inner p-2">
                <img
                  draggable="false"
                  className="select-none w-4/5 rounded-lg drop-shadow-2xl group-hover:drop-shadow-3xl transition border border-black/5 overflow-hidden"
                  src={project.image}
                  alt={project.alt}
                />
                <div className="absolute right-0 h-48 max-w-88 rounded-lg overflow-hidden drop-shadow-xl group-hover/inner:drop-shadow-2xl group-hover:-translate-y-1 border bg-white/50 backdrop-blur-lg  border-black/5 transition-all">
                  <img
                    draggable="false"
                    className="select-none w-full h-full object-cover transition opacity-80 "
                    src={project.gif}
                    alt={project.alt}
                  />
                </div>
              </div>
            ) : project.gif ? (
              <div
                style={{
                  backgroundColor:
                    project.backgroundColor ?? "rgba(255, 255, 255, 0.05)",
                }}
                className="rounded-sm p-2 h-full w-full items-center justify-center flex group-hover:shadow-lg transition-colors"
              >
                <img
                  draggable="false"
                  className="select-none w-full rounded drop-shadow-sm group-hover:drop-shadow-md items-center justify-center transition"
                  src={project.gif}
                  alt={project.alt}
                />
              </div>
            ) : project.image ? (
              <div
                style={{
                  backgroundColor:
                    project.backgroundColor ?? "rgba(255, 255, 255, 0.05)",
                }}
                className="rounded-sm p-2 h-full w-full items-center justify-center flex group-hover:shadow-lg transition-colors"
              >
                <img
                  draggable="false"
                  style={{
                    mixBlendMode: project.luminosity && "luminosity",
                  }}
                  className="select-none w-100 rounded drop-shadow-sm group-hover:drop-shadow-md items-center justify-center transition"
                  src={project.image}
                  alt={project.alt}
                />
              </div>
            ) : (
              <div
                style={{
                  backgroundColor:
                    project.backgroundColor ?? "transparent",
                }}
                className="rounded-sm p-2 h-full w-full items-center justify-center flex"
              >
                <div className="w-full aspect-[4/3] rounded-md border border-foreground/20" />
              </div>
            )}
          </div>
          <div className="pt-6 pb-6 px-6 transition-all">
            {(project.company || project.year || project.type === "case") && (
              <p className="px-[1px] text-xs lg:text-sm mb-2 text-foreground/75 dark:text-neutral-400 flex gap-2 transition-all">
                {project.company && <span>{project.company}</span>}
                {project.company && project.year && <span>·</span>}
                {project.year && (
                  <span className="flex items-center gap-1 whitespace-nowrap">
                    {project.year}
                  </span>
                )}

              </p>
            )}
            <div className="transition-all">
              <p className=" text-foreground/95 font-bold text-left text-xl lg:text-2xl leading-normal">
                {project.title}
              </p>
            </div>
            <p

              className="text-foreground/75 text-left text-xl md:text-xl leading-normal md:leading-8 font-normal mt-1 transition-all"
            >
              {project.cta}
              
            </p>
          </div>
        </button>
      </div>
    </>
  );
}
export default ProjectCard;
