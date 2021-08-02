const types = require("../tokenizer/types");

class Parser {
  constructor(tokens) {
    this.tokens = tokens;
    this.index = 0;
  }

  parse() {
    let node;
    const token = this.tokens[this.index];

    if (token.type === types.NUMBER) {
      node = token;
    }

    return node;
  }
}

module.exports = Parser;
