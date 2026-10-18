import { profile } from "@/content/profile";
import Reveal from "@/components/Reveal";
import { BrandMark, Icon } from "./Icons";
const skillIcons = ["code", "server", "spark", "layers"] as const;
export default function About() {
  return (
    <section
      id="about"
      className="section about-section"
      aria-labelledby="about-title"
    >
      <div className="shell">
        <Reveal>
          <p className="eyebrow">
            <span className="section-number">02</span>FROM ALGORITHMS TO
            REAL-WORLD SYSTEMS
          </p>
        </Reveal>
        <div className="about-grid">
          <Reveal className="about-statement">
            <h2 id="about-title">
              Built to learn.
              <br />
              Made to
              <br />
              <em>move.</em>
            </h2>
            <div className="about-signature">
              <BrandMark />
              <span>
                ALWAYS A WORK
                <br />
                IN PROGRESS.
              </span>
            </div>
          </Reveal>
          <Reveal className="about-copy" delay={70}>
            <span className="section-kicker">A LITTLE ABOUT ME</span>
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {profile.focusAreas.length > 0 && (
              <div className="focus-areas">
                <span>EXPLORING</span>
                {profile.focusAreas.map((area) => (
                  <span key={area} className="focus-chip">
                    {area}
                  </span>
                ))}
              </div>
            )}
            <div className="principles">
              {profile.principles.map((principle, i) => (
                <div key={principle.title}>
                  <span className="principle-number">0{i + 1}</span>
                  <div>
                    <h3>{principle.title}</h3>
                    <p>{principle.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        {!!profile.research?.length && (
          <Reveal className="research-strip">
            <p className="section-kicker">SELECTED RESEARCH</p>
            <div className="research-list">
              {profile.research.map((paper) => (
                <details key={paper.title} className="research-item">
                  <summary>
                    <span>
                      <strong>{paper.title}</strong>
                      <span className="research-meta">
                        {paper.venue}
                        <span> / </span>
                        {paper.authorship}
                      </span>
                    </span>
                    <span className="research-toggle" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p>{paper.citation}</p>
                </details>
              ))}
            </div>
          </Reveal>
        )}
        <div className="skills-heading">
          <span className="section-kicker">MY TOOLBOX</span>
          <p>
            {profile.skillGroups.some((group) => !group.items.length)
              ? "TODO · 仅填写真实使用的技术，不设置虚构熟练度。"
              : "从模型学习到实时控制与真机联调。"}
          </p>
        </div>
        <div className="skills-grid">
          {profile.skillGroups.map((group, index) => (
            <Reveal key={group.name} delay={index * 40}>
              <div className="skill-card">
                <Icon name={skillIcons[index % skillIcons.length]} />
                <h3>{group.name}</h3>
                {group.items.length ? (
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="skill-placeholder">TODO · 添加真实技能</p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
