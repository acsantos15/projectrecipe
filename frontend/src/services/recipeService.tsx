import axios from 'axios';
import { RecipeFormData, RecipeResponse } from '../types/recipeType';

const AWS_API = 'https://mt10o4tzpf.execute-api.ap-northeast-1.amazonaws.com/dev/recipe';

export const fetchRecipe = async (
  formData: RecipeFormData,
  signal: AbortSignal
): Promise<RecipeResponse> => {
  const res = await axios.post(AWS_API, formData, { signal });
  const body = typeof res.data?.body === 'string'
    ? JSON.parse(res.data.body)
    : res.data?.body || res.data;
  return body;
};
