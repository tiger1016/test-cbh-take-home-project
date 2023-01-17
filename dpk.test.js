const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns stringified value of the partitionKey field value when input has that field whose length is less than 256.", () => {
    const eventWithPartitionKey = {
      partitionKey: 12,
    };

    const partitionKey = deterministicPartitionKey(eventWithPartitionKey);

    expect(partitionKey).toBe("12");
  });

  it("Returns encoded value of stringified partitionKey field value when input has that field whose length is greater than 256.", () => {
    const testValue = [...Array(500)].reduce((a, b) => `${a}a`, "");
    const eventWithPartitionKey = {
      partitionKey: testValue,
    };

    const result = deterministicPartitionKey(eventWithPartitionKey);

    const expectedResult = crypto
      .createHash("sha3-512")
      .update(testValue)
      .digest("hex");

    expect(result).toBe(expectedResult);
  });

  it("Returns encoded value of the stringified value of event object when it has no partitionKey field value", () => {
    const event = {
      testField: "This is the test field value",
    };

    const result = deterministicPartitionKey(event);

    const expectedResult = crypto
      .createHash("sha3-512")
      .update(JSON.stringify(event))
      .digest("hex");

    expect(result).toBe(expectedResult);
  });
});
