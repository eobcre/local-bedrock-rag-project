import { RetrieveAndGenerateCommand } from "@aws-sdk/client-bedrock-agent-runtime";
import { GetKnowledgeBaseCommand } from "@aws-sdk/client-bedrock-agent";
import { bedrockClient } from "./bedrockClient.js";
import { bedrockAgentClient } from "./bedrockAgentClient.js";

/*
 * executes RAG (RetrieveAndGenerateCommand) using bedrock knowledge base
 * - sends user query to bedrock
 * - does semantic search (vector retrieval)
 * - generates a response using the specified model
 * - returns raw response and latency
 */

export const knowledgeBaseService = async ({ query, topK }) => {
  // start measuring latency
  const start = Date.now();

  const cmd = new RetrieveAndGenerateCommand({
    input: {
      text: query,
    },
    retrieveAndGenerateConfiguration: {
      type: "KNOWLEDGE_BASE",
      knowledgeBaseConfiguration: {
        knowledgeBaseId: process.env.KNOWLEDGE_BASE_ID,
        modelArn: process.env.MODEL_ID,
        retrievalConfiguration: {
          vectorSearchConfiguration: {
            numberOfResults: Number(topK),
          },
        },
      },
    },
  });

  const res = await bedrockClient.send(cmd);
  // console.log("res", res);

  // end measuring latency
  const totalLatency = Date.now() - start;

  return { res, totalLatency };
};

/*
 * retrieves knowledge base configuration details from bedrock
 * - fetches embedding model arn
 * - fetches vector store type
 * - used for displaying model configuration in ui
 */

const EMBEDDING_MODEL_MAP = {
  "amazon.titan-embed-text-v2": "Titan Text Embeddings v2",
};

const VECTOR_STORE_MAP = {
  S3_VECTORS: "Amazon S3 Vectors",
};

export const getKnowledgeBaseInfo = async () => {
  const cmd = new GetKnowledgeBaseCommand({
    knowledgeBaseId: process.env.KNOWLEDGE_BASE_ID,
  });

  const res = await bedrockAgentClient.send(cmd);
  // console.log("getKnowledgeBaseInfo res:", res);

  // get embedding model
  const embeddingModelArn = res.knowledgeBase?.knowledgeBaseConfiguration?.vectorKnowledgeBaseConfiguration?.embeddingModelArn;
  // get vector store type
  const vectorStoreType = res.knowledgeBase?.storageConfiguration?.type;

  const embeddingModelId = embeddingModelArn?.split("/").pop().split(":")[0];
  // console.log("embeddingModelId:", embeddingModelId);

  return {
    embeddingModel: EMBEDDING_MODEL_MAP[embeddingModelId] || embeddingModelId,
    vectorStoreType: VECTOR_STORE_MAP[vectorStoreType] || vectorStoreType,
  };
};
