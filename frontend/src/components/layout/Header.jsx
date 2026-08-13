import { Link, NavLink } from "react-router-dom";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import logo from "@/assets/logo/company-logo.jpg";
import { navigationItems } from "@/config/navigation";

function Header() {
  return (
    <div className="sticky top-0 z-50 w-full">
      {/* Info Bar */}
      <div className="hidden w-full bg-slate-950 text-slate-300 lg:block">
        <div className="mx-auto flex h-9 w-full max-w-7xl items-center justify-between px-4 text-xs sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            {/* External protocol links stay as <a> — Link/NavLink is only for internal routes */}
            <a
              href="tel:+1234567890"
              className="flex items-center gap-1.5 transition-colors duration-200 hover:text-white"
            >
              <Phone className="size-3.5" />
              <span>+1 (234) 567-890</span>
            </a>
            <a
              href="mailto:info@aoneconstruction.com"
              className="flex items-center gap-1.5 transition-colors duration-200 hover:text-white"
            >
              <Mail className="size-3.5" />
              <span>info@aoneconstruction.com</span>
            </a>
            <span className="flex items-center gap-1.5 text-slate-400">
              <MapPin className="size-3.5" />
              <span>123 Builder Ave, Suite 100, City, ST</span>
            </span>
          </div>

          <span className="text-slate-400">Mon – Fri, 8:00 AM – 6:00 PM</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
        <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand — internal route, uses Link */}
          <Link
            to="/"
            aria-label="A.ONE Construction - Home"
            className="shrink-0"
          >
            <img
              src={logo}
              alt="A.ONE Construction"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation — internal routes, uses NavLink */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-1 lg:flex"
          >
            {navigationItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === "/"}
                className={({ isActive }) =>
                  [
                    "group relative rounded-md px-3 py-2 text-sm font-medium",
                    "transition-colors duration-200",
                    "focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-ring focus-visible:ring-offset-2",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}

                    <span
                      aria-hidden="true"
                      className={[
                        "pointer-events-none absolute inset-x-3 -bottom-px h-0.5 rounded-full",
                        "origin-center transition-all duration-300 ease-out",
                        isActive
                          ? "scale-x-100 bg-primary"
                          : "scale-x-0 bg-muted-foreground/40 group-hover:scale-x-100",
                      ].join(" ")}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA — internal route, uses Link */}
          <div className="hidden items-center lg:flex">
            <Button
              asChild
              size="lg"
              className="group relative h-11 min-w-[190px] overflow-hidden rounded-full bg-slate-900 px-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20"
            >
              <Link to="/contact">
                <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-x-2">
                  Start a Project
                </span>

                <ArrowUpRight
                  className="
                    absolute right-4 top-1/2 size-4 -translate-y-1/2
                    text-white opacity-70
                    transition-all duration-300 ease-out
                    group-hover:right-3.5
                    group-hover:translate-x-0.5
                    group-hover:opacity-100
                    group-hover:text-sky-400
                  "
                />
              </Link>
            </Button>
          </div>

          {/* Mobile menu will be added here */}
          <div className="lg:hidden">{/* MobileNav */}</div>
        </div>
      </header>
    </div>
  );
}

export default Header;