// Format:
// {"book":"The Compound Effect","author":"Darren Hardy","price":9.48}
// {"book":"The 7 Habits of Highly Effective People","author":"Stephen R. Covey","price":23.48}
// {"book":"The Miracle Morning","author":"Hal Elrod","price":21.34}
// {"book":"Influence: The Psychology of Persuasion","author":"Robert B. Cialdini","price":12.99}
// {"book":"The ONE Thing","author":"Gary Keller","price":11.18}

console.log("=== Task 1.2 ===");
const fs = require("fs");
const path = require("path");
const readline = require("readline");
const events = require("events");
const csvConverter = require("csvtojson");
const DEFAULT_PATH = path.resolve(__dirname, "../../csv/nodejs-hw1-ex1.csv");
const outputFilePath = DEFAULT_PATH.split(".")[0] + "-converted.txt";

async function processLineByLine(path) {
  try {
    const readStream = fs.createReadStream(path, "utf-8");
    const writeStream = fs.createWriteStream(outputFilePath, "utf-8");
    let linesCounter = 0;
    let headerLine;

    const rl = readline.createInterface({
      input: readStream,
      output: writeStream,
      crlfDelay: Infinity,
    });

    rl.on("line", (line) => {
      if (linesCounter === 0) {
        headerLine = line.toString().toLowerCase();
        linesCounter++;
      } else {
        const csvStr = `${headerLine}\n${line}`;

        csvConverter({ delimiter: "\t" })
          .fromString(csvStr)
          .then((result) => {
            const jsonObj = JSON.stringify(result[0]);
            writeStream.write(`${jsonObj}\n`);
            linesCounter++;
          });
      }
    });

    await events.once(rl, "close");

    const used = process.memoryUsage().heapUsed / 1024 / 1024;

    console.log(
      `Done. Converted ${linesCounter} lines. The script uses approximately ${
        Math.round(used * 100) / 100
      } MB of RAM.`
    );
  } catch (err) {
    console.error(err);
  }
}

processLineByLine(DEFAULT_PATH);
