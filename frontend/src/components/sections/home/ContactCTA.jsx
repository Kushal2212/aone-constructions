import { ArrowUpRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

function ContactCTA() {
  return (
    <section className="border-b bg-background py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-primary-foreground sm:px-10 lg:px-16 lg:py-20">
          {/* Decorative background */}
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-20 size-72 rounded-full bg-white/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-32 -left-20 size-80 rounded-full bg-black/10 blur-3xl"
          />

          {/* Content */}
          <div className="relative z-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">
              Let's Build Together
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Have a project in mind?
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-primary-foreground/80 sm:text-lg">
              Tell us about your construction requirements and let's explore how
              A.one Brain Construction can help turn your plans into reality.
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                nativeButton={false}
                size="lg"
                render= { <Link to="/contact"/>}
                className="group relative h-12 min-w-[190px] overflow-hidden rounded-full bg-white px-5 text-sm font-semibold text-primary transition-all duration-300 hover:bg-white/90"
              >
                  <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-x-2">
                    Start a Project
                  </span>

                  <ArrowUpRight
                    className="
                      absolute right-4 top-1/2 size-4 -translate-y-1/2
                      text-primary opacity-70
                      transition-all duration-300 ease-out
                      group-hover:right-3.5
                      group-hover:translate-x-0.5
                      group-hover:opacity-100
                      group-hover:text-sky-400
                    "
                  />
                
              </Button>

              <Button
                nativeButton={false}
                size="lg"
                render={<Link to="/contact"/>}
                className="group relative h-11 min-w-[190px] overflow-hidden rounded-full border-slate-400 bg-slate-900 px-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20"
              >
                  <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-x-2">
                    Talk to Us
                  </span>

                  <Phone
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
        </div>
      </div>
    </section>
  );
}

export default ContactCTA;
