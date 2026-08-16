import { ArrowUpRight, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

function LocationPreview() {
  const {company} = useSelector((state) => state.settings)
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
                  {company.address && (

                  <span className="mt-1 text-sm leading-6 text-muted-foreground">
                    {company.address}
                  </span>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className="mt-6 flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Phone className="size-5 text-primary" />
                </div>

                <div>
                  <p className="text-sm font-semibold">Phone</p>

                  {company.phone && (

                  <a
                    href={`${company.phone}`}
                    className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {company.phone}
                  </a>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="mt-6 flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Mail className="size-5 text-primary" />
                </div>

                <div>
                  <p className="text-sm font-semibold">Email</p>

                  {company.email && (

                  <a
                    href={`${company.email}`}
                    className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {company.email}
                  </a>
                  )}
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
            <div className="hidden items-center lg:flex mt-6 flex gap-4 ">
              <Button
                nativeButton={false}
                size="lg"
                render={<Link to="/contact"/>}
                className="group relative h-11 min-w-[190px] overflow-hidden rounded-full bg-slate-900 px-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20"
              >
                  <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-x-2">
                    Get in Touch
                  </span>

                  <ArrowUpRight
                    className="
                    absolute right-4 top-1/2 size-4 -translate-y-1/2
                    text-white opacity-70
                    transition-all duration-300 ease-out
                    group-hover:right-3.5
                    group-hover:translate-x-0.5
                    group-hover:opacity-100
                    group-hover:text-sky-400
                  "
                  />
                
              </Button>
            </div>
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
