const Tokenizer = require(".");
const types = require("./types");

describe("Tokenizer", () => {
  let tokenizer;
  beforeEach(() => {
    tokenizer = new Tokenizer();
  });
  it("Returns an empty array when nothing is provided", () => {
    expect(tokenizer.tokenize()).toEqual([]);
  });

  it("Returns an empty array when given an empty string", () => {
    expect(tokenizer.tokenize("")).toEqual([]);
  });

  it("Can tokenize a +", () => {
    expect(tokenizer.tokenize("+")).toEqual([
      {
        literal: "+",
        type: types.PLUS,
      },
    ]);
  });

  it("Can tokenize a string", () => {
    expect(tokenizer.tokenize("'Ellie'")).toEqual([
      {
        literal: "'Ellie'",
        type: types.STRING,
      },
    ]);
  });

  it("Can tokenize a double quote string", () => {
    expect(tokenizer.tokenize('"hello"')).toEqual([
      {
        literal: '"hello"',
        type: types.STRING,
      },
    ]);
  });

  it("Can tokenize a -", () => {
    expect(tokenizer.tokenize("-")).toEqual([
      {
        literal: "-",
        type: types.MINUS,
      },
    ]);
  });

  it("Can tokenize a *", () => {
    expect(tokenizer.tokenize("*")).toEqual([
      {
        literal: "*",
        type: types.MUL,
      },
    ]);
  });

  it("Can tokenize a /", () => {
    expect(tokenizer.tokenize("/")).toEqual([
      {
        literal: "/",
        type: types.DIV,
      },
    ]);
  });

  it("Can tokenize single digit numbers", () => {
    expect(tokenizer.tokenize("1")).toEqual([
      {
        literal: "1",
        type: types.NUMBER,
      },
    ]);
  });

  it("Can tokenize complex numbers", () => {
    expect(tokenizer.tokenize("12394202")).toEqual([
      {
        literal: "12394202",
        type: types.NUMBER,
      },
    ]);
  });

  it("Can tokenize floats", () => {
    expect(tokenizer.tokenize("12.3827")).toEqual([
      {
        literal: "12.3827",
        type: types.NUMBER,
      },
    ]);
  });

  it("Can tokenize a left parenthesis", () => {
    expect(tokenizer.tokenize("(")).toEqual([
      {
        literal: "(",
        type: types.LPAREN,
      },
    ]);
  });

  it("Can tokenize a right parenthesis", () => {
    expect(tokenizer.tokenize(")")).toEqual([
      {
        literal: ")",
        type: types.RPAREN,
      },
    ]);
  });

  it("Can tokenize symbols", () => {
    expect(tokenizer.tokenize("Ellie")).toEqual([
      {
        literal: "Ellie",
        type: types.SYMBOL,
      },
    ]);
  });

  it("Can tokenize multiple symbols", () => {
    expect(tokenizer.tokenize("Ellie something else")).toEqual([
      {
        literal: "Ellie",
        type: types.SYMBOL,
      },
      {
        literal: " ",
        type: types.SPACE,
      },
      {
        literal: "something",
        type: types.SYMBOL,
      },
      {
        literal: " ",
        type: types.SPACE,
      },
      {
        literal: "else",
        type: types.SYMBOL,
      },
    ]);
  });

  it("Can tokenize complex expressions", () => {
    expect(tokenizer.tokenize("1 + ( 1 / 3 ) - 'hello' * something")).toEqual([
      {
        literal: "1",
        type: types.NUMBER,
      },
      {
        literal: " ",
        type: types.SPACE,
      },
      {
        literal: "+",
        type: types.PLUS,
      },
      {
        literal: " ",
        type: types.SPACE,
      },
      {
        literal: "(",
        type: types.LPAREN,
      },
      {
        literal: " ",
        type: types.SPACE,
      },
      {
        literal: "1",
        type: types.NUMBER,
      },
      {
        literal: " ",
        type: types.SPACE,
      },
      {
        literal: "/",
        type: types.DIV,
      },
      {
        literal: " ",
        type: types.SPACE,
      },
      {
        literal: "3",
        type: types.NUMBER,
      },
      {
        literal: " ",
        type: types.SPACE,
      },
      {
        literal: ")",
        type: types.RPAREN,
      },
      {
        literal: " ",
        type: types.SPACE,
      },
      {
        literal: "-",
        type: types.MINUS,
      },
      {
        literal: " ",
        type: types.SPACE,
      },
      {
        literal: "'hello'",
        type: types.STRING,
      },
      {
        literal: " ",
        type: types.SPACE,
      },
      {
        literal: "*",
        type: types.MUL,
      },
      {
        literal: " ",
        type: types.SPACE,
      },
      {
        literal: "something",
        type: types.SYMBOL,
      },
    ]);
  });

  it("Does not get dirty on multiple calls", () => {
    expect(tokenizer.tokenize("+")).toEqual([
      {
        literal: "+",
        type: types.PLUS,
      },
    ]);
    expect(tokenizer.tokenize("-")).toEqual([
      {
        literal: "-",
        type: types.MINUS,
      },
    ]);
    expect(tokenizer.tokenize("123")).toEqual([
      {
        literal: "123",
        type: types.NUMBER,
      },
    ]);
  });
});
