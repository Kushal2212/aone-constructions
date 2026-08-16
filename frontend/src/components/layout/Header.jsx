import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowUpRight, Mail, Menu, MapPin, Phone, Ship, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { navigationItems } from "@/config/navigation";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { company } = useSelector((state) => state.settings);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="sticky top-0 z-50 w-full">
      {/* Info Bar */}
      <div className="hidden w-full bg-slate-950 text-slate-300 lg:block">
        <div className="mx-auto flex h-9 w-full max-w-7xl items-center justify-between px-4 text-xs sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            {company.phone && (
              <a
                href={`tel:${company.phone}`}
                className="flex items-center gap-1.5 transition-colors duration-200 hover:text-white"
              >
                <Phone className="size-3.5" />
                <span>{company.phone}</span>
              </a>
            )}

            {company.email && (
              <a
                href={`mailto:${company.email}`}
                className="flex items-center gap-1.5 transition-colors duration-200 hover:text-white"
              >
                <Mail className="size-3.5" />
                <span>{company.email}</span>
              </a>
            )}

            {company.address && (
              <span className="flex items-center gap-1.5 text-slate-400">
                <MapPin className="size-3.5" />
                <span>{company.address}</span>
              </span>
            )}
          </div>

          <span className="text-slate-400">Mon – Fri, 10:00 AM – 5:00 PM</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-18 lg:px-8">
          {/* Brand */}
          <Link
            to="/"
            className="flex w-auto flex-row items-center gap-2 lg:w-50"
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-700 text-white">
              <Ship className="size-4 shrink-0" />
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm font-semibold">
                A.one Construction
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
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

          {/* Desktop CTA */}
          <div className="hidden items-center lg:flex">
            <Button
              nativeButton={false}
              size="lg"
              render={<Link to="/contact"/>}
              className="group relative h-11 min-w-[190px] overflow-hidden rounded-full bg-slate-900 px-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20"
            >
                <span className="absolute inset-0 flex items-center justify-center pl-2 pr-7 transition-transform duration-300 group-hover:-translate-x-2">
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
              
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="flex size-10 items-center justify-center rounded-lg text-foreground transition hover:bg-muted lg:hidden"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile menu panel */}
      <div
        className={`fixed inset-x-0 top-16 z-40 origin-top overflow-hidden border-b bg-background shadow-lg transition-all duration-300 ease-out lg:hidden ${
          isMobileMenuOpen
            ? "max-h-[calc(100vh-4rem)] opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto px-4 py-6 sm:px-6">
          {/* Nav links */}
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {navigationItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === "/"}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  [
                    "rounded-xl px-4 py-3 text-base font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA */}
          <Button
            nativeButton={false}
            size="lg"
            render= {<Link
               to="/contact"
               className="flex items-center justify-center gap-2"
             />}
            className="mt-4 h-12 w-full rounded-xl bg-slate-900 text-sm font-semibold text-white hover:bg-slate-800"
            onClick={() => setIsMobileMenuOpen(false)}
          >
              Start a Project
              <ArrowUpRight className="size-4" />
            
          </Button>

          {/* Contact info */}
          <div className="mt-6 space-y-3 border-t pt-6 text-sm text-muted-foreground">
            {company.phone && (
              <a
                href={`tel:${company.phone}`}
                className="flex items-center gap-2.5 transition-colors hover:text-foreground"
              >
                <Phone className="size-4 shrink-0" />
                <span>{company.phone}</span>
              </a>
            )}

            {company.email && (
              <a
                href={`${company.email}`}
                className="flex items-center gap-2.5 transition-colors hover:text-foreground"
              >
                <Mail className="size-4 shrink-0" />
                <span>{company.email}</span>
              </a>
            )}

            {company.address && (
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                <span>{company.address}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 top-16 z-30 bg-black/40 backdrop-blur-[1px] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default Header;
