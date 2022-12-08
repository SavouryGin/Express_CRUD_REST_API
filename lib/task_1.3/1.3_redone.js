import { createReadStream, createWriteStream } from "fs";
import { resolve } from "path";
import { createInterface } from "readline";
import { once } from "events";
import csvConverter from "csvtojson";

async function convertCSVtoJSONLineByLine(userPath) {
  const DEFAULT_PATH = resolve(__dirname, "../../csv/nodejs-hw1-ex1.csv");
  const inputPath = userPath || DEFAULT_PATH;
  const outputPath = inputPath.split(".")[0] + "-converted.txt";

  try {
    const readStream = createReadStream(inputPath, "utf-8");
    const writeStream = createWriteStream(outputPath, "utf-8");
    let linesCounter = 0;
    let headerLine;

    const rl = createInterface({
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

    await once(rl, "close");

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

console.log("=== Task 1.2 ===");
convertCSVtoJSONLineByLine();
