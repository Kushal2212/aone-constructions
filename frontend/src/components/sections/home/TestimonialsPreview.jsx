import { ArrowUpRight, Quote, Star } from "lucide-react";
import { Link } from "react-router-dom";

const testimonials = [
  {
    quote:
      "The team understood our requirements and handled the project with great attention to detail. We were impressed with their professionalism and commitment.",
    name: "Kushal",
    role: "Residential Project",
  },
  {
    quote:
      "From planning to execution, the communication was clear and the work was handled responsibly. We are very happy with the result.",
    name: "Avishek",
    role: "Building Project",
  },
  {
    quote:
      "A reliable team that takes the client's requirements seriously. Their approach to construction and supervision gave us confidence throughout the project.",
    name: "Prajwal",
    role: "Construction Project",
  },
];

function TestimonialsPreview() {
  return (
    <section className="border-b bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Client Stories
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Trusted by clients.
              <br />
              <span className="text-muted-foreground">
                Proven through experience.
              </span>
            </h2>
          </div>

          <Link
            to="/testimonials"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold"
          >
            <span className="border-b border-transparent pb-0.5 transition-colors duration-300 group-hover:border-current">
              View all testimonials
            </span>
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Testimonials */}
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name + testimonial.role}
              className="group relative flex min-h-[230px] flex-col rounded-2xl bg-muted/30 p-6 transition-colors duration-300 hover:bg-muted/60 sm:p-7"
            >
              {/* Top row — icon + stars, mirrors icon + index in services cards */}
              <div className="flex items-start justify-between">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary">
                  <Quote className="size-5 text-primary transition-colors duration-300 group-hover:text-white" />
                </div>

                <div className="flex gap-1 pt-1" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="size-3.5 fill-current text-primary"
                    />
                  ))}
                </div>
              </div>

              {/* Content — pushed to bottom via mt-auto, same as services cards */}
              <div className="mt-auto pt-10">
                <blockquote className="text-sm leading-6 text-foreground">
                  “{testimonial.quote}”
                </blockquote>

                <div className="mt-5 border-t pt-4">
                  <p className="text-sm font-semibold">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {/* Hover arrow — identical to services cards */}
              <ArrowUpRight
                className="absolute bottom-6 right-6 size-4 text-muted-foreground/0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary sm:bottom-7 sm:right-7"
                aria-hidden="true"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsPreview;
