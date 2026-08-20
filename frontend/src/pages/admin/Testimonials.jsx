import {
  Check,
  MessageSquareQuote,
  Pencil,
  Plus,
  Search,
  Star,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import {
  addTestimonial,
  updateTestimonial,
  togglePublished,
  deleteTestimonial,
} from "../../store/slices/testimonialsSlice";

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

const statusOptions = ["all", "published", "unpublished"];

function Testimonials() {
  const dispatch = useDispatch();

  const testimonials = useSelector((state) => state.testimonials.items);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  const [deleteId, setDeleteId] = useState(null);

  const filteredTestimonials = useMemo(() => {
    return testimonials
      .filter((testimonial) => {
        const searchValue = search.toLowerCase();

        const matchesSearch =
          testimonial.clientName?.toLowerCase().includes(searchValue) ||
          testimonial.role?.toLowerCase().includes(searchValue) ||
          testimonial.message?.toLowerCase().includes(searchValue);

        const matchesStatus =
          status === "all" ||
          (status === "published" && testimonial.published) ||
          (status === "unpublished" && !testimonial.published);

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [testimonials, search, status]);

  const counts = {
    all: testimonials.length,
    published: testimonials.filter((item) => item.published).length,
    unpublished: testimonials.filter((item) => !item.published).length,
  };

  const openAddDialog = () => {
    setEditingTestimonial(null);
    setDialogOpen(true);
  };

  const openEditDialog = (testimonial) => {
    setEditingTestimonial(testimonial);
    setDialogOpen(true);
  };

  const handleTogglePublished = (id) => {
    dispatch(togglePublished(id));

    const testimonial = testimonials.find((item) => item.id === id);

    toast.success(
      testimonial?.published
        ? "Testimonial unpublished"
        : "Testimonial published",
    );
  };

  const handleDelete = () => {
    if (!deleteId) return;

    dispatch(deleteTestimonial(deleteId));

    setDeleteId(null);

    toast.success("Testimonial deleted successfully");
  };

  return (
    <div className="w-full min-w-0 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Management</p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Testimonials
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Manage client testimonials displayed on your website.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddDialog}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          <Plus className="size-4" />
          Add Testimonial
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          label="Total"
          value={counts.all}
          icon={MessageSquareQuote}
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
            placeholder="Search client, role or testimonial..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-xl border bg-background pl-9 pr-4 text-sm outline-none transition focus:border-primary"
          />
        </div>

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

      {/* Testimonials */}
      <div className="overflow-hidden rounded-2xl border bg-background">
        {filteredTestimonials.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="divide-y">
            {filteredTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="group p-5 transition-colors hover:bg-muted/30 sm:p-6"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-4">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {testimonial.clientName?.charAt(0)?.toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold">
                            {testimonial.clientName}
                          </h3>

                          <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                            {testimonial.role}
                          </span>
                        </div>

                        {/* Rating */}
                        <div className="mt-2 flex items-center gap-1">
                          {Array.from({
                            length: 5,
                          }).map((_, index) => (
                            <Star
                              key={index}
                              className={`size-4 ${
                                index < testimonial.rating
                                  ? "fill-current text-yellow-500"
                                  : "text-muted-foreground/30"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="mt-5 rounded-xl border bg-muted/20 p-4">
                      <p className="text-sm leading-6 text-muted-foreground">
                        "{testimonial.message}"
                      </p>
                    </div>

                    <p className="mt-3 text-xs text-muted-foreground">
                      Added {formatDate(testimonial.createdAt)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 lg:pt-1">
                    {/* Published status */}
                    <button
                      type="button"
                      onClick={() => handleTogglePublished(testimonial.id)}
                      className={`inline-flex h-9 items-center gap-2 rounded-lg border px-3 text-xs font-medium transition ${
                        testimonial.published
                          ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                          : "border-border bg-background text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {testimonial.published ? (
                        <>
                          <Eye className="size-4" />
                          Published
                        </>
                      ) : (
                        <>
                          <EyeOff className="size-4" />
                          Unpublished
                        </>
                      )}
                    </button>

                    {/* Edit */}
                    <button
                      type="button"
                      onClick={() => openEditDialog(testimonial)}
                      className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
                      title="Edit testimonial"
                    >
                      <Pencil className="size-4" />
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => setDeleteId(testimonial.id)}
                      className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-red-50 hover:text-red-600"
                      title="Delete testimonial"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Dialog */}
      <TestimonialDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        testimonial={editingTestimonial}
      />

      {/* Delete Confirmation */}
      <AlertDialog
        open={Boolean(deleteId)}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteId(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this testimonial?
            </AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. This testimonial will be permanently
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


  // Summary Card


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


 //  Empty State


function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
        <MessageSquareQuote className="size-6 text-muted-foreground" />
      </div>

      <p className="mt-4 text-sm font-semibold">No testimonials found</p>

      <p className="mt-1 text-xs text-muted-foreground">
        Try changing your search or add a new testimonial.
      </p>
    </div>
  );
}


   //Add / Edit Dialog


function TestimonialDialog({ open, onOpenChange, testimonial }) {
  const dispatch = useDispatch();

  const [clientName, setClientName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);

  const isEditing = Boolean(testimonial);

  // Populate (or reset) the form whenever the dialog opens, or the
  // testimonial being edited changes. This runs regardless of *how*
  // `open` became true (parent-triggered or dialog-internal), unlike
  // relying on onOpenChange, which only fires for dialog-internal changes
  // (e.g. Escape key, overlay click) — not when a parent sets `open`
  // directly, which is exactly what happens when clicking "Edit".
  useEffect(() => {
    if (!open) return;

    if (testimonial) {
      setClientName(testimonial.clientName || "");
      setRole(testimonial.role || "");
      setMessage(testimonial.message || "");
      setRating(testimonial.rating || 5);
    } else {
      setClientName("");
      setRole("");
      setMessage("");
      setRating(5);
    }
  }, [open, testimonial]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!clientName.trim()) {
      toast.error("Client name is required");
      return;
    }

    if (!role.trim()) {
      toast.error("Client role is required");
      return;
    }

    if (!message.trim()) {
      toast.error("Testimonial message is required");
      return;
    }

    if (isEditing) {
      dispatch(
        updateTestimonial({
          id: testimonial.id,
          changes: {
            clientName: clientName.trim(),
            role: role.trim(),
            message: message.trim(),
            rating,
          },
        }),
      );

      toast.success("Testimonial updated successfully");
    } else {
      dispatch(
        addTestimonial({
          clientName: clientName.trim(),
          role: role.trim(),
          message: message.trim(),
          rating,
        }),
      );

      toast.success("Testimonial added successfully");
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Testimonial" : "Add Testimonial"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          {/* Client Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Client Name</label>

            <input
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g. Ram Sharma"
              className="h-10 w-full rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-primary"
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Role / Company</label>

            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Homeowner"
              className="h-10 w-full rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-primary"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Testimonial</label>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write the client's testimonial..."
              rows={5}
              className="w-full resize-none rounded-xl border bg-background p-3 text-sm leading-6 outline-none transition focus:border-primary"
            />
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Rating</label>

            <div className="flex items-center gap-1">
              {Array.from({
                length: 5,
              }).map((_, index) => {
                const starValue = index + 1;

                return (
                  <button
                    key={starValue}
                    type="button"
                    onClick={() => setRating(starValue)}
                    className="rounded-md p-1 transition hover:bg-muted"
                  >
                    <Star
                      className={`size-6 ${
                        starValue <= rating
                          ? "fill-current text-yellow-500"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="h-10 rounded-xl border px-4 text-sm font-medium transition hover:bg-muted"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="h-10 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              {isEditing ? "Save Changes" : "Add Testimonial"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}



function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function formatDate(date) {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default Testimonials;