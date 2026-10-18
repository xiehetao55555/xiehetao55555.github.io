"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { useIsMobile } from "@/lib/useIsMobile";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { Icon } from "../Icons";

const OrbitalScene = dynamic(() => import("./OrbitalScene"), {
  ssr: false,
  loading: () => null,
});

class SceneBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function subscribeVisibility(listener: () => void) {
  document.addEventListener("visibilitychange", listener);
  return () => document.removeEventListener("visibilitychange", listener);
}

export default function HeroVisual({
  cosmicOnly = false,
  paused = false,
}: {
  cosmicOnly?: boolean;
  paused?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const foreground = useSyncExternalStore(
    subscribeVisibility,
    () => !document.hidden,
    () => true,
  );
  const [inView, setInView] = useState(false);
  const [canRender, setCanRender] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [motionOverride, setMotionOverride] = useState<boolean | null>(null);
  const onFailure = useCallback(() => setFailed(true), []);
  const onReady = useCallback(() => setLoaded(true), []);

  // Static SVG first; load WebGL after first paint and near the viewport.
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let scheduled = false;
    let timer: number | undefined;
    const saveData = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection?.saveData;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (!entry.isIntersecting || scheduled || reducedMotion || saveData)
          return;
        scheduled = true;
        timer = window.setTimeout(() => {
          try {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("webgl2", {
              failIfMajorPerformanceCaveat: true,
            });
            if (!context) {
              setFailed(true);
              return;
            }
            context.getExtension("WEBGL_lose_context")?.loseContext();
            setCanRender(true);
          } catch {
            setFailed(true);
          }
        }, 250);
      },
      { threshold: 0.01 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [reducedMotion]);

  const showScene = canRender && !failed && !reducedMotion;
  const motionEnabled = motionOverride ?? !isMobile;
  const animated =
    showScene && motionEnabled && inView && foreground && !paused;

  if (cosmicOnly)
    return (
      <div
        ref={ref}
        className="cosmic-backdrop"
        data-motion={animated ? "on" : "off"}
        aria-hidden="true"
      >
        <Image
          src="/art/nebula.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="nebula-poster"
        />
        {showScene && (
          <SceneBoundary onFailure={onFailure}>
            <OrbitalScene
              cosmicOnly
              isMobile={isMobile}
              animated={animated}
              onReady={onReady}
              onFailure={onFailure}
            />
          </SceneBoundary>
        )}
        <div className="cosmic-vignette" />
      </div>
    );

  return (
    <div
      ref={ref}
      className="hero-visual"
      data-motion={animated ? "on" : "off"}
    >
      <div className="hero-nebula" aria-hidden="true" />
      <div
        className="hero-art"
        role="img"
        aria-label="深空中悬浮的金属环、玻璃球与稀疏星点组成的抽象雕塑"
      >
        <div className="orbital-guides" aria-hidden="true">
          <span />
          <span />
          <i className="guide-cross guide-cross-one">+</i>
          <i className="guide-cross guide-cross-two">+</i>
        </div>
        <Image
          src="/art/orbital-poster.svg"
          alt=""
          width={760}
          height={760}
          priority
          className={`hero-art-poster ${showScene && loaded ? "is-rendered" : ""}`}
        />
        {showScene && (
          <SceneBoundary onFailure={onFailure}>
            <OrbitalScene
              isMobile={isMobile}
              animated={animated}
              onReady={onReady}
              onFailure={onFailure}
            />
          </SceneBoundary>
        )}
      </div>
      <span className="art-coordinate art-coordinate-top" aria-hidden="true">
        FIG. 001 — A DIFFERENT PERSPECTIVE
      </span>
      <div className="art-caption">
        <span>
          <i className={`tiny-dot ${showScene && loaded ? "live-dot" : ""}`} />
          {showScene && loaded ? "REALTIME / WEBGL" : "STILL / ORBITAL STUDY"}
        </span>
        <span>CHROME · GLASS · SPACE</span>
      </div>
      {showScene && loaded && (
        <button
          type="button"
          className="scene-control"
          onClick={() => setMotionOverride(!motionEnabled)}
          aria-label={
            motionEnabled ? "暂停 3D 与星点动效" : "播放 3D 与星点动效"
          }
          aria-pressed={motionEnabled}
        >
          <Icon
            name={motionEnabled ? "pause" : "play"}
            width="12"
            height="12"
          />
          <span>{motionEnabled ? "Pause motion" : "Play motion"}</span>
        </button>
      )}
    </div>
  );
}
