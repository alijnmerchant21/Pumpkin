//This file will be responsible for embedding your texts using Langchain.

const axios = require('axios');

async function embedWithLangchain(text) {
    try {
        const response = await axios.post(process.env.LANGCHAIN_ENDPOINT, { text: text });
        return response.data.vector;
    } catch (error) {
        console.error("Error embedding text with Langchain:", error); 
    }
    
    
}

module.exports = {
    embedWithLangchain
};
