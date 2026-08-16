import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";

function AboutPreview() {
  const highlights = [
    "Quality-focused construction",
    "Modern technology-based solutions",
    "Customized client requirements",
    "Affordable construction solutions",
  ];

  return (
    <section className="border-b bg-background py-10 sm:py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-8">
        {/* Image */}
        <div className="relative order-2 lg:order-1">
          {/* Offset frame behind the image — adds depth without a stock "card" look */}
          <div
            aria-hidden="true"
            className="absolute -left-4 -top-4 -z-10 hidden h-full w-full rounded-3xl border-2 border-primary/20 sm:block"
          />

          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-muted">
            <img
              src="/images/about-construction.jpg"
              alt="A.one Brain Construction project"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Floating stat card */}
          <div className="absolute -bottom-8 right-4 flex items-center gap-4 rounded-2xl border bg-background p-5 shadow-xl shadow-slate-900/5 sm:right-8">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-lg font-bold text-white">
              A1
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight">
                A.one Brain Construction
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Pathari-Shanischare, Morang
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="order-1 lg:order-2">
          {/* Heading */}
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Building with purpose.
            <br />
            <span className="relative inline-block text-muted-foreground">
              Creating with commitment.
              <span
                aria-hidden="true"
                className="absolute -bottom-1.5 left-0 h-1 w-14 rounded-full bg-primary sm:w-16"
              />
            </span>
          </h2>

          {/* Description */}
          <div className="mt-8 space-y-4 text-base leading-7 text-muted-foreground">
            <p>
              A.one Brain Construction Pvt. Ltd. is a construction and
              engineering company based in Pathari-Shanischare, Morang, Nepal.
            </p>
            <p>
              We provide construction solutions focused on quality, practical
              planning, modern technology, and the specific requirements of
              every client.
            </p>
          </div>

          {/* Highlights */}
          <ul className="mt-8 grid gap-x-6 gap-y-4 border-t pt-8 sm:grid-cols-2">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
                  <Check className="size-3 text-primary" strokeWidth={3} />
                </span>
                <span className="text-sm font-medium leading-tight">
                  {highlight}
                </span>
              </li>
            ))}
          </ul>

          {/* Link */}
          <Link
            to="/about"
            className="group mt-9 inline-flex items-center gap-1.5 text-sm font-semibold"
          >
            <span className="border-b border-transparent pb-0.5 transition-colors duration-300 group-hover:border-current">
              Learn more about us
            </span>
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AboutPreview;
