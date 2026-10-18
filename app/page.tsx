import Header from "@/components/portfolio/Header";
import Hero from "@/components/portfolio/Hero";
import Projects from "@/components/portfolio/Projects";
import About from "@/components/portfolio/About";
import Timeline from "@/components/portfolio/Timeline";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
import { profile } from "@/content/profile";
import { socials } from "@/content/socials";
import { externalHref } from "@/lib/links";
import { siteUrl } from "@/lib/site";

export default function Home() {
  const person =
    !profile.isPlaceholder && siteUrl
      ? {
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          jobTitle: profile.role,
          url: siteUrl,
          sameAs: socials.links
            .map((link) => externalHref(link.href))
            .filter(Boolean),
        }
      : null;
  return (
    <>
      {person && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(person).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <a href="#main-content" className="skip-link">
        跳转到主要内容
      </a>
      <div id="top" />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Projects />
        <About />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
