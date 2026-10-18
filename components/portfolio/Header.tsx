"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/profile";
import { BrandMark, Icon } from "./Icons";

const items = [
  { href: "#work", label: "Work", number: "01" },
  { href: "#about", label: "About", number: "02" },
  { href: "#experience", label: "Experience", number: "03" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const navigation = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    const onClick = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".site-header"))
        setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a
          href="#top"
          className="wordmark"
          aria-label="返回首页"
          onClick={() => setOpen(false)}
        >
          <BrandMark />
          <span>
            {profile.isPlaceholder ? "PORTFOLIO" : profile.name}
            <span className="brand-period">.</span>
          </span>
        </a>
        <nav
          ref={navigation}
          id="main-navigation"
          aria-label="主要导航"
          className={`main-nav ${open ? "is-open" : ""}`}
        >
          {items.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              <sup>{item.number}</sup>
              {item.label}
            </a>
          ))}
          <a
            className="mobile-contact"
            href="#contact"
            onClick={() => setOpen(false)}
          >
            Contact <Icon name="external" />
          </a>
        </nav>
        <a href="#contact" className="header-contact">
          Let’s talk <Icon name="external" width="16" height="16" />
        </a>
        <button
          ref={button}
          className="menu-toggle"
          type="button"
          aria-label={open ? "关闭导航菜单" : "打开导航菜单"}
          aria-controls="main-navigation"
          aria-expanded={open}
          onClick={() => {
            setOpen(!open);
            if (!open)
              requestAnimationFrame(() =>
                navigation.current
                  ?.querySelector<HTMLAnchorElement>("a")
                  ?.focus(),
              );
          }}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
    </header>
  );
}
