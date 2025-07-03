import json
import boto3
from ..utils.config import MODEL_ID, REGION
from ..utils.aws_retry_helper import call_with_backoff
from ..models.recipe_model import RecipeRequest

class RecipeService:
    def __init__(self):
        self.client = boto3.client("bedrock-runtime", region_name=REGION)

    def generate(self, request: RecipeRequest) -> dict:
        prompt = self._build_prompt(request)
        response_text = self._call_bedrock(prompt)

        try:
            return json.loads(response_text)
        except json.JSONDecodeError as e:
            raise ValueError(f"Claude response is not valid JSON: {response_text}") from e

    def _build_prompt(self, request: RecipeRequest) -> str:
        prompt_parts = [
            f"Create a {request.cuisine or 'Filipino'} recipe using {', '.join(request.ingredients)}"
        ]

        if request.meal_type:
            prompt_parts.append(f" for {request.meal_type}")

        if request.servings:
            prompt_parts.append(f" that serves {request.servings} people")

        if request.cooking_time:
            prompt_parts.append(f" with a cooking time of about {request.cooking_time} minutes")

        if request.flavor_profile:
            prompt_parts.append(f" with a {request.flavor_profile.lower()} flavor profile")

        if request.dietary_prefs:
            prompt_parts.append(f" that is {', '.join(request.dietary_prefs)}")

        if request.equipment:
            prompt_parts.append(f" using the following equipment: {', '.join(request.equipment)}")

        base_prompt = " ".join(prompt_parts) + "."

        return base_prompt + (
            "\n\nPlease respond in the following JSON format:\n"
            "{\n"
            '  "name": "<Recipe name>",\n'
            '  "servings": "<number of servings>",\n'
            '  "cooking_time": "<cooking time in minutes>",\n'
            '  "recipe": ["<ingredient 1>", "<ingredient 2>", ...],\n'
            '  "steps": ["<step 1>", "<step 2>", ...],\n'
            '  "equipment": ["<equipment 1>", "<equipment 2>", ...]\n'
            "}"
        )

    def _call_bedrock(self, prompt: str) -> str:
        params = {
            "modelId": MODEL_ID,
            "body": json.dumps({
                "messages": [{"role": "user", "content": prompt}],
                "max_tokens": 1000,
                "temperature": 0.7,
                "anthropic_version": "bedrock-2023-05-31"
            })
        }

        response = call_with_backoff(self.client, "invoke_model", params)
        text = json.loads(response["body"].read())["content"][0]["text"]

        if "```" in text:
            text = text.split("```")[1].strip()

        return text
