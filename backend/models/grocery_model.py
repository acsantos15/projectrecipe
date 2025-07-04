from dataclasses import dataclass
from typing import Optional

@dataclass
class GroceryRequest:
    meal_name: str
    servings: Optional[int] = None  
    budget_limit: Optional[float] = None 
    region: Optional[str] = None    
