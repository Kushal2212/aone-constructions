import { ArrowUpRight, Building2, Target, Users } from "lucide-react";
import { Link } from "react-router-dom";

const team = [
  {
    name: "Er. Kamal Bhattarai",
    role: "Director",
  },
  {
    name: "Er. Iov Ghimire",
    role: "Director",
  },
  {
    name: "Er. Kush Ghimire",
    role: "Engineer",
  },
  {
    name: "Sub Er. Durga Bhattarai",
    role: "Site Incharge",
  },
];

const values = [
  {
    title: "Quality Construction",
    description:
      "We believe good construction begins with quality materials, careful planning, and responsible execution.",
    icon: Building2,
  },
  {
    title: "Practical Solutions",
    description:
      "We focus on solutions that balance client requirements, functionality, quality, and cost.",
    icon: Target,
  },
  {
    title: "Client Commitment",
    description:
      "We value clear communication and work closely with clients throughout their construction journey.",
    icon: Users,
  },
];

function About() {
  return (
    <main>
      {/* Page Hero */}
      <section className="border-b bg-background py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              About A.one
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Building with purpose.
              <br />
              <span className="text-muted-foreground">
                Creating with commitment.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              A.one Brain Construction Pvt. Ltd. is a construction and
              engineering company focused on delivering practical, reliable, and
              quality-driven construction solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="border-b bg-muted/30 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          {/* Image */}
          <div className="overflow-hidden rounded-3xl border bg-muted">
            <img
              src="/images/about/about-construction.jpg"
              alt="A.one Brain Construction project"
              className="aspect-[4/3] h-full w-full object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Who We Are
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Your dream.
              <br />
              <span className="text-muted-foreground">Our commitment.</span>
            </h2>

            <p className="mt-6 text-base leading-7 text-muted-foreground">
              A.one Brain Construction Pvt. Ltd. is based in
              Pathari-Shanischare-1, Morang, Nepal. We provide construction and
              engineering services for clients looking for dependable solutions
              and responsible project execution.
            </p>

            <p className="mt-4 text-base leading-7 text-muted-foreground">
              From construction planning and engineering to site supervision and
              execution, our approach is centered around understanding each
              client's requirements and delivering solutions suited to their
              project.
            </p>

            {/* Tagline */}
            <div className="mt-8 rounded-2xl border bg-background p-6">
              <p className="text-xl font-semibold tracking-tight sm:text-2xl">
                “तपाईंको सपना हाम्रो प्रतिबद्धता”
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                Your dream, our commitment.
              </p>
            </div>

            <Link
              to="/contact"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold"
            >
              Start a conversation
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Company Values — same card effect as ServicesPreview */}
      <section className="border-b bg-background py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Our Approach
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              What guides
              <br />
              <span className="text-muted-foreground">the way we work.</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="group relative flex min-h-[230px] flex-col rounded-3xl border bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg sm:p-8"
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="size-5 text-primary" />
                    </div>

                    <span className="text-xs font-medium text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="mt-auto pt-12">
                    <h3 className="text-lg font-semibold tracking-tight">
                      {value.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {value.description}
                    </p>
                  </div>

                  {/* Hover arrow */}
                  <span className="absolute bottom-5 right-5 flex size-9 items-center justify-center rounded-full bg-black text-white opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team — matching lift + shadow treatment */}
      {/* Team */}
      <section className="border-b bg-muted/30 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Our Team
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              People behind
              <br />
              <span className="text-muted-foreground">the work.</span>
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div
                key={member.name}
                className="
            group relative overflow-hidden rounded-3xl
            border bg-background
            transition-all duration-300
            hover:-translate-y-1
            hover:shadow-xl
          "
              >
                {/* Photo */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src="/images/about/team-placeholder.jpg"
                    alt={member.name}
                    className="
                h-full w-full object-cover
                transition-transform duration-500
                group-hover:scale-105
              "
                  />

                  {/* Dark Gallery Overlay */}
                  <div
                    className="
                absolute inset-0
                bg-gradient-to-t
                from-black/90
                via-black/20
                to-transparent
                opacity-0
                transition-opacity duration-300
                group-hover:opacity-100
              "
                  />

                  {/* Member Info */}
                  <div
                    className="
                absolute inset-x-0 bottom-0
                p-5
                translate-y-4
                opacity-0
                transition-all duration-300
                group-hover:translate-y-0
                group-hover:opacity-100
              "
                  >
                    <h3 className="font-semibold tracking-tight text-white">
                      {member.name}
                    </h3>

                    <p className="mt-1 text-sm text-white/65">{member.role}</p>
                  </div>

                  {/* Arrow */}
                  <div
                    className="
                absolute right-4 top-4
                flex size-9 items-center justify-center
                rounded-full
                bg-white
                text-slate-950
                opacity-0
                transition-all duration-300
                group-hover:opacity-100
                group-hover:translate-x-0.5
              "
                  >
                    <ArrowUpRight className="size-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
