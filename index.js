// This will be the main entry point to run the chatbot.

// This will be the main entry point to run the chatbot.
import { loadAllDocuments } from "./src/documentLoader.js";
import { splitText } from "./src/textSplitter.js";
import { createVectorStore } from "./src/vectorStore.js";
import { initChatBot, chat } from "./src/chatbot.js";
import readline from 'readline/promises';

async function main() {
    try {
        // 1. Load documents
        const docs = await loadAllDocuments();
        
        // 2. Split loaded documents into chunks
        const splitDocs = await splitText(docs);
        
        // 3. Embed these chunks into a vector database
        const vectorStore = await createVectorStore(splitDocs);
        
        // 4. Initialize the chatbot with vector store
        const chatChain = await initChatBot(vectorStore);

        // Start the chat loop
        while (true) {
            const question = await getUserInput("You: ");
            if (question.toLowerCase() === 'exit') {
                console.log("Goodbye!");
                break;
            }

            const response = await chat(chatChain, question);
            console.log("Bot:", response);

            if (response.fileName) {
                console.log("Information sourced from: ", response.fileName);
            }
        }
        
    } catch (err) {
        console.error("Error:", err);
    }
}

async function getUserInput(promptText) {
  const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
  });

  const answer = await rl.question(promptText);
  rl.close();
  return answer;
}


main();
