import { socials } from "@/content/socials";
import { externalHref, publicEmail } from "@/lib/links";
import { Icon } from "./Icons";

export default function SocialLinks({
  showEmail = false,
}: {
  showEmail?: boolean;
}) {
  const links = socials.links.filter((link) => externalHref(link.href));
  const email = showEmail ? publicEmail(socials.email) : undefined;
  if (!links.length && !email) return null;
  return (
    <div className="social-links">
      {links.map((link) => (
        <a
          key={link.href}
          href={externalHref(link.href)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name={link.icon} />
          <span>{link.label}</span>
          <span className="sr-only">（在新标签页打开）</span>
        </a>
      ))}
      {email && (
        <a href={`mailto:${email}`}>
          <Icon name="mail" />
          <span>Email</span>
        </a>
      )}
    </div>
  );
}
