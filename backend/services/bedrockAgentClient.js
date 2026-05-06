import { BedrockAgentClient } from "@aws-sdk/client-bedrock-agent";

export const bedrockAgentClient = new BedrockAgentClient({
  region: process.env.AWS_REGION,
});
