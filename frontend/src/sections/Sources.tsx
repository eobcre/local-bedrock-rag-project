import type { RagResponse } from "../type/ragResponseType";

type GetRagResponseType = Pick<RagResponse, "sources">;

type SourceProps = {
  active: boolean;
  error: boolean;
  ragData: GetRagResponseType | null;
};

const Sources = ({ active, error, ragData }: SourceProps) => {
  // console.log("ragData:", ragData);
  const uri = ragData?.sources[0]?.s3Location?.uri;

  return (
    <div className="flex flex-col gap-2 break-all">
      <div className="flex items-center gap-2">
        {active && <span className="inline-block bg-green-500 rounded-full w-2 h-2"></span>}
        {error && <span className="inline-block bg-red-500 rounded-full w-2 h-2"></span>}
        <h1 className="text-gray-700 font-bold">Sources</h1>
      </div>
      {ragData !== null ? <p className="text-gray-600 text-sm">{uri}</p> : <p className="col-span-2 text-gray-400 italic">Enter a query to see the sources.</p>}
    </div>
  );
};

export default Sources;
