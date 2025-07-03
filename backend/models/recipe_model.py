from dataclasses import dataclass
from typing import Optional, List


@dataclass
class RecipeRequest:
    ingredients: List[str]
    cuisine: Optional[str] = None
    meal_type: Optional[str] = None
    dietary_prefs: Optional[List[str]] = None
    servings: Optional[int] = None
    flavor_profile: Optional[str] = None
    equipment: Optional[List[str]] = None
    cooking_time: Optional[int] = None
