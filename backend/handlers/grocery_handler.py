import json
from ..models.grocery_model import GroceryRequest
from ..services.grocery_service import GroceryService

service = GroceryService()

def grocery_handler(event, context):
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
        body = json.loads(event.get("body", "{}"))

        if not body.get("meal_name"):
            return {
                "statusCode": 400,
                "headers": cors_headers,
                "body": json.dumps({"error": "Missing required field: meal_name"})
            }

        request = GroceryRequest(
            meal_name=body["meal_name"],
            servings=body.get("servings"),
            budget_limit=body.get("budget_limit"),
            region=body.get("region")
        )

        response = service.generate(request)

        return {
            "statusCode": 200,
            "headers": cors_headers,
            "body": json.dumps({
                "response": response,
                "metadata": {
                    "meal_name": request.meal_name,
                    "servings": request.servings,
                    "budget_limit": request.budget_limit,
                    "region": request.region
                }
            })
        }

    except json.JSONDecodeError:
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": json.dumps({"error": "Invalid JSON format"})
        }
    except Exception as e:
        print("ERROR:", str(e))
        return {
            "statusCode": 500,
            "headers": cors_headers,
            "body": json.dumps({"error": str(e)})
        }
