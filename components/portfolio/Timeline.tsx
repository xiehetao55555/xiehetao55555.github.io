import { experience } from "@/content/experience";
import { externalHref } from "@/lib/links";
import Reveal from "@/components/Reveal";
import SectionHeading from "./SectionHeading";
import { Icon } from "./Icons";
const typeLabels = {
  work: "EXPERIENCE",
  education: "EDUCATION",
  opensource: "OPEN SOURCE",
  milestone: "MILESTONE",
};
export default function Timeline() {
  return (
    <section
      className="section experience-section shell"
      id="experience"
      aria-label="经历时间线"
    >
      <Reveal>
        <SectionHeading
          number="03"
          label="THE JOURNEY SO FAR"
          title="From hardware to embodied AI"
          description="具身学习、实时控制与嵌入式系统的工程实践。"
        />
      </Reveal>
      <ol className="timeline">
        {experience.map((item) => (
          <li key={item.id} className="timeline-item">
            <Reveal className="timeline-row">
              <div className="timeline-period">
                <span>{item.period}</span>
                <span className="timeline-type">{typeLabels[item.type]}</span>
              </div>
              <div className="timeline-point" aria-hidden="true">
                <i />
              </div>
              <div className="timeline-content">
                {item.organization && (
                  <span className="timeline-organization">
                    {item.organization}
                  </span>
                )}
                <h3>{item.role}</h3>
                <p>{item.description}</p>
                {item.contributions.length > 0 && (
                  <ul>
                    {item.contributions.map((contribution) => (
                      <li key={contribution}>{contribution}</li>
                    ))}
                  </ul>
                )}
                {item.links
                  ?.filter((link) => externalHref(link.href))
                  .map((link) => (
                    <a
                      key={link.href}
                      href={externalHref(link.href)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="timeline-link"
                    >
                      {link.label}
                      <Icon name="external" width="15" height="15" />
                      <span className="sr-only">（在新标签页打开）</span>
                    </a>
                  ))}
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
