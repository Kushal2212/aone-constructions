import { useState } from "react";
import { useSelector } from "react-redux";
import ProjectCard from "@/components/sections/projects/ProjectCard";
import ContactCTA from "@/components/sections/home/ContactCTA";

const filters = ["All", "Residential", "Commercial", "Road", "Other"];

function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const projects = useSelector((state) => state.projects.items);

  const publishedProjects = projects
    .filter((item) => item.published)
    .map((item) => ({
      id: item.id,
      title: item.title,
      category: item.category,
      description: item.description,
      imageUrl: item.imageUrl,
      location: item.location,
    }));

  const filteredProjects =
    activeFilter === "All"
      ? publishedProjects
      : publishedProjects.filter(
          (project) => project.category === activeFilter.toLowerCase(),
        );

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

      <ContactCTA />
    </main>
  );
}

export default Projects;
