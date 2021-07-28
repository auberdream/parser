class Tokenizer {
  static tokenize(expression = "") {
    if (!expression) return [];

    const split = expression.split(" ");
    return split.map((literal) => {
      switch (literal) {
        case "+":
          return {
            literal,
            type: "operator",
          };
      }
    });
  }
}

module.exports = Tokenizer;
