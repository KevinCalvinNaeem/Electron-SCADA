import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  FlaskConical, 
  Play, 
  Pause, 
  Eye,
  Calendar,
  Clock,
  Thermometer,
  Gauge,
  Droplets
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Import recipes data
import recipesData from '@/data/recipes.json';

const RecipePage: React.FC = () => {
  const [recipes, setRecipes] = useState(recipesData.recipes);
  const [selectedRecipe, setSelectedRecipe] = useState(recipes.find(r => r.isActive) || recipes[0]);
  const { toast } = useToast();

  const handleSelectRecipe = (recipeId: string) => {
    const newRecipes = recipes.map(recipe => ({
      ...recipe,
      isActive: recipe.id === recipeId
    }));
    setRecipes(newRecipes);
    setSelectedRecipe(newRecipes.find(r => r.id === recipeId)!);
    
    toast({
      title: "Recipe Selected",
      description: `${newRecipes.find(r => r.id === recipeId)?.name} is now active.`,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Process Recipes</h1>
          <p className="text-muted-foreground">Manage and execute production recipes</p>
        </div>
        <div className="flex items-center gap-2">
          <FlaskConical className="h-5 w-5 text-primary" />
          <Badge variant="default">
            {recipes.filter(r => r.isActive).length} Active
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recipe List */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Available Recipes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recipes.map((recipe) => (
                  <div 
                    key={recipe.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-sm ${
                      recipe.isActive 
                        ? 'bg-primary/10 border-primary/50' 
                        : 'bg-control-panel border-border/50 hover:border-border'
                    }`}
                    onClick={() => setSelectedRecipe(recipe)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-foreground">{recipe.name}</h3>
                      <div className="flex items-center gap-2">
                        {recipe.isActive && (
                          <Badge variant="default" className="text-xs">
                            Active
                          </Badge>
                        )}
                        <Button
                          size="sm"
                          variant={recipe.isActive ? "default" : "outline"}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectRecipe(recipe.id);
                          }}
                        >
                          {recipe.isActive ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                          {recipe.isActive ? 'Stop' : 'Start'}
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{recipe.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Modified: {formatDate(recipe.modifiedDate)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Duration: {selectedRecipe.parameters.total_weight}kg
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recipe Details */}
        <div>
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Eye className="h-4 w-4" />
                Recipe Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedRecipe && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{selectedRecipe.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedRecipe.description}</p>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground">Parameters</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded bg-control-parameter">
                        <div className="flex items-center gap-2">
                          <Thermometer className="h-4 w-4 text-status-warning" />
                          <span className="text-sm text-foreground">Mixing Temp</span>
                        </div>
                        <span className="font-mono text-foreground">{selectedRecipe.parameters.mixing_temp}°C</span>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded bg-control-parameter">
                        <div className="flex items-center gap-2">
                          <Gauge className="h-4 w-4 text-primary" />
                          <span className="text-sm text-foreground">Discharge Temp</span>
                        </div>
                        <span className="font-mono text-foreground">{selectedRecipe.parameters.discharge_temp}°C</span>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded bg-control-parameter">
                        <div className="flex items-center gap-2">
                          <Droplets className="h-4 w-4 text-accent" />
                          <span className="text-sm text-foreground">Bitumen SP</span>
                        </div>
                        <span className="font-mono text-foreground">{selectedRecipe.parameters.bitumen_sp} kg</span>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded bg-control-parameter">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-foreground">Total Weight</span>
                        </div>
                        <span className="font-mono text-foreground">{selectedRecipe.parameters.total_weight} kg</span>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded bg-control-parameter">
                        <div className="flex items-center gap-2">
                          <FlaskConical className="h-4 w-4 text-primary" />
                          <span className="text-sm text-foreground">Agg-1 SP/Fac</span>
                        </div>
                        <span className="font-mono text-foreground">{selectedRecipe.parameters.agg1_sp}/{selectedRecipe.parameters.agg1_fac}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground">Recipe Info</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Created: {formatDate(selectedRecipe.createdDate)}</p>
                      <p>Modified: {formatDate(selectedRecipe.modifiedDate)}</p>
                      <p>Status: {selectedRecipe.isActive ? 'Active' : 'Inactive'}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;