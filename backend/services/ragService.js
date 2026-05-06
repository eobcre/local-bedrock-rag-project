import { knowledgeBaseService, getKnowledgeBaseInfo } from "./knowledgeBaseService.js";

export const ragService = async ({ query, topK }) => {
  // console.log("KNOWLEDGE_BASE_ID:", process.env.KNOWLEDGE_BASE_ID);
  // console.log("MODEL_ID:", process.env.MODEL_ID);
  // console.log("AWS_REGION:", process.env.AWS_REGION);

  const { res: kbRes, totalLatency } = await knowledgeBaseService({ query, topK });
  const { embeddingModel, vectorStoreType } = await getKnowledgeBaseInfo();
  const answer = kbRes.output?.text || "";

  // chunks
  const rawChunks =
    kbRes.citations?.flatMap((citation) => {
      return citation.retrievedReferences.map((ref) => ({
        text: ref.content?.text,
        location: ref.location,
      }));
    }) || [];

  const retrieveChunks = rawChunks.slice(0, Number(topK));

  // sources
  const sources = retrieveChunks.map((chunk) => chunk.location).filter(Boolean);

  return {
    ok: true,
    query,
    topK,
    totalLatency,
    answer,
    retrieveChunks,
    retrieveChunksCount: retrieveChunks.length,
    sources,
    model: process.env.MODEL_ID,
    embeddingModel,
    vectorStoreType,
  };
};
