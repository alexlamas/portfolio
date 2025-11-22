
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
          <div className="flex items-center justify-center h-full min-h-[600px] p-8">
            <div className="w-full h-full flex items-center justify-center bg-neutral-50 dark:bg-neutral-900/50 rounded-lg">
              <img
                src="/assets/ai-interface-image.png"
                alt="AI Interface"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
          </div>
        }
        sibling={
          <div className="flex items-start h-full min-h-[600px] p-8 overflow-y-auto">
            <div className="w-full font-serif">
              <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Eight Ways Humans Actually Want to Work with AI (And None of Them Are Chat)
              </h1>

              <p className="text-lg mb-4 opacity-75">
                Docs are boring. Who even reads docs anymore? So here's the thing nobody wants to admit: we're forcing AI through the wrong interface.
              </p>

              <p className="text-base mb-4 opacity-75">
                We've trapped AI in chatboxes like it's 2016 and we just discovered conversational interfaces. Meanwhile, users are out here writing elaborate prompts trying to coerce chat into being something it's not. It's like watching someone try to edit video through a command line.
              </p>

              <p className="text-base mb-6 opacity-75">
                There's a reason why managing multiple AI sessions feels like tab hell. We're forcing square pegs into round holes.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold mb-4 mt-8">
                The Eight Paradigms Nobody's Building For
              </h2>

              <p className="text-base mb-6 opacity-75">
                When you actually observe how humans collaborate (with each other or with AI), eight distinct patterns emerge. And guess what? Only one of them actually needs a chatbox.
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold mb-1">1. Manager-IC: "I think, you execute"</h3>
                  <p className="text-base opacity-75">You delegate a task and come back when it's done. This should feel like Jira, not Slack.</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-1">2. Autocomplete: "Finish my thought"</h3>
                  <p className="text-base opacity-75">The best autocomplete is invisible. The moment you context-switch to chat, you've already failed.</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-1">3. Generate-Discriminate: "Show me options"</h3>
                  <p className="text-base opacity-75">I want a gallery of variations, not a text description of possibilities. This is why Midjourney works.</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-1">4. Feedback: "Check my work"</h3>
                  <p className="text-base opacity-75">Code review isn't a conversation. Stop making it one.</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-1">5. Efficient Coupling: "Let's riff"</h3>
                  <p className="text-base opacity-75">True collaboration means working on the same thing simultaneously, not taking turns like it's 1995.</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-1">6. Division of Labor: "You do this, I'll do that"</h3>
                  <p className="text-base opacity-75">Parallel work that merges later. Think Git, not Gmail.</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-1">7. Learning: "Teach me"</h3>
                  <p className="text-base opacity-75">Interactive tutorials &gt; walls of text. Always.</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-1">8. Domain Transcendence: "Help me work outside my expertise"</h3>
                  <p className="text-base opacity-75">A marketer doing SQL needs guardrails, not a chatbot.</p>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-4 mt-8">
                The Chat vs. Work Problem
              </h2>

              <p className="text-base mb-4 opacity-75">
                Here's the core tension: there's "talking about work" and there's "getting work done." Current AI products pretend these are the same thing. They're not.
              </p>

              <p className="text-base mb-6 opacity-75">
                Making autonomous work modes feel like chat is a regression on the chat experience. It's like making a spreadsheet behave like a document. Wrong tool, wrong paradigm.
              </p>

              <p className="text-base mb-6 opacity-75">
                The ridiculous part? We're asking users to understand our implementation details. "Is this a chat or an agent task?" Nobody should have to think about this. The interface should just know.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold mb-4 mt-8">
                The Interface Revolution Nobody's Building
              </h2>

              <p className="text-base mb-4 opacity-75">
                Imagine this: You're working on a document. AI autocompletes your sentences without you asking. You highlight a section, get variations instantly in a sidebar. Split screen to research while writing. Request review when done.
              </p>

              <p className="text-base mb-4 opacity-75">
                No chatbox. No prompts. No "talking to Claude."
              </p>

              <p className="text-base mb-6 opacity-75">
                Just work, amplified.
              </p>

              <p className="text-base mb-6 opacity-75">
                What if instead of a mode toggle, you had tabs: "Chat", "Code", "Work". Or better yet, kill the chat input entirely for most use cases.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold mb-4 mt-8">
                Why This Matters Now
              </h2>

              <p className="text-base mb-4 opacity-75">
                We're at the point where AI sessions increasingly won't be initiated by humans. But we're still designing for human-initiated chat. That's like designing cars for horses.
              </p>

              <p className="text-base mb-6 opacity-75">
                The companies that win won't have the best models. They'll be the ones who realize that different types of collaboration need different interfaces.
              </p>

              <p className="text-base mb-6 opacity-75">
                GitHub Copilot gets this. Cursor gets this. They're not "chatting" - they're working.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold mb-4 mt-8">
                The Empty Textbox Problem
              </h2>

              <p className="text-base mb-4 opacity-75">
                An empty chatbox is intimidating. Its capabilities are completely undiscoverable. You have no idea what the AI can do or how to invoke different capabilities.
              </p>

              <p className="text-base mb-6 opacity-75">
                Compare this to a tool palette, where each tool's icon and position suggests its purpose and use. We need that for AI, not another text input.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold mb-4 mt-8">
                The Bottom Line
              </h2>

              <p className="text-base mb-4 opacity-75">
                Five years from now, we'll look back at chat-only AI interfaces the way we look at command lines today. Powerful for those who mastered them, unnecessarily restrictive for everyone else.
              </p>

              <p className="text-base mb-4 opacity-75">
                The chatbox was our bootstrap. Time to build what we actually need.
              </p>

              <p className="text-base mb-4 opacity-75">
                Stop making users choose between "chat" and "task." Start building interfaces that match how humans actually want to work.
              </p>

              <p className="text-base font-bold opacity-90">
                The future isn't better chatbots. It's no chatbots.
              </p>
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
