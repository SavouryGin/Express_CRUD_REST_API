var fs = require("fs"),
  path = require("path"),
  readline = require("readline"),
  csvConverter = require("csvtojson");

function logResults(counter) {
  var used = process.memoryUsage().heapUsed / 1024 / 1024;

  console.log(
    `Done. Converted ${counter} lines. The script uses approximately ${
      Math.round(used * 100) / 100
    } MB of RAM.`
  );
}

function convertCSVtoJSONLineByLine(userPath) {
  var DEFAULT_PATH = path.resolve(__dirname, "../../csv/nodejs-hw1-ex1.csv"),
    inputPath = userPath || DEFAULT_PATH,
    outputPath = inputPath.split(".")[0] + "-converted.txt";

  try {
    var readStream = fs.createReadStream(inputPath, "utf-8"),
      writeStream = fs.createWriteStream(outputPath, "utf-8"),
      counter = 0,
      header;

    var lineReader = readline.createInterface({
      input: readStream,
      output: writeStream,
      crlfDelay: Infinity,
    });

    lineReader
      .on("line", function (line) {
        if (counter === 0) {
          header = line.toString().toLowerCase();
          counter++;
        } else {
          var csvString = `${header}\n${line}`;

          csvConverter({ delimiter: "\t" })
            .fromString(csvString)
            .then((result) => {
              const jsonObj = JSON.stringify(result[0]);
              writeStream.write(`${jsonObj}\n`);
              counter++;
            });
        }
      })
      .on("close", () => {
        lineReader.close();
        logResults(counter);
      });
  } catch (err) {
    console.error(err);
  }
}

console.log("=== Task 1.2 ===");
convertCSVtoJSONLineByLine();
