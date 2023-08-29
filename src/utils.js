//This file could have functions to read your .txt and .md files and any other utility functions you might need.

const fs = require('fs');
const path = require('path');

function readDocuments(basePath) {
    let documents = [];
    fs.readdirSync(basePath).forEach(file => {
        if(file.endsWith('.txt') || file.endsWith('.md')) {
            const content = fs.readFileSync(path.join(basePath, file), 'utf-8');
            documents.push(content);
        }
    });
    return documents;
}

module.exports = {
    readDocuments
};
