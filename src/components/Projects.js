
import ProjectCard from "./ProjectCard";
import Row from "./Row";


function Projects() {
  const projects = [
    {
      title: "Airtable",
      year: "2022-2024",
      company: "",
      image: "/assets/timeline.png",
      gif: "/assets/timeline.gif",
      cta: "Guided strategy and design for core Airtable surfaces—navigation, filters, Timeline, and AI—while partnering with engineers, researchers, and strategic customers end to end",
      type: "case",
      id: 0,
      color: "#8175EC",
      tint: "#8175EC",
      figma:
        "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2F1YSUL5Qxkgdhxr4YLzVGaH%2FPortfolio%3Fpage-id%3D13476%253A62074%26type%3Ddesign%26node-id%3D13476-62075%26viewport%3D8098%252C597%252C0.52%26t%3DuT4pWEjskvcanAUH-1%26scaling%3Dscale-down-width%26hotspot-hints%3D0%26mode%3Ddesign%26hide-ui%3D1",
    },
    {
      title: "Pitch shifter",
      year: "2020",
      company: "SoundX",
      image: "/assets/shifter.png",
      cta: "Built a C++/JUCE audio plugin that lets deaf listeners feel pitch and harmony through haptics",
      type: "video",
      id: 3,
      color: "#31a685",
      tint: "#31a685",
      link: "https://www.youtube.com/watch?v=-B-8Jd34lpU",
      backgroundColor: "transparent",
    },
    {
      title: "More projects coming soon",
      year: "",
      company: "",
      image: "",
      gif: "",
      cta: "",
      type: "placeholder",
      id: 4,
      backgroundColor: "transparent",
    },
  ];
  return (
    <>
      <Row
        children={
          <div className="flex items-center justify-center h-full min-h-[400px] p-8">
            <div className="w-full h-full flex items-center justify-center bg-neutral-50 dark:bg-neutral-900/50 rounded-lg">
              <img
                src="/assets/placeholder-gif.gif"
                alt="Animated thought"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        }
        sibling={
          <div className="flex items-center h-full min-h-[400px] p-8">
            <div className="relative w-full">
              <div
                className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight text-foreground"
                style={{
                  maskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
                }}
              >
                Design is not just what it looks like and feels like.
                <br />
                <br />
                Design is how it works.
                <br />
                <br />
                And how it makes you feel.
              </div>
            </div>
          </div>
        }
      />
      <Row>
        <ProjectCard project={projects[0]} />
      </Row>
      <Row
        children={<ProjectCard project={projects[1]} />}
        sibling={<ProjectCard project={projects[2]} />}
      ></Row>
      <Row>
        <div className="h-[280px]"></div>
      </Row>
    </>
  );
}

export default Projects;
