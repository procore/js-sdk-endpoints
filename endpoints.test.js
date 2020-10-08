const endpoints = require("./endpoints.js");

const camel = endpoints.fromNameToCamelized;
const pascal = endpoints.fromNameToPascal;
const stub = endpoints.fromNameToStub;

describe("fromNameToCamelized", () => {
  it("single word example", () => {
    expect(camel("EXAMPLE")).toEqual("example")
  });
  it("multi word example", () => {
    expect(camel("Coordination Issue Recycle Bin")).toEqual("coordinationIssueRecycleBin");
  });
  it("remove underscores", () => {
    expect(camel("Submittal_Logs")).toEqual("submittalLogs");
  });
  it("removes parentheses", () => {
    expect(camel("Line Item Types (Cost Types)")).toEqual("lineItemTypesCostTypes");
  });
  it("removes hyphens", () => {
    expect(camel("Managed Equipment - Company Level")).toEqual("managedEquipmentCompanyLevel");
  });
});

describe("fromNameToPascal", () => {
  it("single word example", () => {
    expect(pascal("EXAMPLE")).toEqual("Example")
  });
  it("multi word example", () => {
    expect(pascal("Coordination Issue Recycle Bin")).toEqual("CoordinationIssueRecycleBin");
  });
  it("remove underscores", () => {
    expect(pascal("Submittal_Logs")).toEqual("SubmittalLogs");
  });
  it("removes parentheses", () => {
    expect(pascal("Line Item Types (Cost Types)")).toEqual("LineItemTypesCostTypes");
  });
  it("removes hyphens", () => {
    expect(pascal("Managed Equipment - Company Level")).toEqual("ManagedEquipmentCompanyLevel");
  });
});

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
  it("keeps hyphen seperator", () => {
    expect(stub("Managed Equipment - Company Level")).toEqual("managed-equipment---company-level");
  });
});
