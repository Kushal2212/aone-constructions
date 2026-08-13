import {
  ArrowUpRight,
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
import { Link } from "react-router-dom";

const services = [
  {
    title: "House Construction",
    description:
      "Complete residential construction solutions planned around your needs and budget.",
    icon: House,
  },
  {
    title: "Building Construction",
    description:
      "Reliable construction services for commercial and multi-purpose buildings.",
    icon: Building2,
  },
  {
    title: "Structural Construction",
    description:
      "Practical structural construction solutions focused on strength, safety, and durability.",
    icon: HardHat,
  },
  {
    title: "Engineering Services",
    description:
      "Engineering expertise supporting sound decisions throughout your construction project.",
    icon: Ruler,
  },
  {
    title: "Construction Planning",
    description:
      "Careful planning to organize your project, resources, timelines, and execution.",
    icon: ClipboardList,
  },
  {
    title: "Site Supervision",
    description:
      "Professional site supervision to help maintain quality and proper project execution.",
    icon: ShieldCheck,
  },
 
];

function ServicesPreview() {
  return (
    <section className="border-b bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Our Services
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Construction solutions
              <br />
              <span className="text-muted-foreground">built around you.</span>
            </h2>
          </div>

          <Link
            to="/services"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold"
          >
            View all services
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Services grid */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.title}
                to="/services"
                className="group relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-3xl border bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8"
              >
                {/* Top */}
                <div className="flex items-start justify-between gap-6">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="size-5 text-primary" />
                  </div>

                  <span className="text-sm font-medium text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div className="mt-10">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {service.title}
                  </h3>

                  <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                    {service.description}
                  </p>
                </div>

                {/* Bottom */}
                <div className="mt-8 flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground transition-colors duration-300 group-hover:text-primary">
                    A.One Construction & Engineering
                  </span>

                  <div className="flex size-9 items-center justify-center rounded-full border transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServicesPreview;