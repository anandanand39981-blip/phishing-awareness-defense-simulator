import React from "react";
import { Home, ShieldAlert, LayoutDashboard, Compass, Star, ShieldCheck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarSeparator,
  SidebarInput,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
const navItems = [
  { label: "Dashboard", path: "/", icon: Home },
  { label: "Awareness Simulator", path: "/simulator", icon: ShieldAlert },
  { label: "Threat Visualizer", path: "/visualizer", icon: LayoutDashboard },
  { label: "Defense Guide", path: "/about", icon: ShieldCheck },
];
export function AppSidebar(): JSX.Element {
  const { pathname } = useLocation();
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <div className="h-6 w-6 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <ShieldCheck className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-bold tracking-tight">PhishDefense</span>
        </div>
        <SidebarInput placeholder="Search modules..." />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Training Modules</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton asChild isActive={pathname === item.path}>
                  <Link to={item.path} className="flex items-center gap-3">
                    <item.icon className="h-4 w-4" /> 
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Resources</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/about"><Compass className="h-4 w-4" /> <span>Methodology</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/"><Star className="h-4 w-4" /> <span>Achievements</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-4 py-4">
          <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/10 text-[10px] text-muted-foreground leading-relaxed">
            <p className="font-bold text-blue-500 uppercase tracking-widest mb-1">Status</p>
            System Active: Training environment ready.
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}