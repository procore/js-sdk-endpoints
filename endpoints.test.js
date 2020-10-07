const endpoints = require("./endpoints.js");

const stub = endpoints.fromNameToUrlStub;

describe("fromNameToUrlStub", () => {
  it("lowercases names", () => {
    expect(stub("EXAMPLE")).toEqual("example")
  });
  it("leaves snake case as snake case", () => {
    expect(stub("Submittal_Logs")).toEqual("submittal_logs");
  });
  it("replaces spaces with hyphens", () => {
    expect(stub("Coordination Issue Recycle Bin")).toEqual("coordination-issue-recycle-bin");
  });
});
