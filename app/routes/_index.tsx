import type { MetaFunction } from "@remix-run/node";
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

  return (
    <div className="bg-slate-50 flex h-screen items-center justify-center">
      <Card className="flex flex-col h-[95vh] md:h-[70vh] w-screen md:w-[500px] p-4 m-4">
        <CardHeader className="text-center">
          <h3 className="text-2xl">Ask me anything</h3>
        </CardHeader>
        <CardContent className="bg-slate-100 flex-1 w-full flex flex-col overflow-y-scroll gap-4 p-3 rounded no-scrollbar">
          <div className="flex flex-col w-full gap-2">
            <span className="text-slate-500 font-medium">Question:</span>
            <p>Sample question</p>
          </div>
          <span className="text-slate-500 font-medium">Answer:</span>
          <div className="flex-1 w-full flex overflow-y-scroll no-scrollbar">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque,
              molestias? Dolorum repudiandae dignissimos quos deleniti aut
              mollitia perferendis, placeat delectus minima harum, vero dolor
              ipsa incidunt molestias quo at corrupti nemo. Quasi quaerat ipsum
              non maxime repudiandae temporibus maiores. Nam eum facilis error
              facere! Provident perferendis temporibus, hic non aut dolor, cum
              maxime nisi aliquid, neque natus quod molestias aspernatur! Non ad
              voluptatem iusto amet maiores quisquam minus officiis eaque ipsam
              odio? Eos est quibusdam illo possimus quaerat at amet aliquid
              facere numquam ab deserunt minus debitis unde, fuga porro et
              dolore mollitia esse! Sed officiis earum fugit itaque
            </p>
          </div>
        </CardContent>
        <Separator />
        <div className="flex flex-col sm:flex-row w-full mt-4 gap-4">
          <Input
            type="text"
            placeholder="your question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <Button>Submit</Button>
        </div>
      </Card>
    </div>
  );
}
