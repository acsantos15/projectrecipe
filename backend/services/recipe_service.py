import json
import boto3
import re
from typing import Dict, Any
from ..utils.config import MODEL_ID, REGION
from ..utils.aws_retry_helper import call_with_backoff
from ..models.recipe_model import RecipeRequest


class RecipeService:
    def __init__(self):
        self.client = boto3.client("bedrock-runtime", region_name=REGION)

    def generate(self, request: RecipeRequest) -> Dict[str, Any]:
        prompt = self._build_prompt(request)
        response_text = self._call_bedrock(prompt)
        cleaned_text = self._extract_json_block(response_text)

        try:
            parsed = json.loads(cleaned_text)
            return self._format_response(parsed)
        except json.JSONDecodeError as e:
            # Return a properly formatted error response
            return {
                "error": f"Model response is not valid JSON: {str(e)}",
                "raw_response": response_text
            }

    def _format_response(self, parsed_response: Dict[str, Any]) -> Dict[str, Any]:
        """Ensures the response matches our standard format"""
        if "error" in parsed_response:
            return parsed_response
            
        return {
            "name": parsed_response.get("name", ""),
            "servings": parsed_response.get("servings", 0),
            "cooking_time": parsed_response.get("cooking_time", 0),
            "recipe": parsed_response.get("recipe", []),
            "steps": parsed_response.get("steps", []),
            "equipment": parsed_response.get("equipment", [])
        }

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
            "\nRespond only with a valid JSON object matching this exact structure:\n"
            "{\n"
            '  "name": "<Recipe name>",\n'
            '  "servings": <number>,\n'
            '  "cooking_time": <number>,\n'
            '  "cuisine": "<Cuisine>",\n'
            '  "recipe": ["<ingredient 1 with measurement>", "<ingredient 2 with measurement>", ...],\n'
            '  "steps": ["<step 1>", "<step 2>", ...],\n'
            '  "equipment": ["<item 1>", "<item 2>", ...]\n'
            "}\n"
            "Rules:\n"
            "- **Generate a REAL, well-known dish** from the given cuisine and ingredients.\n"
            "- If the ingredients suggest a classic dish (e.g., chicken + soy sauce + black pepper in Filipino cuisine → Adobo), return that dish.\n"
            "- **Add essential ingredients** if they’re standard for the dish (e.g., garlic for Adobo, onions for Stir-Fry).\n"
            "- **Use proper cooking techniques** (e.g., simmer, braise, marinate—not just 'cook in pan').\n"
            "- **Measurements must be specific** (e.g., '1/2 cup soy sauce', not just 'soy sauce').\n"
            "- **Steps must be clear, imperative, and sequential**\n"
            "- **Equipment must be practical** (e.g., 'pot', 'knife', 'mixing bowl').\n"
            "- **Never include extra text or markdown**—ONLY the JSON object.\n"
            "- **Never generate logically or culturally inconsistent recipes** (e.g., vegan dishes must not contain animal products like pork, dairy, or eggs).\n"
            "\n"
            "Example Behavior:\n"
            "- Input: chicken, soy sauce, black pepper + Filipino → Output: Chicken Adobo (with vinegar/garlic added)\n"
            "- Input: tomatoes, basil, mozzarella + Italian → Output: Caprese Salad\n"
            "- Input: beef, potatoes, carrots + British → Output: Beef Stew\n"
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
        # Try to find JSON in markdown blocks first
        match = re.search(r"```(?:json)?\s*({.*?})\s*```", text, re.DOTALL)
        if match:
            return match.group(1)
        
        # Try to find standalone JSON
        match = re.search(r"^\s*({.*})\s*$", text, re.DOTALL)
        if match:
            return match.group(1)
            
        # Fallback: return the text as-is (will fail JSON parsing but preserves the error)
        return text.strip()