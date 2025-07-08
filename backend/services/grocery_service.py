import json
import re
from typing import Dict, Any
import boto3
from ..utils.config import MODEL_ID, REGION
from ..utils.aws_retry_helper import call_with_backoff
from ..models.grocery_model import GroceryRequest


class GroceryService:
    def __init__(self):
        self.client = boto3.client("bedrock-runtime", region_name=REGION)

    def generate(self, request: GroceryRequest) -> Dict[str, Any]:
        prompt = self._build_prompt(request)
        response_text = self._call_bedrock(prompt)
        cleaned_text = self._extract_json_block(response_text)

        try:
            parsed = json.loads(cleaned_text)
            return self._format_response(parsed)
        except json.JSONDecodeError as e:
            return {
                "error": f"Model response is not valid JSON: {str(e)}",
                "raw_response": response_text
            }

    def _format_response(self, parsed_response: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "response": {
                "meal_name": parsed_response.get("meal_name", ""),
                "servings": parsed_response.get("servings", 0),
                "estimated_cost": parsed_response.get("estimated_cost", 0.0),
                "ingredients": parsed_response.get("ingredients", [])
            },
            "metadata": {
                "meal_name": parsed_response.get("meal_name", ""),
                "servings": parsed_response.get("servings", 0),
                "budget_limit": parsed_response.get("budget_limit", 0),
                "region": parsed_response.get("region", "PH/Philippines")
            }
        }
    
    def _build_prompt(self, request: GroceryRequest) -> str:
        prompt_parts = [
            f"Generate a grocery list for the meal {request.meal_name}"
        ]

        if request.servings:
            prompt_parts.append(f" that serves {request.servings} people")

        if request.budget_limit:
            prompt_parts.append(
                f" The total budget should not exceed {request.budget_limit}")
            
        if request.region:
            prompt_parts.append(
                f" On country of: {request.region} (also use {request.region} currency)")

        base_prompt = " ".join(prompt_parts) + "."

        return base_prompt + (
            "\nRespond only with a valid JSON object matching this exact structure:\n"
            "{\n"
            '  "meal_name": "<Meal name>",\n'
            '  "servings": "<servings>",\n'
            '  "estimated_cost": "<total estimated cost>",\n'
            '  "ingredients": [\n'
            '    {\n'
            '      "name": "<ingredient name>",\n'
            '      "quantity": "<amount>",\n'
            '      "price": <price per quantity>\n'
            '    },\n'
            '    ...\n'
            '  ]\n'
            '}\n'
            "GENERAL RULES:\n"
            "- **Be realistic with prices and portion sizes.**\n"
            "- **Ingredients should reflect regional availability.**\n"
            "- **Estimate cost per ingredient and total cost accurately.**\n"
            "- **Never include any markdown, explanation, or extra text.**\n"
            "\n"
        )

    def _call_bedrock(self, prompt: str) -> str:
        params = {
            "modelId": MODEL_ID,
            "body": json.dumps({
                "inputText": prompt,
                "textGenerationConfig": {
                    "temperature": 0.2,
                    "maxTokenCount": 800,
                    "topP": 0.9,
                }
            })
        }

        response = call_with_backoff(self.client, "invoke_model", params)
        response_body = response["body"].read()
        response_json = json.loads(response_body)

        return response_json["results"][0]["outputText"]

    def _extract_json_block(self, text: str) -> str:
        match = re.search(r"```(?:json)?\s*({.*?})\s*```", text, re.DOTALL)
        if match:
            return match.group(1)

        match = re.search(r"^\s*({.*})\s*$", text, re.DOTALL)
        if match:
            return match.group(1)

        return text.strip()