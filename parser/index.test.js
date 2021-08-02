const Tokenizer = require("../tokenizer");
const Parser = require(".");
const types = require("../tokenizer/types");

describe("Parser", () => {
  const testCases = [
    {
      description: "It can parse a simple number",
      expression: "1",
      expect: {
        literal: "1",
        type: types.NUMBER,
      },
    },
  ];

  testCases.forEach((t) => {
    it(t.description, () => {
      const tokenizer = new Tokenizer();
      const tokens = tokenizer.tokenize(t.expression);
      const parser = new Parser(tokens);
      const tree = parser.parse();
      expect(tree).toEqual(t.expect);
    });
  });
});
