import {
  Images,
  LayoutDashboard,
  MessageSquare,
  Star,
  Users,
  Ship,
  Settings,
  Construction,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import AdminWelcomeCard from "@/components/admin/AdminWelcomeCard";

const overviewItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
];

const managementItems = [
  {
    title: "Enquiries",
    url: "/admin/enquiries",
    icon: MessageSquare,
  },
  {
    title: "Clients",
    url: "/admin/clients",
    icon: Users,
  },
  {
    title: "Gallery",
    url: "/admin/gallery",
    icon: Images,
  },
  {
    title: "Testimonials",
    url: "/admin/testimonials",
    icon: Star,
  },
  {
    title: "Projects",
    url: "/admin/projects",
    icon: Construction,
  },
];

const otherItems = [
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];

function AdminSidebar() {
  const location = useLocation();
  const { setOpenMobile, isMobile } = useSidebar();

  const closeOnMobile = () => {
    if (isMobile) setOpenMobile(false);
  };

  return (
    <Sidebar collapsible="icon">
      {/* Logo */}
      <SidebarHeader className="gap-2 p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link to="/admin" onClick={closeOnMobile} />}
              size="lg"
              className="h-12"
            >
              <div className="flex w-full flex-row items-center gap-2">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-white">
                  <Ship className="size-4 shrink-0" />
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-sm font-semibold">
                    A.one Construction
                  </span>

                  <span className="truncate text-xs text-muted-foreground">
                    Admin Panel
                  </span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Admin welcome card */}
        <div className="border-t pt-2">
          <AdminWelcomeCard />
        </div>
      </SidebarHeader>

      {/* Navigation (scrollable if it overflows) */}
      <SidebarContent>
        {/* Overview */}
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {overviewItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={<Link to={item.url} onClick={closeOnMobile} />}
                      isActive={isActive}
                    >
                      <div className="flex w-full flex-row items-center gap-2">
                        <Icon className="size-4 shrink-0" />
                        <span className="truncate">{item.title}</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Management */}
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {managementItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={<Link to={item.url} onClick={closeOnMobile} />}
                      isActive={isActive}
                    >
                      <div className="flex w-full flex-row items-center gap-2">
                        <Icon className="size-4 shrink-0" />
                        <span className="truncate">{item.title}</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer — always pinned and visible, independent of content scroll */}
      <SidebarFooter>
        <SidebarMenu>
          {otherItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.url;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  render={<Link to={item.url} onClick={closeOnMobile} />}
                  isActive={isActive}
                >
                  <div className="flex w-full flex-row items-center gap-2">
                    <Icon className="size-4 shrink-0" />
                    <span className="truncate">{item.title}</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AdminSidebar;
