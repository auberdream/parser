const Token = require("./token");
const types = require("./types");

class Tokenizer {
  constructor() {
    this.tokens = [];
    this.index = 0;
    this.expression = "";
  }

  tokenize(expression = "") {
    this._reset(expression);

    if (!expression) return this.tokens;

    for (this.index; this.index < this.expression.length; this.index++) {
      if (expression[this.index] === '"') {
        this.tokens.push(this._getString());
        continue;
      }
      if (expression[this.index] === "'") {
        this.tokens.push(this._getString("'"));
        continue;
      }
      if (!!parseInt(expression[this.index])) {
        this.tokens.push(this._getNumber());
        continue;
      }

      this.tokens.push(this._getType(expression[this.index]));
    }

    return this.tokens;
  }

  _reset(expression) {
    this.index = 0;
    this.tokens = [];
    this.expression = expression;
  }

  _getSymbol() {
    let symbol = "";

    for (this.index; this.index < this.expression.length; this.index++) {
      symbol += this.expression[this.index];

      if (this.expression[this.index + 1] === " ") {
        break;
      }
    }

    return new Token(symbol, types.SYMBOL);
  }

  _getString(quote = '"') {
    let string = quote;

    for (
      this.index = this.index + 1;
      this.index < this.expression.length;
      this.index++
    ) {
      if (this.expression[this.index] === quote) {
        string += this.expression[this.index];
        break;
      }

      if (this.index === this.expression.length - 1)
        return this._error("UNTERMINATED_STRING");

      string += this.expression[this.index];
    }

    return new Token(string, types.STRING);
  }

  _getNumber() {
    const numbers = "1234567890.";
    let number = "";

    for (this.index; this.index < this.expression.length; this.index++) {
      number += this.expression[this.index];

      if (!numbers.includes(this.expression[this.index + 1])) {
        break;
      }
    }

    return new Token(number, types.NUMBER);
  }

  _getType(string) {
    switch (string) {
      case "+":
        return new Token(string, types.PLUS);
      case "-":
        return new Token(string, types.MINUS);
      case "*":
        return new Token(string, types.MUL);
      case "/":
        return new Token(string, types.DIV);
      case "(":
        return new Token(string, types.LPAREN);
      case ")":
        return new Token(string, types.RPAREN);
      case " ":
        return new Token(string, types.SPACE);
      default: {
        return this._getSymbol();
      }
    }
  }
}

module.exports = Tokenizer;
