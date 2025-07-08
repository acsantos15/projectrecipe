import os

MODEL_ID = os.getenv("BEDROCK_MODEL_ID_TITAN")
REGION = os.getenv("AWS_REGION", "ap-northeast-1")
TABLE_RECIPE = os.getenv('TABLE_RECIPE', 'recipes')
TABLE_METADATA = os.getenv('TABLE_METADATA', 'metadata')