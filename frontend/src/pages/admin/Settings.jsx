import {
  Building2,
  Globe,
  Mail,
  MapPin,
  Phone,
  Save,
  User,
  Bell,
  Settings as SettingsIcon,
} from "lucide-react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import {
  updateCompany,
  updateSocial,
  updateAdmin,
  toggleNotification,
} from "@/store/slices/settingsSlice";

const sidebarItems = [
  { key: "general", label: "General", icon: SettingsIcon },
  { key: "admin", label: "Admin Profile", icon: User },
  { key: "notifications", label: "Notifications", icon: Bell },
];

function Settings() {
  const dispatch = useDispatch();
  const { company, social, admin, notifications } = useSelector(
    (state) => state.settings,
  );

  // Local draft state for editing before save, so typing doesn't
  // hit Redux/localStorage on every keystroke.
  const [companyDraft, setCompanyDraft] = useState(company);
  const [socialDraft, setSocialDraft] = useState(social);
  const [adminDraft, setAdminDraft] = useState(admin);

  const [activeSection, setActiveSection] = useState("general");

  const sectionRefs = {
    general: useRef(null),
    admin: useRef(null),
    notifications: useRef(null),
  };

  const scrollToSection = (key) => {
    setActiveSection(key);
    sectionRefs[key]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompanyDraft((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setSocialDraft((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdminChange = (e) => {
    const { name, value } = e.target;
    setAdminDraft((prev) => ({ ...prev, [name]: value }));
  };

  const handleCompanySave = (e) => {
    e.preventDefault();
    dispatch(updateCompany(companyDraft));
    toast.success("Company information saved successfully");
  };

  const handleSocialSave = (e) => {
    e.preventDefault();
    dispatch(updateSocial(socialDraft));
    toast.success("Social links saved successfully");
  };

  const handleAdminSave = (e) => {
    e.preventDefault();
    dispatch(updateAdmin(adminDraft));
    toast.success("Admin profile saved successfully");
  };

  const handleNotificationChange = (key) => {
    dispatch(toggleNotification(key));
    toast.success("Notification preference updated");
  };

  return (
    <div className="w-full min-w-0 space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-primary">Administration</p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight">Settings</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Manage your company information, admin profile and website settings.
        </p>
      </div>

      {/* Settings navigation */}
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        {/* Left menu */}
        <aside className="h-fit rounded-2xl border bg-background p-2 lg:sticky lg:top-6">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.key;

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => scrollToSection(item.key)}
                className={`mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors first:mt-0 ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="size-4 shrink-0" />
                {item.label}
              </button>
            );
          })}
        </aside>

        {/* Main settings */}
        <div className="min-w-0 space-y-6">
          {/* General: Company Information + Social Media */}
          <div ref={sectionRefs.general} className="scroll-mt-6 space-y-6">
            {/* Company Information */}
            <section className="rounded-2xl border bg-background">
              <div className="border-b p-6">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                    <Building2 className="size-5 text-primary" />
                  </div>

                  <div>
                    <h2 className="font-semibold">Company Information</h2>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Information displayed throughout your website.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleCompanySave} className="space-y-5 p-6">
                {/* Company name */}
                <InputField
                  label="Company Name"
                  name="name"
                  value={companyDraft.name}
                  onChange={handleCompanyChange}
                  icon={Building2}
                  placeholder="Company name"
                />

                <div className="grid gap-5 md:grid-cols-2">
                  {/* Email */}
                  <InputField
                    label="Company Email"
                    name="email"
                    type="email"
                    value={companyDraft.email}
                    onChange={handleCompanyChange}
                    icon={Mail}
                    placeholder="company@example.com"
                  />

                  {/* Phone */}
                  <InputField
                    label="Phone Number"
                    name="phone"
                    value={companyDraft.phone}
                    onChange={handleCompanyChange}
                    icon={Phone}
                    placeholder="+977 98XXXXXXXX"
                  />
                </div>

                {/* Address */}
                <InputField
                  label="Address"
                  name="address"
                  value={companyDraft.address}
                  onChange={handleCompanyChange}
                  icon={MapPin}
                  placeholder="Company address"
                />

                {/* Website */}
                <InputField
                  label="Website"
                  name="website"
                  value={companyDraft.website}
                  onChange={handleCompanyChange}
                  icon={Globe}
                  placeholder="https://example.com"
                />

                <SaveButton />
              </form>
            </section>

            {/* Social Media */}
            <section className="rounded-2xl border bg-background">
              <div className="border-b p-6">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                    <Globe className="size-5 text-primary" />
                  </div>

                  <div>
                    <h2 className="font-semibold">Social Media</h2>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Add your company's social media profiles.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSocialSave} className="space-y-5 p-6">
                <InputField
                  label="LinkedIn"
                  name="linkedin"
                  value={socialDraft.linkedin}
                  onChange={handleSocialChange}
                  icon={Globe}
                  placeholder="LinkedIn profile URL"
                />

                <SaveButton />
              </form>
            </section>
          </div>

          {/* Admin Profile */}
          <section
            ref={sectionRefs.admin}
            className="scroll-mt-6 rounded-2xl border bg-background"
          >
            <div className="border-b p-6">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                  <User className="size-5 text-primary" />
                </div>

                <div>
                  <h2 className="font-semibold">Admin Profile</h2>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Manage the administrator information.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleAdminSave} className="space-y-5 p-6">
              <InputField
                label="Admin Name"
                name="name"
                value={adminDraft.name}
                onChange={handleAdminChange}
                icon={User}
                placeholder="Admin name"
              />

              <InputField
                label="Admin Email"
                name="email"
                type="email"
                value={adminDraft.email}
                onChange={handleAdminChange}
                icon={Mail}
                placeholder="admin@example.com"
              />

              <SaveButton />
            </form>
          </section>

          {/* Notifications */}
          <section
            ref={sectionRefs.notifications}
            className="scroll-mt-6 rounded-2xl border bg-background"
          >
            <div className="border-b p-6">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                  <Bell className="size-5 text-primary" />
                </div>

                <div>
                  <h2 className="font-semibold">Notifications</h2>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Choose which events should trigger notifications.
                  </p>
                </div>
              </div>
            </div>

            <div className="divide-y">
              <NotificationRow
                title="New enquiry"
                description="Notify when a visitor submits an enquiry."
                checked={notifications.newEnquiry}
                onChange={() => handleNotificationChange("newEnquiry")}
              />

              <NotificationRow
                title="New client"
                description="Notify when a new client is added."
                checked={notifications.newClient}
                onChange={() => handleNotificationChange("newClient")}
              />

              <NotificationRow
                title="New testimonial"
                description="Notify when a new testimonial is submitted."
                checked={notifications.testimonial}
                onChange={() => handleNotificationChange("testimonial")}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}


 //  Input Field


function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  icon: Icon,
  placeholder,
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>

      <div className="relative">
        <Icon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="h-11 w-full rounded-xl border bg-background pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
        />
      </div>
    </div>
  );
}


 //  Save Button


function SaveButton() {
  return (
    <div className="flex justify-end pt-2">
      <button
        type="submit"
        className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
      >
        <Save className="size-4" />
        Save Changes
      </button>
    </div>
  );
}


 //  Notification Row


function NotificationRow({ title, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-5 p-6">
      <div className="min-w-0">
        <p className="text-sm font-medium">{title}</p>

        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-primary" : "bg-muted"
        }`}
      >
        <span
          className={`absolute top-1 size-4 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

export default Settings;