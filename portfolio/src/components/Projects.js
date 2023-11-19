import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import Row from "./Row";
import Modal from "./Modal";

function Projects() {
  const [isModalOpen, setModalState] = useState(false);
  const [openProject, setOpenProject] = useState({});
  const toggleModal = () => {
    setModalState(!isModalOpen);
  };
  const projects = [
    {
      title: "System for building apps",
      year: "This year",
      company: "Airtable",
      image: "/assets/timeline.png",
      cta: "Read",
      type: "case",
      id: 0,
      color: "#8175EC",
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
        "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2F1YSUL5Qxkgdhxr4YLzVGaH%2FPortfolio-2023%3Fpage-id%3D12702%253A7241%26type%3Ddesign%26node-id%3D12702-7242%26viewport%3D-14717%252C-8525%252C1.46%26t%3DLxjq9ZTd1iCoWr7R-1%26scaling%3Dmin-zoom%26mode%3Ddesign",
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
    },
    {
      title: "Pitch shifter",
      year: "4 years ago",
      company: "SoundX",
      image: "/assets/shifter.png",
      id: 3,
      cta: "Watch the video",
      color: "#31a685",
    },
  ];
  return (
    <div className="pb-48">
      <Modal
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        project={openProject}
      />
      <Row
        children={
          <ProjectCard
            project={projects[0]}
            toggleModal={toggleModal}
            setOpenProject={setOpenProject}
          />
        }
        sibling={
          <ProjectCard
            project={projects[1]}
            toggleModal={toggleModal}
            setOpenProject={setOpenProject}
          />
        }
      ></Row>
      <Row
        children={
          <ProjectCard
            project={projects[2]}
            toggleModal={toggleModal}
            setOpenProject={setOpenProject}
          />
        }
        sibling={
          <ProjectCard
            project={projects[3]}
            toggleModal={toggleModal}
            setOpenProject={setOpenProject}
          />
        }
      ></Row>
    </div>
  );
}

export default Projects;
