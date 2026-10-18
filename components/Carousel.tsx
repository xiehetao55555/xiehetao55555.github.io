"use client";

import { useState } from "react";

type Props = {
  media?: string[];
  // Visible fallback when no real screenshots are provided yet — keeps the
  // carousel UI testable/authentic while the user fills in assets later.
  projectNum: string;
  altPrefix?: string;
  altTexts?: string[];
};

// Lightweight manual carousel: prev/next arrows and dot indicators.
// Uses plain <img> for local screenshot swap-in. If `media` is
// missing or empty we render 3 placeholder slides with varying gradients so
// the UI still reads as a gallery.
export default function Carousel({
  media,
  projectNum,
  altPrefix = "项目图片",
  altTexts,
}: Props) {
  const slides =
    media && media.length > 0
      ? media
      : // 3 placeholder slides so the carousel controls make sense.
        [null, null, null];
  const [idx, setIdx] = useState(0);

  const go = (delta: number) => {
    setIdx((i) => (i + delta + slides.length) % slides.length);
  };

  return (
    <div className="carousel" role="region" aria-label="项目图片轮播">
      <div
        className="carousel__track"
        style={{ transform: `translateX(-${idx * 100}%)` }}
      >
        {slides.map((src, i) => (
          <div key={i} className="carousel__slide">
            {src ? (
              // Real screenshot
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt={altTexts?.[i] || `${altPrefix} ${i + 1}`}
                className="carousel__img"
                loading="lazy"
              />
            ) : (
              // Placeholder — each slide uses a different gradient origin so
              // they're visually distinct while the carousel is browsed.
              <div
                className="carousel__placeholder"
                style={{
                  background: `radial-gradient(circle at ${30 + i * 20}% ${
                    35 + i * 15
                  }%, var(--ice-500), transparent 55%),
                     radial-gradient(circle at ${75 - i * 10}% ${
                       65 - i * 10
                     }%, var(--ice-700), transparent 55%),
                     linear-gradient(135deg, var(--ink-2), var(--ink-0))`,
                }}
              >
                <span className="project-modal__media-num">{projectNum}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            className="carousel__nav carousel__nav--prev"
            onClick={() => go(-1)}
            data-cursor="hover"
            aria-label="上一张图片"
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden
            >
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            className="carousel__nav carousel__nav--next"
            onClick={() => go(1)}
            data-cursor="hover"
            aria-label="下一张图片"
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
          <div className="carousel__dots">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIdx(i)}
                data-cursor="hover"
                aria-label={`查看第 ${i + 1} 张图片`}
                aria-current={i === idx ? "true" : undefined}
                className={`carousel__dot ${
                  i === idx ? "carousel__dot--active" : ""
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
