import { useEffect, useState } from 'react';
import axios from 'axios';

type RecipeMetadata = {
  cuisines: string[];
  meals: string[];
  flavors: string[];
  diets: string[];
};

export const useRecipeMetadata = () => {
  const [data, setData] = useState<RecipeMetadata | null>(null);

  useEffect(() => {
    const key = 'recipe_metadata_cache';
    const oneHour = 60 * 60 * 24000;

    const cached = localStorage.getItem(key);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        const isFresh = Date.now() - parsed.timestamp < oneHour;
        if (isFresh) {
          setData(parsed.data);
          return;
        }
      } catch (e) {
        // Fallback if parsing fails
        localStorage.removeItem(key);
      }
    }

    const fetchData = async () => {
      try {
        const response = await axios.get('https://mt10o4tzpf.execute-api.ap-northeast-1.amazonaws.com/dev/metadata');
        const result = response.data;

        const cleaned: RecipeMetadata = {
          cuisines: result.cuisines || [],
          meals: result.meals || [],
          flavors: result.flavors || [],
          diets: result.diets || [],
        };

        localStorage.setItem(
          key,
          JSON.stringify({ timestamp: Date.now(), data: cleaned })
        );

        setData(cleaned);
      } catch (err) {
        console.error('Failed to fetch recipe metadata:', err);
      }
    };

    fetchData();
  }, []);

  return { data };
};
