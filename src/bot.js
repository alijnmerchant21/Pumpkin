const { initializeVectorStore, indexVectors } = require('./pinecone');
const { embedWithLangchain } = require('./langchain');
const { readDocuments } = require('./utils');

(async function() {
    const docsPath = path.join(__dirname, '../documents');
    const documents = readDocuments(docsPath);
    
    // Convert documents to vectors
    const vectors = [];
    for (let doc of documents) {
        const vector = await embedWithLangchain(doc);
        vectors.push(vector);
    }
    
    // Initialize Pinecone store and index vectors
    const indexName = "YOUR_INDEX_NAME";
    await initializeVectorStore(indexName);
    await indexVectors(indexName, vectors);
})();
