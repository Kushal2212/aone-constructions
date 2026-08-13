import {
  Building2,
  ClipboardList,
  HardHat,
  House,
  Ruler,
  Settings2,
  ShieldCheck,
  Wrench,
  Workflow,
} from "lucide-react";

import ServiceCard from "@/components/sections/services/ServiceCard";

const services = [
  {
    number: "01",
    title: "House Construction",
    description:
      "Complete house construction solutions designed around your requirements, lifestyle, and budget.",
    icon: House,
  },
  {
    number: "02",
    title: "Building Construction",
    description:
      "Reliable construction services for residential, commercial, and other building projects.",
    icon: Building2,
  },
  {
    number: "03",
    title: "Structural Construction",
    description:
      "Practical structural construction solutions with careful attention to safety, strength, and execution.",
    icon: HardHat,
  },
  {
    number: "04",
    title: "Engineering Services",
    description:
      "Engineering support to help transform project requirements and plans into practical solutions.",
    icon: Ruler,
  },
  {
    number: "05",
    title: "Construction Planning",
    description:
      "Thoughtful project planning focused on efficient execution, resource management, and cost awareness.",
    icon: ClipboardList,
  },
  {
    number: "06",
    title: "Site Supervision",
    description:
      "On-site supervision to help maintain construction quality, coordination, and proper project execution.",
    icon: ShieldCheck,
  },
  {
    number: "07",
    title: "Modern Technology-Based Construction",
    description:
      "Modern construction approaches and technologies aimed at improving efficiency, quality, and results.",
    icon: Settings2,
  },
  {
    number: "08",
    title: "Customized Construction",
    description:
      "Construction solutions tailored to your specific requirements, project conditions, and expectations.",
    icon: Workflow,
  },
  {
    number: "09",
    title: "Affordable-Cost Construction",
    description:
      "Cost-conscious construction solutions focused on delivering practical value without compromising essential quality.",
    icon: Wrench,
  },
];

function Services() {
  return (
    <main>
      {/* Hero */}
      <section className="border-b bg-background py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              What We Do
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Construction solutions
              <br />
              <span className="text-muted-foreground">
                built around your needs.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              From planning and engineering to construction and
              supervision, we provide practical solutions across
              different stages of your project.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-muted/30 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard
                key={service.number}
                service={service}
              />
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-background py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-primary px-6 py-14 text-primary-foreground sm:px-10 lg:px-16 lg:py-16">

            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">
                Have a Project?
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Let's discuss what you need.
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-7 text-primary-foreground/80">
                Tell us about your construction requirements and
                we'll help you explore the right approach for your
                project.
              </p>

              <a
                href="/contact"
                className="mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-primary transition-colors hover:bg-white/90"
              >
                Start a Project
                <span>↗</span>
              </a>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

export default Services;