import { Quote, Star } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@base-ui/react";

function Testimonials() {
  const testimonials = useSelector((state) => state.testimonials.items);

  const publishedTestimonials = testimonials.filter(
    (testimonial) => testimonial.published,
  );

  return (
    <main>
      {/* Hero */}
      <section className="border-b bg-background py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Client Testimonials
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Trusted by clients.
              <br />
              <span className="text-muted-foreground">
                Proven through our work.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              We value the trust our clients place in us. Here is what some of
              our clients have to say about their experience working with A.one
              Brain Construction.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-b bg-muted/30 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {publishedTestimonials.length === 0 ? (
            <EmptyTestimonials />
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {publishedTestimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="border-b bg-background py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border bg-muted/30 p-8 sm:p-10 lg:p-14">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                  Start Your Project
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  Ready to build
                  <br />
                  <span className="text-muted-foreground">
                    something together?
                  </span>
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                  Tell us about your construction requirements and let's discuss
                  how we can help bring your project to life.
                </p>
              </div>

              <div className="hidden items-center lg:flex">
                <Button
                  nativeButton={false}
                  size="lg"
                  render= {<Link to="/contact"/>}
                  className="group relative h-11 min-w-[190px] overflow-hidden rounded-full bg-slate-900 px-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20"
                >
                    <span className="absolute inset-0 flex items-center justify-center pl-2 pr-7 transition-transform duration-300 group-hover:-translate-x-2">
                      Start a Conversation
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
          </div>
        </div>
      </section>
    </main>
  );
}

// Testimonial Card
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

// Empty State
function EmptyTestimonials() {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border bg-background p-8 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
        <Quote className="size-6 text-muted-foreground" />
      </div>

      <h2 className="mt-5 text-lg font-semibold">Testimonials coming soon</h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        We are currently collecting feedback from our clients. Check back soon
        to see what they have to say about working with A.one Brain
        Construction.
      </p>
    </div>
  );
}

export default Testimonials;
