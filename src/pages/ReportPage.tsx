import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer
} from 'recharts';
import { 
  Calendar, 
  TrendingUp, 
  Download,
  Filter,
  Truck,
  Scale,
  Fuel
} from 'lucide-react';

// Import reports data
import reportsData from '@/data/reports.json';

const ReportPage: React.FC = () => {
  const [selectedChart, setSelectedChart] = useState('production');
  const [selectedVehicle, setSelectedVehicle] = useState('all');
  const [dateFilter, setDateFilter] = useState('week');

  // Transform data for display
  const productionData = reportsData.dailyProduction.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

  const aggregateData = reportsData.aggregateConsumption.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

  const vehicleData = reportsData.vehicleData;

  const chartConfigs = {
    production: {
      title: "Daily Production Trends",
      data: productionData,
      dataKey: "production",
      unit: "tons",
      color: "#8884d8"
    },
    aggregates: {
      title: "Aggregate Consumption", 
      data: aggregateData,
      dataKey: "agg1",
      unit: "kg",
      color: "#82ca9d"
    },
    batches: {
      title: "Daily Batches",
      data: productionData,
      dataKey: "batches", 
      unit: "batches",
      color: "#ffc658"
    },
    efficiency: {
      title: "System Efficiency",
      data: productionData,
      dataKey: "efficiency",
      unit: "%",
      color: "#ff7300"
    }
  };

  const currentConfig = chartConfigs[selectedChart as keyof typeof chartConfigs];

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Production Reports</h1>
          <p className="text-muted-foreground">Historical data analysis and batch tracking</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Chart Controls */}
      <div className="flex flex-wrap gap-4">
        <Select value={selectedChart} onValueChange={setSelectedChart}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select chart type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="production">Production</SelectItem>
            <SelectItem value="aggregates">Aggregates</SelectItem>
            <SelectItem value="batches">Batches</SelectItem>
            <SelectItem value="efficiency">Efficiency</SelectItem>
          </SelectContent>
        </Select>

        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">Last Week</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Main Chart */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <TrendingUp className="h-5 w-5" />
            {currentConfig.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentConfig.data}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis 
                  dataKey="date" 
                  className="text-muted-foreground" 
                />
                <YAxis 
                  className="text-muted-foreground"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey={currentConfig.dataKey} 
                  stroke={currentConfig.color}
                  strokeWidth={2}
                  name={`${currentConfig.title} (${currentConfig.unit})`}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Data Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Truck className="h-5 w-5" />
            Vehicle Batch Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {vehicleData.map((vehicle) => (
              <div key={vehicle.vehicleNo} className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono">
                    V.No: {vehicle.vehicleNo}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {vehicle.batches.length} batches
                  </span>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full border border-border rounded-lg">
                    <thead className="bg-muted">
                      <tr>
                        <th className="p-3 text-left font-medium text-foreground">Batch No.</th>
                        <th className="p-3 text-left font-medium text-foreground">Agg-1 (kg)</th>
                        <th className="p-3 text-left font-medium text-foreground">Agg-2 (kg)</th>
                        <th className="p-3 text-left font-medium text-foreground">Agg-3 (kg)</th>
                        <th className="p-3 text-left font-medium text-foreground">Agg-4 (kg)</th>
                        <th className="p-3 text-left font-medium text-foreground">Bitumen (kg)</th>
                        <th className="p-3 text-left font-medium text-foreground">Filler (kg)</th>
                        <th className="p-3 text-left font-medium text-foreground">Total (kg)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vehicle.batches.map((batch) => (
                        <tr key={batch.batchNo} className="border-t border-border">
                          <td className="p-3 font-mono text-foreground">{batch.batchNo}</td>
                          <td className="p-3 font-mono text-foreground">{batch.agg1}</td>
                          <td className="p-3 font-mono text-foreground">{batch.agg2}</td>
                          <td className="p-3 font-mono text-foreground">{batch.agg3}</td>
                          <td className="p-3 font-mono text-foreground">{batch.agg4}</td>
                          <td className="p-3 font-mono text-foreground">{batch.bitumen}</td>
                          <td className="p-3 font-mono text-foreground">{batch.filler}</td>
                          <td className="p-3 font-mono font-bold text-foreground">{batch.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Production</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {productionData.reduce((sum, item) => sum + item.production, 0)} tons
            </div>
            <p className="text-xs text-muted-foreground">Last 15 days</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Batches</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {productionData.reduce((sum, item) => sum + item.batches, 0)}
            </div>
            <p className="text-xs text-muted-foreground">All vehicles</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Efficiency</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {Math.round(productionData.reduce((sum, item) => sum + item.efficiency, 0) / productionData.length)}%
            </div>
            <p className="text-xs text-muted-foreground">System performance</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportPage;