"use client";

import { technologies } from "@/content/technologies";
import type { Project } from "@/content/types";
import { selectTechnology, useProjectFilter } from "@/lib/projectFilter";
import BentoGrid from "./BentoGrid";
import { Icon } from "./Icons";

export default function ProjectExplorer({ projects }: { projects: Project[] }) {
  const requested = useProjectFilter();
  const active = technologies.find((technology) => technology.id === requested);
  const visible = active
    ? projects.filter((project) => project.technologyIds.includes(active.id))
    : projects;
  return (
    <>
      <div className="project-filter-bar">
        <p
          id="project-results-status"
          className="project-results-status"
          role="status"
          aria-live="polite"
          tabIndex={-1}
        >
          {active ? (
            <>
              <strong>{active.label}</strong>
              <span>相关项目 · {visible.length} 项</span>
            </>
          ) : (
            <>
              <strong>全部项目</strong>
              <span>{projects.length} 项精选实践</span>
            </>
          )}
        </p>
        <div className="project-filter-controls">
          <label className="technology-select">
            <span className="sr-only">按技术筛选项目</span>
            <select
              aria-label="按技术筛选项目"
              value={active?.id || ""}
              onChange={(event) =>
                selectTechnology(event.target.value || null, false)
              }
            >
              <option value="">全部技术</option>
              {technologies.map((technology) => (
                <option key={technology.id} value={technology.id}>
                  {technology.label}
                </option>
              ))}
            </select>
            <Icon name="down" width="13" height="13" />
          </label>
          {active && (
            <button
              type="button"
              className="clear-filter"
              onClick={() => selectTechnology(null, false)}
            >
              全部项目
              <Icon name="close" width="13" height="13" />
            </button>
          )}
        </div>
      </div>
      <BentoGrid key={active?.id || "all"} projects={visible} />
    </>
  );
}
