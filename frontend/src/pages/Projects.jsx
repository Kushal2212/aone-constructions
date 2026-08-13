import { useState } from "react";
import ProjectCard from "@/components/sections/projects/ProjectCard";
import { Button } from "@base-ui/react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Phone } from "lucide-react";

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
    image: "/images/projects/project-01.jpg",
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
    image: "/images/projects/project-02.jpg",
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
    image: "/images/projects/project-03.jpg",
  },
  {
    id: 4,
    slug: "structural-project",
    title: "Structural Construction",
    location: "Morang, Nepal",
    status: "Completed",
    category: "Structural",
    description:
      "Structural construction work carried out with emphasis on quality, safety, and proper site supervision.",
    image: "/images/projects/project-04.jpg",
  },
  {
    id: 5,
    slug: "custom-construction",
    title: "Customized Construction",
    location: "Morang, Nepal",
    status: "Ongoing",
    category: "Custom",
    description:
      "A customized construction project developed around the client's specific requirements.",
    image: "/images/projects/project-05.jpg",
  },
  {
    id: 6,
    slug: "building-project",
    title: "Building Project",
    location: "Morang, Nepal",
    status: "Completed",
    category: "Commercial",
    description:
      "A completed building project combining practical design, construction planning, and site management.",
    image: "/images/projects/project-06.jpg",
  },
];

const filters = ["All", "Completed", "Ongoing"];

function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.status === activeFilter);

  return (
    <main>
      {/* Hero */}
      <section className="border-b bg-background py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Our Projects
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Work that speaks
              <br />
              <span className="text-muted-foreground">for itself.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Explore selected construction projects and see how we approach
              planning, execution, and delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="bg-muted/30 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="mb-10 flex flex-wrap gap-2">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          {/* Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border bg-background px-6 py-20 text-center">
              <p className="text-sm text-muted-foreground">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="border-b bg-background py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-primary-foreground sm:px-10 lg:px-16 lg:py-20">
          {/* Decorative background */}
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-20 size-72 rounded-full bg-white/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-32 -left-20 size-80 rounded-full bg-black/10 blur-3xl"
          />

          {/* Content */}
          <div className="relative z-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">
              Let's Build Together
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Have a project in mind?
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-primary-foreground/80 sm:text-lg">
              Tell us about your construction requirements and let's explore how
              A.one Brain Construction can help turn your plans into reality.
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="group relative h-12 min-w-[190px] overflow-hidden rounded-full bg-white px-5 text-sm font-semibold text-primary transition-all duration-300 hover:bg-white/90"
              >
                <Link to="/contact">
                  <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-x-2">
                    Start a Project
                  </span>

                  <ArrowUpRight
                    className="
                      absolute right-4 top-1/2 size-4 -translate-y-1/2
                      text-primary opacity-70
                      transition-all duration-300 ease-out
                      group-hover:right-3.5
                      group-hover:translate-x-0.5
                      group-hover:opacity-100
                      group-hover:text-sky-400
                    "
                  />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="group relative h-12 min-w-[175px] overflow-hidden rounded-full border-white/30 bg-transparent px-5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-white/10"
              >
                <a href="tel:+9770000000000">
                  <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-x-2">
                    Talk to Us
                  </span>

                  <Phone
                    className="
                      absolute right-4 top-1/2 size-4 -translate-y-1/2
                      text-primary-foreground opacity-70
                      transition-all duration-300 ease-out
                      group-hover:right-3.5
                      group-hover:opacity-100
                      group-hover:text-sky-400
                    "
                  />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
    </main>
  );
}

export default Projects;
