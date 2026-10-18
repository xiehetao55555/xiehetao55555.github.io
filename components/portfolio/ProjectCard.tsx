"use client";
import Image from "next/image";
import { useRef } from "react";
import type { Project } from "@/content/types";
import { externalHref } from "@/lib/links";
import { Icon } from "./Icons";

export default function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  return (
    <article
      ref={ref}
      className={`project-card project-card-${project.size} project-accent-${project.accent} ${project.cover ? "" : "project-card-text"}`}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const element = ref.current;
        if (!element) return;
        const rect = element.getBoundingClientRect();
        element.style.setProperty(
          "--pointer-x",
          `${event.clientX - rect.left}px`,
        );
        element.style.setProperty(
          "--pointer-y",
          `${event.clientY - rect.top}px`,
        );
      }}
    >
      <div className="project-spotlight" aria-hidden="true" />
      {project.cover && (
        <button
          type="button"
          className="project-cover-button"
          onClick={onOpen}
          aria-label={`查看${project.name}的详情`}
        >
          <div className="project-cover">
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 700px"
              className="project-cover-image"
            />
            <span className="cover-label">
              {project.isPlaceholder
                ? "TODO / PLACEHOLDER"
                : project.cover.kind === "illustration"
                  ? "SYSTEM ILLUSTRATION / 系统示意"
                  : project.category}
            </span>
            <span className="cover-open">
              <Icon name="external" />
            </span>
          </div>
        </button>
      )}
      <div className="project-content">
        <div className="project-category">
          <span>{project.category}</span>
          <span>{project.year || String(index + 1).padStart(2, "0")}</span>
        </div>
        <h3>
          <button type="button" onClick={onOpen}>
            {project.name}
          </button>
        </h3>
        <p className="project-description">{project.description}</p>
        <p className="project-role">
          <span>MY ROLE</span>
          {project.role}
        </p>
        <ul className="project-highlights">
          {project.highlights.slice(0, 3).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="project-bottom">
          <div className="stack-list">
            {project.stack.length ? (
              project.stack.map((item) => <span key={item}>{item}</span>)
            ) : (
              <span className="empty-stack">TODO · 技术栈待补充</span>
            )}
          </div>
          <div className="project-links">
            {externalHref(project.github) && (
              <a
                href={externalHref(project.github)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} GitHub（在新标签页打开）`}
              >
                <Icon name="github" width="17" height="17" />
              </a>
            )}
            {externalHref(project.demo) && (
              <a
                href={externalHref(project.demo)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name}在线演示（在新标签页打开）`}
              >
                <Icon name="external" width="18" height="18" />
              </a>
            )}
            <button
              type="button"
              className="detail-button"
              onClick={onOpen}
              aria-label={`阅读${project.name}的项目详情`}
            >
              <span>View details</span>
              <Icon name="arrow" width="17" height="17" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
