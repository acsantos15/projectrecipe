export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  price: number;
  category: string;
  notes?: string;
}

export interface NutritionalInfo {
  calories?: number;
  protein?: string;
  carbs?: string;
  fats?: string;
}

export interface GroceryResponse {
  meal_name: string;
  servings: number;
  estimated_cost: number;
  ingredients: Ingredient[];
  nutritional_info?: NutritionalInfo;
  preparation_time?: string;
  budget_status: string;
  region: string;
  timestamp: string;
}

export interface GroceryFormData {
  meal_name: string;
  servings: number;
  budget_limit: number;
  region: string;
  dietary_preferences?: string;
}