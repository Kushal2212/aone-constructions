import { useForm } from "react-hook-form";
import { ArrowUpRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(data) {
    // Temporary API simulation.
    // Later this becomes:
    // await api.post("/api/enquiries", data);

    await new Promise((resolve) => setTimeout(resolve, 800));

    console.log("Enquiry:", data);
  }

  if (isSubmitSuccessful) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border bg-background p-8 text-center sm:p-12">
        <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
          <ArrowUpRight className="size-6 text-primary" />
        </div>

        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          Enquiry received
        </h2>

        <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
          Thank you for contacting A.one Brain Construction. Our team will
          review your enquiry and get back to you.
        </p>

        <Button
          type="button"
          variant="outline"
          className="mt-7 rounded-full"
          onClick={() => reset()}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-3xl border bg-background p-6 sm:p-8 lg:p-10"
    >
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Send us an enquiry
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Fill in the details below and tell us about your project.
        </p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {/* Name */}
        <div className="sm:col-span-2">
          <label htmlFor="name" className="text-sm font-medium">
            Full name
          </label>

          <input
            id="name"
            type="text"
            placeholder="Your full name"
            aria-invalid={errors.name ? "true" : "false"}
            {...register("name", {
              required: "Please enter your name",
            })}
            className={[
              "mt-2 h-11 w-full rounded-xl border bg-background px-4 text-sm outline-none transition",
              "focus:ring-2 focus:ring-primary/10",
              errors.name
                ? "border-destructive focus:border-destructive"
                : "focus:border-primary",
            ].join(" ")}
          />

          {errors.name && (
            <p className="mt-1.5 text-xs text-destructive">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="text-sm font-medium">
            Phone number
          </label>

          <input
            id="phone"
            type="tel"
            placeholder="+977 98XXXXXXXX"
            aria-invalid={errors.phone ? "true" : "false"}
            {...register("phone", {
              required: "Please enter your phone number",
              pattern: {
                value: /^[+\d][\d\s-]{7,}$/,
                message: "Enter a valid phone number",
              },
            })}
            className={[
              "mt-2 h-11 w-full rounded-xl border bg-background px-4 text-sm outline-none transition",
              "focus:ring-2 focus:ring-primary/10",
              errors.phone
                ? "border-destructive focus:border-destructive"
                : "focus:border-primary",
            ].join(" ")}
          />

          {errors.phone && (
            <p className="mt-1.5 text-xs text-destructive">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="text-sm font-medium">
            Email address
          </label>

          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            aria-invalid={errors.email ? "true" : "false"}
            {...register("email", {
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
            className={[
              "mt-2 h-11 w-full rounded-xl border bg-background px-4 text-sm outline-none transition",
              "focus:ring-2 focus:ring-primary/10",
              errors.email
                ? "border-destructive focus:border-destructive"
                : "focus:border-primary",
            ].join(" ")}
          />

          {errors.email && (
            <p className="mt-1.5 text-xs text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <label htmlFor="message" className="text-sm font-medium">
            Project details
          </label>

          <textarea
            id="message"
            rows={6}
            placeholder="Tell us about your construction requirements..."
            aria-invalid={errors.message ? "true" : "false"}
            {...register("message", {
              required: "Please share a few details about your project",
              minLength: {
                value: 10,
                message: "Please provide a bit more detail",
              },
            })}
            className={[
              "mt-2 w-full resize-none rounded-xl border bg-background px-4 py-3 text-sm outline-none transition",
              "focus:ring-2 focus:ring-primary/10",
              errors.message
                ? "border-destructive focus:border-destructive"
                : "focus:border-primary",
            ].join(" ")}
          />

          {errors.message && (
            <p className="mt-1.5 text-xs text-destructive">
              {errors.message.message}
            </p>
          )}
        </div>
      </div>

      {/* Submit */}

      <Button
        type="submit"
        asChild
        size="lg"
        disabled={isSubmitting}
        className="group relative h-12 min-w-[190px] overflow-hidden rounded-full bg-slate-900 px-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Enquiry
          </>
        )}
      </Button>

      <p className="mt-4 text-xs leading-5 text-muted-foreground">
        Your information will only be used to respond to your enquiry.
      </p>
    </form>
  );
}

export default ContactForm;
