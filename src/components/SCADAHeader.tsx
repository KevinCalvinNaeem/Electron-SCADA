import React from 'react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon, Wifi, WifiOff, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import logo from '@/assets/logo.png';

export const SCADAHeader: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [connectionStatus] = React.useState<'connected' | 'disconnected'>('connected');

  return (
    <header className="border-b bg-card h-16 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="lg:hidden" />
        <div className="flex items-center gap-3">
          {/* {/* <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
            <div className="h-4 w-4 rounded-full bg-primary-foreground" />
          </div> */}
          <img src={logo} alt="logo" width={90} height={70} />
          <div>
            <h1 className="text-xl font-semibold text-foreground">SCADA Control System</h1>
            <p className="text-xs text-muted-foreground">Industrial Automation Platform</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Connection Status */}
        <div className="flex items-center gap-2">
          {connectionStatus === 'connected' ? (
            <Wifi className="h-4 w-4 text-status-running" />
          ) : (
            <WifiOff className="h-4 w-4 text-status-error" />
          )}
          <Badge 
            variant={connectionStatus === 'connected' ? 'default' : 'destructive'}
            className="text-xs"
          >
            {connectionStatus === 'connected' ? 'Online' : 'Offline'}
          </Badge>
        </div>

        {/* System Status */}
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-status-running animate-status-pulse" />
          <span className="text-sm text-muted-foreground">System Active</span>
        </div>

        {/* Theme Toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={toggleTheme}
          className="h-9 w-9 p-0"
        >
          {theme === 'light' ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </Button>

        {/* Emergency Stop (Visual Only) */}
        <Button
          variant="outline"
          size="sm"
          className="bg-status-error/10 border-status-error text-status-error hover:bg-status-error hover:text-white"
        >
          <AlertTriangle className="h-4 w-4 mr-2" />
          Emergency
        </Button>
      </div>
    </header>
  );
};