import { ChatOpenAI } from 'langchain/chat_models/openai';
import { HumanChatMessage, SystemChatMessage } from 'langchain/schema';

const chat = new ChatOpenAI({ temperature: 0 });

export const POST = async (req, res) => {
  const { prompt } = await req.json();
  console.log('prompt: ', prompt);

  if (!prompt) {
    return new Response(JSON.stringify({ error: 'Prompt is required' }), {
      status: 400,
    });
  }

  try {
    const response = await chat.call([new HumanChatMessage(prompt)]);

    return new Response(JSON.stringify(response.text), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
};
