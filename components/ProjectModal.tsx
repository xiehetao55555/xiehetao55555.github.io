"use client";
import { useEffect, useRef, type KeyboardEvent } from "react";
import type { Project } from "@/content/types";
import { externalHref } from "@/lib/links";
import Carousel from "@/components/Carousel";
import { Icon } from "@/components/portfolio/Icons";

function keepFocusInDialog(event: KeyboardEvent<HTMLDialogElement>) {
  if (event.key !== "Tab") return;
  const controls = Array.from(
    event.currentTarget.querySelectorAll<HTMLElement>(
      "button:not([disabled]), a[href], [tabindex='0']",
    ),
  ).filter((element) => element.getClientRects().length > 0);
  const first = controls[0];
  const last = controls[controls.length - 1];
  if (!first || !last) return;
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

// Native dialog preserves upstream's details + carousel and adds focus trapping.
export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previous;
      dialog?.close();
    };
  }, []);
  const screenshots = project.screenshots?.length
    ? project.screenshots
    : project.cover
      ? [project.cover]
      : [];
  const relatedDemos =
    project.relatedDemos?.filter((demo) => externalHref(demo.href)) || [];
  return (
    <dialog
      ref={ref}
      className={`project-dialog ${screenshots.length ? "" : "project-dialog-text"}`}
      aria-labelledby="project-dialog-title"
      onKeyDown={keepFocusInDialog}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="project-dialog-inner">
        <button
          type="button"
          onClick={onClose}
          className="dialog-close"
          aria-label="关闭项目详情"
          autoFocus
        >
          <Icon name="close" />
        </button>
        {screenshots.length > 0 && (
          <Carousel
            media={screenshots.map((item) => item.src)}
            altTexts={screenshots.map((item) => item.alt)}
            projectNum={project.category}
          />
        )}
        <div className="dialog-body">
          <p className="eyebrow">
            {project.category}
            {project.isPlaceholder && " / TODO PLACEHOLDER"}
          </p>
          <h2 id="project-dialog-title">{project.name}</h2>
          <p className="dialog-description">{project.description}</p>
          <div className="dialog-facts">
            <div>
              <h3>MY ROLE</h3>
              <p>{project.role}</p>
            </div>
            <div>
              <h3>TECH STACK</h3>
              <p>
                {project.stack.length
                  ? project.stack.join(" / ")
                  : "TODO · 添加真实技术栈"}
              </p>
            </div>
          </div>
          <h3>THE STORY</h3>
          <p>{project.details}</p>
          <h3>HIGHLIGHTS</h3>
          <ul>
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
          {relatedDemos.length > 0 && (
            <aside className="related-demos" aria-label="上游方案演示">
              <h3>上游方案演示</h3>
              {relatedDemos.map((demo) => (
                <a
                  key={demo.href}
                  href={externalHref(demo.href)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="demo-play" aria-hidden="true">
                    <Icon name="play" width="15" height="15" />
                  </span>
                  <span>
                    <strong>{demo.label}</strong>
                    <small>{demo.source} · 官方开源技术演示</small>
                  </span>
                  <Icon name="external" width="15" height="15" />
                  <span className="sr-only">（在新标签页打开）</span>
                </a>
              ))}
            </aside>
          )}
          <div className="dialog-links">
            {externalHref(project.github) && (
              <a
                className="button button-secondary"
                href={externalHref(project.github)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="github" />
                GitHub<span className="sr-only">（在新标签页打开）</span>
              </a>
            )}
            {externalHref(project.demo) && (
              <a
                className="button button-primary"
                href={externalHref(project.demo)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
                <Icon name="external" />
                <span className="sr-only">（在新标签页打开）</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}
