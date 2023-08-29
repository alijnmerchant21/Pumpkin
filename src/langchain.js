//This file will be responsible for embedding your texts using Langchain.

const axios = require('axios');

async function embedWithLangchain(text) {
    const response = await axios.post(process.env.LANGCHAIN_ENDPOINT, { text: text });
    return response.data.vector;
}

module.exports = {
    embedWithLangchain
};
