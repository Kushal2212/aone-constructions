import { ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const projects = [
  {
    id: 1,
    slug: "residential-project",
    title: "Residential Construction",
    location: "Morang, Nepal",
    status: "Completed",
    category: "Residential",
    description:
      "A residential construction project delivered with attention to planning, structural execution, and finishing.",
    image: "/projects/project-01.jpg",
  },
  {
    id: 2,
    slug: "commercial-building",
    title: "Commercial Building",
    location: "Morang, Nepal",
    status: "Completed",
    category: "Commercial",
    description:
      "A commercial building project focused on practical planning, structural reliability, and efficient execution.",
    image: "/projects/project-02.jpg",
  },
  {
    id: 3,
    slug: "residential-project-02",
    title: "Modern Residence",
    location: "Morang, Nepal",
    status: "Ongoing",
    category: "Residential",
    description:
      "A modern residential project currently progressing through construction and site execution.",
    image: "/projects/project-03.jpg",
  },
];

function ProjectsPreview() {
  return (
    <section className="border-b bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Our Projects
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Work that speaks
              <br />
              <span className="text-muted-foreground">for itself.</span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Explore some of our completed and ongoing construction projects,
              built with careful planning, quality workmanship, and attention to
              detail.
            </p>
          </div>

          <Link
            to="/projects"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold"
          >
            View all projects
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Projects */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.title}
              to="/projects"
              className="group overflow-hidden rounded-3xl border bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />

                {/* Category */}
                <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                  {project.category}
                </span>

                {/* Arrow */}
                <span className="absolute bottom-5 right-5 flex size-9 items-center justify-center rounded-full bg-black text-white opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
  <ArrowUpRight className="size-4" />
</span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold tracking-tight">
                  {project.title}
                </h3>

                {project.description && (
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                    {project.description}
                  </p>
                )}

                <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="size-4" />
                  {project.location}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsPreview;
