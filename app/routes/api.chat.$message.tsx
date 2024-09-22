import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { eventStream } from "remix-utils/sse/server";
import { getChatStream } from "~/lib/ai.server";

export const loader = async function ({ request, params }: LoaderFunctionArgs) {
  if (!params.message) return redirect("/");

  console.log("CHAT RESPONSE...");
  const stream = await getChatStream(params.message);

  return eventStream(request.signal, function (send) {
    async function readStream() {
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        send({ event: "message", data: content });
      }
    }

    readStream();

    return function clear() {};
  });
};
