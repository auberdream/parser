const Tokenizer = require(".");
const types = require("./types");

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
        type: types.PLUS,
      },
    ]);
  });

  it("Can tokenize a -", () => {
    expect(Tokenizer.tokenize("-")).toEqual([
      {
        literal: "-",
        type: types.MINUS,
      },
    ]);
  });

  it("Can tokenize a *", () => {
    expect(Tokenizer.tokenize("*")).toEqual([
      {
        literal: "*",
        type: types.MUL,
      },
    ]);
  });

  it("Can tokenize a /", () => {
    expect(Tokenizer.tokenize("/")).toEqual([
      {
        literal: "/",
        type: types.DIV,
      },
    ]);
  });

  it("Can tokenize single digit numbers", () => {
    expect(Tokenizer.tokenize("1")).toEqual([
      {
        literal: "1",
        type: types.NUMBER,
      },
    ]);
  });

  it("Can tokenize complex numbers", () => {
    expect(Tokenizer.tokenize("12394202")).toEqual([
      {
        literal: "12394202",
        type: types.NUMBER,
      },
    ]);
  });

  it("Can tokenize floats", () => {
    expect(Tokenizer.tokenize("12.3827")).toEqual([
      {
        literal: "12.3827",
        type: types.NUMBER,
      },
    ]);
  });

  it("Can tokenize a left parenthesis", () => {
    expect(Tokenizer.tokenize("(")).toEqual([
      {
        literal: "(",
        type: types.LPAREN,
      },
    ]);
  });

  it("Can tokenize a right parenthesis", () => {
    expect(Tokenizer.tokenize(")")).toEqual([
      {
        literal: ")",
        type: types.RPAREN,
      },
    ]);
  });

  it("Can tokenize symbols", () => {
    expect(Tokenizer.tokenize("Ellie")).toEqual([
      {
        literal: "Ellie",
        type: types.SYMBOL,
      },
    ]);
  });
});
