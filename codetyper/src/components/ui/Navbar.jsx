"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useNav } from "@/components/ui/LayoutClient";
import "./Navbar.css";

export default function Navbar({ onToggleAuth, authOpen }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { hasBack, triggerBack } = useNav();

  return (
    <nav className="navbar">
      <div className="navbar-inner">

        {/* User toggle button — left side */}
        <button
          className={`navbar-user-btn${authOpen ? " active" : ""}`}
          onClick={onToggleAuth}
          title="Toggle user panel"
        >
          {session?.user?.image ? (
            <img src={session.user.image} alt="" className="navbar-user-avatar" />
          ) : (
            <span className="navbar-user-icon">
              {session?.user ? session.user.name?.[0]?.toUpperCase() || "U" : "◉"}
            </span>
          )}
        </button>

        {/* Logo */}
        <Link href="/" className="navbar-logo">
          <span className="navbar-logo-accent">&gt;_</span>
          <span className="navbar-logo-text">CodeTyper</span>
        </Link>

        {/* Links */}
        <div className="navbar-links">

          {/* Back button — visible when a back action is registered */}
          {hasBack && (
            <button className="navbar-back-btn" onClick={triggerBack} title="Volver">
              <span className="navbar-back-arrow">←</span>
              back
            </button>
          )}

          <Link href="/" className={`navbar-link${pathname === "/" && !hasBack ? " active" : ""}`}>
            <span className="navbar-link-icon">⌨</span>
            editor
          </Link>

          <button className="navbar-link navbar-settings-btn" title="Settings (coming soon)">
            <span className="navbar-link-icon">⚙</span>
            settings
          </button>

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
