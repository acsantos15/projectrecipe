import axios from 'axios';

const API_URL = 'https://mt10o4tzpf.execute-api.ap-northeast-1.amazonaws.com/dev/ask';

export const sendMessage = async (prompt: string): Promise<string> => {
  try {
    const response = await axios.post(API_URL, { prompt });

    // parse the nested stringified JSON
    const parsedBody = JSON.parse(response.data.body);

    return parsedBody.response;
  } catch (error) {
    console.error('Error calling Lambda:', error);
    return 'Sorry, there was an error processing your request.';
  }
};
