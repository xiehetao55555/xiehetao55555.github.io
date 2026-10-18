# Robotics, in motion. — 机器人与具身智能作品集

基于 GitHub MIT 开源项目渐进改造的 Next.js 作品集。首页是星际星云中的技术泡泡星图：15 个技术关键词缓慢浮动，点击即可滚动到第二屏并筛选全部关联项目。下方提供六个精选项目、详情弹窗、技术领域、三段工作经历、两项可展开的科研成果与真实邮箱联系入口。

已选用你提供的真实经历与邮箱 **wansuizi@163.com**。没有推测姓名、单位、GitHub 或未提供的成果。项目采用简洁的文字卡片，已撤下全部生成示意图；没有真实素材时不渲染图片、轮播或空白占位。支持 standalone 与 Sites 静态托管，发布状态以 Sites 部署记录为准。

## 开源基础

工程基础：[Txemalon/3d-portfolio](https://github.com/Txemalon/3d-portfolio)，原始提交 `52cfcb8f8e1c192d9dc44edb3cb70feae79d49d7`。`LICENSE` 完整保留上游 MIT 与 Jose Maria Albero Belamendia 的版权声明。

参考 [Magic UI Portfolio](https://github.com/magicuidesign/portfolio) 的配置式内容、Bento 与克制的显现动效。最终选择 Txemalon，是因为它已有 Next.js App Router、React Three Fiber、TypeScript、Tailwind 4 和 standalone / Docker 配置。没有复制付费模板，也没有引入整套 Magic UI。

继续使用上游目录、路由与样式体系，复用并改进 `Reveal`、`Carousel`、`CopyEmail`、项目弹窗和移动端检测。旧的键盘、主题、语言等可选组件保留在源码中，默认页面不挂载它们。旧样式位于 `styles/template.css`，旧弹窗位于 `components/template/`。原作者的简历和项目截图已移出 `public/`，不随本站发布。

## 版本与安装

| 技术              | 上游锁定版本 | 当前版本 |
| ----------------- | ------------ | -------- |
| Next.js           | 16.2.4       | 16.4.2   |
| React / React DOM | 19.2.4       | 19.2.4   |
| Tailwind CSS      | 4.2.2        | 4.2.2    |
| Three.js          | 0.184.0      | 0.184.0  |
| React Three Fiber | 9.6.0        | 9.6.0    |
| Drei              | 10.7.7       | 10.7.7   |
| TypeScript        | 5.9.3        | 5.9.3    |

Next.js 与对应的 `eslint-config-next` 更新至 16.4.2，是为了修复原锁定版本已披露的 [Windows 服务端 RCE](https://github.com/vercel/next.js/security/advisories/GHSA-p293-qw3h-jr36) 和 [next/og ImageResponse RCE](https://github.com/vercel/next.js/security/advisories/GHSA-vcvr-r3jv-pc5j)，并更新了审计涉及的间接依赖。没有更换技术栈。原有 Lenis 仍可选，新首页使用原生滚动，没有新增后端、登录、分析服务或动画依赖。

使用 Node.js 22 或 24、npm 10+，以 `package-lock.json` 为唯一安装依据，避免混用包管理器。

```bash
npm ci
npm run dev
```

打开终端显示的地址，通常为 `http://localhost:3000`。

```bash
npm run lint
npm run typecheck
npm run check:content
npm run build
```

本项目继承 `output: "standalone"`。本地运行生产构建：

```bash
node scripts/prepare-standalone.mjs
node .next/standalone/server.js
```

资源准备脚本将 `public` 和 `.next/static` 复制到 standalone 输出，不修改源文件。需要指定监听时，在当前终端设置 `HOSTNAME=127.0.0.1`、`PORT=3000`；公网托管由平台设置监听地址。

## 结构与关键文件

```text
app/
  page.tsx                    组合首页各区块
  layout.tsx                  标题、描述、字体与 Open Graph
  globals.css                 泡泡材质、设计系统与响应式样式
  icon.svg / opengraph-image.tsx
  robots.ts / sitemap.ts      草稿和域名决定是否开放索引
content/
  profile.ts                  姓名、定位、首屏、介绍、技能、研究和 SEO
  technologies.ts             泡泡标签、位置、大小与颜色
  projects.ts                 六个项目、贡献、详情、封面及技术关联
  experience.ts               三段工作经历及可选单位 / 链接
  socials.ts                  真实邮箱、可选 GitHub 与简历
  types.ts                    内容类型
components/portfolio/
  Hero.tsx                    玻璃泡泡、键盘链接与暂停控制
  three/HeroVisual.tsx         懒加载、静态降级与可见性管理
  three/OrbitalScene.tsx       R3F 稀疏星点；保留原金属雕塑能力
  ProjectExplorer.tsx          URL 筛选、项目数量与清除筛选
  BentoGrid.tsx / ProjectCard.tsx
  About.tsx / Timeline.tsx / Contact.tsx / Footer.tsx
components/ProjectModal.tsx   原生 dialog 项目详情与焦点约束
lib/projectFilter.ts          泡泡跳转、筛选同步和浏览器前进 / 后退
public/art/                   本地星云与备用 3D 降级图
scripts/                      内容关联检查与 standalone 资源准备
Dockerfile / next.config.ts   原有部署方式与安全头
```

## 更新个人资料和项目

所有个人内容通过 `content/` 修改，不需要编辑页面 JSX。

- `profile.ts`：填 `name`（真实姓名或公开昵称）；`headline` 是两段首屏标题，第二段用衬线强调；`role`、`introduction`、`about`、`focusAreas`、`skillGroups` 和 `principles` 可按真实情况调整。`research` 当前仅选两篇，完整英文题名在页面点击展开。
- `experience.ts`：当前只展示你提供的三段任职，单位 `organization` 留空且不显示。每项支持时间、类型、角色、简介、贡献和真实相关链接。类型支持 `work`、`education`、`opensource`、`milestone`。
- `socials.ts`：邮箱已配置。`links`、`resume` 留空时不显示按钮；有真实 GitHub 时再填写。简历 PDF 可放到 `public/resume.pdf` 并配置 `/resume.pdf`。邮箱支持邮件客户端与复制反馈，没有联系表单。
- `projects.ts`：每个对象包括名称、价值说明、职责、技术栈、2–3 个亮点、详情和可选 GitHub / Demo。增删数组项即可更新页面，建议 3–6 项。`cover` 和 `screenshots` 均为可选：没有真实素材就省略，不会留下图片区域。日后加入真实截图时，把文件放入 `public/`，填写 `cover.src`、描述性 `alt`，将 `cover.kind` 设为 `screenshot`；`screenshots` 可配置详情图集。未配置的外部链接不会渲染。

G1 遥操作详情保留一条 `relatedDemos`：宇树官方仓库提供的 [G1 + Dex3-1 演示](https://www.youtube.com/watch?v=OTWHXTu09wE)，来源为 [unitreerobotics/xr_teleoperate](https://github.com/unitreerobotics/xr_teleoperate)。页面明确将其列为“上游方案演示”，仅作为相关开源技术参考，不代表本人的实机项目录像。使用外部文本链接，不自动加载播放器、封面或第三方视频资源。每条参考需配置 `label`、`href` 和 `source`。

当前精选：G1 全身遥操作与具身学习、语音驱动的电梯按钮操作、力觉临场感遥操作、声表面波水下微机器人、VLA 训练框架、无线肌电采集。已保留离线映射误差的验证条件，区分单臂训练闭环与后续双臂部署方案，没有扩写未经提供的成功率或公司信息。

### 泡泡与项目关联

`technologies.ts` 定义技术的唯一 `id`、可见标签、材质颜色、桌面位置与直径。手机自动排为三列五行，降低位移幅度。`projects[].technologyIds` 定义项目所属技术；同一项目可以关联多个技术，同一技术会列出所有关联项目。

例如 `g1` 关联遥操作与语音按钮项目，`embedded` 关联水下微机器人与无线肌电，`pi05` 关联 VLA 框架。筛选使用真实 URL `/?tech=g1#work`，可复制分享，支持前进 / 后退；“全部项目”清除筛选。筛选栏也可直接切换技术。

增加泡泡时，添加 registry 条目并在至少一个项目的 `technologyIds` 中添加该 `id`；超过 15 个时应同时检查手机布局并调整 `Hero.tsx` 的自动行距。`npm run check:content` 会检查重复 ID、未知技术、空关联、资源和链接格式，防止泡泡点开没有内容。

## 动画、性能和可访问性

玻璃泡泡使用原生链接和 CSS 材质，文字在首屏 HTML 中可读，支持键盘焦点；星云为本地原创 SVG，WebGL 不可用时仍然完整呈现。无远程模型、纹理、HDR 或付费素材。

R3F 场景为独立客户端组件，通过 `next/dynamic({ ssr: false })` 懒加载，在首屏绘制且靠近视口后初始化。桌面最多 84 个低亮星点，DPR 上限 1.6；手机降为 36 个、DPR 上限 1.25，并默认按需渲染星点。泡泡在手机上缓慢小幅浮动。

“暂停动效”同时控制泡泡与星点；离开首屏或切到后台时暂停。`prefers-reduced-motion` 时泡泡静止且不加载 WebGL；节省流量模式跳过 WebGL。初始化异常、上下文丢失或 WebGL2 不可用时保留完整静态星云和可点击泡泡。

包含跳过导航、可见焦点、语义标题、图片说明与状态播报。点击泡泡后焦点移至筛选结果说明。原生 `<dialog>` 支持 Tab / Shift+Tab 约束、Esc 关闭与返回原触发位置。详情图集手动切换，不自动播放。

## 上线与索引

本地结构检查允许草稿构建。当前已配置 Sites 的 HTTPS 地址，公开姓名尚待补充，`profile.isPlaceholder=true`、`seo.allowIndexing=false`：页面为 `noindex`，robots 禁止抓取、sitemap 为空。这只影响搜索引擎收录，不阻止访客通过公开链接浏览。

正式上线前：

1. 填写公开姓名 / 昵称，将 `profile.isPlaceholder` 设为 `false`。
2. 将 `profile.siteUrl` 设为你的最终 HTTPS 站点地址。
3. 确认内容可公开，将 `seo.allowIndexing` 设为 `true`，运行以下检查。

```bash
npm run check:publish
npm audit --omit=dev
npm run build
```

`check:publish` 当前会列出公开姓名与索引开关两项待办并返回非零，这是内容收录检查的预期行为。GitHub、Demo、单位、简历均为可选。公开浏览不要求开启搜索索引。它检查链接格式，不判断私人项目权限或成果真实性。

### Sites 静态托管

本项目可选用 Next.js 官方静态导出，不更换页面框架：

```bash
npm run build:static
```

生成的 `out/` 包含完整 HTML、JavaScript、CSS、字体、分享图和本地素材。技术泡泡、筛选、详情和 3D 均在浏览器运行，不需要常驻本地电脑或 Node 服务。`.openai/hosting.json` 绑定当前 Sites 项目及静态目录；通过 Sites 工作流推送源码、打包并部署后生效。默认 `npm run build` 仍生成 standalone，用于 Vercel / Docker 等原有方式。

预分配站点地址：[Robotics, in motion.](https://robotics-in-motion-7f42.wiry-song-2934.chatgpt.site)。仅在托管服务报告部署成功后才代表已经上线。

### GitHub Pages：免费 github.io 地址

GitHub Pages 的自动发布配置已放在 `.github/workflows/deploy-pages.yml`。目标为你的个人主页仓库 `<GitHub用户名>.github.io`，对应地址 `https://<GitHub用户名>.github.io/`。这只是地址格式；在完成账号授权、实际创建仓库并发布成功前，不代表新地址已存在。

使用 GitHub Free 时，Pages 仓库需要设为公开。授权后可创建或检查该个人主页仓库，将代码推送到 `main`，并在仓库的 Settings → Pages 中将发布来源设为 GitHub Actions。若同名仓库已经有内容，应先检查已有站点，不能直接覆盖。

工作流会执行 `npm ci`、lint、类型检查、内容检查与 `npm run build:static`，上传 `out/` 并部署。无需填写个人访问令牌或添加自建密钥。仓库内的 `.nojekyll` 会随静态资源输出；Pages 的实际 `base_url` 通过 `PORTFOLIO_SITE_URL` 注入构建，自动用于 canonical、Open Graph、robots、sitemap 和结构化数据，避免新站引用旧托管地址。

目前工作流按个人根站点设计，明确检查仓库名为 `<owner>.github.io`；普通 `/<repository>/` 项目站需要额外适配资源路径。个人资料仍为草稿时可通过链接浏览，但暂不开放搜索索引。

### Vercel / Next.js 托管平台

将源码推送至你自己的 GitHub 仓库，在平台导入。安装 `npm ci`，构建 `npm run build`，选择 Node.js 22 或 24 和 Next.js 预设。当前仅配置追踪来源的 `upstream`，没有替你创建或推送仓库。不需要密钥、数据库或额外环境变量；不要把 `.next` 当静态站目录上传。

### Docker / 自托管

```bash
docker build -t personal-portfolio .
docker run --rm -p 3000:3000 personal-portfolio
```

Docker 复制 standalone、静态文件和 `public`，以非 root 用户监听 3000；通过托管平台或 HTTPS 反向代理连接公网域名。`work/`、`outputs/`、环境文件与 Git 元数据不会进入镜像。Docker 命令未在当前环境实跑。

## 仍可补充的内容

仍待补充：**公开姓名 / 昵称**；确认资料后可开放搜索索引。已有 Sites 域名可使用，也可另行绑定自有域名。可选：希望公开的单位、GitHub、真实项目照片 / 视频 / 截图、Demo、简历 PDF、研究成果的正式链接。没有提供的内容继续隐藏，不展示虚假按钮。

代码沿用 MIT；`public/art/` 与程序几何体为本次原创，保留上游许可证及来源说明即可。Geist 字体通过 Next.js 官方字体集成加载；仓库保留的旧组件资源默认首页不使用。
