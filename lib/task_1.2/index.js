// Format:
// {"book":"The Compound Effect","author":"Darren Hardy","price":9.48}
// {"book":"The 7 Habits of Highly Effective People","author":"Stephen R. Covey","price":23.48}
// {"book":"The Miracle Morning","author":"Hal Elrod","price":21.34}
// {"book":"Influence: The Psychology of Persuasion","author":"Robert B. Cialdini","price":12.99}
// {"book":"The ONE Thing","author":"Gary Keller","price":11.18}

console.log("=== Task 1.2 ===");
var fs = require("fs");
const path = require("path");
var readline = require("readline");
var events = require("events");
var stream = require("stream");
var Transform = stream.Transform;
var csvConverter = require("csvtojson");
const { listenerCount } = require("process");
const DEFAULT_PATH = path.resolve(__dirname, "../../csv/nodejs-hw1-ex1.csv");
const outputFilePath = DEFAULT_PATH.split(".")[0] + "-converted.txt";

// function convert(filePath) {
//   const outputFilePath = filePath.split(".")[0] + "-converted.txt";
//   const readStream = fs.createReadStream(filePath);
//   const writeStream = fs.createWriteStream(outputFilePath);

//   const convertToJSONStream = new Transform({
//     transform(data, encoding, callback) {
//       const csvStr = data.toString();
//       console.log("String:", csvStr);

//       csvConverter({ delimiter: "\t" })
//         .fromString(csvStr)
//         .then((jsonObj) => {
//           console.log(jsonObj);
//           this.push(JSON.stringify(jsonObj));
//         });

//       callback();
//     },
//   });

//   readStream
//     .pipe(convertToJSONStream)
//     .pipe(writeStream)
//     .on("finish", () => {
//       console.log(
//         `Finished transforming the contents of ${filePath} and saving the output to ${outputFilePath}.`
//       );
//     });
// }

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
      console.log(`Line #${linesCounter}: ${line}`);

      if (linesCounter === 0) {
        headerLine = line;
        linesCounter++;
      } else {
        const csvStr = `${headerLine}\n${line}`;
        console.log("csvStr", csvStr);
        csvConverter({ delimiter: "\t" })
          .fromString(csvStr)
          .then((jsonObj) => {
            const outputLine = JSON.stringify(jsonObj);
            writeStream.write(`${outputLine}\n`);
            linesCounter++;
          });
      }
    });

    await events.once(rl, "close");

    console.log("Done.");
  } catch (err) {
    console.error(err);
  }
}

processLineByLine(DEFAULT_PATH);

// convert(DEFAULT_PATH);

// const fs = require("fs");
// const readline = require("readline");

// const readFile = readline.createInterface({
//   input: fs.createReadStream(DEFAULT_PATH),
//   output: fs.createWriteStream(outputFilePath),
//   terminal: false,
// });

// readFile.on("line", transform).on("close", function () {
//   console.log(`Created "${this.output.path}"`);
// });

// function transform(line) {
//   this.output.write(`Modified ${line}\n`);
// }
