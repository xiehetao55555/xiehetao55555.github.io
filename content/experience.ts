import type { Experience } from "./types";

// Employer names were not supplied; omit them rather than invent organizations.
export const experience: Experience[] = [
  {
    id: "robotics-algorithm-engineer",
    isPlaceholder: false,
    type: "work",
    period: "2026.06.08 — 至今",
    organization: "",
    role: "算法工程师",
    description: "围绕宇树 G1 开展全身遥操作、灵巧手控制与具身学习系统开发。",
    contributions: [
      "打通示教采集、数据转换、模型微调与真机部署，完成抓取放置及语音按钮操作验证。",
    ],
    links: [],
  },
  {
    id: "vla-algorithm-engineer",
    isPlaceholder: false,
    type: "work",
    period: "2026.03.02 — 2026.05.31",
    organization: "",
    role: "VLA 算法工程师",
    description:
      "面向 60+ DoF 轮式双臂机器人，构建仿真、遥操作采集与 VLA 训练工程框架。",
    contributions: [
      "跑通单臂最小训练闭环，设计 SFT / PPO 数据流程与实时控制部署方案。",
    ],
    links: [],
  },
  {
    id: "embedded-engineer",
    isPlaceholder: false,
    type: "work",
    period: "2025.09.28 — 2026.02.27",
    organization: "",
    role: "嵌入式工程师",
    description:
      "基于 ESP32-S3 开发无线肌电系统，贯通采集硬件、Qt6 上位机与移动端。",
    contributions: ["实现 8 通道 250 SPS 采集、BLE 传输、信号滤波与手势识别。"],
    links: [],
  },
];
