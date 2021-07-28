const Tokenizer = require(".");

describe("Tokenizer", () => {
  it("Returns an empty array when nothing is provided", () => {
    expect(Tokenizer.tokenize()).toEqual([]);
  });

  it("Returns an empty array when given an empty string", () => {
    expect(Tokenizer.tokenize("")).toEqual([]);
  });

  it("Can tokenize a +", () => {
    expect(Tokenizer.tokenize("+")).toEqual([
      {
        literal: "+",
        type: "operator",
      },
    ]);
  });
});
