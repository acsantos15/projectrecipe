import json
from .recipe_handler import recipe_handler
from .grocery_handler import grocery_handler

def lambda_handler(event, context):
    path = event.get("path", "")
    print("DEBUG path:", path)  # 🔍 See what value is coming in

    if path == "/recipe":
        return recipe_handler(event, context)
    elif path == "/grocery":
        return grocery_handler(event, context)
    else:
        return {
            "statusCode": 404,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"error": f"Route not found: {path}"})  # helpful error message
        }
