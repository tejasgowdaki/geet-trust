const { fetchInputFromFile } = require("./utils");
const FamilyTree = require("./family");

try {
  // fetch input file path
  const inputFilePath = process.argv[2];
  if (!inputFilePath) throw new Error("Input file path is required");

  // fetch input
  const commands = fetchInputFromFile(inputFilePath);
  if (!commands.length) throw new Error("Input file is empty");

  const result = new FamilyTree(commands).runCommands();

  console.log(result.join("\n"));
} catch (error) {
  console.log(`Error: ${error.message}`);
}
