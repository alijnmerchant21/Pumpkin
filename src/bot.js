require('dotenv').config();
const discordToken = process.env.DISCORD_TOKEN;

//This is where you integrate everything, listen for Discord messages, and handle bot logic.

const { Client } = require('discord.js');
const { embedWithLangchain } = require('./langchain');
const { insertVectors } = require('./pinecone');
const { readDocuments } = require('./utils');

// ... your bot logic

