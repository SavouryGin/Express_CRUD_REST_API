var readline = require("readline");

function reverseString(input) {
  return input.split("").reverse().join("");
}

function readLineLoop() {
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    // Prevent the duplication of an input in the terminal
    terminal: false,
  });

  rl.question("Please type something:\n>> ", function (answer) {
    if (answer === "exit" || answer === "quit") {
      console.log("Exiting the program...");
      return rl.close();
    }

    console.log(`Your reversed input is:\n   ${reverseString(answer)}`);
    readLineLoop();
  });
}

console.log("=== Task 1.1 ===");
readLineLoop();
