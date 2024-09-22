export const loader = async function () {
  const texts = [
    `data: {"id":"chatcmpl-74u2nvww9E1TqTmZtXwxeOSQsx56L","object":"chat.completion.chunk","created":1681403101,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"role":"assistant"},"index":0,"finish_reason":null}]}\n\n`,
    `data: {"id":"chatcmpl-74u2nvww9E1TqTmZtXwxeOSQsx56L","object":"chat.completion.chunk","created":1681403101,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":"${Math.random()}The"},"index":0,"finish_reason":null}]}\n\n`,
    `data: {"id":"chatcmpl-74u2nvww9E1TqTmZtXwxeOSQsx56L","object":"chat.completion.chunk","created":1681403101,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" **White"},"index":0,"finish_reason":null}]}\n\n`,
    `data: {"id":"chatcmpl-74u2nvww9E1TqTmZtXwxeOSQsx56L","object":"chat.completion.chunk","created":1681403101,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" House**"},"index":0,"finish_reason":null}]}\n\n`,
    `data: {"id":"chatcmpl-74u2nvww9E1TqTmZtXwxeOSQsx56L","object":"chat.completion.chunk","created":1681403101,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" is"},"index":0,"finish_reason":null}]}\n\n`,
    `data: {"id":"chatcmpl-74u2nvww9E1TqTmZtXwxeOSQsx56L","object":"chat.completion.chunk","created":1681403101,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" *the"},"index":0,"finish_reason":null}]}\n\n`,
    `data: {"id":"chatcmpl-74u2nvww9E1TqTmZtXwxeOSQsx56L","object":"chat.completion.chunk","created":1681403101,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" official*"},"index":0,"finish_reason":null}]}\n\n`,
    `data: {"id":"chatcmpl-74u2nvww9E1TqTmZtXwxeOSQsx56L","object":"chat.completion.chunk","created":1681403101,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"content":" residence"},"index":0,"finish_reason":null}]}\n\n`,
    `data: [DONE]\n\n`,
  ];

  const num = texts.length;
  let i = 0;

  let timerId: NodeJS.Timeout;

  const body = new ReadableStream({
    start(controller) {
      timerId = setInterval(() => {
        const msg = new TextEncoder().encode(texts[i]);
        controller.enqueue(msg);
        i++;
      }, 500);
      setTimeout(() => {
        this.cancel?.();
        try {
          controller.close();
        } catch (e) {}
      }, num * 500 + 100);
    },
    cancel() {
      clearInterval(timerId);
    },
  });

  return new Response(body, {
    headers: {
      "Content-Type": "text/event-stream",
    },
  });
};
