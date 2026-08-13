import { ArrowUpRight, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

function LocationPreview() {
  return (
    <section className="border-b bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Find Us
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Local expertise.
            <br />
            <span className="text-muted-foreground">
              Built around your project.
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
            Based in Morang, Nepal, A.one Brain Construction is committed to
            providing reliable construction and engineering solutions for
            clients in the region.
          </p>
        </div>

        {/* Content */}
        <div className="mt-14 grid overflow-hidden rounded-3xl border lg:grid-cols-2">
          {/* Location information */}
          <div className="flex flex-col justify-between bg-muted/30 p-7 sm:p-10 lg:p-12">
            <div>
              <h3 className="text-xl font-semibold tracking-tight">
                A.one Brain Construction Pvt. Ltd.
              </h3>

              {/* Address */}
              <div className="mt-8 flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <MapPin className="size-5 text-primary" />
                </div>

                <div>
                  <p className="text-sm font-semibold">Office Location</p>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Pathari-Shanischare-1,
                    <br />
                    Morang, Nepal
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="mt-6 flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Phone className="size-5 text-primary" />
                </div>

                <div>
                  <p className="text-sm font-semibold">Phone</p>

                  <a
                    href="tel:+9770000000000"
                    className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    +977 000 000 0000
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="mt-6 flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Mail className="size-5 text-primary" />
                </div>

                <div>
                  <p className="text-sm font-semibold">Email</p>

                  <a
                    href="mailto:info@example.com"
                    className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    info@example.com
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="mt-6 flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Clock3 className="size-5 text-primary" />
                </div>

                <div>
                  <p className="text-sm font-semibold">Working Hours</p>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Sunday – Friday
                    <br />
                    10:00 AM – 5:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Contact link */}
            <Link
              to="/contact"
              className="group mt-10 inline-flex w-fit items-center gap-1.5 text-sm font-semibold"
            >
              <span className="border-b border-transparent pb-0.5 transition-colors duration-300 group-hover:border-current">
                Get in touch
              </span>
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Map — live embed */}
          <div className="relative min-h-[400px] lg:min-h-full">
            <iframe
              title="A.one Brain Construction location map"
              src="https://www.google.com/maps?q=Pathari-Shanischare-1,%20Morang,%20Nepal&output=embed"
              className="absolute inset-0 h-full w-full grayscale-[20%]"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Floating "Open in Maps" chip over the embed */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Pathari-Shanischare-1%2C%20Morang%2C%20Nepal"
              target="_blank"
              rel="noreferrer"
              className="group absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2.5 text-sm font-semibold shadow-lg shadow-slate-900/10 transition-colors duration-300 hover:bg-muted/60"
            >
              Open in Maps
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LocationPreview;
