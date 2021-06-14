const fs = require("fs");

const fetchInputFromFile = (messageFilePath) => {
  // fetch file contents
  const fileContents = fs.readFileSync(messageFilePath, "utf8");

  // format and filter messages
  return fileContents.split("\n").reduce((filteredMessages, message) => {
    const trimmedMessage = message.trim();
    if (trimmedMessage) filteredMessages.push(trimmedMessage);
    return filteredMessages;
  }, []);
};

module.exports = {
  fetchInputFromFile,
};
