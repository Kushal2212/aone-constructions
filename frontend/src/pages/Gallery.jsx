import { useSelector } from "react-redux";
import { ImagePlus } from "lucide-react";
import GalleryGrid from "@/components/sections/gallery/GalleryGrid";

function Gallery() {
  const gallery = useSelector((state) => state.gallery.items);

  const publishedImages = gallery
    .filter((item) => item.published)
    .map((item) => ({
      id: item.id,
      title: item.title,
      category: item.category,
      url: item.imageUrl,
      alt: item.title,
    }));

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
              <span className="text-muted-foreground">our work.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Explore moments from our construction sites, projects, and work in
              progress.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-muted/30 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {publishedImages.length === 0 ? (
            <EmptyGallery />
          ) : (
            <GalleryGrid images={publishedImages} />
          )}
        </div>
      </section>
    </main>
  );
}

// Empty State

function EmptyGallery() {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border bg-background p-8 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
        <ImagePlus className="size-6 text-muted-foreground" />
      </div>

      <h2 className="mt-5 text-lg font-semibold">Gallery coming soon</h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        We're adding photos from our projects. Check back soon to see our work.
      </p>
    </div>
  );
}

export default Gallery;
