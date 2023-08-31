// This module will handle the chat functionality using the ConversationalRetrievalQAChain.

import dotenv from 'dotenv';
//import { ConversationalRetrievalQAChain } from "langchain/chains";
import { RetrievalQAChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import { ChatOpenAI } from "langchain/chat_models/openai";

dotenv.config();

export async function initChatBot(vectorStore) {
  const memory = new BufferMemory({
    // memoryKey: "chat_history",
    returnMessages: true,
    outputKey: "response"
  });

  const model = new ChatOpenAI({ modelName: "gpt-3.5-turbo", apiKey: process.env.OPENAI_API_KEY });
  //const chain = ConversationalRetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), { memory });
  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), { returnSourceDocuments: true } );


  return chain;
}

export async function chat(chain, question) {
  const result = await chain.call({ query: question });

  // Attempt to extract the file name from the top of the source document content
  const fileNameRegex = /\[FileName:\s*(.+?)\]/;
  const sources = result.sourceDocuments.map(doc => {
    const matches = fileNameRegex.exec(doc.pageContent);

    if (!matches || !matches[1]) {
       // Enhance Logging for Debugging
      console.warn("Failed to extract source for document content:", doc.pageContent);
      return "Unknown Source";
    }
    return matches[1];
  }).filter(Boolean);

 
  
  
  const combinedSources = sources.join(", ");
  const responseWithSource = `${result?.text} (Sources: ${combinedSources})`;

  return responseWithSource;
}