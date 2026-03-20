"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Navbar.css";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div className="navbar-inner">

        {/* Logo */}
        <Link href="/" className="navbar-logo">
          <span className="navbar-logo-accent">&gt;_</span>
          <span className="navbar-logo-text">CodeTyper</span>
        </Link>

        {/* Links */}
        <div className="navbar-links">
          <Link
            href="/"
            className={`navbar-link${pathname === "/" ? " active" : ""}`}
          >
            <span className="navbar-link-icon">⌨</span>
            editor
          </Link>

        </div>

        {/* Alt+T hint */}
        <div className="navbar-hint">
          <kbd>alt</kbd><span>+</span><kbd>T</kbd>
          <span className="navbar-hint-label">terminal overlay</span>
        </div>

      </div>
    </nav>
  );
}
