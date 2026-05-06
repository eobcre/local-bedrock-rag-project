// for retrieveChunks and sources
type RetrieveChunkLocation = {
  type: string;
  s3Location: {
    uri: string;
  };
};

// for retrieveChunks
export type RetrieveChunk = {
  text: string;
  location: RetrieveChunkLocation;
};

export type RagResponse = {
  ok: boolean;
  query: string;
  topK: number;
  totalLatency: number;
  answer: string;
  retrieveChunks: RetrieveChunk[];
  retrieveChunksCount: number;
  sources: RetrieveChunkLocation[];
  model: string;
  embeddingModel: string;
  vectorStoreType: string;
};
