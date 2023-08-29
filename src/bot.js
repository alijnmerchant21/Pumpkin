const { Client, Intents, MessageEmbed } = require('discord.js');
require('dotenv').config();

const path = require('path');

// const { initializeVectorStore, indexVectors } = require('./pinecone');
const { initializeVectorStore, indexVectors, searchInPinecone } = require('./pinecone');
const { embedWithLangchain } = require('./langchain');
const { readDocuments } = require('./utils');

const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES"]
});

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
    const indexName = process.env.PINECONE_INDEX;
    await initializeVectorStore(indexName);
    await indexVectors(indexName, vectors);
})();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', async message => {
    const PREFIX = "!";

    if (message.author.bot || !message.content.startsWith(PREFIX)) return;

    const commandBody = message.content.slice(PREFIX.length).trim();
    const command = commandBody.split(' ')[0];
    const args = commandBody.slice(command.length).trim();

    if (command === "ask") {
        const response = await searchInPinecone(args); 
        
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Answer from Knowledge Base')
            .setDescription(response);
        
        message.channel.send(embed);
    }
});



client.login(process.env.DISCORD_API_KEY);
