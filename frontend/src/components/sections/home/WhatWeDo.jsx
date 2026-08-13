import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

function WhatWeDo() {
  return (
    <section className="border-b bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-8">
        {/* Content */}
        <div className="order-2 lg:order-1">
          {/* Kicker */}
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            What We Do
          </p>

          {/* Heading */}
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Built on quality,
            <br />
            <span className="relative inline-block text-muted-foreground">
              driven by experience.
              <span
                aria-hidden="true"
                className="absolute -bottom-1.5 left-0 h-1 w-14 rounded-full bg-primary sm:w-16"
              />
            </span>
          </h2>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            A.one Brain Construction Pvt. Ltd. delivers reliable construction
            and engineering solutions designed around quality, modern
            technology, and the needs of every client.
          </p>

          {/* Vision / Mission */}
          <div className="mt-8 grid gap-6 border-t pt-8 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-primary">Vision</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                To be a trusted name in construction, known for quality,
                reliability, and lasting client relationships.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-primary">Mission</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                To deliver practical, technology-driven construction solutions
                tailored to every client's needs.
              </p>
            </div>
          </div>

          {/* Link — matches AboutPreview.jsx CTA exactly */}
          <Link
            to="/about"
            className="group mt-9 inline-flex items-center gap-1.5 text-sm font-semibold"
          >
            <span className="border-b border-transparent pb-0.5 transition-colors duration-300 group-hover:border-current">
              Read more about us
            </span>
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Image */}
        <div className="relative order-1 lg:order-2">
          {/* Offset frame behind the image */}
          <div
            aria-hidden="true"
            className="absolute -right-4 -top-4 -z-10 hidden h-full w-full rounded-3xl border-2 border-primary/20 sm:block"
          />

          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-muted">
            <img
              src="/images/about-construction1.jpg"
              alt="A.one Brain Construction site"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Stat badge — overlapping bottom-left corner of the image */}
          <div className="absolute -bottom-6 -left-4 flex size-28 flex-col items-center justify-center rounded-2xl bg-primary text-center text-primary-foreground shadow-xl shadow-slate-900/10 sm:-left-6 sm:size-32">
            <p className="text-3xl font-bold tracking-tight sm:text-4xl">20</p>
            <p className="mt-1 text-xs font-medium leading-tight">
              Years of
              <br />
              <span className="uppercase tracking-wide">Experience</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhatWeDo;
