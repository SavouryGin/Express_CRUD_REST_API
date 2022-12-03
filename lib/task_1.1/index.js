const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const reverseString = (input) => {
  return input.split("").reverse().join("");
};

const readLineLoop = () => {
  rl.question("Please enter your text:\n>> ", (answer) => {
    if (answer === "exit" || answer === "quit") {
      console.log("Exiting the program...");
      return rl.close();
    }

    console.log(`Your reversed text:\n   ${reverseString(answer)}`);
    readLineLoop();
  });
};

console.log("=== Task 1.1 ===");
readLineLoop();
