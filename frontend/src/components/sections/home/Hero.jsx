import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:gap-12 sm:px-6 sm:py-16 lg:min-h-[calc(100vh-4.5rem)] lg:grid-cols-2 lg:px-8 lg:py-20">
        {/* Content */}
        <div className="max-w-2xl">
          {/* Heading */}
          <h1 className="text-balance text-4xl font-bold leading-[1.3] tracking-tight sm:text-5xl sm:leading-[1.3] lg:text-6xl lg:leading-[1.25] xl:text-7xl">
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              तपाईंको सपना
            </span>
            <br />
            <span className="relative inline-block text-muted-foreground">
              हाम्रो प्रतिबद्धता
              <span
                aria-hidden="true"
                className="absolute -bottom-2 left-0 h-1 w-16 rounded-full bg-primary sm:w-20 lg:w-24"
              />
            </span>
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            A.one Brain Construction Pvt. Ltd. delivers reliable construction
            and engineering solutions designed around quality, modern
            technology, and the needs of every client.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Primary CTA */}
            <Button
              asChild
              size="lg"
              className="group relative h-12 min-w-[190px] overflow-hidden rounded-full bg-slate-900 px-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20"
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

            {/* Secondary CTA — same sliding-text pattern, outline style */}
            <Button
              asChild
              size="lg"
              className="group relative h-12 min-w-[190px] overflow-hidden rounded-full bg-white px-5 text-sm font-semibold text-primary transition-all duration-300 hover:bg-white/90"
            >
              <Link to="/contact">
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
              </Link>
            </Button>
          </div>

          {/* Trust information */}
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t pt-6">
            <div>
              <p className="text-sm font-semibold">Quality-focused</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Construction solutions
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold">Modern approach</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Technology-based construction
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold">Client focused</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Customized solutions
              </p>
            </div>
          </div>
        </div>

        {/* Visual */}
        <div className="relative lg:pl-8">
          <div className="relative aspect-[4/3] sm:aspect-[4/5] overflow-hidden rounded-3xl bg-muted">
            {/* Temporary project image */}
            <img
              src="/images/hero-construction.jpg"
              alt="A.one Brain Construction project"
              className="h-full w-full object-cover"
            />

            {/* Image overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* Location card */}
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-black/40 p-5 text-white backdrop-blur-md">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/70">
                Based in
              </p>
              <p className="mt-1 text-lg font-semibold">
                Pathari-Shanischare, Morang
              </p>
              <p className="mt-1 text-sm text-white/70">
                Serving construction needs with commitment and craftsmanship.
              </p>
            </div>
          </div>

          {/* Decorative element */}
          <div
            aria-hidden="true"
            className="absolute -right-4 -top-4 -z-10 size-32 rounded-full bg-primary/10 blur-2xl"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
