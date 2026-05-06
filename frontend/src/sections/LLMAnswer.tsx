import type { RagResponse } from "../type/ragResponseType";

type GetRagResponseType = Pick<RagResponse, "answer">;

type AnswerProps = {
  active: boolean;
  error: boolean;
  ragData: GetRagResponseType | null;
};

const LLMAnswer = ({ active, error, ragData }: AnswerProps) => {
  return (
    <div className="flex flex-col gap-2 border border-blue-400 bg-white rounded-sm overflow-y-auto p-4 h-full">
      <div className="flex items-center gap-2">
        {active && <span className="inline-block bg-green-500 rounded-full w-2 h-2"></span>}
        {error && <span className="inline-block bg-red-500 rounded-full w-2 h-2"></span>}
        <h1 className="text-gray-700 font-bold">LLM Answer</h1>
      </div>
      {ragData !== null ? <p className="text-gray-600">{ragData.answer}</p> : <p className="col-span-2 text-gray-400 italic">Enter a query to see the responses.</p>}
    </div>
  );
};

export default LLMAnswer;
