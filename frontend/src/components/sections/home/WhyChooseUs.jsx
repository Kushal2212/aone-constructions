import { BadgeCheck, Clock3, Handshake, Settings2 } from "lucide-react";

const reasons = [
  {
    title: "Quality & Reliability",
    description:
      "We focus on dependable construction practices and quality workmanship throughout every stage of a project.",
    icon: BadgeCheck,
  },
  {
    title: "Client-Centered Approach",
    description:
      "Every project is planned around the client's requirements, priorities, expectations, and budget.",
    icon: Handshake,
  },
  {
    title: "Modern Construction",
    description:
      "We embrace modern technology and practical construction methods to improve efficiency and project outcomes.",
    icon: Settings2,
  },
  {
    title: "Committed Execution",
    description:
      "From planning to site supervision and execution, we remain focused on delivering work with responsibility.",
    icon: Clock3,
  },
];

function WhyChooseUs() {
  return (
    <section className="border-b bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading — centered */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Why A.one
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Built on trust.
            <br />
            <span className="text-muted-foreground">Driven by commitment.</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
            We believe successful construction is more than completing a
            building. It is about understanding the client, planning carefully,
            and delivering work that stands the test of time.
          </p>
        </div>

        {/* Reasons + Image */}
        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Stacked reason cards */}
          <div className="space-y-4">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;

              return (
                <div
                  key={reason.title}
                  className="group flex items-start gap-4 rounded-2xl border bg-muted/30 p-5 transition-colors duration-300 hover:bg-muted/60 sm:p-6"
                >
                  {/* Icon */}
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary">
                    <Icon className="size-5 text-primary transition-colors duration-300 group-hover:text-white" />
                  </div>

                  {/* Content */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium tracking-[0.1em] text-muted-foreground/60">
                        0{index + 1}
                      </span>
                      <h3 className="text-base font-semibold tracking-tight">
                        {reason.title}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                      {reason.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Image */}
          <div className="relative order-first lg:order-last">
            {/* Decorative accent, matching Hero's blur element */}
            <div
              aria-hidden="true"
              className="absolute -right-6 -top-6 -z-10 size-40 rounded-full bg-primary/10 blur-2xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -left-4 -z-10 hidden h-full w-full rounded-3xl border-2 border-primary/20 sm:block"
            />

            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted">
              <img
                src="/images/why-choose-us.jpg"
                alt="A.one Brain Construction team at work"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
