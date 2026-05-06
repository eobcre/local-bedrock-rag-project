import type { RagResponse } from "../type/ragResponseType";

type GetRagResponseType = Pick<RagResponse, "topK" | "retrieveChunksCount" | "totalLatency">;

type MetricsProps = {
  active: boolean;
  error: boolean;
  ragData: GetRagResponseType | null;
};

const Metrics = ({ active, error, ragData }: MetricsProps) => {
  const metrics = [
    { id: 1, label: "topK", value: ragData?.topK },
    { id: 2, label: "Retrieved Chunks Count", value: ragData?.retrieveChunksCount },
    { id: 3, label: "Total Latency", value: ragData?.totalLatency },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        {active && <span className="inline-block bg-green-500 rounded-full w-2 h-2"></span>}
        {error && <span className="inline-block bg-red-500 rounded-full w-2 h-2"></span>}
        <h1 className="text-gray-700 font-bold mb-1">Metrics</h1>
      </div>
      <div className="flex flex-col gap-2">
        {ragData !== null ? (
          <>
            {metrics.map((item) => (
              <div key={item.id} className="flex justify-between text-gray-600 text-sm">
                <span className="font-semibold mb-2">{item.label}</span>
                <span>
                  {item.value}
                  {item.label === "Total Latency" && item.value !== undefined && " ms"}
                </span>
              </div>
            ))}
          </>
        ) : (
          <p className="col-span-2 text-gray-400 italic">Enter a query to see metrics.</p>
        )}
      </div>
    </div>
  );
};

export default Metrics;
