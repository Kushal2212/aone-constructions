import { ArrowUpRight } from "lucide-react";

function ServiceCard({ service }) {
  const Icon = service.icon;

  return (
    <article className="group relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-3xl border bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8">
      {/* Top */}
      <div className="flex items-start justify-between gap-6">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="size-5 text-primary" />
        </div>

        <span className="text-sm font-medium text-muted-foreground">
          {service.number}
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
          Construction & Engineering
        </span>

        <div className="flex size-9 items-center justify-center rounded-full border transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>
    </article>
  );
}

export default ServiceCard;