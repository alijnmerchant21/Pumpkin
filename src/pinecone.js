//This file will handle initializing Pinecone, creating the index, inserting vectors, and any other Pinecone related operations.

const Pinecone = require('pinecone-client');
const pinecone = new Pinecone(process.env.PINECONE_API_KEY);

//Initialize Pinecone Vectore Store 
async function initializeVectoreStore(indexName) {
    try {
        //Create an index in Pinecone
        await pinecone.createIndex(indexName, "cosine");
        console.log("Successfully initialized pinecone vectore store with name :${indexName}");
    } catch (error) {
        console.error("Error initializing Pinecone vector store:", error);
    }
}

async function indexVectors(indexName, vectors) {
    try {
        // Assuming Pinecone allows batch insertion. Otherwise, you'd loop and insert individually.
        await pinecone.insert(indexName, vectors);
        console.log(`Successfully indexed ${vectors.length} vectors in Pinecone.`);
    } catch (error) {
        console.error("Error indexing vectors in Pinecone:", error);
    }
}

// Export the functions for use in other files
module.exports = {
    initializeVectoreStore,
    indexVectors
};
