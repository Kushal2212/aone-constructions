import {
  Check,
  Eye,
  EyeOff,
  ImagePlus,
  Loader2,
  Pencil,
  Search,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import {
  addProjectImage,
  updateProject,
  toggleProjectPublished,
  removeProject,
} from "../../store/slices/projectSlice";

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
const statusOptions = ["all", "published", "unpublished"];

const MAX_FILE_SIZE_MB = 5;

function ProjectAdmin() {
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.projects.items);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [previewProject, setPreviewProject] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [sourceType, setSourceType] = useState("upload"); // "upload" | "url"
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    category: "residential",
    description: "",
    location: "",
    imageUrl: "",
  });

  const filteredProjects = useMemo(() => {
    return projects
      .filter((item) => {
        const matchesSearch = item.title
          ?.toLowerCase()
          .includes(search.toLowerCase());

        const matchesCategory =
          category === "all" || item.category === category;

        const matchesStatus =
          status === "all" ||
          (status === "published" && item.published) ||
          (status === "unpublished" && !item.published);

        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [projects, search, category, status]);

  const counts = {
    all: projects.length,
    published: projects.filter((item) => item.published).length,
    unpublished: projects.filter((item) => !item.published).length,
  };

  const resetForm = () => {
    setForm({
      title: "",
      category: "residential",
      description: "",
      location: "",
      imageUrl: "",
    });
    setSourceType("upload");
    setEditingProject(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const openAddDialog = () => {
    resetForm();
    setDialogOpen(true);
  };

  const openEditDialog = (item) => {
    setEditingProject(item);
    setForm({
      title: item.title,
      category: item.category,
      description: item.description || "",
      location: item.location || "",
      imageUrl: item.imageUrl,
    });
    setSourceType(item.imageUrl?.startsWith("data:") ? "upload" : "url");
    setDialogOpen(true);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.error("Please enter a project title.");
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

    if (editingProject) {
      dispatch(
        updateProject({
          id: editingProject.id,
          changes: {
            title: form.title.trim(),
            category: form.category,
            description: form.description.trim(),
            location: form.location.trim(),
            imageUrl: form.imageUrl.trim(),
          },
        }),
      );

      toast.success("Project updated successfully.");
    } else {
      dispatch(
        addProjectImage({
          title: form.title.trim(),
          category: form.category,
          description: form.description.trim(),
          location: form.location.trim(),
          imageUrl: form.imageUrl.trim(),
        }),
      );

      toast.success("Project added successfully.");
    }

    setIsSubmitting(false);
    resetForm();
    setDialogOpen(false);
  };

  const handleTogglePublished = (id) => {
    dispatch(toggleProjectPublished(id));

    const item = projects.find((entry) => entry.id === id);

    toast.success(
      item?.published ? "Project unpublished" : "Project published",
    );
  };

  const handleDelete = () => {
    if (!deleteId) return;

    dispatch(removeProject(deleteId));

    toast.success("Project deleted successfully.");

    setDeleteId(null);
  };

  return (
    <div className="w-full min-w-0 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Management</p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">Projects</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Manage construction projects displayed on your website.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddDialog}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          <ImagePlus className="size-4" />
          Add Project
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          label="Total"
          value={counts.all}
          icon={ImagePlus}
          active={status === "all"}
          onClick={() => setStatus("all")}
        />

        <SummaryCard
          label="Published"
          value={counts.published}
          icon={Check}
          active={status === "published"}
          onClick={() => setStatus("published")}
        />

        <SummaryCard
          label="Unpublished"
          value={counts.unpublished}
          icon={EyeOff}
          active={status === "unpublished"}
          onClick={() => setStatus("unpublished")}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-2xl border bg-background p-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="text"
            placeholder="Search projects..."
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

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-10 rounded-xl border bg-background px-3 text-sm outline-none focus:border-primary"
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option === "all" ? "All Status" : capitalize(option)}
            </option>
          ))}
        </select>
      </div>

      {/* Projects */}
      {filteredProjects.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProjects.map((item) => (
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
                    onClick={() => setPreviewProject(item)}
                    className="flex size-9 items-center justify-center rounded-full bg-white text-black transition hover:scale-105"
                    title="Preview"
                  >
                    <Eye className="size-4" />
                  </button>
                </div>

                {/* Status badge */}
                <span
                  className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-medium backdrop-blur-md ${
                    item.published
                      ? "bg-green-500/90 text-white"
                      : "bg-black/50 text-white"
                  }`}
                >
                  {item.published ? "Published" : "Unpublished"}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs capitalize text-muted-foreground">
                    {item.category}
                  </p>

                  {item.description && (
                    <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  )}

                  {item.location && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      📍 {item.location}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-4 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleTogglePublished(item.id)}
                    className={`inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg border text-xs font-medium transition ${
                      item.published
                        ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                        : "border-border bg-background text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {item.published ? (
                      <>
                        <Eye className="size-3.5" />
                        Published
                      </>
                    ) : (
                      <>
                        <EyeOff className="size-3.5" />
                        Unpublished
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => openEditDialog(item)}
                    className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
                    title="Edit project"
                  >
                    <Pencil className="size-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteId(item.id)}
                    className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-red-50 hover:text-red-600"
                    title="Delete project"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Dialog */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}
      >
        <DialogContent className="flex max-h-[85vh] flex-col sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingProject ? "Edit Project" : "Add Project"}
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={handleSubmit}
            className="flex-1 space-y-5 overflow-y-auto pt-2 pr-1"
          >
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

            <div>
              <label className="text-sm font-medium">
                Description{" "}
                <span className="font-normal text-muted-foreground">
                  (optional)
                </span>
              </label>

              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
                rows={3}
                placeholder="Brief details about the project..."
                className="mt-2 w-full resize-none rounded-xl border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Location{" "}
                <span className="font-normal text-muted-foreground">
                  (optional)
                </span>
              </label>

              <input
                type="text"
                value={form.location}
                onChange={(e) =>
                  setForm({
                    ...form,
                    location: e.target.value,
                  })
                }
                placeholder="e.g. Kathmandu, Nepal"
                className="mt-2 h-10 w-full rounded-xl border bg-background px-3 text-sm outline-none focus:border-primary"
              />
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
                  id="project-file-input"
                />

                {!form.imageUrl ? (
                  <label
                    htmlFor="project-file-input"
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
                        if (fileInputRef.current)
                          fileInputRef.current.value = "";
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
                onClick={() => setDialogOpen(false)}
                className="h-10 rounded-xl border px-4 text-sm font-medium transition hover:bg-muted"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={
                  isSubmitting || !form.title.trim() || !form.imageUrl.trim()
                }
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting && <Loader2 className="size-4 animate-spin" />}
                {editingProject ? "Save Changes" : "Add Project"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog
        open={Boolean(previewProject)}
        onOpenChange={(open) => {
          if (!open) setPreviewProject(null);
        }}
      >
        <DialogContent className="max-w-4xl p-3">
          {previewProject && (
            <>
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={previewProject.imageUrl}
                  alt={previewProject.title}
                  className="max-h-[75vh] w-full object-contain"
                />
              </div>

              <div className="px-2 pb-2">
                <h2 className="font-semibold">{previewProject.title}</h2>

                <p className="mt-1 text-sm capitalize text-muted-foreground">
                  {previewProject.category}
                </p>

                {previewProject.description && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {previewProject.description}
                  </p>
                )}

                {previewProject.location && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    📍 {previewProject.location}
                  </p>
                )}
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
              Are you sure you want to delete this project?
            </AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. The project will be permanently
              removed from your records.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}


 //  Summary Card


function SummaryCard({ label, value, icon: Icon, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
        active ? "border-primary/30 bg-primary/[0.03]" : "bg-background"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="size-5 text-primary" />
        </div>

        <span className="text-xs font-medium text-muted-foreground">View</span>
      </div>

      <p className="mt-5 text-sm text-muted-foreground">{label}</p>

      <p className="mt-1 text-3xl font-bold tracking-tight">{value}</p>
    </button>
  );
}


  // Empty State


function EmptyState() {
  return (
    <div className="rounded-2xl border bg-background py-20 text-center">
      <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
        <ImagePlus className="size-5 text-muted-foreground" />
      </div>

      <p className="mt-4 text-sm font-semibold">No projects found</p>

      <p className="mt-1 text-sm text-muted-foreground">
        Try changing your search/filter or add a new project.
      </p>
    </div>
  );
}


//   Helpers


function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default ProjectAdmin;