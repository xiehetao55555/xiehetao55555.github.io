"use client";
import { useCallback, useRef, useState } from "react";
import type { Project } from "@/content/types";
import Reveal from "@/components/Reveal";
import ProjectModal from "@/components/ProjectModal";
import ProjectCard from "./ProjectCard";

export default function BentoGrid({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Project | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const close = useCallback(() => {
    setSelected(null);
    requestAnimationFrame(() => returnFocus.current?.focus());
  }, []);
  return (
    <>
      <div className="bento-grid">
        {projects.map((project, index) => (
          <Reveal
            key={project.id}
            className={`bento-item bento-item-${project.size}`}
            delay={(index % 2) * 70}
            distance={18}
          >
            <ProjectCard
              project={project}
              index={index}
              onOpen={() => {
                returnFocus.current = document.activeElement as HTMLElement;
                setSelected(project);
              }}
            />
          </Reveal>
        ))}
      </div>
      {selected && <ProjectModal project={selected} onClose={close} />}
    </>
  );
}
