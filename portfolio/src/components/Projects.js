import { useState } from "react";
import Project from "./Project";
import Border from "./Border";
import Row from "./Row";
import Modal from "./Modal";

function Projects() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCardClick = () => {
    setIsModalOpen(!isModalOpen);
    console.log("clicked");
  };

  return (
    <div className="pb-24">
      <Modal isOpen={isModalOpen} handleCardClick={handleCardClick} />
      <Border />
      <Row>
        <div className="flex">
          <div
            onClick={handleCardClick}
            className="md:border-r border-zinc-300 dark:border-zinc-200/20"
          >
            <Project
              title="Build apps for anything"
              year="This year"
              company="Airtable"
              image="/assets/timeline.png"
            />
          </div>

          <div className="hidden md:block">
            <Project
              title="Connect your tools"
              year="2 years ago"
              company="Tray.io"
              image="/assets/tray.png"
            />
          </div>
        </div>
      </Row>
      <Border />
      <div className=" md:hidden">
        <Row>
          <div className="flex">
            <div className="">
              <Project
                title="Connect your tools"
                year="2 years ago"
                company="Tray.io"
                image="/assets/tray.png"
              />
            </div>
          </div>
        </Row>
        <Border />
      </div>
      <Row>
        <div className="flex">
          <div className=" md:border-r border-zinc-300 dark:border-zinc-200/20">
            <Project
              title="Modelling tool"
              year="5 years ago"
              company="Simudyne"
              image="/assets/simudyne.png"
            />
          </div>
          <div className=" hidden md:block">
            <Project
              title="Pitch shifter"
              year="4 years ago"
              company="SoundX"
              image="/assets/shifter.png"
            />
          </div>
        </div>
      </Row>
      <Border />
      <div className="md:hidden">
        <Row>
          <div className="flex">
            <div className="">
              <Project
                title="Pitch shifter"
                year="2019"
                company="SoundX"
                image="/assets/shifter.png"
              />
            </div>
          </div>
        </Row>
        <Border />
      </div>
    </div>
  );
}

export default Projects;
