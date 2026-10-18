import type { Profile } from "./types";

// Content is selected from the owner's supplied experience, not inferred.
// TODO: Add a public name/nickname and the final site URL before indexing.
// isPlaceholder remains true solely because the name has not been supplied.
export const profile: Profile = {
  isPlaceholder: true,
  name: "",
  role: "算法工程师 · 具身智能与机器人",
  headline: ["Robotics,", "in motion."],
  introduction: "让感知、学习与控制，在真实世界相遇。",
  about: [
    "围绕具身智能与机器人系统开展工程实践，工作覆盖全身遥操作、灵巧手重定向、VLA 训练及真机部署。",
    "也关注力觉临场感与微型机器人控制，将感知、学习、硬件与控制链路连接起来。",
  ],
  focusAreas: ["全身遥操作", "灵巧操作", "VLA / Sim2Real"],
  principles: [
    {
      title: "Human → Robot",
      description: "动作重定向、全身遥操作与双灵巧手协同。",
    },
    {
      title: "Data → Policy",
      description: "示教采集、VLA 微调与强化学习训练链路。",
    },
    {
      title: "Sim → Real",
      description: "从仿真接口到实时控制、标定与真机验证。",
    },
  ],
  skillGroups: [
    {
      name: "Embodied AI",
      items: ["LeRobot", "VLA / SFT", "PPO", "Isaac Lab", "MuJoCo"],
    },
    {
      name: "Robotics & Control",
      items: ["ROS", "动作重定向", "IK / WBC", "阻抗控制", "RGB-D 标定"],
    },
    {
      name: "Systems & Hardware",
      items: ["C++ / Qt6", "ESP32-S3", "BLE", "UDP / ZMQ", "Jetson Orin NX"],
    },
    {
      name: "Simulation & Design",
      items: ["SolidWorks", "COMSOL", "ANSYS", "MATLAB"],
    },
  ],
  research: [
    {
      title: "液下无缆 SAW 微机器人",
      venue: "ICBSR 2025",
      authorship: "第一作者",
      citation:
        "A Bio-inspired SAW-Propelled Microrobot for Untethered Motion in Liquid Environments.",
    },
    {
      title: "声表面波与慢性创面愈合",
      venue: "Device · Cell Press",
      authorship: "第二作者",
      citation:
        "Chronic Wound Healing using Surface Acoustic Waves via Enhanced and Coordinated Cell Migration.",
    },
  ],
  location: "",
  availability: "",
  siteUrl: "https://robotics-in-motion-7f42.wiry-song-2934.chatgpt.site",
  seo: {
    title: "机器人与具身智能 | 技术作品集",
    description:
      "围绕全身遥操作、灵巧操作、VLA 训练部署与微机器人控制的精选工程实践与研究。",
    allowIndexing: false,
  },
};
