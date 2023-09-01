import { expect } from 'chai';
import { extractFileName } from '../src/chatbot.js';


//const { expect } = require('chai');
//const { extractFileName } = require('["src/document_loaders/example_data/example/example.txt", "src/document_loaders/example_data/example/abci/abci++_app_requirements.md", "src/document_loaders/example_data/example/abci/abci++_basic_concepts.md", "src/document_loaders/example_data/example/abci/abci++_client_server.md", "src/document_loaders/example_data/example/abci/abci++_comet_expected_behavior.md", "src/document_loaders/example_data/example/abci/abci++_example_scenarios.md", "src/document_loaders/example_data/example/abci/abci++_methods.md"]');

describe('extractFileName', function() {
    it('should correctly extract file names', function() {
        const testCases = [
            { 
                input: "[FileName: example.txt]\nSome other text...",
                expected: "example.txt"
            },
            { 
                input: "Some other text without filename...",
                expected: null
            },
            { 
                input: "[FileName: abci_method.md]\nSome more text...",
                expected: "abci_method.md"
            }
            
        ];

        for (let testCase of testCases) {
            const result = extractFileName(testCase.input);
            expect(result).to.equal(testCase.expected);
        }
    });
});

