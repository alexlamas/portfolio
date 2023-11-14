import Project from "./Project";

function Projects() {
  return (
    <div className="pb-24">
      <div className="relative border-y border-zinc-300 dark:border-zinc-200/20 hover:bg-zinc-200/20 dark:hover:bg-zinc-800/20">
        <div className="w-9/12 xl:w-[1024px] mx-auto flex flex-wrap md:flex-nowrap ">
          <div className="p-4 md:border-r border-zinc-300 dark:border-zinc-200/20">
            <Project
              title="App platform for teams"
              year="2023"
              company="Airtable"
              image="/assets/timeline.png"
              link="https://www.figma.com/proto/1YSUL5Qxkgdhxr4YLzVGaH/Portfolio-2023?page-id=12702%3A7241&type=design&node-id=12702-7242&viewport=734%2C397%2C0.02&t=JebLpjCz96onc8hH-8&scaling=scale-down&hotspot-hints=0&hide-ui=1"
            />
          </div>
          <div className="p-4 hidden md:block">
            <Project
              title="Automation builder"
              year="2020"
              company="Tray.io"
              image="/assets/tray.png"
            />
          </div>
        </div>
      </div>
      <div className="relative border-b border-zinc-300 dark:border-zinc-200/20 md:hidden">
        <div className="w-9/12 xl:w-[1024px] mx-auto flex flex-wrap md:flex-nowrap ">
          <div className="p-4">
            <Project
              title="Automation builder"
              year="2020"
              company="Tray.io"
              image="/assets/tray.png"
            />
          </div>
        </div>
      </div>

      <div className="relative border-b border-zinc-300 dark:border-zinc-200/20 hover:bg-zinc-200/20 dark:hover:bg-zinc-800/20">
        <div className="w-9/12 xl:w-[1024px] mx-auto flex flex-wrap md:flex-nowrap ">
          <div className="p-4 md:border-r border-zinc-300 dark:border-zinc-200/20">
            <Project
              title="Modelling tool"
              year="2018"
              company="Simudyne"
              image="/assets/simudyne.png"
            />
          </div>
          <div className="p-4 hidden md:block">
            <Project
              title="Automation builder"
              year="2020"
              company="Tray.io"
              image="/assets/tray.png"
            />
          </div>
        </div>
      </div>
      <div className="relative border-b border-zinc-300 dark:border-zinc-200/20 md:hidden">
        <div className="w-9/12 xl:w-[1024px] mx-auto flex flex-wrap md:flex-nowrap ">
          <div className="p-4">
            <Project
              title="Automation builder"
              year="2020"
              company="Tray.io"
              image="/assets/tray.png"
            />
          </div>
        </div>
      </div>
      {/* <iframe
          width="800"
          height="450"
          title="Airtable app"
          src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2F1YSUL5Qxkgdhxr4YLzVGaH%2FPortfolio-2023%3Fpage-id%3D12702%253A7241%26type%3Ddesign%26node-id%3D12702-7242%26viewport%3D734%252C397%252C0.02%26t%3DJebLpjCz96onc8hH-1%26scaling%3Dscale-down%26hotspot-hints%3D0%26mode%3Ddesign"
          allowfullscreen
        ></iframe> */}
    </div>
  );
}

export default Projects;
