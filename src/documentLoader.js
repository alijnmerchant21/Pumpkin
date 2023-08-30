// This module will handle the chat functionality using the ConversationalRetrievalQAChain.

import dotenv from 'dotenv';
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import { ChatOpenAI } from "langchain/chat_models/openai";

dotenv.config();

export async function initChatBot(vectorStore) {
  const memory = new BufferMemory({
    memoryKey: "chat_history",
    returnMessages: true,
  });

  const model = new ChatOpenAI({ modelName: "gpt-3.5-turbo", apiKey: process.env.OPENAI_API_KEY });
  const chain = ConversationalRetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), { memory });

  return chain;
}

export async function chat(chain, question) {
  const result = await chain.call({ question });
  return result;
}

