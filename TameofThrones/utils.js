const fs = require("fs");

const { KingdomsAndEmblems, Letters } = require("./constants");

const fetchMessageFromShan = (messageFilePath) => {
  // fetch file contents
  const fileContents = fs.readFileSync(messageFilePath, "utf8");

  // format and filter messages
  return fileContents.split("\n").reduce((filteredMessages, message) => {
    const trimmedMessage = message.trim();
    if (trimmedMessage) filteredMessages.push(trimmedMessage);
    return filteredMessages;
  }, []);
};

const getDecryptedLetter = (secretKey, letter) => {
  const newLetterValue = Letters.indexOf(letter) - secretKey;
  return Letters[newLetterValue < 0 ? 26 + newLetterValue : newLetterValue];
};

const decryptMessage = (kingdom, message) => {
  const secretKey = KingdomsAndEmblems[kingdom].length;
  return message
    .split("")
    .map((letter) => getDecryptedLetter(secretKey, letter))
    .join("");
};

const checkSupport = (kingdom, message) => {
  const emblem = KingdomsAndEmblems[kingdom];

  const messageArray = message.split("");

  return emblem.split("").every((letter) => {
    const index = messageArray.indexOf(letter);
    if (index > -1) messageArray.splice(index, 1);
    return index > -1;
  });
};

const checkIfShanHasSupport = (message) => {
  const [kingdom, ...restOfMessage] = message.split(" ");
  const secretMessage = restOfMessage.join("");

  const decryptedMessage = decryptMessage(kingdom, secretMessage);
  const result = checkSupport(kingdom, decryptedMessage);
  return result ? kingdom : null;
};

module.exports = {
  fetchMessageFromShan,
  getDecryptedLetter,
  decryptMessage,
  checkSupport,
  checkIfShanHasSupport,
};
