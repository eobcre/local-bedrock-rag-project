import type { RagResponse } from "../type/ragResponseType";

type GetRagResponseType = Pick<RagResponse, "retrieveChunks">;

type RetrievalProps = {
  active: boolean;
  error: boolean;
  ragData: GetRagResponseType | null;
};

const Retrieval = ({ active, error, ragData }: RetrievalProps) => {
  return (
    <div className="flex flex-col gap-2 border border-blue-400 bg-white rounded-sm overflow-y-auto p-4 h-full">
      <div className="flex items-center gap-2">
        {active && <span className="inline-block bg-green-500 rounded-full w-2 h-2"></span>}
        {error && <span className="inline-block bg-red-500 rounded-full w-2 h-2"></span>}
        <h1 className="text-gray-700 font-bold">Retrieval results</h1>
      </div>
      {ragData !== null ? (
        <>
          {ragData.retrieveChunks.map((chunk, index) => (
            <div key={index} className="bg-gray-100 rounded mb-2 p-2">
              <p className="text-gray-600">{chunk.text}</p>
            </div>
          ))}
        </>
      ) : (
        <p className="col-span-2 text-gray-400 italic">Enter a query to see the retrieval results.</p>
      )}
    </div>
  );
};

export default Retrieval;
