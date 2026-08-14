import {
  Check,
  Edit,
  Eye,
  Mail,
  MapPin,
  Phone,
  Plus,
  Search,
  Trash2,
  UserRound,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

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
  addClient,
  deleteClient,
  updateClient,
} from "../../store/slices/clientSlice";

const statusOptions = ["all", "lead", "active", "completed"];

function Clients() {
  const dispatch = useDispatch();

  const clients = useSelector((state) => state.clients.items);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const [selectedClient, setSelectedClient] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  const filteredClients = useMemo(() => {
    return [...clients]
      .filter((client) => {
        const query = search.toLowerCase();

        const matchesSearch =
          client.name?.toLowerCase().includes(query) ||
          client.email?.toLowerCase().includes(query) ||
          client.phone?.toLowerCase().includes(query);

        const matchesStatus = status === "all" || client.status === status;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [clients, search, status]);

  const counts = {
    all: clients.length,

    lead: clients.filter((client) => client.status === "lead").length,

    active: clients.filter((client) => client.status === "active").length,

    completed: clients.filter((client) => client.status === "completed").length,
  };

  const handleDelete = () => {
    if (!deleteId) return;

    dispatch(deleteClient(deleteId));

    if (selectedClient?.id === deleteId) {
      setSelectedClient(null);
    }

    setDeleteId(null);

    toast.success("Client deleted successfully");
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setShowForm(true);
  };

  const handleFormSubmit = (formData) => {
    if (editingClient) {
      dispatch(
        updateClient({
          id: editingClient.id,
          changes: formData,
        }),
      );

      toast.success("Client updated successfully");
    } else {
      dispatch(addClient(formData));

      toast.success("Client added successfully");
    }

    setShowForm(false);
    setEditingClient(null);
  };

  return (
    <div className="w-full min-w-0 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Management</p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">Clients</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Manage your construction clients and their project information.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingClient(null);
            setShowForm(true);
          }}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          <Plus className="size-4" />
          Add Client
        </button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Total Clients"
          value={counts.all}
          icon={Users}
          active={status === "all"}
          onClick={() => setStatus("all")}
        />

        <SummaryCard
          label="Leads"
          value={counts.lead}
          icon={UserRound}
          active={status === "lead"}
          onClick={() => setStatus("lead")}
        />

        <SummaryCard
          label="Active"
          value={counts.active}
          icon={Phone}
          active={status === "active"}
          onClick={() => setStatus("active")}
        />

        <SummaryCard
          label="Completed"
          value={counts.completed}
          icon={Check}
          active={status === "completed"}
          onClick={() => setStatus("completed")}
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
          <table className="w-full min-w-[950px]">
            <thead className="border-b bg-muted/40">
              <tr className="text-left text-xs font-medium text-muted-foreground">
                <th className="px-5 py-4">Client</th>

                <th className="px-5 py-4">Contact</th>

                <th className="px-5 py-4">Address</th>

                <th className="px-5 py-4">Status</th>

                <th className="px-5 py-4">Added</th>

                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-16 text-center">
                    <div className="flex flex-col items-center">
                      <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                        <Users className="size-5 text-muted-foreground" />
                      </div>

                      <p className="mt-3 text-sm font-medium">
                        No clients found
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Try changing your search or filter.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => (
                  <tr
                    key={client.id}
                    className="group transition-colors hover:bg-muted/30"
                  >
                    {/* Client */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                          {client.name?.charAt(0)?.toUpperCase()}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">
                            {client.name}
                          </p>

                          <p className="truncate text-xs text-muted-foreground">
                            {client.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-5 py-4">
                      <div className="space-y-1">
                        <p className="text-sm">{client.phone}</p>

                        <p className="text-xs text-muted-foreground">
                          {client.email}
                        </p>
                      </div>
                    </td>

                    {/* Address */}
                    <td className="max-w-[220px] px-5 py-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                        <p className="truncate text-sm text-muted-foreground">
                          {client.address || "—"}
                        </p>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-medium ${
                          client.status === "lead"
                            ? "border-primary/20 bg-primary/10 text-primary"
                            : client.status === "active"
                              ? "border-blue-200 bg-blue-50 text-blue-700"
                              : "border-green-200 bg-green-50 text-green-700"
                        }`}
                      >
                        {capitalize(client.status)}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4">
                      <p className="whitespace-nowrap text-sm text-muted-foreground">
                        {formatDate(client.createdAt)}
                      </p>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => setSelectedClient(client)}
                          className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
                          title="View client"
                        >
                          <Eye className="size-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleEdit(client)}
                          className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
                          title="Edit client"
                        >
                          <Edit className="size-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteId(client.id)}
                          className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-red-50 hover:text-red-600"
                          title="Delete client"
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

      {/* Client details */}
      {selectedClient && (
        <ClientDetails
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
        />
      )}

      {/* Add/Edit form */}
      {showForm && (
        <ClientForm
          client={editingClient}
          onClose={() => {
            setShowForm(false);
            setEditingClient(null);
          }}
          onSubmit={handleFormSubmit}
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
              Are you sure you want to delete this client?
            </AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. This client will be permanently
              removed from your records.
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
   Client Details
----------------------------------- */

function ClientDetails({ client, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl border bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b p-5">
          <div>
            <h2 className="font-semibold">Client Details</h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Added {formatDate(client.createdAt)}
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
              <p className="font-semibold">{client.name}</p>

              <p className="text-sm text-muted-foreground">{client.email}</p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border p-3">
              <p className="text-xs text-muted-foreground">Phone</p>

              <p className="mt-1 text-sm font-medium">{client.phone}</p>
            </div>

            <div className="rounded-xl border p-3">
              <p className="text-xs text-muted-foreground">Status</p>

              <p className="mt-1 text-sm font-medium capitalize">
                {client.status}
              </p>
            </div>
          </div>

          <div className="rounded-xl border p-4">
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 text-muted-foreground" />

              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Address
                </p>

                <p className="mt-2 text-sm leading-6">
                  {client.address || "No address provided"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border p-4">
            <p className="text-xs font-medium text-muted-foreground">Notes</p>

            <p className="mt-2 text-sm leading-6">
              {client.notes || "No notes available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------
   Add/Edit Form
----------------------------------- */

function ClientForm({ client, onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: client?.name || "",
    phone: client?.phone || "",
    email: client?.email || "",
    address: client?.address || "",
    status: client?.status || "lead",
    notes: client?.notes || "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Client name is required");
      return;
    }

    if (!form.phone.trim()) {
      toast.error("Phone number is required");
      return;
    }

    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b p-5">
          <div>
            <h2 className="font-semibold">
              {client ? "Edit Client" : "Add Client"}
            </h2>

            <p className="mt-1 text-xs text-muted-foreground">
              {client
                ? "Update client information."
                : "Add a new client to your records."}
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

        <form onSubmit={handleSubmit} className="space-y-5 p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Client Name"
              value={form.name}
              onChange={(value) => handleChange("name", value)}
              placeholder="Enter client name"
            />

            <Field
              label="Phone"
              value={form.phone}
              onChange={(value) => handleChange("phone", value)}
              placeholder="Enter phone number"
            />
          </div>

          <Field
            label="Email"
            type="email"
            value={form.email}
            onChange={(value) => handleChange("email", value)}
            placeholder="client@example.com"
          />

          <Field
            label="Address"
            value={form.address}
            onChange={(value) => handleChange("address", value)}
            placeholder="Enter client address"
          />

          <div>
            <label className="text-sm font-medium">Status</label>

            <select
              value={form.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="mt-2 h-10 w-full rounded-xl border bg-background px-3 text-sm outline-none focus:border-primary"
            >
              <option value="lead">Lead</option>

              <option value="active">Active</option>

              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Notes</label>

            <textarea
              value={form.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Add notes about this client..."
              rows={4}
              className="mt-2 w-full resize-none rounded-xl border bg-background p-3 text-sm outline-none focus:border-primary"
            />
          </div>

          <div className="flex justify-end gap-3 border-t pt-5">
            <button
              type="button"
              onClick={onClose}
              className="h-10 rounded-xl border px-4 text-sm font-medium transition hover:bg-muted"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="h-10 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              {client ? "Save Changes" : "Add Client"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ----------------------------------
   Field
----------------------------------- */

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 h-10 w-full rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-primary"
      />
    </div>
  );
}

/* ----------------------------------
   Helpers
----------------------------------- */

function capitalize(value) {
  if (!value) return "";

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

export default Clients;
