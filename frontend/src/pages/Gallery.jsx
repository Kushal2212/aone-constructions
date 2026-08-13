import GalleryGrid from "@/components/sections/gallery/GalleryGrid";

const galleryImages = [
  {
    id: 1,
    title: "Residential Construction",
    category: "Residential",
    url: "/images/gallery/gallery-01.jpg",
    alt: "Residential construction project",
  },
  {
    id: 2,
    title: "Building Construction",
    category: "Building",
    url: "/images/gallery/gallery-02.jpg",
    alt: "Building construction project",
  },
  {
    id: 3,
    title: "Construction Site",
    category: "Site Work",
    url: "/images/gallery/gallery-03.jpg",
    alt: "Construction site work",
  },
  {
    id: 4,
    title: "Structural Work",
    category: "Structural",
    url: "/images/gallery/gallery-04.jpg",
    alt: "Structural construction work",
  },
  {
    id: 5,
    title: "Project Progress",
    category: "Construction",
    url: "/images/gallery/gallery-05.jpg",
    alt: "Construction project progress",
  },
  {
    id: 6,
    title: "Site Supervision",
    category: "Site Work",
    url: "/images/gallery/gallery-06.jpg",
    alt: "Construction site supervision",
  },
];

function Gallery() {
  return (
    <main>
      {/* Hero */}
      <section className="border-b bg-background py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Gallery
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              A closer look at
              <br />
              <span className="text-muted-foreground">
                our work.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Explore moments from our construction sites, projects,
              and work in progress.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-muted/30 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <GalleryGrid images={galleryImages} />
        </div>
      </section>
    </main>
  );
}

export default Gallery;