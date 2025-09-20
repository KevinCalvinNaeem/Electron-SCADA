import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Save, RotateCcw, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Import parameters data
import parametersData from '@/data/parameters.json';

const ParametersPage: React.FC = () => {
  const [parameters, setParameters] = useState(parametersData.categories);
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  const updateParameterValue = (categoryIndex: number, paramIndex: number, value: any) => {
    const newParameters = [...parameters];
    newParameters[categoryIndex].parameters[paramIndex].value = value;
    setParameters(newParameters);
    setHasChanges(true);
  };

  const handleSave = () => {
    // Simulate saving parameters
    toast({
      title: "Parameters Saved",
      description: "All parameter changes have been applied successfully.",
    });
    setHasChanges(false);
  };

  const handleReset = () => {
    setParameters(parametersData.categories);
    setHasChanges(false);
    toast({
      title: "Parameters Reset",
      description: "All parameters have been reset to their default values.",
    });
  };

  const renderParameterControl = (parameter: any, categoryIndex: number, paramIndex: number) => {
    switch (parameter.type) {
      case 'slider':
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">{parameter.name}</Label>
              <Badge variant="outline" className="text-xs">
                {parameter.value} {parameter.unit}
              </Badge>
            </div>
            <Slider
              value={[parameter.value]}
              onValueChange={(value) => updateParameterValue(categoryIndex, paramIndex, value[0])}
              max={parameter.max}
              min={parameter.min}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{parameter.min} {parameter.unit}</span>
              <span>{parameter.max} {parameter.unit}</span>
            </div>
          </div>
        );

      case 'toggle':
        return (
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">{parameter.name}</Label>
            <Switch
              checked={parameter.value}
              onCheckedChange={(checked) => updateParameterValue(categoryIndex, paramIndex, checked)}
            />
          </div>
        );

      case 'select':
        return (
          <div className="space-y-2">
            <Label className="text-sm font-medium">{parameter.name}</Label>
            <Select
              value={parameter.value}
              onValueChange={(value) => updateParameterValue(categoryIndex, paramIndex, value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {parameter.options.map((option: string) => (
                  <SelectItem key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Process Parameters</h1>
          <p className="text-muted-foreground">Configure and monitor system control parameters</p>
        </div>
        <div className="flex items-center gap-3">
          {hasChanges && (
            <Badge variant="secondary" className="animate-status-pulse">
              Unsaved Changes
            </Badge>
          )}
          <Button variant="outline" onClick={handleReset} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          <Button 
            onClick={handleSave} 
            className="gap-2"
            disabled={!hasChanges}
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Parameter Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {parameters.map((category, categoryIndex) => (
          <Card key={category.name} className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Settings className="h-5 w-5" />
                {category.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {category.parameters.map((parameter, paramIndex) => (
                <div 
                  key={parameter.id} 
                  className="p-4 rounded-lg bg-control-parameter border border-border/50"
                >
                  {renderParameterControl(parameter, categoryIndex, paramIndex)}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Parameter Summary Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Parameter Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-foreground">Parameter</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Current Value</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Unit</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {parameters.flatMap((category, categoryIndex) =>
                  category.parameters.map((parameter, paramIndex) => (
                    <tr key={parameter.id} className="border-b border-border/50">
                      <td className="py-3 px-4 text-foreground">{parameter.name}</td>
                      <td className="py-3 px-4 font-mono text-foreground">
                        {typeof parameter.value === 'boolean' 
                          ? (parameter.value ? 'Enabled' : 'Disabled')
                          : parameter.value
                        }
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {parameter.unit || '-'}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{category.name}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="text-xs">
                          Active
                        </Badge>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParametersPage;