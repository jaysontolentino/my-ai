import { type MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";

export const meta: MetaFunction = () => {
  return [
    { title: "My AI" },
    { name: "description", content: "Welcome to my AI" },
  ];
};

export default function Index() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [query, setQuery] = useState("");

  const handleSubmit = async function (e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get("question") as string;

    setQuestion(query);
    setQuery("");
    setAnswer("");

    const sse = new EventSource(`/api/chat/${query}`);

    sse.addEventListener("message", (event) => {
      setAnswer((prevResults) => prevResults + event.data);
    });

    sse.addEventListener("error", () => {
      sse.close();
    });
  };

  return (
    <div className="bg-slate-50 flex h-screen items-center justify-center">
      <Card className="flex flex-col h-[95vh] md:h-[70vh] w-screen md:w-[500px] p-4 m-4">
        <CardHeader className="text-center">
          <h3 className="text-2xl">Ask me anything</h3>
        </CardHeader>
        <CardContent className="bg-slate-100 flex-1 w-full flex flex-col overflow-y-scroll gap-4 p-3 rounded no-scrollbar">
          <div className="flex flex-col w-full gap-2">
            <span className="text-slate-500 font-medium">Question:</span>
            <p>{question}</p>
          </div>
          <span className="text-slate-500 font-medium">Answer:</span>
          <div className="flex-1 w-full flex overflow-y-scroll no-scrollbar">
            <p>{answer}</p>
          </div>
        </CardContent>
        <Separator />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row w-full mt-4 gap-4"
        >
          <Input
            type="text"
            placeholder="your question"
            name="question"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Card>
    </div>
  );
}
