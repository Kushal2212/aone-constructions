
import {
  ArrowUpRight,
  ClipboardList,
  FolderOpen,
  Image,
  MessageSquare,
  Plus,
  Star,
  Users,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const clientStatusConfig = [
  { key: "lead", label: "Leads" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" },
];

function Dashboard() {
  const clients = useSelector((state) => state.clients.items);
  const enquiries = useSelector((state) => state.enquiries.items);
  const gallery = useSelector((state) => state.gallery.items);
  const testimonials = useSelector(
    (state) => state.testimonials.items,
  );

 
  // Dashboard statistics
  

  const totalClients = clients.length;

  const totalEnquiries = enquiries.length;

  const newEnquiries = enquiries.filter(
    (enquiry) => enquiry.status === "new",
  ).length;

  const totalGalleryImages = gallery.length;

  const totalTestimonials = testimonials.length;

  const publishedTestimonials = testimonials.filter(
    (testimonial) => testimonial.published,
  ).length;

 
  // Recent enquiries


  const recentEnquiries = [...enquiries]
    .sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt),
    )
    .slice(0, 5);

  
  // Client status
   const clientStatuses = clientStatusConfig.map((status) => {
    const count = clients.filter(
      (client) => client.status === status.key,
    ).length;

    const percentage =
      totalClients > 0
        ? Math.round((count / totalClients) * 100)
        : 0;

    return {
      ...status,
      count,
      percentage,
    };
  });

  return (
    <div className="w-full min-w-0 space-y-8">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">
            Overview
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Dashboard
          </h1>
          

          <p className="mt-2 text-sm text-muted-foreground">
            Welcome back. Here's what's happening with
            A.one Construction.
          </p>
          
        </div>

        <Link
          to="/admin/enquiries"
          className="group inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
        >
          View Enquiries

          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Enquiries"
          value={totalEnquiries}
          description="All enquiries received"
          icon={MessageSquare}
        />

        <StatCard
          title="New Enquiries"
          value={newEnquiries}
          description="Waiting for response"
          icon={ClipboardList}
        />

        <StatCard
          title="Total Clients"
          value={totalClients}
          description="Registered clients"
          icon={Users}
        />

        <StatCard
          title="Gallery Images"
          value={totalGalleryImages}
          description="Images in gallery"
          icon={Image}
        />

      </div>

      {/* Main dashboard content */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* Recent Enquiries */}
        <section className="rounded-2xl border bg-background lg:col-span-2">

          <div className="flex items-center justify-between border-b p-5">

            <div>
              <h2 className="font-semibold tracking-tight">
                Recent Enquiries
              </h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Latest enquiries received from your website.
              </p>
            </div>

            <Link
              to="/admin/enquiries"
              className="text-sm font-medium text-primary hover:underline"
            >
              View all
            </Link>

          </div>

          {recentEnquiries.length === 0 ? (
            <EmptyState
              icon={MessageSquare}
              message="No enquiries yet."
            />
          ) : (
            <div className="divide-y">

              {recentEnquiries.map((enquiry) => (
                <div
                  key={enquiry.id}
                  className="flex items-center gap-4 p-5 transition-colors hover:bg-muted/40"
                >

                  {/* Avatar */}
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                    {enquiry.name?.charAt(0)?.toUpperCase()}
                  </div>

                  {/* Information */}
                  <div className="min-w-0 flex-1">

                    <p className="truncate text-sm font-semibold">
                      {enquiry.name}
                    </p>

                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {enquiry.message}
                    </p>

                  </div>

                  {/* Status */}
                  <div className="hidden text-right sm:block">

                    <p className="text-xs text-muted-foreground">
                      {formatDate(enquiry.createdAt)}
                    </p>

                    <span
                      className={`
                        mt-1 inline-flex rounded-full px-2 py-0.5
                        text-[11px] font-medium
                        ${
                          enquiry.status === "new"
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        }
                      `}
                    >
                      {enquiry.status}
                    </span>

                  </div>

                </div>
              ))}

            </div>
          )}

        </section>

        {/* Client Status */}
        <section className="rounded-2xl border bg-background p-5">

          <div>
            <h2 className="font-semibold tracking-tight">
              Client Status
            </h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Current client distribution.
            </p>
          </div>

          <div className="mt-7 space-y-6">

            {clientStatuses.map((status) => (
              <div key={status.key}>

                <div className="mb-2 flex items-center justify-between">

                  <span className="text-sm font-medium">
                    {status.label}
                  </span>

                  <span className="text-sm text-muted-foreground">
                    {status.count}
                  </span>

                </div>

                <div className="h-2 overflow-hidden rounded-full bg-muted">

                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{
                      width: `${status.percentage}%`,
                    }}
                  />

                </div>

              </div>
            ))}

          </div>

          <div className="mt-8 border-t pt-5">

            <p className="text-xs text-muted-foreground">
              Total clients
            </p>

            <p className="mt-1 text-2xl font-bold">
              {totalClients}
            </p>

          </div>

        </section>

      </div>

      {/* Bottom dashboard */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* Overview */}
        <section className="rounded-2xl border bg-background p-5 lg:col-span-2">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="font-semibold tracking-tight">
                Enquiry Overview
              </h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Recent enquiry activity.
              </p>
            </div>

            <ClipboardList className="size-5 text-muted-foreground" />

          </div>

          <div className="mt-6 flex h-48 items-end gap-3 rounded-xl bg-muted/40 p-5">

            {getEnquiryChart(enquiries).map(
              (height, index) => (
                <div
                  key={index}
                  className="flex h-full flex-1 items-end"
                >
                  <div
                    className="w-full rounded-t-md bg-primary/70 transition-all hover:bg-primary"
                    style={{
                      height: `${height}%`,
                    }}
                  />
                </div>
              ),
            )}

          </div>

        </section>

        {/* Quick Actions */}
        <section className="rounded-2xl border bg-background p-5">

          <h2 className="font-semibold tracking-tight">
            Quick Actions
          </h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Common admin actions.
          </p>

          <div className="mt-6 space-y-3">

            <QuickAction
              to="/admin/clients"
              icon={Plus}
              title="Add Client"
              description="Create a new client record"
            />

            <QuickAction
              to="/admin/gallery"
              icon={FolderOpen}
              title="Manage Gallery"
              description="Upload project images"
            />

            <QuickAction
              to="/admin/testimonials"
              icon={Star}
              title="Testimonials"
              description={`${publishedTestimonials} published of ${totalTestimonials}`}
            />

          </div>

        </section>

      </div>

    </div>
  );
}

/* ---------------------------------
   Stat Card
---------------------------------- */

function StatCard({
  title,
  value,
  description,
  icon: Icon,
}) {
  return (
    <div className="group rounded-2xl border bg-background p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">

      <div className="flex items-start justify-between">

        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="size-5 text-primary" />
        </div>

        <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />

      </div>

      <p className="mt-5 text-sm text-muted-foreground">
        {title}
      </p>

      <p className="mt-1 text-3xl font-bold tracking-tight">
        {value}
      </p>

      <p className="mt-1 text-xs text-muted-foreground">
        {description}
      </p>


    </div>
  );
}

/* ---------------------------------
   Quick Action
---------------------------------- */

function QuickAction({
  to,
  icon: Icon,
  title,
  description,
}) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-3 rounded-xl border p-3 transition-all hover:border-primary/30 hover:bg-muted/40"
    >

      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="size-4 text-primary" />
      </div>

      <div className="min-w-0 flex-1">

        <p className="text-sm font-medium">
          {title}
        </p>

        <p className="truncate text-xs text-muted-foreground">
          {description}
        </p>

      </div>

      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />

    </Link>
  );
}

/* ---------------------------------
   Empty State
---------------------------------- */

function EmptyState({ icon: Icon, message }) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center gap-3 text-center">

      <div className="flex size-10 items-center justify-center rounded-full bg-muted">
        <Icon className="size-5 text-muted-foreground" />
      </div>

      <p className="text-sm text-muted-foreground">
        {message}
      </p>

    </div>
  );
}

/* ---------------------------------
   Date
---------------------------------- */

function formatDate(date) {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

/* ---------------------------------
   Simple enquiry chart
---------------------------------- */

function getEnquiryChart(enquiries) {
  if (!enquiries.length) {
    return [20, 20, 20, 20, 20, 20, 20, 20];
  }

  const values = Array.from(
    { length: 8 },
    (_, index) => {
      const start = Math.floor(
        (index / 8) * enquiries.length,
      );

      const end = Math.floor(
        ((index + 1) / 8) * enquiries.length,
      );

      return Math.max(end - start, 1);
    },
  );

  const max = Math.max(...values);

  return values.map((value) =>
    Math.max((value / max) * 100, 15),
  );
}

export default Dashboard;