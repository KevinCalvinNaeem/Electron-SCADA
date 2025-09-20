import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Home,
  Settings,
  FlaskConical,
  BarChart3,
  Activity,
  Database,
  PanelLeft,
} from 'lucide-react';

const navigationItems = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
    description: 'System Overview'
  },
  {
    title: 'Parameters',
    url: '/parameters',
    icon: Settings,
    description: 'Control Parameters'
  },
  {
    title: 'Recipe',
    url: '/recipe',
    icon: FlaskConical,
    description: 'Process Recipes'
  },
  {
    title: 'Report',
    url: '/report',
    icon: BarChart3,
    description: 'Data Analysis'
  }
];

const systemItems = [
  {
    title: 'System Status',
    icon: Activity,
    badge: 'Active'
  },
  {
    title: 'Data Logs',
    icon: Database,
    badge: '1.2k'
  }
];

export const SCADASidebar: React.FC = () => {
  const { state, toggleSidebar } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === 'collapsed';

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Sidebar className="border-r bg-sidebar" collapsible="icon">
      <SidebarRail />
      {/* Overlay trigger so users can expand when collapsed */}
      {isCollapsed && (
        <>
          <div className="fixed left-2 top-4 z-50">
            <SidebarTrigger />
          </div>
          {/* Fallback visible button in case the trigger is hidden by layout/css
          <button
            onClick={toggleSidebar}
            aria-label="Expand sidebar"
            className="fixed left-2 top-2 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-sidebar-accent text-sidebar-accent-foreground shadow-lg"
            title="Expand sidebar"
          >
            <PanelLeft className="h-7 w-7" />
          </button> */}
        </>
      )}
      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            {/* Header: label + toggle inline */}
            <div className="flex items-center justify-between px-2 pt-2 mb-2">
              <SidebarGroupLabel className="text-sidebar-foreground/70 text-lg font-semibold">
                Navigation
              </SidebarGroupLabel>
              <div className="flex items-center">
                <SidebarTrigger />
              </div>
            </div>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActiveRoute(item.url)}
                    tooltip={item.title}
                    className="data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground"
                  >
                    <NavLink to={item.url} className={`flex items-center py-7 gap-6 ${isCollapsed ? 'justify-center' : ''}`}>
                      <item.icon className="h-10 w-10" />
                      {!isCollapsed && (
                        <div className="flex flex-col">
                          <span className="text-lg font-medium">{item.title}</span>
                          <span className="text-xs text-sidebar-foreground/60">
                            {item.description}
                          </span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* System Status */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">
            System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="cursor-default" tooltip={item.title}>
                    <item.icon className="h-8 w-8" />
                    {!isCollapsed && (
                      <div className="flex items-center justify-between w-full">
                        <span className="text-sm">{item.title}</span>
                        <span className="text-xs bg-sidebar-accent px-2 py-1 rounded text-sidebar-accent-foreground">
                          {item.badge}
                        </span>
                      </div>
                    )}
                    {isCollapsed && <div className="sr-only">{item.title}</div>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Status Indicators */}
        {!isCollapsed && (
          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <div className="p-3 bg-sidebar-accent rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-status-running animate-status-pulse" />
                  <span className="text-xs font-medium text-sidebar-accent-foreground">
                    System Online
                  </span>
                </div>
                <div className="text-xs text-sidebar-foreground/60">
                  Uptime: 27d 14h 32m
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
};