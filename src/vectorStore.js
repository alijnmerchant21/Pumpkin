// Here, we'll embed the splits in a vector database.

import dotenv from 'dotenv';
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

dotenv.config();

export async function createVectorStore(splitDocs) {
  const embeddings = new OpenAIEmbeddings({ apiKey: process.env.OPENAI_API_KEY });
  const vectorStore = await MemoryVectorStore.fromDocuments(splitDocs, embeddings);
  return vectorStore;
}
