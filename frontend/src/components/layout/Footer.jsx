import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

import { footerNavigation } from "@/config/navigation";

function Footer() {
  return (
    <footer className="border-t bg-slate-950 text-slate-300">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Link
              to="/"
              className="inline-block"
              aria-label="A.ONE Construction - Home"
            >
              <img
                src="/logo/company-logo.png"
                alt="A.ONE Construction"
                className="h-12 w-auto object-contain"
              />
            </Link>

            <p className="mt-6 text-sm leading-6 text-slate-400">
              Building spaces with purpose, quality, and craftsmanship. We
              deliver construction solutions designed to last.
            </p>

            <Link
              to="/contact"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-blue-400"
            >
              Start a Project
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white">Company</h3>

            <ul className="mt-5 space-y-3">
              {footerNavigation.company.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white">Services</h3>

            <ul className="mt-5 space-y-3">
              {footerNavigation.services.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white">Get in touch</h3>

            <div className="mt-5 space-y-4">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-slate-500" />

                <p className="text-sm leading-6 text-slate-400">
                  Pathari-Shanischare-1,
                  <br />
                  Morang, Nepal
                </p>
              </div>

              <a
                href="tel:+9770000000000"
                className="flex items-center gap-3 text-sm text-slate-400 transition-colors hover:text-white"
              >
                <Phone className="size-4 text-slate-500" />
                +977 000 000 0000
              </a>

              <a
                href="mailto:info@example.com"
                className="flex items-center gap-3 text-sm text-slate-400 transition-colors hover:text-white"
              >
                <Mail className="size-4 text-slate-500" />
                info@example.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-sm sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p className="text-slate-500">
            © {new Date().getFullYear()} A.ONE Construction. All rights
            reserved.
          </p>

          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="text-slate-500 transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="text-slate-500 transition-colors hover:text-white"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
