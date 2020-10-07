const endpoints = require("./endpoints.js");

const stub = endpoints.fromNameToStub;

describe("fromNameToStub", () => {
  it("lowercases names", () => {
    expect(stub("EXAMPLE")).toEqual("example")
  });
  it("leaves snake case as snake case", () => {
    expect(stub("Submittal_Logs")).toEqual("submittal_logs");
  });
  it("replaces spaces with hyphens", () => {
    expect(stub("Coordination Issue Recycle Bin")).toEqual("coordination-issue-recycle-bin");
  });
  it("removes parentheses", () => {
    expect(stub("Line Item Types (Cost Types)")).toEqual("line-item-types-cost-types");
  });
  it("handles hyphen seperator", () => {
    expect(stub("Managed Equipment - Company Level")).toEqual("managed-equipment---company-level");
  });
});
