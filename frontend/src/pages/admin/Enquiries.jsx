import {
  Check,
  Eye,
  Mail,
  MessageSquare,
  Phone,
  Search,
  Trash2,
  UserRound,
} from "lucide-react";
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

import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEnquiry,
  setEnquiryStatus,
} from "../../store/slices/enquiriesSlice";
import { toast } from "sonner";

const statusOptions = ["all", "new", "contacted", "converted"];

function Enquiries() {
  const dispatch = useDispatch();

  const enquiries = useSelector((state) => state.enquiries.items);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const filteredEnquiries = useMemo(() => {
    return [...enquiries]
      .filter((enquiry) => {
        const matchesSearch =
          enquiry.name?.toLowerCase().includes(search.toLowerCase()) ||
          enquiry.email?.toLowerCase().includes(search.toLowerCase()) ||
          enquiry.phone?.toLowerCase().includes(search.toLowerCase());

        const matchesStatus = status === "all" || enquiry.status === status;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [enquiries, search, status]);

  const counts = {
    all: enquiries.length,
    new: enquiries.filter((item) => item.status === "new").length,
    contacted: enquiries.filter((item) => item.status === "contacted").length,
    converted: enquiries.filter((item) => item.status === "converted").length,
  };

  const handleStatusChange = (id, newStatus) => {
    dispatch(
      setEnquiryStatus({
        id,
        status: newStatus,
      }),
    );

    toast.success(`Enquiry marked as ${newStatus}`);
  };

  return (
    <div className="w-full min-w-0 space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-primary">Management</p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight">Enquiries</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Manage enquiries received from your website.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Total"
          value={counts.all}
          icon={MessageSquare}
          active={status === "all"}
          onClick={() => setStatus("all")}
        />

        <SummaryCard
          label="New"
          value={counts.new}
          icon={Mail}
          active={status === "new"}
          onClick={() => setStatus("new")}
        />

        <SummaryCard
          label="Contacted"
          value={counts.contacted}
          icon={Phone}
          active={status === "contacted"}
          onClick={() => setStatus("contacted")}
        />

        <SummaryCard
          label="Converted"
          value={counts.converted}
          icon={Check}
          active={status === "converted"}
          onClick={() => setStatus("converted")}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-2xl border bg-background p-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="text"
            placeholder="Search by name, email or phone..."
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

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border bg-background">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead className="border-b bg-muted/40">
              <tr className="text-left text-xs font-medium text-muted-foreground">
                <th className="px-5 py-4">Client</th>

                <th className="px-5 py-4">Contact</th>

                <th className="px-5 py-4">Message</th>

                <th className="px-5 py-4">Date</th>

                <th className="px-5 py-4">Status</th>

                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredEnquiries.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-16 text-center">
                    <div className="flex flex-col items-center">
                      <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                        <MessageSquare className="size-5 text-muted-foreground" />
                      </div>

                      <p className="mt-3 text-sm font-medium">
                        No enquiries found
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Try changing your search or filter.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredEnquiries.map((enquiry) => (
                  <tr
                    key={enquiry.id}
                    className="group transition-colors hover:bg-muted/30"
                  >
                    {/* Client */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                          {enquiry.name?.charAt(0)?.toUpperCase()}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">
                            {enquiry.name}
                          </p>

                          <p className="truncate text-xs text-muted-foreground">
                            {enquiry.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-5 py-4">
                      <p className="text-sm">{enquiry.phone}</p>
                    </td>

                    {/* Message */}
                    <td className="max-w-[260px] px-5 py-4">
                      <p className="truncate text-sm text-muted-foreground">
                        {enquiry.message}
                      </p>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4">
                      <p className="whitespace-nowrap text-sm text-muted-foreground">
                        {formatDate(enquiry.createdAt)}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <select
                        value={enquiry.status}
                        onChange={(e) =>
                          handleStatusChange(enquiry.id, e.target.value)
                        }
                        className={`rounded-full border px-3 py-1 text-xs font-medium outline-none ${
                          enquiry.status === "new"
                            ? "border-primary/20 bg-primary/10 text-primary"
                            : enquiry.status === "converted"
                              ? "border-green-200 bg-green-50 text-green-700"
                              : "border-border bg-muted text-muted-foreground"
                        }`}
                      >
                        <option value="new">New</option>

                        <option value="contacted">Contacted</option>

                        <option value="converted">Converted</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => setSelectedEnquiry(enquiry)}
                          className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
                          title="View enquiry"
                        >
                          <Eye className="size-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteId(enquiry.id)}
                          className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-red-50 hover:text-red-600"
                          title="Delete enquiry"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail panel */}
      {selectedEnquiry && (
        <EnquiryDetails
          enquiry={selectedEnquiry}
          onClose={() => setSelectedEnquiry(null)}
        />
      )}

      {/* Delete confirmation */}
      <AlertDialog
        open={Boolean(deleteId)}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this enquiry?
            </AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. This enquiry will be permanently
              removed from your records.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={() => {
                dispatch(deleteEnquiry(deleteId));
                setDeleteId(null);

                toast.success("Enquiry deleted successfully");
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

/* ----------------------------------
   Summary Card
----------------------------------- */

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

/* ----------------------------------
   Enquiry Details
----------------------------------- */

function EnquiryDetails({ enquiry, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl border bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b p-5">
          <div>
            <h2 className="font-semibold">Enquiry Details</h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Received {formatDate(enquiry.createdAt)}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1 text-sm text-muted-foreground hover:bg-muted"
          >
            Close
          </button>
        </div>

        <div className="space-y-5 p-5">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-full bg-muted">
              <UserRound className="size-5 text-muted-foreground" />
            </div>

            <div>
              <p className="font-semibold">{enquiry.name}</p>

              <p className="text-sm text-muted-foreground">{enquiry.email}</p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border p-3">
              <p className="text-xs text-muted-foreground">Phone</p>

              <p className="mt-1 text-sm font-medium">{enquiry.phone}</p>
            </div>

            <div className="rounded-xl border p-3">
              <p className="text-xs text-muted-foreground">Status</p>

              <p className="mt-1 text-sm font-medium capitalize">
                {enquiry.status}
              </p>
            </div>
          </div>

          <div className="rounded-xl border p-4">
            <p className="text-xs font-medium text-muted-foreground">Message</p>

            <p className="mt-2 text-sm leading-6">{enquiry.message}</p>
          </div>
        </div>
      </div>
    </div>
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

export default Enquiries;
