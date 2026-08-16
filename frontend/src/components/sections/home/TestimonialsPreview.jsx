import { ArrowUpRight, Quote, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function TestimonialsPreview() {
  const testimonials = useSelector((state) => state.testimonials.items);

  const publishedTestimonials = testimonials
    .filter((testimonial) => testimonial.published)
    .slice(0, 3);

  if (publishedTestimonials.length === 0) return null;

  return (
    <section className="border-b bg-muted/30 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Client Testimonials
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Trusted by clients.
              <br />
              <span className="text-muted-foreground">
                Proven through our work.
              </span>
            </h2>
          </div>

          <Link
            to="/testimonials"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold"
          >
            View all testimonials
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Testimonials grid */}
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {publishedTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------
   Testimonial Card
----------------------------------- */

function TestimonialCard({ testimonial }) {
  const rating = Math.min(Math.max(Number(testimonial.rating) || 5, 0), 5);

  return (
    <article className="group relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-3xl border bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8">
      {/* Top */}
      <div className="flex items-start justify-between gap-6">
        <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary">
          <Quote className="size-5 text-primary transition-colors duration-300 group-hover:text-white" />
        </div>

        <div className="flex shrink-0 gap-0.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`size-3.5 ${
                index < rating
                  ? "fill-current text-yellow-500"
                  : "text-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mt-10">
        <p className="text-base leading-7 text-muted-foreground">
          "{testimonial.message}"
        </p>
      </div>

      {/* Bottom */}
      <div className="mt-8 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold tracking-tight">
            {testimonial.clientName}
          </h3>

          <p className="truncate text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors duration-300 group-hover:text-primary">
            {testimonial.role}
          </p>
        </div>

        <div className="flex size-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 group-hover:border-black group-hover:bg-black group-hover:text-white">
          <ArrowUpRight className="size-4" />
        </div>
      </div>
    </article>
  );
}

export default TestimonialsPreview;