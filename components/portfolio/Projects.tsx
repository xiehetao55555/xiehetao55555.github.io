import { projects } from "@/content/projects";
import Reveal from "@/components/Reveal";
import SectionHeading from "./SectionHeading";
import ProjectExplorer from "./ProjectExplorer";
export default function Projects() {
  return (
    <section
      className="section work-section shell"
      id="work"
      aria-label="精选项目"
    >
      <Reveal>
        <SectionHeading
          number="01"
          label="SELECTED WORK"
          title="Intelligence, put into practice"
          description={
            projects.some((p) => p.isPlaceholder)
              ? "TODO — 添加真实作品。以下封面为原创视觉占位，不代表已完成的项目。"
              : "从全身遥操作到微型机器人，精选工程实践与研究。"
          }
        />
      </Reveal>
      <ProjectExplorer projects={projects} />
      <div className="work-footnote">
        <span>BUILT WITH INTENTION. ALWAYS EVOLVING.</span>
        <span>
          {String(projects.length).padStart(2, "0")} /{" "}
          {projects.every((p) => p.isPlaceholder)
            ? "PLACEHOLDERS"
            : "SELECTED PROJECTS"}
        </span>
      </div>
    </section>
  );
}
