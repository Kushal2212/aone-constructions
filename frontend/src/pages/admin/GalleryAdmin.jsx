import {
  Eye,
  ImagePlus,
  Loader2,
  Search,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import {
  addGalleryImage,
  removeGalleryImage,
} from "../../store/slices/gallerySlice";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const categories = ["all", "residential", "commercial", "road", "other"];

const MAX_FILE_SIZE_MB = 5;

function GalleryAdmin() {
  const dispatch = useDispatch();

  const gallery = useSelector((state) => state.gallery.items);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [sourceType, setSourceType] = useState("upload"); // "upload" | "url"
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    category: "residential",
    imageUrl: "",
  });

  const filteredGallery = useMemo(() => {
    return gallery.filter((item) => {
      const matchesSearch = item.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory = category === "all" || item.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [gallery, search, category]);

  const resetForm = () => {
    setForm({
      title: "",
      category: "residential",
      imageUrl: "",
    });
    setSourceType("upload");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileSelect = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      toast.error(`Image must be smaller than ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setForm((prev) => ({
        ...prev,
        imageUrl: reader.result,
        // Prefill title from filename if it's still empty
        title:
          prev.title.trim() ||
          file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
      }));
    };

    reader.onerror = () => {
      toast.error("Couldn't read that image. Please try another file.");
    };

    reader.readAsDataURL(file);
  };

  const handleAddImage = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.error("Please enter an image title.");
      return;
    }

    if (!form.imageUrl.trim()) {
      toast.error(
        sourceType === "upload"
          ? "Please choose an image to upload."
          : "Please enter an image URL.",
      );
      return;
    }

    setIsSubmitting(true);

    dispatch(
      addGalleryImage({
        title: form.title.trim(),
        category: form.category,
        imageUrl: form.imageUrl.trim(),
      }),
    );

    toast.success("Gallery image added successfully.");

    setIsSubmitting(false);
    resetForm();
    setShowAddDialog(false);
  };

  const handleDelete = () => {
    if (!deleteId) return;

    dispatch(removeGalleryImage(deleteId));

    toast.success("Gallery image deleted successfully.");

    setDeleteId(null);
  };

  return (
    <div className="w-full min-w-0 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Management</p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">Gallery</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Manage construction project images displayed on your website.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddDialog(true)}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          <ImagePlus className="size-4" />
          Add Image
        </button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border bg-background p-5">
          <p className="text-sm text-muted-foreground">Total Images</p>

          <p className="mt-2 text-3xl font-bold">{gallery.length}</p>
        </div>

        <div className="rounded-2xl border bg-background p-5">
          <p className="text-sm text-muted-foreground">Showing</p>

          <p className="mt-2 text-3xl font-bold">{filteredGallery.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-2xl border bg-background p-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="text"
            placeholder="Search gallery..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-xl border bg-background pl-9 pr-4 text-sm outline-none transition focus:border-primary"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-10 rounded-xl border bg-background px-3 text-sm outline-none focus:border-primary"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item === "all" ? "All Categories" : capitalize(item)}
            </option>
          ))}
        </select>
      </div>

      {/* Gallery */}
      {filteredGallery.length === 0 ? (
        <div className="rounded-2xl border bg-background py-20 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
            <ImagePlus className="size-5 text-muted-foreground" />
          </div>

          <p className="mt-4 text-sm font-semibold">No gallery images found</p>

          <p className="mt-1 text-sm text-muted-foreground">
            Add an image or change your search/filter.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-2xl border bg-background transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => setPreviewImage(item)}
                    className="flex size-9 items-center justify-center rounded-full bg-white text-black transition hover:scale-105"
                    title="Preview"
                  >
                    <Eye className="size-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteId(item.id)}
                    className="flex size-9 items-center justify-center rounded-full bg-white text-red-600 transition hover:scale-105"
                    title="Delete"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-xs capitalize text-muted-foreground">
                      {item.category}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                    {item.createdAt}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Image Dialog */}
      <Dialog
        open={showAddDialog}
        onOpenChange={(open) => {
          setShowAddDialog(open);
          if (!open) resetForm();
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Gallery Image</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleAddImage} className="space-y-5 pt-2">
            {/* Source toggle */}
            <div className="flex rounded-xl border bg-muted/40 p-1">
              <button
                type="button"
                onClick={() => setSourceType("upload")}
                className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${
                  sourceType === "upload"
                    ? "bg-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Upload from device
              </button>

              <button
                type="button"
                onClick={() => setSourceType("url")}
                className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${
                  sourceType === "url"
                    ? "bg-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Image URL
              </button>
            </div>

            <div>
              <label className="text-sm font-medium">Title</label>

              <input
                type="text"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
                placeholder="e.g. Residential Building"
                className="mt-2 h-10 w-full rounded-xl border bg-background px-3 text-sm outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Category</label>

              <select
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value,
                  })
                }
                className="mt-2 h-10 w-full rounded-xl border bg-background px-3 text-sm outline-none focus:border-primary"
              >
                {categories
                  .filter((item) => item !== "all")
                  .map((item) => (
                    <option key={item} value={item}>
                      {capitalize(item)}
                    </option>
                  ))}
              </select>
            </div>

            {/* Upload source */}
            {sourceType === "upload" ? (
              <div>
                <label className="text-sm font-medium">Image</label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileSelect(e.target.files?.[0])}
                  className="hidden"
                  id="gallery-file-input"
                />

                {!form.imageUrl ? (
                  <label
                    htmlFor="gallery-file-input"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      handleFileSelect(e.dataTransfer.files?.[0]);
                    }}
                    className="mt-2 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed py-10 text-center transition hover:border-primary hover:bg-muted/30"
                  >
                    <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                      <Upload className="size-5 text-muted-foreground" />
                    </div>

                    <p className="text-sm font-medium">
                      Click to upload or drag and drop
                    </p>

                    <p className="text-xs text-muted-foreground">
                      PNG, JPG or WEBP, up to {MAX_FILE_SIZE_MB}MB
                    </p>
                  </label>
                ) : (
                  <div className="relative mt-2 overflow-hidden rounded-xl border">
                    <img
                      src={form.imageUrl}
                      alt="Preview"
                      className="aspect-video w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        setForm({ ...form, imageUrl: "" });
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                      className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-black/80"
                      title="Remove image"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <label className="text-sm font-medium">Image URL</label>

                <input
                  type="url"
                  value={form.imageUrl}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      imageUrl: e.target.value,
                    })
                  }
                  placeholder="https://..."
                  className="mt-2 h-10 w-full rounded-xl border bg-background px-3 text-sm outline-none focus:border-primary"
                />

                {form.imageUrl && (
                  <div className="mt-3 overflow-hidden rounded-xl border">
                    <img
                      src={form.imageUrl}
                      alt="Preview"
                      className="aspect-video w-full object-cover"
                    />
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddDialog(false)}
                className="h-10 rounded-xl border px-4 text-sm font-medium transition hover:bg-muted"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting || !form.title.trim() || !form.imageUrl.trim()}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting && <Loader2 className="size-4 animate-spin" />}
                Add Image
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog
        open={Boolean(previewImage)}
        onOpenChange={(open) => {
          if (!open) setPreviewImage(null);
        }}
      >
        <DialogContent className="max-w-4xl p-3">
          {previewImage && (
            <>
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={previewImage.imageUrl}
                  alt={previewImage.title}
                  className="max-h-[75vh] w-full object-contain"
                />
              </div>

              <div className="px-2 pb-2">
                <h2 className="font-semibold">{previewImage.title}</h2>

                <p className="mt-1 text-sm capitalize text-muted-foreground">
                  {previewImage.category}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={Boolean(deleteId)}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this image?
            </AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. The image will be removed from your
              gallery.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default GalleryAdmin;