import os

MODEL_ID = os.getenv("BEDROCK_MODEL_ID", "anthropic.claude-3-5-sonnet-20240620-v1:0")
REGION = os.getenv("AWS_REGION", "ap-northeast-1")