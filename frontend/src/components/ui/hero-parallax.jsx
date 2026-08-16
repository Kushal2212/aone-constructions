import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@base-ui/react";

const projects = [
  {
    title: "Modern Residential Building",
    category: "Residential Construction",
    image:
      "/projects/photo-01.avif",
    link: "/projects",
  },
  {
    title: "Contemporary House",
    category: "House Construction",
    image:
      "/projects/photo-02.avif",
    link: "/projects",
  },
  {
    title: "Structural Development",
    category: "Structural Construction",
    image:
      "/projects/photo-03.avif",
    link: "/projects",
  },
  {
    title: "Commercial Building",
    category: "Building Construction",
    image:
      "/projects/photo-04.avif",
    link: "/projects",
  },
  {
    title: "Construction Planning",
    category: "Engineering & Planning",
    image:
      "/projects/photo-05.avif",
    link: "/projects",
  },

  {
    title: "Site Development",
    category: "Site Supervision",
    image:
      "/projects/photo-06.avif",
    link: "/projects",
  },
  {
    title: "Residential Project",
    category: "Residential Construction",
    image:
      "/projects/photo-07.avif",
    link: "/projects",
  },
  {
    title: "Engineering Works",
    category: "Engineering Services",
    image:
      "/projects/photo-08.avif",
    link: "/projects",
  },
  {
    title: "Modern Construction",
    category: "Modern Technology",
    image:
      "/projects/photo-09.avif",
    link: "/projects",
  },
  {
    title: "Building Development",
    category: "Construction",
    image:
      "/projects/photo-10.avif",
    link: "/projects",
  },

  {
    title: "Site Execution",
    category: "Project Execution",
    image:
      "/projects/photo-11.avif",
    link: "/projects",
  },
 
  {
    title: "Project HandOver",
    category: "Site Supervision",
    image:
      "/projects/photo-12.avif",
    link: "/projects",
  },
  {
    title: "Hydro Power",
    category: "Site Supervision",
    image:
      "/projects/project-01.jpg",
    link: "/projects",
  },
  {
    title: "Project Madi",
    category: "Site Supervision",
    image:
      "/projects/project-02.jpg",
    link: "/projects",
  },
  {
    title: "Project End",
    category: "Site Supervision",
    image:
      "/projects/project-03.jpg",
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
    relative flex flex-col
    overflow-hidden
    bg-background
    py-12
    antialiased
    lg:h-[260vh]
    lg:py-20
    lg:[perspective:1000px]
    lg:[transform-style:preserve-3d]
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
            text-slate-700
            sm:text-lg
          "
        >
          From planning and engineering to construction and site supervision, we
          deliver practical and reliable solutions built around your
          requirements.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            nativeButton={false}
            size="lg"
            render={<Link to="/contact"/>}
            className="group relative h-12 min-w-[190px] overflow-hidden rounded-full bg-slate-900 px-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-transparent hover:shadow-lg hover:shadow-slate-900/20"
          >
              <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-x-2 hover:text-slate-900">
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
                    group-hover:text-slate-900
                  "
              />
            
          </Button>

          {/* Secondary CTA — same sliding-text pattern, outline style */}
          <Button
            nativeButton={false}
            size="lg"
            render={<Link to="/contact"/>}
            className="group relative h-12 min-w-[190px] overflow-hidden rounded-full bg-white px-5 text-sm font-semibold text-primary transition-all duration-300 hover:bg-transparent hover:shadow-lg hover:shadow-slate-900/20"
          >
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
                      group-hover:text-slate-900
                    "
              />
            
          </Button>
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
