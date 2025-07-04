import json
from ..models.recipe_model import RecipeRequest
from ..services.recipe_service import RecipeService

service = RecipeService()

def recipe_handler(event, context):
    # CORS headers configuration - MUST be included in ALL responses
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Content-Type": "application/json"
    }
    
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': cors_headers,
            'body': json.dumps({})
        }
    
    try:
        # Parse input based on invocation method
        if "body" in event:
            body = json.loads(event["body"]) if event.get("body") else {}
        else:
            body = event
        
        # Convert old prompt-based input to new structured format
        if "prompt" in body:
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
                    "headers": cors_headers,
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
            prompt = service._build_prompt(request)
        
        # Generate response using the service
        response = service.generate(request)
        
        return {
            "statusCode": 200,
            "headers": cors_headers,
            "body": json.dumps({
                "response": response,
                "metadata": {
                    "ingredients": request.ingredients,
                    "cuisine": request.cuisine
                    "diet": request.dietary_prefs
                }
            })
        }
        
    except json.JSONDecodeError:
        return {
            "statusCode": 400,
            "headers": cors_headers,  # Include CORS headers
            "body": json.dumps({"error": "Invalid JSON format"})
        }
    except Exception as e:
        print("ERROR:", str(e))
        return {
            "statusCode": 500,
            "headers": cors_headers,  # Include CORS headers
            "body": json.dumps({"error": str(e)})
        }