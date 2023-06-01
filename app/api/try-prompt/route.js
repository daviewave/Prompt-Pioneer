import { ChatOpenAI } from 'langchain/chat_models/openai';
import { HumanChatMessage, SystemChatMessage } from 'langchain/schema';

export const POST = async (req, res) => {
  const { prompt } = await req.json();

  if (!prompt) {
    return new Response(JSON.stringify({ error: 'Prompt is required' }), {
      status: 400,
    });
  }

  try {
    const chat = new ChatOpenAI({ temperature: 0, timeout: 30000 });

    const fullPrompt = `In no more than 5 sentences / 5 bullet points respond to the following prompt: ${prompt}`;

    const response = await chat.call([new HumanChatMessage(fullPrompt)]);

    return new Response(JSON.stringify(response.text), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
};
