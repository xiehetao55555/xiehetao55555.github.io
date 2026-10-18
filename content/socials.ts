import type { Socials } from "./types";

// Public email explicitly supplied by the owner for this portfolio.
// email: your public email; resume: local /resume.pdf or an HTTPS URL.
// links: [{ label: "GitHub", href: your actual profile URL, icon: "github" }]
// Empty values produce no button, no dead href and no fake social profile.
export const socials: Socials = {
  email: "wansuizi@163.com",
  resume: "",
  links: [
    {
      label: "GitHub",
      href: "https://github.com/xiehetao55555",
      icon: "github",
    },
  ],
};
