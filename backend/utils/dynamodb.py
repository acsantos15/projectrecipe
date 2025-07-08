import boto3
from ..utils.config import TABLE_RECIPE

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(TABLE_RECIPE)

def save_recipe(recipe_id: str, data: dict):
    item = {"id": recipe_id, **data}
    table.put_item(Item=item)

def get_recipe(recipe_id: str):
    response = table.get_item(Key={"id": recipe_id})
    return response.get("Item")

def delete_recipe(recipe_id: str):
    table.delete_item(Key={"id": recipe_id})
