export type Technology = {
  id: string;
  label: string;
  tone: "blue" | "violet" | "mint" | "silver";
  size: number;
  x: number;
  y: number;
};

// Shared by the first-screen bubbles and project filters. Project associations
// live in projects[].technologyIds; adding a keyword never creates a fake project.
export const technologies: Technology[] = [
  { id: "qt", label: "Qt / C++", tone: "silver", size: 86, x: 7, y: 18 },
  { id: "lerobot", label: "LeRobot", tone: "blue", size: 102, x: 27, y: 18 },
  { id: "hands", label: "灵巧手", tone: "violet", size: 104, x: 48, y: 14 },
  { id: "pico", label: "PICO", tone: "silver", size: 108, x: 69, y: 22 },
  { id: "sonic", label: "SONIC", tone: "blue", size: 104, x: 89, y: 17 },
  { id: "ros2", label: "ROS2", tone: "mint", size: 112, x: 14, y: 49 },
  { id: "ppo", label: "PPO", tone: "violet", size: 94, x: 34, y: 46 },
  { id: "g1", label: "宇树 G1", tone: "blue", size: 146, x: 54, y: 49 },
  { id: "vla", label: "VLA", tone: "violet", size: 112, x: 75, y: 48 },
  {
    id: "solidworks",
    label: "SolidWorks",
    tone: "silver",
    size: 130,
    x: 91,
    y: 53,
  },
  { id: "embedded", label: "嵌入式", tone: "mint", size: 110, x: 8, y: 80 },
  { id: "rgbd", label: "RGB-D", tone: "silver", size: 98, x: 28, y: 79 },
  { id: "software", label: "软件开发", tone: "blue", size: 102, x: 48, y: 83 },
  { id: "groot", label: "GR00T N1.7", tone: "violet", size: 140, x: 69, y: 81 },
  { id: "pi05", label: "PI0.5", tone: "mint", size: 112, x: 89, y: 82 },
];
