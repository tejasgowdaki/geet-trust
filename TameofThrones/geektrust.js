const { fetchMessageFromShan, checkIfShanHasSupport } = require("./utils");

try {
  // fetch message file path
  const messageFilePath = process.argv[2];
  if (!messageFilePath) throw new Error("Message file path is required");

  // fetch messages
  const messages = fetchMessageFromShan(messageFilePath);
  if (!messages.length) throw new Error("No messages received from Shan");

  // check if shan  has support from kingdoms
  const kingdoms = messages.map((message) => checkIfShanHasSupport(message));
  const supportedKingdoms = [...new Set(kingdoms.filter((k) => Boolean(k)))];

  // if Shan has support of 3 or more kingdoms print the supported kingdom names
  // if Shan has support of  less than 3 kingdoms print NONE
  const result =
    supportedKingdoms.length >= 3
      ? ["SPACE", ...supportedKingdoms].join(" ")
      : "NONE";

  console.log(result);
} catch (error) {
  console.log(`Error: ${error.message}`);
}
