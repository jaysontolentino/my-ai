import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY!,
});

export const getChatStream = async function (message: string) {
  const stream = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
    stream: true,
    max_tokens: 100,
  });

  return stream;
};
