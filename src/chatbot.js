import dotenv from 'dotenv';
import { RetrievalQAChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import * as fs from "fs";
import { EntityMemory, ENTITY_MEMORY_CONVERSATION_TEMPLATE } from "langchain/memory";


dotenv.config();

const PROMPT = new PromptTemplate({
  template: `
Answer the following question using the context from the documents provided. If the context doesn't have the information, use your own knowledge base (GPT-3.5) to answer. (Try as much as possible to answer from your own knowledge). If you still can't answer, then reply with "From my own knowledge: I couldn't find relevant information".

Remember: Always provide accurate information and do not make up or hallucinate any details.

{context}

Question: {question}
Answer:
  `,
  inputVariables: ["context", "question"],
});


function extractFileName(docContent) {
    const lines = docContent.split('\n');
    for (let line of lines) {
        const matches = /\[FileName:\s*(.+?)\]/.exec(line);
        if (matches && matches[1]) {
            return matches[1];
        }
    }
    return null;
}

export async function initChatBot() {
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 2048 });
  const allDocs = [];
  const fileNames = ["src/document_loaders/example_data/example/example.txt", "src/document_loaders/example_data/example/abci/abci++_app_requirements.md", "src/document_loaders/example_data/example/abci/abci++_basic_concepts.md", "src/document_loaders/example_data/example/abci/abci++_client_server.md", "src/document_loaders/example_data/example/abci/abci++_comet_expected_behavior.md", "src/document_loaders/example_data/example/abci/abci++_example_scenarios.md", "src/document_loaders/example_data/example/abci/abci++_methods.md"];

  for (let file of fileNames) {
    const text = fs.readFileSync(file, "utf8");
    const splitDocs = await textSplitter.createDocuments([text]);
    allDocs.push(...splitDocs);
  }

  const vectorStore = await HNSWLib.fromDocuments(allDocs, new OpenAIEmbeddings());
  const memory = new EntityMemory({
    llm: new ChatOpenAI({ modelName: "gpt-3.5-turbo", apiKey: process.env.OPENAI_API_KEY }),
    chatHistoryKey: "history",
    entitiesKey: "entities"
  });
  
  const model = new ChatOpenAI({ modelName: "gpt-3.5-turbo", apiKey: process.env.OPENAI_API_KEY });
  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), { returnSourceDocuments: true });
  

  return chain;
}

export async function chat(chain, context, question) {
  const formattedQuery = await PROMPT.format({ context, question });
  const result = await chain.call({ query: formattedQuery });

  if (result?.text) {
      if (result?.sourceDocuments && result.sourceDocuments.length > 0) {
          const sources = result.sourceDocuments.map(doc => extractFileName(doc.pageContent)).filter(Boolean);

          return {
             answer: `${result.text}`,
            source: `Retrieved Documents: ${sources.join(", ")}`
          };
      }
      
      return {
          answer: result.text,
          source: "GPT-3.5 only"
      };
  }
  
  return {
      answer: "I couldn't find relevant information.",
      source: "GPT-3.5 only"
  };
}