"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { technologies } from "@/content/technologies";
import { technologyLink, useProjectFilter } from "@/lib/projectFilter";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { Icon } from "./Icons";
import HeroVisual from "./three/HeroVisual";

function subscribeVisibility(listener: () => void) {
  document.addEventListener("visibilitychange", listener);
  return () => document.removeEventListener("visibilitychange", listener);
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const foreground = useSyncExternalStore(
    subscribeVisibility,
    () => !document.hidden,
    () => true,
  );
  const [inView, setInView] = useState(true);
  const [paused, setPaused] = useState(false);
  const active = useProjectFilter();
  const animated = !paused && !reducedMotion && foreground && inView;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="cosmic-hero"
      aria-labelledby="hero-title"
      data-motion={animated ? "on" : "off"}
    >
      <HeroVisual cosmicOnly paused={!animated} />
      <div className="shell cosmic-inner">
        <div className="cosmic-heading">
          <p className="eyebrow">
            <span className="small-cross">+</span> A UNIVERSE OF ROBOTICS &amp;
            IDEAS
          </p>
          <h1 id="hero-title">
            {profile.headline[0]} <em>{profile.headline[1]}</em>
          </h1>
          <p className="cosmic-role">
            {profile.name && (
              <>
                {profile.name}
                <span> / </span>
              </>
            )}
            {profile.role}
          </p>
          <p className="cosmic-intro">{profile.introduction}</p>
        </div>
        <div
          className="bubble-constellation"
          aria-label="技术关键词，点击查看相关项目"
        >
          <div className="constellation-orbit" aria-hidden="true" />
          {technologies.map((technology, index) => {
            const count = projects.filter((project) =>
              project.technologyIds.includes(technology.id),
            ).length;
            const style = {
              "--bubble-size": `${technology.size}px`,
              "--bubble-x": `${technology.x}%`,
              "--bubble-y": `${technology.y}%`,
              "--mobile-x": `${16 + (index % 3) * 34}%`,
              "--mobile-y": `${9 + Math.floor(index / 3) * 20}%`,
              "--float-duration": `${14 + (index % 5) * 2.3}s`,
              "--float-delay": `${-index * 1.7}s`,
            } as CSSProperties;
            return (
              <a
                key={technology.id}
                href={`?tech=${technology.id}#work`}
                className={`tech-bubble tone-${technology.tone}`}
                style={style}
                onClick={(event) => technologyLink(event, technology.id)}
                aria-label={`${technology.label}，查看 ${count} 个相关项目`}
                aria-current={active === technology.id ? "true" : undefined}
              >
                <span className="bubble-float">
                  <span className="bubble-glass">
                    <span className="bubble-label">{technology.label}</span>
                    <span className="bubble-count">
                      {String(count).padStart(2, "0")} PROJECT
                      {count === 1 ? "" : "S"}
                    </span>
                    <span className="bubble-arrow" aria-hidden="true">
                      <Icon name="arrow" width="15" height="15" />
                    </span>
                  </span>
                </span>
              </a>
            );
          })}
        </div>
        <div className="cosmic-bottom">
          <div className="cosmic-hint">
            <span className="tiny-dot" />
            点击一颗技术泡泡，探索相关项目
          </div>
          <div className="cosmic-actions">
            <a
              className="cosmic-explore"
              href="?#work"
              onClick={(event) => technologyLink(event, null)}
            >
              全部项目 <Icon name="down" width="15" height="15" />
            </a>
            <span className="cosmic-action-divider" />
            <a href="#contact">
              Contact Me <Icon name="external" width="13" height="13" />
            </a>
          </div>
          <button
            type="button"
            className="cosmic-motion"
            disabled={reducedMotion}
            aria-pressed={!paused && !reducedMotion}
            aria-label={
              reducedMotion
                ? "已遵循系统减少动态效果设置"
                : paused
                  ? "播放泡泡与星点动效"
                  : "暂停泡泡与星点动效"
            }
            onClick={() => setPaused(!paused)}
          >
            <Icon
              name={paused || reducedMotion ? "play" : "pause"}
              width="12"
              height="12"
            />
            <span>
              {reducedMotion
                ? "STILL UNIVERSE"
                : paused
                  ? "PLAY MOTION"
                  : "PAUSE MOTION"}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
