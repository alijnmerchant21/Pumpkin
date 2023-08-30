// This module will split the loaded document into chunks.

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
export async function splitText(data) {
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 0,
  });
  const splitDocs = await textSplitter.splitDocuments(data);
  return splitDocs;
}
