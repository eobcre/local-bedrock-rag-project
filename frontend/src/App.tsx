import { useState } from "react";
import { Icon } from "@iconify/react";

import Input from "./components/Input";
import Dropdown from "./components/Dropdown";
import Loader from "./components/Loader";
import RetrievalSection from "./sections/Retrieval";
import LLMAnswerSection from "./sections/LLMAnswer";
import Metrics from "./sections/Metrics";
import Model from "./sections/Model";
import Sources from "./sections/Sources";

import type { RagResponse } from "./type/ragResponseType";

const App = () => {
  const [query, setQuery] = useState("");
  const [topK, setTopK] = useState("");
  const [ragData, setRagData] = useState<RagResponse | null>(null);
  const [active, setActive] = useState(false);
  const [error, setError] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [loading, setLoading] = useState(false);

  const topKOptions = [
    { label: "3", value: 3 },
    { label: "5", value: 5 },
    { label: "10", value: 10 },
  ];

  // send
  const handleSendRag = async () => {
    // console.log(query, retrieval, topK);

    if (!query || !topK) {
      setValidationError("* All fields are required.");
      return;
    }

    setValidationError("");
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/rag`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          topK: Number(topK),
        }),
      });

      const data = await res.json();
      // console.log("data:", data);

      setRagData(data);
      setActive(true);
      setError(false);
      setQuery("");
      setTopK("");
    } catch (err) {
      console.error(err);
      setActive(false);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:grid lg:grid-cols-4 lg:grid-rows-[60px_1fr_1fr] lg:gap-6 bg-gray-100 px-5 lg:px-20 py-4 lg:pt-8 lg:pb-14 min-h-screen lg:h-screen">
      {/* top */}
      <section className="lg:col-span-4 lg:flex lg:items-center py-6 lg:py-0">
        <div className="grid lg:grid-cols-5 gap-3 w-full">
          <div className="lg:col-span-3">
            <Input query={query} onChange={setQuery} />
          </div>
          <Dropdown name="topK" value={topK} options={topKOptions} onChange={setTopK} />
          <button onClick={handleSendRag} className="bg-blue-500 text-white rounded cursor-pointer hover:opacity-70 transition-all duration-300 ease-out h-10.5">
            <Icon icon="material-symbols:search-rounded" className="mx-auto w-7 h-7" />
          </button>
          <div className="lg:col-span-5 -mt-2">{validationError && <span className="text-red-500 text-sm">{validationError}</span>}</div>
        </div>
      </section>
      {/* middle 1 */}
      <section className="lg:col-span-2 section overflow-scroll mb-5 lg:mb-0 h-80">
        <RetrievalSection active={active} error={error} ragData={ragData} />
      </section>
      {/* middle 2 */}
      <section className="col-span-1 lg:col-span-2 section overflow-scroll mb-5 lg:mb-0 h-80">
        <LLMAnswerSection active={active} error={error} ragData={ragData} />
      </section>
      {/* bottom */}
      <section className="section md:col-span-4">
        <div className="grid grid-cols-1 gap-3 h-full lg:grid-cols-4">
          <div className="bottom">
            <Metrics active={active} error={error} ragData={ragData} />
          </div>
          <div className="bottom">
            <Model active={active} error={error} ragData={ragData} />
          </div>
          <div className="bottom lg:col-span-2">
            <Sources active={active} error={error} ragData={ragData} />
          </div>
        </div>
      </section>

      {/* loader */}
      {loading && <Loader />}
    </div>
  );
};

export default App;
