import { BedrockAgentRuntime } from "@aws-sdk/client-bedrock-agent-runtime";

export const bedrockClient = new BedrockAgentRuntime({
  region: process.env.AWS_REGION,
});