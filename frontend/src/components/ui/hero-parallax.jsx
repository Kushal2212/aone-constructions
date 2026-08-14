import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const projects = [
  {
    title: "Modern Residential Building",
    category: "Residential Construction",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
    link: "/projects",
  },
  {
    title: "Contemporary House",
    category: "House Construction",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    link: "/projects",
  },
  {
    title: "Structural Development",
    category: "Structural Construction",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85",
    link: "/projects",
  },
  {
    title: "Commercial Building",
    category: "Building Construction",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
    link: "/projects",
  },
  {
    title: "Construction Planning",
    category: "Engineering & Planning",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=85",
    link: "/projects",
  },

  {
    title: "Site Development",
    category: "Site Supervision",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85",
    link: "/projects",
  },
  {
    title: "Residential Project",
    category: "Residential Construction",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
    link: "/projects",
  },
  {
    title: "Engineering Works",
    category: "Engineering Services",
    image:
      "https://images.unsplash.com/photo-1531835551805-16d864c8d311?auto=format&fit=crop&w=1200&q=85",
    link: "/projects",
  },
  {
    title: "Modern Construction",
    category: "Modern Technology",
    image:
      "https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=1200&q=85",
    link: "/projects",
  },
  {
    title: "Building Development",
    category: "Construction",
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1200&q=85",
    link: "/projects",
  },

  {
    title: "Site Execution",
    category: "Project Execution",
    image:
      "https://images.unsplash.com/photo-1590479773265-7464e5d48118?auto=format&fit=crop&w=1200&q=85",
    link: "/projects",
  },
  {
    title: "Quality Construction",
    category: "Construction",
    image:
      "https://images.unsplash.com/photo-1590725140246-20acddc1b7fe?auto=format&fit=crop&w=1200&q=85",
    link: "/projects",
  },
  {
    title: "Project Supervision",
    category: "Site Supervision",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=85",
    link: "/projects",
  },
  {
    title: "Future Ready Construction",
    category: "Modern Construction",
    image:
      "https://images.unsplash.com/photo-1590644365607-1c5a2e9b5d4a?auto=format&fit=crop&w=1200&q=85",
    link: "/projects",
  },
  {
    title: "Complete Building Solution",
    category: "Construction & Engineering",
    image:
      "https://images.unsplash.com/photo-1508450859948-4e04fabaa4c6?auto=format&fit=crop&w=1200&q=85",
    link: "/projects",
  },
];

function HeroParallax({ products = projects }) {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = {
    stiffness: 300,
    damping: 30,
    bounce: 100,
  };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 900]),
    springConfig,
  );

  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -900]),
    springConfig,
  );

  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [14, 0]),
    springConfig,
  );

  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.25, 1]),
    springConfig,
  );

  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [8, 0]),
    springConfig,
  );

  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-400, 100]),
    springConfig,
  );

  return (
    <section
      ref={ref}
      className="
        relative flex h-[260vh] flex-col
        overflow-hidden
        bg-background
        py-20
        antialiased
        [perspective:1000px]
        [transform-style:preserve-3d]
      "
    >
      <HeroHeader />

      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        {/* Row 1 */}
        <motion.div
          className="
            mb-10 flex flex-row-reverse
            gap-5
            px-4
            sm:gap-8
          "
        >
          {firstRow.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              translate={translateX}
            />
          ))}
        </motion.div>

        {/* Row 2 */}
        <motion.div
          className="
            mb-10 flex flex-row
            gap-5
            px-4
            sm:gap-8
          "
        >
          {secondRow.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              translate={translateXReverse}
            />
          ))}
        </motion.div>

        {/* Row 3 */}
        <motion.div
          className="
            flex flex-row-reverse
            gap-5
            px-4
            sm:gap-8
          "
        >
          {thirdRow.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              translate={translateX}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function HeroHeader() {
  return (
    <div
      className="
    relative z-10 mx-auto
    flex w-full max-w-5xl
    justify-center
    px-4 py-8
    text-center
    sm:px-6 sm:py-12
    lg:px-8 lg:py-16
  "
    >
      <div className="max-w-4xl">
        <p
          className="
            text-sm font-semibold uppercase
            tracking-[0.18em]
            text-primary
          "
        >
          A.one Brain Construction
        </p>

        <h1
          className="
            mt-5
            text-4xl font-bold tracking-tight
            text-slate-950
            sm:text-5xl
            md:text-6xl
            lg:text-7xl
          "
        >
          तपाईंको सपना
          <br />
          <span className="text-muted-foreground">हाम्रो प्रतिबद्धता</span>
        </h1>

        <p
          className="
            mx-auto mt-6 max-w-2xl
            text-base leading-7
            text-muted-foreground
            sm:text-lg
          "
        >
          From planning and engineering to construction and site supervision, we
          deliver practical and reliable solutions built around your
          requirements.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/contact"
            className="
              group inline-flex h-12
              items-center justify-center
              gap-2 rounded-full
              bg-slate-950
              px-6
              text-sm font-semibold text-white
              transition-all duration-300
              hover:bg-slate-800
            "
          >
            Start a Project
            <ArrowUpRight
              className="
                size-4
                transition-transform duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </Link>

          <Link
            to="/projects"
            className="
              inline-flex h-12
              items-center justify-center
              rounded-full
              border border-slate-300
              px-6
              text-sm font-semibold
              text-slate-900
              transition-all duration-300
              hover:border-slate-400
              hover:bg-slate-50
            "
          >
            View Our Projects
          </Link>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, translate }) {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -16,
      }}
      className="
        group/project
        relative
        h-64
        w-[19rem]
        flex-shrink-0
        overflow-hidden
        rounded-3xl
        border
        bg-muted
        shadow-sm
        sm:h-80
        sm:w-[25rem]
        lg:h-96
        lg:w-[30rem]
      "
    >
      <Link to={project.link} className="block h-full w-full">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="
            absolute inset-0
            h-full w-full
            object-cover
            object-center
            transition-transform duration-700
            group-hover/project:scale-105
          "
        />

        {/* Dark overlay */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-black/80
            via-black/10
            to-transparent
            opacity-70
            transition-opacity duration-300
            group-hover/project:opacity-90
          "
        />

        {/* Content */}
        <div
          className="
            absolute inset-x-0 bottom-0
            p-5
            sm:p-6
          "
        >
          <p
            className="
              text-xs font-medium uppercase
              tracking-[0.14em]
              text-white/65
            "
          >
            {project.category}
          </p>

          <div className="mt-2 flex items-end justify-between gap-4">
            <h2
              className="
                max-w-[80%]
                text-lg font-semibold
                tracking-tight text-white
                sm:text-xl
              "
            >
              {project.title}
            </h2>

            <span
              className="
                flex size-9 flex-shrink-0
                items-center justify-center
                rounded-full
                bg-white
                text-slate-950
                transition-transform duration-300
                group-hover/project:translate-x-1
                group-hover/project:-translate-y-1
              "
            >
              <ArrowUpRight className="size-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export { HeroParallax, HeroHeader, ProjectCard };
export default HeroParallax;
