import Link from "next/link";
import { BrandMark, Icon } from "@/components/portfolio/Icons";
export default function NotFound() {
  return (
    <main className="not-found shell">
      <BrandMark />
      <p className="eyebrow">404 / OUTSIDE THE ORBIT</p>
      <h1>Lost in space?</h1>
      <p>这个页面暂时不在轨道上。</p>
      <Link href="/" className="button button-primary">
        Return to home
        <Icon name="arrow" />
      </Link>
    </main>
  );
}
