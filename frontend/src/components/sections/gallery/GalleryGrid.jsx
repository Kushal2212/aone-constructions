import { useState } from "react";
import { X, ArrowUpRight } from "lucide-react";

function GalleryGrid({ images }) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setSelectedImage(image)}
            className="group overflow-hidden rounded-3xl border bg-background text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={image.url}
                alt={image.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />

              {/* Category */}
              <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                {image.category}
              </span>

              {/* Arrow — black fill on hover */}
              <span className="absolute bottom-5 right-5 flex size-9 items-center justify-center rounded-full bg-black text-white opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
                <ArrowUpRight className="size-4" />
              </span>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-lg font-semibold tracking-tight">
                {image.title}
              </h3>

              {image.category && (
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {image.category}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.title}
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-6xl overflow-hidden rounded-2xl bg-background"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-black/80"
              aria-label="Close image"
            >
              <X className="size-5" />
            </button>

            <img
              src={selectedImage.url}
              alt={selectedImage.alt}
              className="max-h-[80vh] w-auto max-w-full object-contain"
            />

            <div className="border-t bg-background px-5 py-4">
              <p className="font-semibold">
                {selectedImage.title}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {selectedImage.category}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GalleryGrid;