import { ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

function ProjectCard({ project }) {
  return (
    <Link
      to={project.href ?? "/projects"}
      className="group overflow-hidden rounded-3xl border bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={project.imageUrl}
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

        {project.location && (
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4" />
            {project.location}
          </div>
        )}
      </div>
    </Link>
  );
}

export default ProjectCard;