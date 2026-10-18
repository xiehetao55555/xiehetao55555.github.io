"use client";

import { useState } from "react";

type Props = {
  media?: string[];
  projectNum: string;
  altPrefix?: string;
  altTexts?: string[];
};

// Lightweight manual carousel: prev/next arrows and dot indicators.
// No configured media means no gallery or reserved image area.
export default function Carousel({
  media,
  altPrefix = "项目图片",
  altTexts,
}: Props) {
  const slides = media || [];
  const [idx, setIdx] = useState(0);
  if (!slides.length) return null;

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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={altTexts?.[i] || `${altPrefix} ${i + 1}`}
              className="carousel__img"
              loading="lazy"
            />
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
