# Pumpkin

Pumpkin is a code name for an AI bot that can answer questions based on information it learns through various sources.

## High level

![Pumpkin](https://github.com/alijnmerchant21/Pumpkin/assets/44069404/38deb307-d360-4bcf-a7be-a9c591022411)

### MVP

Pumpkin is trained on CometBFT data and can answer questions.

### Extended

Pumpkin is trained on personal interactions fed directly into the knowledge base. It can also learn and improve its database through sources like - Issues, discussions on GitHub, and other forums.

### Future

The learning model is trained per Cal Newport's method, where each issue/idea is interconnected.

## Project Structure

- src
  - chatbot.js
  - documentLoader.js
  - textSplitter.js
  - vectorStore.js

- document_loaders
  - example_data
    - example
      - example.txt

- index.js

- package.json

- .env

- README.md

## Legal Notice

### Disclaimer

This software is provided "as is" without warranty of any kind, either expressed or implied, including, but not limited to, the implied warranties of merchantability and fitness for a particular purpose. The entire risk as to the quality and performance of the software is with you. Should the software prove defective, you assume the cost of all necessary servicing, repair, or correction.

In no event will the authors or copyright holders be liable for any damages, including, but not limited to, direct, indirect, special, incidental, or consequential damages, damages for loss of profits, goodwill, use, data, or other intangible losses (even if the authors or copyright holders have been advised of the possibility of such damages), arising out of or in connection with the software or the use or other dealings in the software.

### Contributing Guidelines

We welcome contributions from the community. Here are a few guidelines to follow:

- **Fork the Repository**: Make a fork of this repository and make your changes there.
- **Feature Branches**: Always create a new branch for each feature or fix.
- **Commit Messages**: Write meaningful commit messages. If you're unsure, here's a good guide: [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/).
- **Testing**: Ensure that you've added and updated tests as appropriate for your changes.
- **Documentation**: Update documentation as necessary.
- **Pull Requests**: Submit your changes as a pull request to this repository. Make sure to mention any related issues in your pull request.

Thank you for your contributions!

### Copyright Information

Copyright (c) [2023] [Ali M]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
