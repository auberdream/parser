const types = require("./types");
const Token = require("./token");

class Tokenizer {
  static _getType(string) {
    switch (string) {
      case "+":
        return types.PLUS;
      case "-":
        return types.MINUS;
      case "*":
        return types.MUL;
      case "/":
        return types.DIV;
      case "(":
        return types.LPAREN;
      case ")":
        return types.RPAREN;
      default: {
        if (!!parseInt(string, 10)) return types.NUMBER;

        return types.SYMBOL;
      }
    }
  }

  static tokenize(expression = "") {
    if (!expression) return [];

    return expression.split(" ").map((literal) => {
      const type = this._getType(literal);
      return new Token(literal, type);
    });
  }
}

module.exports = Tokenizer;
