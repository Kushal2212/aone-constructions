import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MapPin, Phone, Ship } from "lucide-react";
import { Button } from "@/components/ui/button";
import { footerNavigation } from "@/config/navigation";
import { useSelector } from "react-redux";

function Footer() {
  const { company } = useSelector((state) => state.settings);
  return (
    <footer className="border-t bg-slate-950 text-slate-300">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Link to="/" className="flex w-50 flex-row items-center gap-2">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-700 text-white">
                <Ship className="size-4 shrink-0" />
              </div>

              <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm font-semibold">
                  A.one Construction
                </span>
              </div>
            </Link>

            <p className="mt-6 text-sm leading-6 text-slate-400">
              Building spaces with purpose, quality, and craftsmanship. We
              deliver construction solutions designed to last.
            </p>

            <div className=" items-center lg:flex mt-12 flex gap-4 ">
              <Button
               nativeButton={false}
               render={<Link to="/contact"/>}
                size="lg"
                className="group relative h-11 min-w-[190px] overflow-hidden rounded-full bg-slate-700 px-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 "
              >
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
                
              </Button>
            </div>
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
                <li key={item.label}>
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
              {company.address && (

              <div className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-slate-500" />

                <span className="text-sm leading-6 text-slate-400">
                  {company.address}
                </span>
              </div>
              )}


              {company.phone && (

              <a
                href={`${company.phone}`}
                className="flex items-center gap-3 text-sm text-slate-400 transition-colors hover:text-white"
              >
                <Phone className="size-4 text-slate-500" />
                {company.phone}
              </a>
              )}

              {company.email && (

              <a
                href={`${company.email}`}
                className="flex items-center gap-3 text-sm text-slate-400 transition-colors hover:text-white"
              >
                <Mail className="size-4 text-slate-500" />
                {company.email}
              </a>
              )}
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
