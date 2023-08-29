//This file will handle initializing Pinecone, creating the index, inserting vectors, and any other Pinecone related operations.

const Pinecone = require('pinecone-client');

const pinecone = new Pinecone(process.env.PINECONE_API_KEY);

function createIndex(indexName) {
    return pinecone.createIndex(indexName, "cosine");
}

function insertVectors(indexName, vectors) {
    // ... your insertion logic
}

// Export the functions for use in other files
module.exports = {
    createIndex,
    insertVectors,
    // ... any other functions
};
