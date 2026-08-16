import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import { useSelector } from "react-redux";

function Contact() {
  const {company} = useSelector((state)=>state.settings)
  return (
    <main>
      {/* Page Hero */}
      <section className="border-b bg-background py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Contact Us
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Let's talk about
              <br />
              <span className="text-muted-foreground">
                your next project.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Have a construction or engineering project in mind?
              Tell us what you're planning and our team will get
              back to you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="bg-muted/30 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Get in touch
            </h2>

            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              Whether you are planning a new home, commercial
              building, or another construction project, we'd
              be happy to hear from you.
            </p>

            <div className="mt-8 space-y-6">

              {/* Location */}
              <div className="flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <MapPin className="size-5 text-primary" />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Office
                  </p>
                  {company.address && (

                  <span className="mt-1 text-sm leading-6 text-muted-foreground">
                    {company.address}
                  </span>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Phone className="size-5 text-primary" />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Phone
                  </p>
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
              <div className="flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Mail className="size-5 text-primary" />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Email
                  </p>
                  {company.email && (

                  <a
                    href={`${company.email}`}
                    className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {`${company.email}`}
                  </a>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Form */}
          <ContactForm />

        </div>
      </section>
    </main>
  );
}

export default Contact;