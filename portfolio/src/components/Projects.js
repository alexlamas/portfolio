import React, { useState } from "react";
import Project from "./Project";
import Row from "./Row";
import Modal from "./Modal";

function Projects() {
  const [isModalOpen, setModalState] = useState(false);
  const [projectID, setProjectID] = useState({});
  const toggleModal = (projectID) => {
    setModalState(!isModalOpen);
    setProjectID(projectID);
  };
  return (
    <div className="pb-48">
      <Modal
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        projectID={projectID}
      />
      <Row
        children={
          <Project
            title="System for building apps"
            year="This year"
            company="Airtable"
            image="/assets/timeline.png"
            cta="Read"
            type="case"
            projectID={0}
          />
        }
        sibling={
          <Project
            title="Golden datasets"
            year="1 year ago"
            company="Airtable"
            image="/assets/relationships.svg"
            cta="Read"
            type="case"
            projectID={1}
            luminosity
          />
        }
      ></Row>
      <Row
        children={
          <Project
            title="Agent-based modelling"
            year="5 years ago"
            company="Simudyne"
            image="/assets/simudyne.svg"
            type="case"
            luminosity
            cta="Read"
            projectID={2}
          />
        }
        sibling={
          <Project
            title="Pitch shifter"
            year="4 years ago"
            company="SoundX"
            image="/assets/shifter.png"
            projectID={3}
            cta="Watch the video"
          />
        }
      ></Row>
    </div>
  );
}

export default Projects;
