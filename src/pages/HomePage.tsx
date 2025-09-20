import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  Zap, 
  Clock, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Pause,
  Play,
  RotateCcw,
  Square,
  Truck
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Import status data - we'll use the JSON data
import statusData from '@/data/status.json';

const HomePage: React.FC = () => {
  const [systemData, setSystemData] = useState(statusData.systemOverview);
  const [modules, setModules] = useState(statusData.modules);
  const [alarms, setAlarms] = useState(statusData.alarms);
  const [isProcessRunning, setIsProcessRunning] = useState(true);
  const { toast } = useToast();

  const handleProcessControl = (action: string) => {
    switch (action) {
      case 'start':
        setIsProcessRunning(true);
        toast({
          title: "Process Started",
          description: "Asphalt mixing process has been started.",
        });
        break;
      case 'stop':
        setIsProcessRunning(false);
        toast({
          title: "Process Stopped",
          description: "Asphalt mixing process has been stopped.",
        });
        break;
      case 'reset':
        setSystemData(prev => ({ ...prev, currentBatch: 1 }));
        toast({
          title: "Batch Reset",
          description: "Batch counter has been reset to 1.",
        });
        break;
      case 'hold':
        toast({
          title: "Mixer Hold",
          description: "Mixer is now on hold.",
        });
        break;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <CheckCircle className="h-4 w-4 text-status-running" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-status-warning" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-status-error" />;
      case 'stopped':
        return <Pause className="h-4 w-4 text-status-stopped" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-status-running';
      case 'warning':
        return 'bg-status-warning';
      case 'error':
        return 'bg-status-error';
      case 'stopped':
        return 'bg-status-stopped';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Asphalt Plant Control</h1>
          <p className="text-muted-foreground">Real-time monitoring and control dashboard</p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`h-3 w-3 rounded-full ${getStatusColor(systemData.status)} animate-status-pulse`} />
          <Badge variant={systemData.status === 'running' ? 'default' : 'destructive'}>
            {systemData.status.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Button 
          onClick={() => handleProcessControl('start')} 
          className="gap-2 bg-status-running text-white hover:bg-status-running/90"
          disabled={isProcessRunning}
        >
          <Play className="h-4 w-4" />
          Start Process
        </Button>
        <Button 
          onClick={() => handleProcessControl('stop')} 
          variant="destructive" 
          className="gap-2"
          disabled={!isProcessRunning}
        >
          <Square className="h-4 w-4" />
          Stop Process
        </Button>
        <Button 
          onClick={() => handleProcessControl('reset')} 
          variant="outline" 
          className="gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Reset Batch
        </Button>
        <Button 
          onClick={() => handleProcessControl('hold')} 
          variant="secondary" 
          className="gap-2"
        >
          <Pause className="h-4 w-4" />
          Mixer Hold
        </Button>
      </div>

      {/* System Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Operational Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{systemData.operationalTime}</div>
            <p className="text-xs text-muted-foreground">Continuous operation</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Vehicle</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{systemData.currentVehicle}</div>
            <p className="text-xs text-muted-foreground">Loading in progress</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Production</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{systemData.totalProduction}</div>
            <Progress value={systemData.efficiency} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Batch Progress</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {systemData.currentBatch}/{systemData.batchSetValue}
            </div>
            <p className="text-xs text-muted-foreground">Current/Set batches</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Process Modules Status */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Material Feeders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {modules.map((module) => (
                <div key={module.id} className="flex items-center justify-between p-3 rounded-lg bg-control-panel">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(module.status)}
                    <div>
                      <p className="font-medium text-foreground">{module.name}</p>
                      <p className="text-sm text-muted-foreground">{module.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">{module.value} {module.unit}</p>
                    <p className="text-xs text-muted-foreground">SP: {module.setpoint} {module.unit}</p>
                    <Badge 
                      variant={module.status === 'running' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {module.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alarms */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">System Alarms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alarms.map((alarm) => (
                <div key={alarm.id} className="flex items-start gap-3 p-3 rounded-lg bg-control-panel">
                  <AlertTriangle className={`h-4 w-4 mt-0.5 ${
                    alarm.severity === 'warning' ? 'text-status-warning' : 
                    alarm.severity === 'error' ? 'text-status-error' : 'text-primary'
                  }`} />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{alarm.message}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(alarm.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <Badge 
                    variant={alarm.acknowledged ? 'secondary' : 'default'}
                    className="text-xs"
                  >
                    {alarm.acknowledged ? 'Ack' : 'New'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;