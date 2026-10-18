import { profile } from "@/content/profile";
import { socials } from "@/content/socials";
import { publicEmail, resumeHref } from "@/lib/links";
import CopyEmail from "@/components/CopyEmail";
import Reveal from "@/components/Reveal";
import { BrandMark, Icon } from "./Icons";
import SocialLinks from "./SocialLinks";
export default function Contact() {
  const email = publicEmail(socials.email);
  const resume = resumeHref(socials.resume);
  return (
    <section
      className="contact-section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="shell">
        <Reveal>
          <div className="contact-top">
            <p className="eyebrow">
              <span className="section-number">04</span>GOOD THINGS START WITH A
              CONVERSATION
            </p>
            {profile.availability && (
              <span className="availability">
                <span className="status-dot" />
                {profile.availability}
              </span>
            )}
          </div>
          <div className="contact-main">
            <h2 id="contact-title">
              Let’s make
              <br />
              <em>robots move.</em>
            </h2>
            <BrandMark className="contact-star" />
          </div>
          <div className="contact-bottom">
            <div className="contact-invitation">
              <p>欢迎交流机器人、遥操作与具身智能相关想法。</p>
              {email ? (
                <div className="email-contact">
                  <a href={`mailto:${email}`}>
                    {email}
                    <Icon name="external" />
                  </a>
                  <CopyEmail email={email} className="copy-email">
                    <Icon name="copy" width="16" height="16" />
                    <span className="sr-only">复制邮箱地址</span>
                  </CopyEmail>
                </div>
              ) : (
                <p className="contact-todo">TODO · 公开联系方式待补充。</p>
              )}
            </div>
            <div className="contact-link-group">
              <SocialLinks />
              {resume && (
                <a
                  className="resume-link"
                  href={resume}
                  target={resume.startsWith("/") ? undefined : "_blank"}
                  rel={
                    resume.startsWith("/") ? undefined : "noopener noreferrer"
                  }
                >
                  <Icon name="download" width="16" height="16" />
                  Download résumé
                </a>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
