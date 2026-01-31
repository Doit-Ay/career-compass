import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Sparkles,
  BarChart3,
  Lightbulb,
  Clock,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { 
    title: "Dashboard", 
    url: "/", 
    icon: LayoutDashboard,
    enabled: true,
  },
  { 
    title: "Companies", 
    url: "/companies", 
    icon: Building2,
    enabled: true,
  },
  { 
    title: "Skills", 
    url: "/skills", 
    icon: Sparkles,
    enabled: false,
    comingSoon: true,
  },
  { 
    title: "Analytics", 
    url: "/analytics", 
    icon: BarChart3,
    enabled: true,
  },
  { 
    title: "Innovation", 
    url: "/innovation", 
    icon: Lightbulb,
    enabled: false,
    comingSoon: true,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarContent className="pt-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild={item.enabled}
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                    className={!item.enabled ? "opacity-60 cursor-not-allowed" : ""}
                  >
                    {item.enabled ? (
                      <Link to={item.url} className="flex items-center gap-3">
                        <item.icon className="h-4 w-4 shrink-0" />
                        <span className="truncate">{item.title}</span>
                      </Link>
                    ) : (
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4 shrink-0" />
                        <span className="truncate flex items-center gap-2">
                          {item.title}
                          {!collapsed && item.comingSoon && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-accent text-accent-foreground">
                              <Clock className="h-2.5 w-2.5" />
                              Soon
                            </span>
                          )}
                        </span>
                      </div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      {/* Credibility footer */}
      {!collapsed && (
        <div className="mt-auto p-4 border-t border-sidebar-border">
          <p className="text-[10px] text-muted-foreground/70 leading-relaxed">
            Built by students under structured training programs.
            <br />
            <span className="text-muted-foreground/50">Talenciaglobal</span>
          </p>
        </div>
      )}
    </Sidebar>
  );
}
