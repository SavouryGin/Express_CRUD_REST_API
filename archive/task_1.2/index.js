const fs = require('fs');
const path = require('path');
const readline = require('readline');
const csvConverter = require('csvtojson');

function logResults(counter) {
  const used = process.memoryUsage().heapUsed / 1024 / 1024;

  console.log(`Done. Converted ${counter} lines. The script uses approximately ${Math.round(used * 100) / 100} MB of RAM.`);
}

function convertCSVtoJSONLineByLine(userPath) {
  const DEFAULT_PATH = path.resolve(__dirname, '../csv/nodejs-hw1-ex1.csv');
  const inputPath = userPath || DEFAULT_PATH;
  const outputPath = inputPath.split('.')[0] + '-converted.txt';

  try {
    const readStream = fs.createReadStream(inputPath, 'utf-8');
    const writeStream = fs.createWriteStream(outputPath, 'utf-8');
    let counter = 0;
    let header;

    const lineReader = readline.createInterface({
      input: readStream,
      output: writeStream,
      crlfDelay: Infinity,
    });

    lineReader
      .on('line', (line) => {
        if (counter === 0) {
          header = line.toString().toLowerCase();
          counter++;
        } else {
          const csvString = `${header}\n${line}`;

          csvConverter({ delimiter: '\t' })
            .fromString(csvString)
            .then((result) => {
              const jsonObj = JSON.stringify(result[0]);
              writeStream.write(`${jsonObj}\n`);
              counter++;
            });
        }
      })
      .on('close', () => {
        lineReader.close();
        logResults(counter);
      });
  } catch (err) {
    console.error(err);
  }
}

console.log('=== Task 1.2 ===');
convertCSVtoJSONLineByLine();
