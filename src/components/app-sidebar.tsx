import React from "react";
import { Home, ShieldAlert, LayoutDashboard, Compass, Star, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
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
  { id: "dashboard", label: "Dashboard", path: "/", icon: Home },
  { id: "simulator", label: "Awareness Simulator", path: "/simulator", icon: ShieldAlert },
  { id: "visualizer", label: "Threat Visualizer", path: "/visualizer", icon: LayoutDashboard },
  { id: "defense", label: "Defense Guide", path: "/defense-guide", icon: ShieldCheck },
];
export function AppSidebar(): JSX.Element {
  const { pathname } = useLocation();
  const userProgress = useQuery(api.progress.getUserProgress) ?? [];
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <div className="h-6 w-6 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <ShieldCheck className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-bold tracking-tight text-foreground">PhishDefense</span>
        </div>
        <SidebarInput placeholder="Search modules..." />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Training Modules</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => {
              const isCompleted = userProgress.includes(item.id);
              return (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild isActive={pathname === item.path}>
                    <Link to={item.path} className="flex items-center gap-3 w-full">
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className="flex-1">{item.label}</span>
                      {isCompleted && (
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Resources</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/"><Compass className="h-4 w-4" /> <span>Methodology</span></Link>
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
            System Active: {userProgress.length}/{navItems.length - 1} Modules Complete.
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}