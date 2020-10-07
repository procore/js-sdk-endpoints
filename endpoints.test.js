const endpoints = require("./endpoints.js");

const fromNameToUrlStubTestExamples = [
  {
    input: "Example",
    output: "example",
  },
];

test("fromNameToUrlStub", () => {
  fromNameToUrlStubTestExamples.forEach(({ input, output }) => {
    expect(endpoints.fromNameToUrlStub(input)).toEqual(output);
  });
});
