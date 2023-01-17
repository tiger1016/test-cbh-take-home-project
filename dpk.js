const crypto = require("crypto");

/**
 * I have defined getEncodedData function and stringify function separately
 * because they are used in several spaces in the main function.
 * And in the original function, the conditional statements were a bit messy,
 * so I have refactored the logic.
 * I think it is the best practice to handle the specific cases on the top of the function definition,
 * so I have added the conditional statement to check the existence of the event object at the top of function.
 * And simplified the conditional statements using ternary operator.
 */

exports.deterministicPartitionKey = (event) => {
  const MAX_PARTITION_KEY_LENGTH = 256;
  const TRIVIAL_PARTITION_KEY = "0";

  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  const originalData = event.partitionKey
    ? stringify(event.partitionKey)
    : getEncodedData(JSON.stringify(event));

  return originalData.length > MAX_PARTITION_KEY_LENGTH
    ? getEncodedData(originalData)
    : originalData;
};

function getEncodedData(data) {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

function stringify(data) {
  if (typeof data !== "string") {
    return JSON.stringify(data);
  }

  return data;
}
