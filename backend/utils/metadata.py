import boto3
import json
from .config import TABLE_METADATA, REGION

dynamodb = boto3.resource('dynamodb', region_name=REGION)
table = dynamodb.Table(TABLE_METADATA)

def metadata_handler(event, context):
    try:
        # Single DynamoDB scan operation
        response = table.scan()
        
        # Transform into frontend-friendly format
        metadata = {
            item['category']: item['options']
            for item in response.get('Items', [])
        }
        
        # Ensure all expected categories exist
        required_categories = ['cuisines', 'meals', 'diets', 'flavors']
        for category in required_categories:
            metadata.setdefault(category, [])
        
        return {
            "statusCode": 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            "body": json.dumps(metadata)
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }