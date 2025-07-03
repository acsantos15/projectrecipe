import json
from ..models.recipe_model import RecipeRequest
from ..services.recipe_service import RecipeService

service = RecipeService()

def lambda_handler(event, context):
    print("DEBUG event:", json.dumps(event))
    
    try:
        # Parse input based on invocation method
        if "body" in event:
            body = json.loads(event["body"]) if event.get("body") else {}
        else:
            body = event
        
        # Convert old prompt-based input to new structured format
        if "prompt" in body:
            # If using legacy prompt format, convert to structured request
            request = RecipeRequest(
                ingredients=[], 
                cuisine=None,
                meal_type=None,
                dietary_prefs=None,
                servings=None,
                flavor_profile=None,
                equipment=None,
                cooking_time=None
            )
            prompt = body["prompt"]
        else:
            # New structured input format
            if not body.get("ingredients"):
                return {
                    "statusCode": 400,
                    "headers": {"Content-Type": "application/json"},
                    "body": json.dumps({"error": "Missing required field: ingredients or prompt"})
                }
            
            request = RecipeRequest(
                ingredients=body["ingredients"],
                cuisine=body.get("cuisine"),
                meal_type=body.get("mealType"),
                dietary_prefs=body.get("dietaryPreferences"),
                servings=body.get("servings"),
                flavor_profile=body.get("flavorProfile"),
                equipment=body.get("equipment"),
                cooking_time=body.get("cookingTime")
            )
            prompt = service._build_prompt(request)  # Generate prompt from structured data
        
        # Generate response using the service
        response = service.generate(request)
        
        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({
                "response": response,
                "metadata": {
                    "ingredients": request.ingredients,
                    "cuisine": request.cuisine
                }
            })
        }
        
    except json.JSONDecodeError:
        return {
            "statusCode": 400,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"error": "Invalid JSON format"})
        }
    except Exception as e:
        print("ERROR:", str(e))
        return {
            "statusCode": 500,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"error": str(e)})
        }