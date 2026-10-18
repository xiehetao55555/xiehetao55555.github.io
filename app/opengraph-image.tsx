import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
export const runtime = "nodejs";
export const dynamic = "force-static";
export const alt = "Robotics & Embodied AI — In motion";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#090b11",
          color: "#f3f4f9",
          display: "flex",
          flexDirection: "column",
          padding: "66px 76px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontSize: 18,
            letterSpacing: "4px",
            color: "#a0a9c7",
            display: "flex",
          }}
        >
          PERSONAL PORTFOLIO / VOL. 01
        </div>
        <div
          style={{
            fontSize: 86,
            letterSpacing: "-5px",
            lineHeight: 1.02,
            marginTop: 80,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Robotics.</span>
          <span style={{ color: "#9dabff" }}>In motion.</span>
        </div>
        <div
          style={{
            position: "absolute",
            right: -35,
            top: 60,
            width: 455,
            height: 455,
            border: "60px solid #737fbb",
            borderRadius: "50%",
            transform: "rotate(-28deg) scaleX(0.64)",
            background: "linear-gradient(140deg, #101426, #1c2051)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 15,
            top: 124,
            width: 400,
            height: 300,
            border: "18px solid #9ba7da",
            borderRadius: "50%",
            transform: "rotate(34deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 56,
            left: 76,
            fontSize: 17,
            color: "#a0a9c7",
            display: "flex",
          }}
        >
          {profile.name || "ROBOTICS / EMBODIED AI"}
        </div>
        <div
          style={{
            position: "absolute",
            right: 76,
            bottom: 56,
            fontSize: 14,
            letterSpacing: "2px",
            color: "#a0a9c7",
            display: "flex",
          }}
        >
          WORK · ABOUT · EXPERIENCE
        </div>
      </div>
    ),
    size,
  );
}
