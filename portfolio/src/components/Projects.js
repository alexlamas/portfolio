import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import Row from "./Row";
import Modal from "./Modal";

function Projects() {
  const [isModalOpen, setModalState] = useState(false);
  const [openProject, setOpenProject] = useState({});

  const clickProject = (project) => {
    if (!project.link) {
      setOpenProject(project);
      setModalState(true);
    } else {
      window.location.href = project.link;
    }
  };

  const projects = [
    {
      title: "Timeline view",
      year: "This year",
      company: "Airtable",
      image: "/assets/timeline.png",
      cta: "Read",
      type: "case",
      id: 0,
      color: "#8175EC",
      figma:
        "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2F1YSUL5Qxkgdhxr4YLzVGaH%2FPortfolio%3Fpage-id%3D13476%253A62074%26type%3Ddesign%26node-id%3D13476-62075%26viewport%3D8098%252C597%252C0.52%26t%3DuT4pWEjskvcanAUH-1%26scaling%3Dscale-down-width%26hotspot-hints%3D0%26mode%3Ddesign%26hide-ui%3D1",
    },
    {
      title: "Golden datasets",
      year: "1 year ago",
      company: "Airtable",
      image: "/assets/relationships.png",
      cta: "Read",
      type: "case",
      id: 1,
      luminosity: true,
      color: "#CF71E7",
      figma:
        "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2F1YSUL5Qxkgdhxr4YLzVGaH%2FPortfolio-2023%3Fpage-id%3D12702%253A7241%26type%3Ddesign%26node-id%3D12702-7242%26viewport%3D-14717%252C-8525%252C1.46%26t%3DLxjq9ZTd1iCoWr7R-1%26scaling%3Dscale-down-width%26hotspot-hints%3D0%26mode%3Ddesign%26hide-ui%3D1",
    },
    {
      title: "Pitch shifter",
      year: "4 years ago",
      company: "SoundX",
      image: "/assets/shifter.png",
      id: 3,
      cta: "Watch the video",
      color: "#31a685",
      link: "https://www.youtube.com/watch?v=-B-8Jd34lpU",
      type: "video",
    },
    {
      title: "Agent-based modelling",
      year: "5 years ago",
      company: "Simudyne",
      image: "/assets/simudyne.png",
      type: "case",
      luminosity: true,
      cta: "Read",
      id: 2,
      color: "#48A2CF",
      figma:
        "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2F1YSUL5Qxkgdhxr4YLzVGaH%2FPortfolio%3Fpage-id%3D13476%253A66968%26type%3Ddesign%26node-id%3D13476-66969%26viewport%3D7784%252C382%252C0.51%26t%3DjhPQPcRwfC08QXeI-1%26scaling%3Dscale-down-width%26hotspot-hints%3D0%26mode%3Ddesign%26hide-ui%3D1",
    },
  ];
  return (
    <>
      <Modal
        isModalOpen={isModalOpen}
        setModalState={setModalState}
        project={openProject}
      />
      <Row
        children={
          <ProjectCard project={projects[0]} clickProject={clickProject} />
        }
        sibling={
          <ProjectCard project={projects[1]} clickProject={clickProject} />
        }
      ></Row>
      <Row
        children={
          <ProjectCard project={projects[2]} clickProject={clickProject} />
        }
        sibling={
          <ProjectCard project={projects[3]} clickProject={clickProject} />
        }
      ></Row>
    </>
  );
}

export default Projects;
