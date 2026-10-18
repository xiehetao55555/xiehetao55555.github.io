import { profile } from "@/content/profile";
import { BrandMark, Icon } from "./Icons";
export default function Footer() {
  return (
    <footer className="site-footer shell">
      <div>
        <BrandMark />
        <p>
          © {new Date().getFullYear()} {profile.name || "Robotics Portfolio"}
          <span>Embodied AI. Real-world systems.</span>
        </p>
      </div>
      <a href="#top">
        BACK TO TOP <Icon name="arrow" width="15" height="15" />
      </a>
    </footer>
  );
}
