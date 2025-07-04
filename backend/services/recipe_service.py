import json
import boto3
import re
from ..utils.config import MODEL_ID, REGION
from ..utils.aws_retry_helper import call_with_backoff
from ..models.recipe_model import RecipeRequest


class RecipeService:
    def __init__(self):
        self.client = boto3.client("bedrock-runtime", region_name=REGION)

    def generate(self, request: RecipeRequest) -> dict:
        prompt = self._build_prompt(request)
        response_text = self._call_bedrock(prompt)

        cleaned_text = self._extract_json_block(response_text)

        try:
            parsed = json.loads(cleaned_text)
            return parsed
        except json.JSONDecodeError as e:
            raise ValueError(
                f"Model response is not valid JSON:\n{response_text}") from e

    def _build_prompt(self, request: RecipeRequest) -> str:
        prompt_parts = [
            f"Create a {request.cuisine or 'Filipino'} recipe using {', '.join(request.ingredients)}"
        ]

        if request.meal_type:
            prompt_parts.append(f" for {request.meal_type}")

        if request.servings:
            prompt_parts.append(f" that serves {request.servings} people")

        if request.cooking_time:
            prompt_parts.append(
                f" with a cooking time of about {request.cooking_time} minutes")

        if request.flavor_profile:
            prompt_parts.append(
                f" with a {request.flavor_profile.lower()} flavor profile")

        if request.dietary_prefs:
            prompt_parts.append(f" that is {', '.join(request.dietary_prefs)}")

        if request.equipment:
            prompt_parts.append(
                f" using the following equipment: {', '.join(request.equipment)}")

        base_prompt = " ".join(prompt_parts) + "."

        return base_prompt + (
            "\nRespond only with a valid JSON object. Do NOT include triple backticks, markdown, or labels like tabular-data-json. Format:\n"
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
                "inputText": prompt,
                "textGenerationConfig": {
                    "temperature": 0.3,
                    "maxTokenCount": 1000,
                    "topP": 0.9,
                }
            })
        }

        response = call_with_backoff(self.client, "invoke_model", params)
        response_body = response["body"].read()
        response_json = json.loads(response_body)

        return response_json["results"][0]["outputText"]

    def _extract_json_block(self, text: str) -> str:
        """
        Removes Markdown-style triple-backtick fences, if present.
        Works with ```json ... ```, ```tabular-data-json ... ```, or just ``` ... ```
        """
        match = re.search(r"```(?:\w+)?\s*({.*?})\s*```", text, re.DOTALL)
        if match:
            return match.group(1)

        # Fallback: assume it's already clean JSON
        return text.strip()
