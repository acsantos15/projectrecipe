export interface RecipeFormData {
  ingredients: string[];
  cuisine: string;
  mealType: string;
  dietaryPreferences: string[];
  servings: number;
  flavorProfile: string;
  equipment: string[];
  cookingTime: number;
}

export interface RecipeFormProps {
  onSubmit: (data: RecipeFormData) => void;
  loading: boolean;
  isCanceling: boolean;
  onCancel: () => void;
}

export interface RecipeResponse {
  response: {
    recipe: string;
    [key: string]: any;
  };
}

export interface RecipeDisplayProps {
  recipeData: any;
  error: string;
  loading: boolean;
  isCanceling: boolean;
}
